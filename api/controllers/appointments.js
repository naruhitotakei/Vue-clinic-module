const router = require('express').Router()
const { getEnquiryByPhone, createEnquiryPublic } = require('~/dao/daoEnquiries')
const { createAppointment } = require('~/dao/daoAppointments')
const {
  getAppointmentSlotById,
  updateAppointmentSlot,
} = require('~/dao/daoAppointmentSlots')

module.exports = router

router.post(
  '/request',
  validateCreateAppointmentRequest,
  async (request, response) => {
    const { phone } = request.body
    const vonage = require('~/services/vonage')
    let result

    try {
      result = await new Promise((resolve, reject) => {
        vonage.verify.request(
          {
            number: phone,
            brand: 'SMART PRM Dental',
          },
          (error, result) => {
            if (error != null) {
              return reject(error)
            }

            return resolve(result)
          },
        )
      })
    } catch (error) {
      return response.status(500).json(error)
    }

    const { request_id } = result
    response.status(200).json({
      success: true,
      result,
      requestId: request_id,
    })
  },
)

router.post(
  '/',
  validateCreateAppointmentRequest,
  verifyPhone,
  async (request, response) => {
    const { phone, firstName, lastName, appointmentSlotId } = request.body

    try {
      let enquiry = await getEnquiryByPhone(phone)

      if (enquiry == null) {
        enquiry = await createEnquiryPublic({ firstName, lastName, phone })
      }

      const appointment = await createAppointment({ enquiryId: enquiry.id })
      await updateAppointmentSlot(appointmentSlotId, {
        appointmentId: appointment.id,
      })
    } catch (error) {
      return response.sendStatus(500)
    }

    return response.status(201).json({})
  },
)

/**
 * @type {import('express').RequestHandler}
 */
async function validateCreateAppointmentRequest(request, response, next) {
  const { firstName, lastName, phone, appointmentSlotId } = request.body
  const appointmentSlot = await getAppointmentSlotById(appointmentSlotId)
  const activeAppointmentSlotsCount = await countActiveAppointmentSlotsByPhone(
    phone,
  )
  const rules = [
    [typeof firstName === 'string' && firstName.length > 0],
    [typeof lastName === 'string' && lastName.length > 0],
    [activeAppointmentSlotsCount <= 2, 'over-order'],
    [
      appointmentSlot != null && appointmentSlot.appointment_id == null,
      'unavailable-slot',
    ],
  ]
  const messages = rules.reduce((messages, [valid, message]) => {
    if (valid == false) {
      messages.push(message)
    }

    return messages
  }, [])

  if (messages.length > 0) {
    return response.status(422).json({ messages })
  }

  next()
}

/**
 * @type {import('express').RequestHandler}
 */
async function verifyPhone(request, response, next) {
  const vonage = require('~/services/vonage')
  const { verificationId, verificationCode } = request.body
  let result

  try {
    result = await new Promise((resolve, reject) => {
      vonage.verify.check(
        {
          request_id: verificationId,
          code: verificationCode,
        },
        (error, result) => {
          if (error != null) {
            return reject(error)
          }

          return resolve(result)
        },
      )
    })
  } catch (error) {
    return response.status(500).send(error)
  }

  if (result.status === '16') {
    return response.status(422).json(result)
  }

  if (result.status !== '0') {
    return response.status(500).send(result)
  }

  next()
}

async function countActiveAppointmentSlotsByPhone(phone) {
  const { pool, now } = require('~/services/db')
  const statement = /* sql */ `
    SELECT COUNT(*) FROM appointment_slots
    JOIN appointments ON appointment_slots.appointment_id = appointments.id
    JOIN enquiries ON appointments.enquiry_id = enquiries.id
    WHERE enquiries.phone = $1
    AND appointment_slots.starts_at > $2
  `
  const {
    rows: [{ count }],
  } = await pool.query(statement, [phone, now()])

  return count
}

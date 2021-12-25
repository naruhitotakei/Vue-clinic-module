const router = require('express').Router()
const { getEnquiryByPhone, createEnquiryPublic } = require('~/dao/daoEnquiries')
const { createAppointment } = require('~/dao/daoAppointments')
const { getAppointmentSlotById, updateAppointmentSlot } = require('~/dao/daoAppointmentSlots')

module.exports = router

router.post('/', validateCreateAppointmentRequest, verifyPhone, async (request, response) => {
  const { phone, firstName, lastName, appointmentSlotId } = request.body

  try {
    let enquiry = await getEnquiryByPhone(phone)

    if (enquiry == null) {
      enquiry = await createEnquiryPublic({ firstName, lastName, phone })
    }

    const appointment = await createAppointment({ enquiryId: enquiry.id })
    await updateAppointmentSlot(appointmentSlotId, { appointmentId: appointment.id })
  } catch (error) {
    console.error(error)
    return response.sendStatus(500)
  }

  return response.sendStatus(201)
})

/**
 * @type {import('express').RequestHandler}
 */
async function validateCreateAppointmentRequest(request, response, next) {
  const { firstName, lastName, appointmentSlotId } = request.body

  if(
    typeof firstName === 'string' &&
    firstName.length  > 0 &&
    typeof lastName === 'string' &&
    lastName.length  > 0 &&
    (await getAppointmentSlotById(appointmentSlotId)) != null &&
    true
  ) {
    return next()
  }

  response.sendStatus(422)
}

/**
 * @type {import('express').RequestHandler}
 */
async function verifyPhone(request, response, next) {
  return next()
  const { promisify } = require('util')
  const vonage = require('./services/vonage')
  const verify = promisify(vonage.verify.check)
  const { verificationId, verificationCode } = request.body
  let result

  try {
    result = await verify({
      request_id: verificationId,
      code: verificationCode,
    })
  } catch (error) {
    response.status(500)

    return
  }

  if (result.status === '16') {
      response.status(422).json(result)

      return
  }

  if (result.status !== '0') {
      response.status(500)

      return
  }

  next()
}

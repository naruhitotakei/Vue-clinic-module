const router = require('express').Router()
const daoAppointmentSlots = require('~/dao/daoAppointmentSlots')

module.exports = router

router.get('/', async (request, response) => {
  let result

  try {
    result = await daoAppointmentSlots.getFreeSlotsPublic(request.query)
  } catch (error) {
    return response.sendStatus(500)
  }

  return response.json(result.rows)
})

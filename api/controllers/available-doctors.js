const router = require('express').Router()
const { getAvailableDoctors } = require('~/dao/daoAvailableDoctors')

module.exports = router

router.get('/', async (request, response) => {
  let doctors

  try {
    doctors = await getAvailableDoctors(request.query)
  } catch (error) {
    return response.status(500).send(error)
  }

  return response.json(doctors)
})

const router = require('express').Router()
const { getAvailableServices } = require('~/dao/daoAvailableServices')

module.exports = router

router.get('/', async (request, response) => {
  let dates

  try {
    dates = await getAvailableServices(request.query)
  } catch (error) {
    return response.status(500).send(error)
  }

  return response.json(dates)
})

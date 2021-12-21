const router = require('express').Router()
const { getAvailableDates } = require('~/dao/daoAvailableDates')

module.exports = router

router.get('/', async (request, response) => {
  let dates

  try {
    dates = await getAvailableDates(request.query)
  } catch (error) {
    return response.status(500).send(error)
  }

  return response.json(dates)
})

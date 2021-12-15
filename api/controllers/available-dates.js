const router = require('express').Router()
const moment = require('moment')
const { getAvailableDates } = require('~/dao/daoAvailableDates')

module.exports = router

router.get('/', async (request, response) => {
  let dates

  try {
    dates = await getAvailableDates(request.query)
  } catch (error) {
    console.log(moment().format('HH:mm'), error)
    return response.status(500).send(error)
  }

  return response.json(dates)
})

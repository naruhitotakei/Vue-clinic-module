const router = require('express').Router()
const { getAvailableDates } = require('~/dao/daoAvailableDates')

module.exports = router

router.get('/', async (request, response) => {
  let result

  try {
    result = await getAvailableDates()
  } catch (error) {
    return response.sendStatus(500)
  }

  return response.json(result.rows)
})

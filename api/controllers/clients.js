const router = require('express').Router()
const { getClients } = require('~/dao/daoClients')

module.exports = router

router.get('/', async (request, response) => {
  let clients

  try {
    clients = await getClients({ userId: request.session.prm_user.id })
  } catch (error) {
    return response.status(500).send(error)
  }

  return response.json(clients)
})

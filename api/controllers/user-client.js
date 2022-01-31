const router = require('express').Router()
const { updateUserClient } = require('~/dao/daoUserClient')
const { pool } = require('~/services/db')

module.exports = router

router.put('/', validation, async (request, response) => {
  let clients

  try {
    clients = await updateUserClient({
      userId: request.session.prm_user.id,
      clientId: request.body.clientId,
    })
  } catch (error) {
    return response.status(500).send(error)
  }

  return response.json(clients)
})

/**
 * @type {import('express').RequestHandler}
 */
async function validation(request, response, next) {
  const statement = /* sql */ `
    select count(*) from prm_client_users
    where user_id = $1
    and prm_client_id = $2
  `
  const {
    rows: [{ count }],
  } = await pool.query(statement, [
    request.session.prm_user.id,
    request.body.clientId,
  ])

  if (count === 0) {
    return response.status(401)
  }

  next()
}

const { pool } = require('~/services/db')

const daoAvailableDates = {
  updateUserClient,
}

module.exports = daoAvailableDates

async function updateUserClient({ userId, clientId }) {
  const statements = /* sql */ `
    update users
    set prm_client_id = $2
    where id = $1
  `
  const { rows } = await pool.query(statements, [userId, clientId])

  return rows
}

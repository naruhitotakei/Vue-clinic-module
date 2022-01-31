const { pool } = require('~/services/db')

const daoAvailableDates = {
  getClients,
}

module.exports = daoAvailableDates

async function getClients({ userId }) {
  const statements = /* sql */ `
    select
      id,
      client_name as name
    from prm_client
    where id in (
      select prm_client_id from prm_client_users
      where user_id = $1
    )
    order by name
  `
  const { rows } = await pool.query(statements, [userId])

  return rows
}

const db = require('~/services/db')

const daoAvailableDates = {
  getAvailableDates,
}

module.exports = daoAvailableDates

async function getAvailableDates() {
  const statements = /* sql */`
    select
  `

  return await db.query('')
}

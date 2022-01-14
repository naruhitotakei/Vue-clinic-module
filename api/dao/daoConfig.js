require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const langByCountry = {
  SI: 'sl',
}

const getConfig = (request, response, ip, premiseId) => {
  const geoip = require('geoip-lite')
  const geo = geoip.lookup(ip)
  const lang =
    geo != null && langByCountry[geo.country] != null
      ? langByCountry[geo.country]
      : 'en'

  const statement = /* sql */ `
    SELECT
      prm_company_premise.premise_name as "name",
      prm_company_premise.premise_street as street,
      prm_company_premise.premise_house_number as house_number,
      prm_company_premise.premise_post_code as post_code,
      prm_company_premise.premise_phone_number as phone_number,
      prm_company_premise.premise_city as city,
      prm_company.prm_client_id as client_id,
      prm_company.company_name as company_name
    FROM prm_company_premise
    JOIN prm_company ON prm_company_premise.company_id = prm_company.company_id
    WHERE premise_id = $1
    LIMIT 1
  `

  pool.query(statement, [premiseId], (error, result) => {
    if (error) {
      response.status(500).send()

      return
    }

    const premise = result.rows[0]

    response.json({
      lang,
      premise: {
        name: premise.name,
        address: `${premise.street} ${premise.house_number}, ${premise.post_code} ${premise.city}`,
        client_id: premise.client_id,
        company_name: premise.company_name,
        phone_number: premise.phone_number,
      },
    })
  })
}

const daoConfig = {
  getConfig,
}

module.exports = daoConfig

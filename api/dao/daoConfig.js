require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getConfig = (request, response, ip) => {
    const geoip = require('geoip-lite')
    const geo = geoip.lookup(ip)
    const lang = geo != null && langByCountry[geo.country] != null
        ? langByCountry[geo.country]
        : 'en'

    const statement = /* sql */`
        SELECT
            premise_name,
            premise_street,
            premise_house_number,
            premise_post_code,
            premise_city
        FROM prm_company_premise
        ORDER BY premise_id ASC
        LIMIT 1
    `

    pool.query(statement, (error, results) => {
        if (error) {
            response.status(500)

            return
        }

        const premise = results.rows[0]

        response.json({
            lang,
            premise: {
                name: premise.premise_name,
                address: `${premise.premise_street} ${premise.premise_house_number}, ${premise.premise_post_code} ${premise.premise_city}`
            }
        })
    })
}

const daoConfig = {
    getConfig
}

module.exports = daoConfig
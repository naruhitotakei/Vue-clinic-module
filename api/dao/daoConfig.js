require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const langByCountry = {
    'SI': 'sl'
}

const getConfig = (request, response, ip, premiseId) => {
    const geoip = require('geoip-lite')
    const geo = geoip.lookup(ip)
    const lang = geo != null && langByCountry[geo.country] != null
        ? langByCountry[geo.country]
        : 'en'
    const statement = /* sql */`
        SELECT
            premise_name as "name",
            premise_street as street,
            premise_house_number as house_number,
            premise_post_code as post_code,
            premise_city as city
        FROM prm_company_premise
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
                address: `${premise.street} ${premise.house_number}, ${premise.post_code} ${premise.city}`
            }
        })
    })
}

const daoConfig = {
    getConfig
}

module.exports = daoConfig
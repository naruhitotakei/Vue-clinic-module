require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getBusiness = (request, response, locale) =>  {
  pool.query("SELECT distinct  b.name, b.address_line_1, b.email, b.post_code, b.city, b.country_code, b.tax_number, b.vat_number, b.created_date FROM business_customer b JOIN invoice ON b.id = business_customer_id ", (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getBusiness
}
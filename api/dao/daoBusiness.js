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
  pool.query("SELECT  " +
      "b.id, b.name, b.address_line_1, b.email, b.post_code, b.city, b.country_code, b.post_code, b.tax_number, b.vat_number, b.created_date " +
      "FROM business_customer b ",
      (error, results) => {
    console.log(error)
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getBusinessByID = (request, response, id) =>  {
  pool.query('SELECT * FROM business_customer WHERE business_customer.id = $1', [id] ,(error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createBusiness = (req, res, business) => {
  var businessStatement = "INSERT INTO business_customer ("
  if (business.name) businessStatement += "name,"
  if (business.email) businessStatement += "email,"
  if (business.address) businessStatement += "address_line_1,"
  if (business.city) businessStatement += "city,"
  if (business.tax_number) businessStatement += "tax_number"
  businessStatement += ") VALUES ("
  if (business.name) businessStatement += "'" + business.name + "',"
  if (business.email) businessStatement += "'" + business.email + "',"
  if (business.address) businessStatement += "'" + business.address + "',"
  if (business.city) businessStatement += "'" + business.city + "',"
  if (business.tax_number) businessStatement += "'" + business.tax_number + "'"
  businessStatement += ")";

  pool.query(businessStatement , (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).json("OK")
  })
}

const updateBusiness = (req, res, id, business) => {
  var businessStatement = "UPDATE business_customer SET "
  if (business.name) businessStatement += "name='" + business.name + "',"
  if (business.email) businessStatement += "email='" + business.email + "',"
  if (business.address) businessStatement += "address_line_1='" + business.address + "',"
  if (business.city) businessStatement += "city='" + business.city + "',"
  if (business.zip_code) businessStatement += "post_code='" + business.zip_code + "',"
  if (business.tax_number) businessStatement += "tax_number='" + business.tax_number + "'"
  businessStatement +=" WHERE business_customer.id=" + id
  console.log(businessStatement)
  pool.query(businessStatement , (error, results) => {
    if (error) {
      throw error
    }
  })
  res.status(200).json(business)
}

const deleteBusiness = (request, response, id) => {
  pool.query('DELETE FROM business_customer WHERE business_customer.id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json("OK")
  })
}

module.exports = {
  getBusiness,
  getBusinessByID,
  createBusiness,
  updateBusiness,
  deleteBusiness
}
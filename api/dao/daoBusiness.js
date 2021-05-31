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
  pool.query("SELECT business_customer.*, countries.name as countries_name, countries.code, countries.id as countries_id " +
      "FROM business_customer" +
      " LEFT JOIN countries ON business_customer.country_id = countries.id", (error, results) => {
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
  if (business.zip_code) businessStatement += "post_code,"
  if (business.city) businessStatement += "city,"
  if (business.country_code) businessStatement += "country_id "
  businessStatement += ") VALUES ("
  if (business.name) businessStatement += "'" + business.name + "',"
  if (business.email) businessStatement += "'" + business.email + "',"
  if (business.address) businessStatement += "'" + business.address + "',"
  if (business.zip_code) businessStatement += "'" + business.zip_code + "',"
  if (business.city) businessStatement += "'" + business.city + "',"
  if (business.country_code) businessStatement += "'" + business.country_code.id  + "'"
  businessStatement += ")";
  console.log(businessStatement)
  pool.query(businessStatement , (error, results) => {
    console.log(error)
    if (error) {
      throw error
    }
    res.status(200).json("OK")
  })
}

const updateBusiness = (req, res, id, business) => {
  console.log(id)
  console.log(business)
  var businessStatement = "UPDATE business_customer SET "
  if (business.name) businessStatement += "name='" + business.name + "',"
  if (business.email) businessStatement += "email='" + business.email + "',"
  if (business.address) businessStatement += "address_line_1='" + business.address + "',"
  if (business.city) businessStatement += "city='" + business.city + "',"
  if (business.country_code) businessStatement += "country_id='" + business.country_code.id  + "',"
  if (business.zip_code) businessStatement += "post_code='" + business.zip_code + "'"
  businessStatement +=" WHERE business_customer.id=" + id
  pool.query(businessStatement , (error, results) => {
    console.log(error)
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
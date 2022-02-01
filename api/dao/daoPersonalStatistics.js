require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getDoctorsRevenue = (request, response, start, end, doctor, scope, prm_client_id, user_id, accessible_user_ids) => {
  let statement = "SELECT products.name AS product_name, concat(users.title, ' ', users.first_name, ' ', users.surname) AS doctor_name, " +
    "array_agg(products.id) AS products, users.id AS doctor_id, COUNT (users.id), SUM(services.price) FROM services "
  statement += "LEFT JOIN products ON services.product_id = products.id "
  statement += "LEFT JOIN enquiries ON services.enquiry_id = enquiries.id "
  statement += "LEFT JOIN client_users ON services.doctor_id = client_users.id "
  statement += "LEFT JOIN users ON client_users.user_id = users.id "
  statement += "WHERE date_trunc('day', services.date) >= $1 AND (date_trunc('day', services.date) - INTERVAL '1 DAY' ) <= $2 "
  statement += "AND users.id = $3 "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "AND enquiries.prm_client_id = " + prm_client_id;
  } else if (scope == 'Self&LinkedUsers') {
    statement += ' AND (users.id = ' + user_id
    if (accessible_user_ids) {
      for (const acc_id in accessible_user_ids) {
        statement += ' OR users.id = ' + accessible_user_ids[acc_id]
      }
    }
    statement += ') '
  }
  statement += "GROUP BY products.name, users.id"
  pool.query(statement, [start, end, doctor], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getDoctorsRevenue
}

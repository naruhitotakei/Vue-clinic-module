require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getAdvPayments = (request, response, user_id, accessible_user_ids, prm_client_id, scope) => {
    let statement = "SELECT DISTINCT ON (invoice_id) * FROM invoice "
    statement += "LEFT JOIN enquiries ON invoice.enquiries_id = enquiries.id "
    statement += "LEFT JOIN users ON enquiries.prm_dentist_user_id = users.id OR enquiries.prm_surgeon_user_id = users.id "
    statement += "LEFT JOIN prm_client ON users.prm_client_id = prm_client.id "
    statement += "WHERE invoice_type = 'Advance payment' "
    statement += "AND prm_client.client_deleted IS FALSE "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND enquiries.prm_client_id=" + prm_client_id;
    } else if (scope == 'Self') {
        statement += "AND (enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id + ")";
    } else if (scope === 'Self&LinkedUsers') {
        if (accessible_user_ids) {
            statement += "AND (enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id;
            for (const acc_id in accessible_user_ids) {
                statement += " OR enquiries.prm_dentist_user_id = " + accessible_user_ids[acc_id] + " OR enquiries.prm_surgeon_user_id = " + accessible_user_ids[acc_id] + ")"
            }
        }
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getAdvPayments
}
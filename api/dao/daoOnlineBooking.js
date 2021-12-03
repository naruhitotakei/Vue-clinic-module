require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getOnlineBookingProducts = (request, response, prm_client_id, scope, locale) => {
    let statement = "SELECT online_booking_service.id, default_duration, default_online_price, online_booking_service_name.text AS booking_service_text, " +
        "online_booking_service_name.language, concat(users.title, ' ', users.first_name, ' ', users.surname) AS doctor_name, " +
        "prm_company_premise.premise_name, prm_product_group_name.language, prm_product_group_name.text AS product_group_text FROM online_booking_service "
    statement += "LEFT JOIN online_booking_service_name ON online_booking_service.id = online_booking_service_name.online_booking_service_id "
    statement += "LEFT JOIN prm_product_group ON online_booking_service.product_group_id = prm_product_group.product_group_id "
    statement += "LEFT JOIN prm_product_group_name ON prm_product_group.product_group_id = prm_product_group_name.product_group_id "
    statement += "LEFT JOIN online_booking_users_bridge ON online_booking_service.id = online_booking_users_bridge.online_booking_id "
    statement += "LEFT JOIN users ON online_booking_users_bridge.doctor_id = users.id "
    statement += "LEFT JOIN online_booking_premise_bridge ON online_booking_service.id = online_booking_premise_bridge.id "
    statement += "LEFT JOIN prm_company_premise ON online_booking_premise_bridge.premise_id = prm_company_premise.premise_id "
    statement += "WHERE online_booking_service.trashed IS FALSE AND online_booking_service_name.language = '" + locale + "' "
    statement += "AND prm_product_group_name.language = '" + locale + "' "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += " AND users.prm_client_id = " + prm_client_id;
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getOnlineBookingProductsPublic = (request, response, locale) => {
    const statement = /* sql */`
        SELECT
            online_booking_service.id,
            online_booking_service.default_duration,
            online_booking_service.default_online_price,
            online_booking_service_name.text
        FROM online_booking_service
        JOIN online_booking_service_name
        ON online_booking_service.id = online_booking_service_name.online_booking_id
        WHERE online_booking_service.id IN (
            SELECT DISTINCT online_booking_users_bridge.online_booking_id
            FROM appointment_slots
            JOIN online_booking_users_bridge
            ON appointment_slots.doctor_id = online_booking_users_bridge.doctor_id
            WHERE appointment_slots.appointment_id IS null
            AND appointment_slots.starts_at BETWEEN NOW()::date AND NOW()::date + interval '30' day
        )
        AND online_booking_service_name.language = $1
        ORDER BY online_booking_service_name.text
    `

    pool.query(statement, [locale], (error, results) => {
        if (error) {
            response.status(500).send()

            return
        }

        response.status(200).json(results.rows)
    })
}

module.exports = {
    getOnlineBookingProducts,
    getOnlineBookingProductsPublic
}

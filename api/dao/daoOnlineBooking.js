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
        ON online_booking_service.id = online_booking_service_name.online_booking_service_id
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

const getOnlineBookingProductGroups = (request, response, prm_client_id, scope, locale) => {
    let statement = "SELECT prm_product_group.product_group_id AS id, prm_product_group_name.text AS text, "
    statement += "prm_product_group_name.language AS language, prm_product_group.prm_client_id AS prm_client_id FROM prm_product_group "
    statement += "LEFT JOIN prm_product_group_name ON prm_product_group_name.product_group_id = prm_product_group.product_group_id "
    statement += "WHERE language = '" + locale + "' "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client_id = " + prm_client_id;
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPremises = (request, response, prm_client_id, scope) => {
    let statement = "SELECT premise_id AS id, premise_name AS name, prm_client_id FROM prm_company_premise "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client_id = " + prm_client_id;
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createOnlineBookingProduct = (req, res, product) => {
    let productStatement = "INSERT INTO online_booking_service ("
    if (product.duration) productStatement += "default_duration,"
    if (product.price) productStatement += "default_price,"
    if (product.productGroup) productStatement += "product_group_id,"
    productStatement += "created_at"
    productStatement += ") VALUES ("
    if (product.duration) productStatement += "" + product.duration + ","
    if (product.price) productStatement += "" + product.price + ","
    if (product.productGroup) productStatement += "" + product.productGroup + ","
    productStatement += "NOW()"
    productStatement += ") RETURNING id"
    console.log("Creating online booking on BE: " + statement)
    pool.query(productStatement, (error, results) => {
        if (error) {
            throw error
        }
        let serviceId = results.rows[0].id;
        let doctorId = results.rows[0].doctor;
        let premiseId = results.rows[0].premise;

        if (product.slovenian) createOnlineBookingNameStatement('online_booking_service_name', 'online_booking_service_id', serviceId, 'sl', product.slovenian)
        if (product.english) createOnlineBookingNameStatement('online_booking_service_name', 'online_booking_service_id', serviceId, 'en', product.english)
        if (product.italian) createOnlineBookingNameStatement('online_booking_service_name', 'online_booking_service_id', serviceId, 'it', product.italian)

        if (product.doctor) createOnlineBookingUsersStatement('online_booking_users_bridge', 'online_booking_service_id', doctorId)

        if (product.premise) createOnlineBookingPremiseStatement('online_booking_premise_bridge', 'online_booking_service_id', premiseId)

        res.status(200).json("OK")
    })
}

const createOnlineBookingNameStatement = (table, idName, id, language, text) => {
    let statement = "INSERT INTO " + table + " (" + idName + ",language, text, created_at) VALUES (" + id + ",'" + language + "','" + text + "',NOW())"
    console.log("Creating online booking name on BE: " + statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
}

const createOnlineBookingUsersStatement = (table, idName, id, idDoctor, id_doctor) => {
    let statement = "INSERT INTO " + table + " (" + idName + "," + idDoctor + ",created_at) VALUES (" + id + "," + id_doctor + "',NOW())"
    console.log("Creating online booking doctor on BE: " + statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
}

const createOnlineBookingPremiseStatement = (table, idName, id, idPremise, id_premise) => {
    let statement = "INSERT INTO " + table + " (" + idName + "," + idPremise + ",created_at) VALUES (" + id + "," + id_premise + "',NOW())"
    console.log("Creating online booking premise on BE: " + statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
}


module.exports = {
    getOnlineBookingProducts,
    getOnlineBookingProductsPublic,
    getOnlineBookingProductGroups,
    getPremises,
    createOnlineBookingProduct,
    createOnlineBookingNameStatement,
    createOnlineBookingUsersStatement,
    createOnlineBookingPremiseStatement
}

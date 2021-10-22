require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getLocationsList = (request, response, prm_client_id, scope) => {
    let statement = "SELECT locations.* FROM locations "
    statement += "LEFT JOIN prm_client ON prm_client.id = locations.prm_client_id "
    statement += "WHERE active = true "
    statement += "AND prm_client.client_deleted = false "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client.id=" + prm_client_id
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getInactiveLocationsList = (request, response, prm_client_id, scope) => {
    let statement = "SELECT locations.id, locations.name AS i_name, locations.address AS i_address, city AS i_city FROM locations  "
    statement += "LEFT JOIN prm_client ON prm_client.id = locations.prm_client_id "
    statement += "WHERE active = false "
    statement += "AND prm_client.client_deleted = false "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client.id=" + prm_client_id
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createLocation = (req, res, location, prm_client_id) => {
    var statement = "INSERT INTO locations (name, city, address, active, created_at, prm_client_id) VALUES ('" + location.name + "', " + "'" + location.city + "', " + "'" + location.address + "', " + "true, NOW()," + prm_client_id + ");"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json("OK")
    })

}

const updateLocation = (req, res, id, location) => {
    let statement = "UPDATE locations SET " + "name='" + location.name + "', " + "city='" + location.city + "', " + "address='" + location.address + "',"
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
    res.status(200).json(location)
}

const toggleActivity = (req, res, id) => {
    pool.query("UPDATE locations SET active = NOT active, updated_at=now() WHERE id =$1", [id], (error, results) => {
    if (error) {
        throw error
        }
    })
    res.status(200).json("OK")
}

module.exports = {
    getLocationsList,
    getInactiveLocationsList,
    createLocation,
    updateLocation,
    toggleActivity
}
require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getLocationsList = (request, response) => {
    pool.query("SELECT l.name AS name, l.address AS address, l.city AS city FROM locations l JOIN clients ON l.client_id = clients.id WHERE blueprint = 'primadent' AND clients.name NOT LIKE '%vidim%' AND active = true", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getLocationsList
}
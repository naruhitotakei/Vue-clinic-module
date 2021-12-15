require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getEmazingServicesReport = (request, response, startdate, endate, countrie, prm_client_id, scope) => {
    if (!countrie || countrie.toLowerCase() == 'all' || countrie.toLowerCase() == 'null') {
        let statement = "SELECT pr.name AS service_title, pr.group, COUNT(pr.name), SUM(se.price), SUM(se.fee) AS fee_sum FROM services se "
        statement += "LEFT JOIN products pr ON se.product_id = pr.id "
        statement += "LEFT JOIN clients cl ON pr.client_id = cl.id "
        statement += "LEFT JOIN clients_prm_client_bridge cpcb ON cl.id = cpcb.clients_id "
        statement += "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 "
        if (scope == 'All') {
        } else if (scope == 'PrmClient') {
            statement += "AND cpcb.prm_client_id = " + prm_client_id
        }
        statement += "GROUP BY pr.group, pr.name "
        console.log("Fetching reporting on BE: " + statement)
        pool.query(statement, [startdate, endate], (error, results) => {
            if (error) {
                response.status(500).json({
                    message: error.message || 'Something went wrong.'
                })
            }
            response.status(200).json(results.rows)
        })
    } else {
        let statement = "SELECT pr.name as service_title, pr.group, COUNT(pr.name), SUM(se.price), SUM(se.fee) AS fee_sum FROM services se "
        statement += "LEFT JOIN products pr ON se.product_id = pr.id "
        statement += "LEFT JOIN enquiries en ON se.enquiry_id = en.id "
        statement += "LEFT JOIN countries co ON en.country_id = co.id "
        statement += "LEFT JOIN clients cl ON pr.client_id = cl.id "
        statement += "LEFT JOIN clients_prm_client_bridge cpcb ON cl.id = cpcb.clients_id "
        statement += "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 AND co.id = $4 "
        if (scope == 'All') {
        } else if (scope == 'PrmClient') {
        statement += "AND cpcb.prm_client_id= " + prm_client_id
        }
        statement += "GROUP BY pr.group, pr.name "
        console.log("Fetching reporting on BE: " + statement)
        pool.query(statement, [startdate, endate, countrie], (error, results) => {
            if (error) {
                response.status(500).json({
                    message: error.message || 'Something went wrong.'
                })
            }
            response.status(200).json(results.rows)
        })
    }
}

const getServiceList = (request, response, startdate, endate, countrie, prm_client_id, scope) => {
    if (!countrie || countrie.toLowerCase() == 'all' || countrie.toLowerCase() == 'null') {
        let statement = "SELECT se.date, pr.name as service_title, en.name, en.last_name, co.name AS country, re.name AS region, " +
            "mu.name AS municipality, se.price, se.fee, us.name as doctor, en.id AS enquiry_id FROM services se "
        statement += "LEFT JOIN products pr ON se.product_id = pr.id "
        statement += "LEFT JOIN enquiries en ON se.enquiry_id = en.id "
        statement += "LEFT JOIN countries co ON en.country_id = co.id "
        statement += "LEFT JOIN regions re ON en.region_id = re.id "
        statement += "LEFT JOIN municipalities mu ON en.municipality_id = mu.id "
        statement += "LEFT JOIN client_users cu ON se.doctor_id = cu.id "
        statement += "LEFT JOIN users us ON cu.user_id = us.id "
        statement += "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 "
        if (scope == 'All') {
        } else if (scope == 'PrmClient') {
            statement += " AND en.prm_client_id = " + prm_client_id
        }
        statement += "ORDER BY se.date ASC "
        console.log("Fetching reporting on BE: " + statement)
        pool.query(statement, [startdate, endate], (error, results) => {
            if (error) {
                response.status(500).json({
                    message: error.message || 'Something went wrong.'
                })
            }
            response.status(200).json(results.rows)
        })
    } else {
        let statement = "SELECT se.date, pr.name as service_title, en.name, en.last_name, co.name AS country, re.name AS region, " +
            "mu.name AS municipality, se.price, se.fee, us.name as doctor, en.id AS enquiry_id FROM services se "
        statement += "LEFT JOIN products pr ON se.product_id = pr.id "
        statement += "LEFT JOIN enquiries en ON se.enquiry_id = en.id ",
        statement += "LEFT JOIN countries co ON en.country_id = co.id ",
        statement += "LEFT JOIN regions re ON en.region_id = re.id ",
        statement += "LEFT JOIN municipalities mu ON en.municipality_id = mu.id ",
        statement += "LEFT JOIN client_users cu ON se.doctor_id = cu.id ",
        statement += "LEFT JOIN users us ON cu.user_id = us.id ",
        statement += "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 AND co.id = $3 "
        if (scope == 'All') {
        } else if (scope == 'PrmClient') {
            "AND en.prm_client_id = " + prm_client_id
        }
        statement += "ORDER BY se.date ASC "
        console.log("Fetching reporting on BE: " + statement)
        pool.query(statement, [startdate, endate, countrie], (error, results) => {
            if (error) {
                response.status(500).json({
                    message: error.message || 'Something went wrong.'
                })
            }
            response.status(200).json(results.rows)
        })
    }
}

const getCountryList = (request, response, startdate, endate) => {
    var statement = ["SELECT co.id, co.code, co.name FROM services se ",
        "LEFT JOIN products pr ON se.product_id = pr.id ",
        "LEFT JOIN enquiries en ON se.enquiry_id = en.id ",
        "LEFT JOIN countries co ON en.country_id = co.id ",
        "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2",
        "GROUP BY co.id "].join('\n')
    pool.query(statement, [startdate, endate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getClinicStatistics = async (request, response, prm_client_id, scope) => {
    let statsRecord = {
        today: [],
        weekly: [],
        monthly: [],
        yearly: [],
        sixtyWeeks: []
    }

    if (scope == 'All') {
        var todayStatement = ["SELECT date_trunc('day',date)::date as date, SUM(price) AS revenue FROM services where date = CURRENT_DATE GROUP BY ( date_trunc('day', date)) ORDER BY ( date_trunc('day', date)) ASC "].join('\n')
        var sixtyWeekStatement = ["SELECT date_trunc('week',date)::date as date, SUM(price) AS revenue FROM services where date > current_date - interval '60 weeks' GROUP BY ( date_trunc('week', date)) ORDER BY ( date_trunc('week', date)) ASC "].join('\n')
        var weeklyStatement = ["SELECT date_trunc('week',date)::date as date, SUM(price) AS revenue FROM services where date > current_date - interval '1 week' GROUP BY ( date_trunc('week', date)) ORDER BY ( date_trunc('week', date)) ASC "].join('\n')
        var monthlyStatement = ["SELECT date_trunc('month',date)::date as date, SUM(price) AS revenue FROM services where date > current_date - interval '1 month' GROUP BY ( date_trunc('month', date)) ORDER BY ( date_trunc('month', date)) ASC "].join('\n')
        var yearlyStatement = ["SELECT date_trunc('year',date)::date as date, SUM(price) AS revenue FROM services where date > current_date - interval '1 year' GROUP BY ( date_trunc('year', date)) ORDER BY ( date_trunc('year', date)) ASC "].join('\n')
    } else if (scope == 'PrmClient') {
        var todayStatement = ["SELECT date_trunc('day',date)::date as date, SUM(price) AS revenue FROM services LEFT JOIN enquiries ON services.enquiry_id = enquiries.id where date = CURRENT_DATE AND enquiries.prm_client_id = " + prm_client_id + " GROUP BY ( date_trunc('day', date)) ORDER BY ( date_trunc('day', date)) ASC "].join('\n')
        var sixtyWeekStatement = ["SELECT date_trunc('week',date)::date as date, SUM(price) AS revenue FROM services LEFT JOIN enquiries ON services.enquiry_id = enquiries.id where date > current_date - interval '60 weeks' AND enquiries.prm_client_id = " + prm_client_id + " GROUP BY ( date_trunc('week', date)) ORDER BY ( date_trunc('week', date)) ASC "].join('\n')
        var weeklyStatement = ["SELECT date_trunc('week',date)::date as date, SUM(price) AS revenue FROM services LEFT JOIN enquiries ON services.enquiry_id = enquiries.id where date > current_date - interval '1 week' AND enquiries.prm_client_id = " + prm_client_id + " GROUP BY ( date_trunc('week', date)) ORDER BY ( date_trunc('week', date)) ASC "].join('\n')
        var monthlyStatement = ["SELECT date_trunc('month',date)::date as date, SUM(price) AS revenue FROM services LEFT JOIN enquiries ON services.enquiry_id = enquiries.id where date > current_date - interval '1 month' AND enquiries.prm_client_id = " + prm_client_id + " GROUP BY ( date_trunc('month', date)) ORDER BY ( date_trunc('month', date)) ASC "].join('\n')
        var yearlyStatement = ["SELECT date_trunc('year',date)::date as date, SUM(price) AS revenue FROM services LEFT JOIN enquiries ON services.enquiry_id = enquiries.id where date > current_date - interval '1 year' AND enquiries.prm_client_id = " + prm_client_id + " GROUP BY ( date_trunc('year', date)) ORDER BY ( date_trunc('year', date)) ASC "].join('\n')
    }
    await Promise.all([pool.query(weeklyStatement), pool.query(monthlyStatement), pool.query(yearlyStatement), pool.query(sixtyWeekStatement), pool.query(todayStatement)]).then(result => {
        statsRecord.weekly = result[0].rows
        statsRecord.monthly = result[1].rows
        statsRecord.yearly = result[2].rows
        statsRecord.sixtyWeeks = result[3].rows
        statsRecord.today = result[4].rows

        response.status(200).json(statsRecord)
    }).catch((error) => {
        response.status(500).json({
            message: error.message || 'Something went wrong.'
        })
    })
}

module.exports = {
    getEmazingServicesReport,
    getServiceList,
    getCountryList,
    getClinicStatistics
}
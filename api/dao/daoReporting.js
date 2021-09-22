require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getEmazingServicesReport = (request, response, startdate, endate, countrie, prm_client_id, scope) =>  {
    if (scope!='PrmClient' || !prm_client_id) {
        response.status(401).json("NOK: user has wrong privileges " + scope)
    }
    if (!countrie || countrie.toLowerCase() == 'all' || countrie.toLowerCase() == 'null') {
        var statement = ["SELECT pr.name as service_title, se.fee AS fee, pr.group, COUNT(se.id), SUM(se.price) FROM services se ",
                     "LEFT JOIN products pr ON se.product_id = pr.id ",
                     "LEFT JOIN clients cl ON pr.client_id = cl.id ",
                     "LEFT JOIN prm_client pcl ON cl.id = pcl.id ",                    
                     "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 ",
                     "AND pcl.id=$3 ",
                     "GROUP BY pr.id, se.fee "].join('\n')
        pool.query(statement, [startdate, endate, prm_client_id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })                     
    } else {
        var statement = ["SELECT pr.name as service_title, se.fee AS fee, COUNT(se.id), SUM(se.price) FROM services se ",
                     "LEFT JOIN products pr ON se.product_id = pr.id ",
                     "LEFT JOIN enquiries en ON se.enquiry_id = en.id ",
                     "LEFT JOIN countries co ON en.country_id = co.id ",
                     "LEFT JOIN clients cl ON pr.client_id = cl.id ",
                     "LEFT JOIN prm_client pcl ON cl.id = pcl.id ",                     
                     "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 AND co.id = $4 ",
                     "AND pcl.id=$3 ",
                     "GROUP BY pr.id, se.fee "].join('\n')
        pool.query(statement, [startdate, endate, prm_client_id, countrie], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })                      
    }                       
}

const getServiceList = (request, response, startdate, endate, countrie) =>  {
    if (!countrie || countrie.toLowerCase() == 'all' || countrie.toLowerCase() == 'null') {
        var statement = ["SELECT se.date, pr.name as service_title, en.name, en.last_name, se.price, se.fee, us.name as doctor, co.name as country,  en.id AS enquiry_id " +
         "FROM services se ",
         "LEFT JOIN products pr ON se.product_id = pr.id ",
         "LEFT JOIN enquiries en ON se.enquiry_id = en.id ",
         "LEFT JOIN countries co ON en.country_id = co.id ",
         "LEFT JOIN client_users cu ON se.doctor_id = cu.id ",
         "LEFT JOIN users us ON cu.user_id = us.id ",
         "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 ",
         "ORDER BY se.date ASC "].join('\n')
        pool.query(statement, [startdate, endate], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })                      
    } else {
        var statement = ["SELECT se.date, pr.name as service_title, en.name, en.last_name, se.price, se.fee, us.name as doctor, co.name as country FROM services se ",
                     "LEFT JOIN products pr ON se.product_id = pr.id ",
                     "LEFT JOIN enquiries en ON se.enquiry_id = en.id ",
                     "LEFT JOIN countries co ON en.country_id = co.id ",
                     "LEFT JOIN client_users cu ON se.doctor_id = cu.id ",
                     "LEFT JOIN users us ON cu.user_id = us.id ",
                     "WHERE date_trunc('day', se.date) >= $1 AND (date_trunc('day', se.date) - INTERVAL '1 DAY' ) <= $2 AND co.id = $3 ",
                     "ORDER BY se.date ASC "].join('\n')
        pool.query(statement, [startdate, endate, countrie], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })                      
    }                      
}

const getCountryList = (request, response, startdate, endate) =>  {
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

module.exports = {
  getEmazingServicesReport,
  getServiceList,
  getCountryList
}
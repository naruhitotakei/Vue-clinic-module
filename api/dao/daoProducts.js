require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getProducts = (request, response) =>  {
    pool.query("SELECT p.product_id, p.product_name, p.product_price, p.product_group_id, p.product_type_id, ppg.product_group_name as group_name, ppt.product_type_name as type_name FROM prm_product p JOIN prm_product_group ppg ON p.product_group_id = ppg.product_group_id JOIN prm_product_type ppt ON p.product_type_id = ppt.product_type_id", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductCategories = (request, response) =>  {
    pool.query("SELECT category_id, category_name FROM prm_product_category", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductGroups = (request, response) =>  {
    pool.query("SELECT ppg.product_group_id, ppg.product_group_name, ppg.category_id, ppc.category_name as category_name FROM prm_product_group ppg JOIN prm_product_category ppc ON ppg.category_id = ppc.category_id", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductTypes = (request, response) =>  {
    pool.query("SELECT product_type_id, product_type_name FROM prm_product_type", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
  getProducts,
  getProductCategories,
  getProductGroups,
  getProductTypes
}
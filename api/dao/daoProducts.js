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

const createProduct = (req, res, products) => {
    var statement = "INSERT INTO prm_product ("
    if (products.product_name) statement += "product_name,"
    if (products.product_price) statement += "product_price,"
    if (products.product_group_id) statement += "product_group_id,"
    if (products.product_type_id) statement += "product_type_id,"
    statement += "created_date"
    statement += ") VALUES ("
    if (products.product_name) statement += "'" + products.product_name + "',"
    if (products.product_price) statement += "'" + products.product_price + "',"
    if (products.product_group_id) statement += "'" + products.product_group_id + "',"
    if (products.product_type_id) statement += products.product_type_id + ","
    statement += "NOW()" 
    statement +=")"
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json("OK")
    })    
}

const updateProduct = (req, res, id, product) => {
        var statement = "UPDATE prm_product SET "
        if (product.product_name) statement += "product_name='" + product.product_name + "',"
        if (product.product_price) statement += "product_price='" + product.product_price + "',"
        if (product.product_group_id) statement += "product_group_id='"+ product.product_group_id + "',"
        if (product.product_type_id) statement += "product_type_id='"+ product.product_type_id + "',"
        statement = statement.slice(0, -1)
        statement +=" WHERE product_id=" + id
        console.log(statement)
        pool.query(statement , (error, results) => {
            if (error) {
                throw error
            }
        }) 
        res.status(200).json(product)
}

const deleteProduct = (request, response, id) => {
    pool.query('DELETE FROM prm_product WHERE product_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json("OK")
    })
}

const createProductGroup = (req, res, productGroup) => {
    var statement = "INSERT INTO prm_product_group ("
    if (productGroup.product_group_name) statement += "product_group_name,"
    if (productGroup.category_id) statement += "category_id,"
    statement += "created_date"
    statement += ") VALUES ("
    if (productGroup.product_group_name) statement += "'" + productGroup.product_group_name + "',"
    if (productGroup.category_id) statement += "'" + productGroup.category_id + "',"
    statement += "NOW()" 
    statement +=")"
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json("OK")
    })    
}

const updateProductGroup = (req, res, id, productGroup) => {
    var statement = "UPDATE prm_product_group SET "
    if (productGroup.product_group_name) statement += "product_group_name='" + productGroup.product_group_name + "',"
    if (productGroup.category_id) statement += "product_price='" + productGroup.category_id + "',"
    statement = statement.slice(0, -1)
    statement +=" WHERE product_group_id=" + id
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
    }) 
    res.status(200).json(product)
}

const deleteProductGroup = (request, response, id) => {
    pool.query('DELETE FROM prm_product_group WHERE product_group_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json("OK")
    })
}

module.exports = {
  getProducts,
  getProductCategories,
  getProductGroups,
  getProductTypes,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductGroup,
  updateProductGroup,
  deleteProductGroup
}
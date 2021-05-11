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
    pool.query("SELECT p.product_id, p.product_name, p.product_price, p.tax_amount, p.product_group_id, p.product_type_id, ppg.product_group_name as group_name, ppt.product_type_name as type_name, pptr.english, pptr.italian, pptr.german FROM prm_product p JOIN prm_product_group ppg ON p.product_group_id = ppg.product_group_id JOIN prm_product_type ppt ON p.product_type_id = ppt.product_type_id JOIN prm_product_translation pptr ON p.product_id = pptr.product_id ORDER BY p.created_date DESC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductCategories = (request, response) =>  {
    pool.query("SELECT category_id, category_name FROM prm_product_category ORDER BY created_at DESC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductGroups = (request, response) =>  {
    pool.query("SELECT ppg.product_group_id, ppg.product_group_name, ppg.fee, ppg.category_id, ppc.category_name as category_name FROM prm_product_group ppg JOIN prm_product_category ppc ON ppg.category_id = ppc.category_id ORDER BY ppg.created_date DESC ", (error, results) => {
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
    var productStatement = "INSERT INTO prm_product ("
    if (products.product_name) productStatement += "product_name,"
    if (products.product_price) productStatement += "product_price,"
    if (products.product_group_id) productStatement += "product_group_id,"
    if (products.product_type_id) productStatement += "product_type_id,"
    if (products.tax_amount) productStatement += "tax_amount,"
    productStatement += "created_date"
    productStatement += ") VALUES ("
    if (products.product_name) productStatement += "'" + products.product_name + "',"
    if (products.product_price) productStatement += "'" + products.product_price + "',"
    if (products.product_group_id) productStatement += "'" + products.product_group_id + "',"
    if (products.product_type_id) productStatement += products.product_type_id + ","
    if (products.tax_amount) productStatement += products.tax_amount + ","
    productStatement += "NOW()" 
    productStatement +=") RETURNING product_id"
    console.log(productStatement)

    pool.query(productStatement , (error, results) => {
        if (error) {
            throw error
        } 
        var productId = results.rows[0].product_id;
        var translationStatement = "INSERT INTO prm_product_translation (product_id,"
        if (products.english) translationStatement += "english,"
        if (products.italian) translationStatement += "italian,"
        if (products.german) translationStatement += "german,"
        translationStatement += "created_date"
        translationStatement += ") VALUES (" + productId + "," 
        if (products.english) translationStatement += "'" + products.english + "',"
        if (products.italian) translationStatement += "'" + products.italian + "',"
        if (products.german) translationStatement += "'" + products.german + "',"
        translationStatement += "NOW())" 
        console.log(translationStatement)
        
        pool.query(translationStatement, (error, results) => {
            if (error) {
                throw error
            } 
        })
        res.status(200).json("OK")
    })    
}

const updateProduct = (req, res, id, product) => {
        var statement = "UPDATE prm_product SET "
        if (product.product_name) statement += "product_name='" + product.product_name + "',"
        if (product.product_price) statement += "product_price='" + product.product_price + "',"
        if (product.product_group_id) statement += "product_group_id='"+ product.product_group_id + "',"
        if (product.product_type_id) statement += "product_type_id='"+ product.product_type_id + "',"
        if (product.tax_amount) statement += "tax_amount='"+ product.tax_amount + "',"
        statement = statement.slice(0, -1)
        statement +=" WHERE product_id=" + id
        console.log(statement)
        pool.query(statement , (error, results) => {
            if (error) {
                throw error
            }
            var translationStatement = "UPDATE prm_product_translation SET "
            if (product.english) translationStatement += "english='" + product.english + "',"
            if (product.italian) translationStatement += "italian='" + product.italian + "',"
            if (product.german) translationStatement += "german='"+ product.german + "',"
            translationStatement = translationStatement.slice(0, -1)
            translationStatement +=" WHERE product_id=" + id
            pool.query(translationStatement, (error, results) => {
                if (error) {
                    throw error
                } 
            })
        }) 
        res.status(200).json(product)
}

const deleteProduct = (request, response, id) => {
    pool.query('DELETE FROM prm_product_translation WHERE product_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        pool.query('DELETE FROM prm_product WHERE product_id = $1', [id], (error, results) => {
            if (error) {
              throw error
            }
        })
        response.status(200).json("OK")
      })
}

const createProductGroup = (req, res, productGroup) => {
    var statement = "INSERT INTO prm_product_group ("
    if (productGroup.product_group_name) statement += "product_group_name,"
    if (productGroup.category_id) statement += "category_id,"
    if (productGroup.fee) statement += "fee,"
    statement += "created_date"
    statement += ") VALUES ("
    if (productGroup.product_group_name) statement += "'" + productGroup.product_group_name + "',"
    if (productGroup.category_id) statement += "'" + productGroup.category_id + "',"
    if (productGroup.fee) statement += "'" + productGroup.fee + "',"
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
    if (productGroup.category_id) statement += "category_id='" + productGroup.category_id + "',"
    if (productGroup.fee) statement += "fee='" + productGroup.fee + "',"
    statement = statement.slice(0, -1)
    statement +=" WHERE product_group_id=" + id
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
    }) 
    res.status(200).json(productGroup)
}

const deleteProductGroup = (request, response, id) => {
    pool.query('DELETE FROM prm_product_group WHERE product_group_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json("OK")
    })
}

const createProductCategory = (req, res, productCategory) => {
    var statement = "INSERT INTO prm_product_category ("
    if (productCategory.category_name) statement += "category_name,"
    statement += "category_deleted,"
    statement += "created_at"
    statement += ") VALUES ("
    if (productCategory.category_name) statement += "'" + productCategory.category_name + "',"
    statement += "false," 
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

const updateProductCategory = (req, res, id, productCategory) => {
    var statement = "UPDATE prm_product_category SET "
    if (productCategory.category_name) {
        statement += "category_name='" + productCategory.category_name + "', updated_at= NOW()"
    }
    statement +=" WHERE category_id=" + id
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
    }) 
    res.status(200).json(productCategory)
}

const deleteProductCategory = (request, response, id) => {
    pool.query('DELETE FROM prm_product_category WHERE category_id = $1', [id], (error, results) => {
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
  deleteProductGroup,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
}
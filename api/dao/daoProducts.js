require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getProducts = (request, response, locale) =>  {
    pool.query("SELECT p.product_id, p.product_price, p.vat_tax_rate as tax_rate, p.product_group_id, p.product_type_id, ppgn.text as group_name, ppt.product_type_name as type_name, ppn.text as product_name FROM prm_product p JOIN prm_product_group_name ppgn ON p.product_group_id = ppgn.product_group_id JOIN prm_product_type ppt ON p.product_type_id = ppt.product_type_id join prm_product_name ppn on p.product_id = ppn.product_id where ppn.language='" + locale + "' and ppgn.language='" + locale + "' ORDER BY p.created_date DESC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductCategories = (request, response, locale) =>  {
    pool.query("SELECT ppc.category_id, ppcn.text as category_name FROM prm_product_category ppc join prm_product_category_name ppcn on ppc.category_id = ppcn.category_id where ppcn.language='" + locale + "' ORDER BY created_at DESC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductGroups = (request, response, locale) =>  {
    pool.query("SELECT ppg.product_group_id, ppgn.text AS product_group_name, ppg.fee, ppg.category_id, ppcn.text AS category_name FROM prm_product_group ppg JOIN prm_product_group_name ppgn ON ppg.product_group_id = ppgn.product_group_id JOIN prm_product_category_name ppcn ON ppg.category_id = ppcn.category_id WHERE ppgn.language='" + locale + "' AND ppcn.language='" + locale + "' ORDER BY ppg.created_date DESC", (error, results) => {
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
    if (products.product_price) productStatement += "product_price,"
    if (products.product_group_id) productStatement += "product_group_id,"
    if (products.product_type_id) productStatement += "product_type_id,"
    productStatement += "vat_tax_rate,tax_amount,"
    productStatement += "created_date"
    productStatement += ") VALUES ("
    if (products.product_price) productStatement += "'" + products.product_price + "',"
    if (products.product_group_id) productStatement += "'" + products.product_group_id + "',"
    if (products.product_type_id) productStatement += "'" + products.product_type_id + "',"
    productStatement += "" + products.tax_rate + "," + calculateTaxAmount(products.product_price, products.tax_rate) + ","
    productStatement += "NOW()" 
    productStatement +=") RETURNING product_id"
    console.log(productStatement)

    pool.query(productStatement , (error, results) => {
        if (error) {
            throw error
        } 
        var productId = results.rows[0].product_id;
        
        if (products.slovenian) createNameStatement('prm_product_name', 'product_id', productId, 'sl', products.slovenian)
        if (products.english) createNameStatement('prm_product_name', 'product_id', productId, 'en', products.english)
        if (products.italian) createNameStatement('prm_product_name', 'product_id', productId, 'it', products.italian)
        if (products.german) createNameStatement('prm_product_name', 'product_id', productId, 'ge', products.german)
        
        res.status(200).json("OK")
    })    
}

createNameStatement = (table, idName, id, language, text) => {
    let statement = "INSERT INTO " + table + " (" + idName + ",language, text, created_date) VALUES (" + id + ",'" + language + "','" + text + "',NOW())"
    console.log(statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 
    })
}

updateNameStatement = (table, idName, id, language, text) => {
    let statement = "UPDATE " + table + " SET text='" + text + "' WHERE " + idName + "=" + id + "AND language ='" + language + "'"
    console.log(statement)
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        } 
    })
}

const updateProduct = (req, res, id, product) => {
        var statement = "UPDATE prm_product SET "
        if (product.product_price) statement += "product_price=" + product.product_price + ","
        if (product.product_group_id) statement += "product_group_id='"+ product.product_group_id + "',"
        if (product.product_type_id) statement += "product_type_id='"+ product.product_type_id + "',"
        statement += "vat_tax_rate="+ product.tax_rate + ",tax_amount=" + calculateTaxAmount(product.product_price, product.tax_rate) + ","
        statement = statement.slice(0, -1)
        statement +=" WHERE product_id=" + id
        console.log(statement)
        if (product.slovenian) updateNameStatement('prm_product_name', 'product_id', id, 'sl', product.slovenian)
        if (product.english) updateNameStatement('prm_product_name', 'product_id', id, 'en', product.english)
        if (product.italian) updateNameStatement('prm_product_name', 'product_id', id, 'it', product.italian)
        if (product.german) updateNameStatement('prm_product_name', 'product_id', id, 'ge', product.german)
        pool.query(statement , (error, results) => {
            if (error) {
                throw error
            }
        }) 
        res.status(200).json(product)
}

calculateTaxAmount = (price, taxRate) => {
    if (!taxRate){
        return null
    }else if (taxRate == 0) {
        return 0
    } else {
        return price * taxRate / 100
    }
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
    if (productGroup.category_id) statement += "category_id,"
    if (productGroup.fee) statement += "fee,"
    statement += "created_date"
    statement += ") VALUES ("
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

const getProductNaming = (request, response, id) => {
    pool.query('SELECT language, text FROM prm_product_name ppn WHERE  product_id = $1', [id], (error, results) => {
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
  getProductTypes,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductGroup,
  updateProductGroup,
  deleteProductGroup,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductNaming
}
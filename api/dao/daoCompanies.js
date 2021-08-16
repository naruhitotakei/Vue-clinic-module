require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getCompanies = (request, response) => {
    pool.query("SELECT * FROM prm_company WHERE company_deleted = false", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCompanyById = (request, response, id) => {
    pool.query("SELECT * FROM prm_company WHERE company_id = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCompany = (req, res, company) => {
    var companyStatement = "INSERT INTO prm_company("
    if (company.company_name) companyStatement += "company_name,"
    if (company.company_address_line_1) companyStatement += "company_address_line_1,"
    if (company.company_post_code) companyStatement += "company_post_code,"
    if (company.company_city) companyStatement += "company_city,"
    if (company.company_country_code) companyStatement += "company_country_code,"
    if (company.company_iban) companyStatement += "company_iban,"
    if (company.company_tax_registration_number) companyStatement += "company_tax_registration_number,"
    if (company.company_vat_number) companyStatement += "company_vat_number,"
    if (company.company_legal_registration_identifier) companyStatement += "company_legal_registration_identifier,"
    if (company.cert_file) companyStatement += "cert_file,"
    if (company.key_file) companyStatement += "key_file,"
    if (company.pass_phrase) companyStatement += "pass_phrase,"
    if (company.company_subject) companyStatement += "company_subject,"
    if (company.company_issuer) companyStatement += "company_issuer,"
    if (company.company_serial) companyStatement += "company_serial,"
    if (company.prm_client_id) companyStatement += "prm_client_id,"
    if (company.vat_payer) companyStatement += "vat_payer,"
    companyStatement += "created_date"
    companyStatement += ") VALUES ("
    if (company.company_name) companyStatement += "'" + company.company_name + "',"
    if (company.company_address_line_1) companyStatement += "'" + company.company_address_line_1 + "',"
    if (company.company_post_code) companyStatement += "'" + company.company_post_code + "',"
    if (company.company_city) companyStatement += "'" + company.company_city + "',"
    if (company.company_country_code) companyStatement += "'" + company.company_country_code + "',"
    if (company.company_iban) companyStatement += "'" + company.company_iban + "',"
    if (company.company_tax_registration_number) companyStatement += "'" + company.company_tax_registration_number + "',"
    if (company.company_vat_number) companyStatement += "'" + company.company_vat_number + "',"
    if (company.company_legal_registration_identifier) companyStatement += "'" + company.company_legal_registration_identifier + "',"
    if (company.cert_file) companyStatement += "'" + company.cert_file + "',"
    if (company.key_file) companyStatement += "'" + company.key_file + "',"
    if (company.pass_phrase) companyStatement += "'" + company.pass_phrase + "',"
    if (company.company_subject) companyStatement += "'" + company.company_subject + "',"
    if (company.company_issuer) companyStatement += "'" + company.company_issuer + "',"
    if (company.company_serial) companyStatement += "'" + company.company_serial + "',"
    if (company.prm_client_id) companyStatement += "'" + company.prm_client_id + "',"
    if (company.vat_payer) companyStatement += "'" + company.vat_payer + "',"
    companyStatement +="NOW())"

    pool.query(companyStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

const updateCompany = (req, res, id, company) => {
    var companyStatement = "UPDATE prm_company SET "
    if (company.company_name) companyStatement += "company_name='" + company.company_name + "',"
    if (company.company_address_line_1) companyStatement += "company_address_line_1='" + company.company_address_line_1 + "',"
    if (company.company_post_code) companyStatement += "company_post_code='" + company.company_post_code + "',"
    if (company.company_city) companyStatement += "company_city='" + company.company_city + "',"
    if (company.company_country_code) companyStatement += "company_country_code='" + company.company_country_code + "',"
    if (company.company_iban) companyStatement += "company_iban='" + company.company_iban + "',"
    if (company.company_tax_registration_number) companyStatement += "company_tax_registration_number='" + company.company_tax_registration_number + "',"
    if (company.company_vat_number) companyStatement += "company_vat_number='" + company.company_vat_number + "',"
    if (company.company_legal_registration_identifier) companyStatement += "company_legal_registration_identifier='" + company.company_legal_registration_identifier + "',"
    if (company.cert_file) companyStatement += "cert_file='" + company.cert_file + "',"
    if (company.key_file) companyStatement += "key_file='" + company.key_file + "',"
    if (company.pass_phrase) companyStatement += "pass_phrase='" + company.pass_phrase + "',"
    if (company.company_subject) companyStatement += "company_subject='" + company.company_subject + "',"
    if (company.company_issuer) companyStatement += "company_issuer='" + company.company_issuer + "',"
    if (company.company_serial) companyStatement += "company_serial='" + company.company_serial + "',"
    if (company.prm_client_id) companyStatement += "prm_client_id='" + company.prm_client_id + "',"
    if (company.vat_payer) companyStatement += "vat_payer='" + company.vat_payer + "',"
    companyStatement = companyStatement.slice(0, -1)
    companyStatement +=" WHERE company_id=" + id

    pool.query(companyStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

const deleteCompany = (req, res, id) => {
    var companyStatement = "UPDATE prm_company SET company_deleted = true WHERE company_id=" + id

    pool.query(companyStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

module.exports = {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}
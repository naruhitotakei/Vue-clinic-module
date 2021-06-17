require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getCompanyPremises = (request, response) => {
    pool.query("SELECT pcp.*, CONCAT_WS(' ', pcp.premise_street, pcp.premise_house_number) AS premise_address, pc.company_name FROM prm_company_premise pcp JOIN prm_company pc ON pcp.company_id = pc.company_id WHERE pcp.premise_deleted = false", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCompanyPremiseById = (request, response, id) => {
    pool.query("SELECT pcp.*, CONCAT_WS(' ', pcp.premise_street, pcp.premise_house_number) AS premise_address, pc.company_name FROM prm_company_premise pcp JOIN prm_company pc ON pcp.company_id = pc.company_id WHERE pcp.premise_deleted = false AND pcp.premise_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCompanyPremiseDeviceById = (request, response, id) => {
    pool.query("SELECT pcpd.device_id, pcpd.company_premise_id, pcpd.electronic_device_id, pcpd.device_name, pcp.premise_name, pc.company_name FROM prm_company_premise_device pcpd JOIN prm_company_premise pcp ON pcpd.company_premise_id = pcp.premise_id JOIN prm_company pc ON pcp.company_id = pc.company_id WHERE pcpd.device_deleted = false and pcpd.device_id=$1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCompanyPremiseDevices = (request, response) => {
    pool.query("SELECT pcpd.device_id, pcpd.company_premise_id, pcpd.device_name, pcp.premise_name, pc.company_name FROM prm_company_premise_device pcpd JOIN prm_company_premise pcp ON pcpd.company_premise_id = pcp.premise_id JOIN prm_company pc ON pcp.company_id = pc.company_id WHERE pcpd.device_deleted = false", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPremisesForCompany = (request, response,id) => {
    pool.query("SELECT pcp.premise_id, pcp.business_premise_id, pcp.premise_name, pcp.premise_street, pcp.premise_house_number, pcp.premise_city FROM prm_company_premise pcp WHERE pcp.company_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDevicesForCompanyPremise = (request, response,id) => {
    pool.query("SELECT device_id, device_name, electronic_device_id FROM prm_company_premise_device WHERE company_premise_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPremise = (req, res, premise) => {
    var premiseStatement = "INSERT INTO prm_company_premise("
    if (premise.premise_name) premiseStatement += "premise_name,"
    if (premise.premise_street) premiseStatement += "premise_street,"
    if (premise.premise_house_number) premiseStatement += "premise_house_number,"
    if (premise.premise_house_number_additional) premiseStatement += "premise_house_number_additional,"
    if (premise.premise_city) premiseStatement += "premise_city,"
    if (premise.premise_post_code) premiseStatement += "premise_post_code,"
    if (premise.premise_country_code) premiseStatement += "premise_country_code,"
    if (premise.premise_community) premiseStatement += "premise_community,"
    if (premise.premise_cadastral_number) premiseStatement += "premise_cadastral_number,"
    if (premise.building_number) premiseStatement += "building_number,"
    if (premise.building_section_number) premiseStatement += "building_section_number,"
    if (premise.special_notes) premiseStatement += "special_notes,"
    if (premise.company_id) premiseStatement += "company_id,"
    if (premise.business_premise_id) premiseStatement += "business_premise_id,"
    if (premise.validity_date) premiseStatement += "validity_date,"
    premiseStatement += "created_date"
    premiseStatement += ") VALUES ("
    if (premise.premise_name) premiseStatement += "'" + premise.premise_name + "',"
    if (premise.premise_street) premiseStatement += "'" + premise.premise_street + "',"
    if (premise.premise_house_number) premiseStatement += "'" + premise.premise_house_number + "',"
    if (premise.premise_house_number_additional) premiseStatement += "'" + premise.premise_house_number_additional + "',"
    if (premise.premise_city) premiseStatement += "'" + premise.premise_city + "',"
    if (premise.premise_post_code) premiseStatement += "'" + premise.premise_post_code + "',"
    if (premise.premise_country_code) premiseStatement += "'" + premise.premise_country_code + "',"
    if (premise.premise_community) premiseStatement += "'" + premise.premise_community + "',"
    if (premise.premise_cadastral_number) premiseStatement += "'" + premise.premise_cadastral_number + "',"
    if (premise.building_number) premiseStatement += "'" + premise.building_number + "',"
    if (premise.building_section_number) premiseStatement += "'" + premise.building_section_number + "',"
    if (premise.special_notes) premiseStatement += "'" + premise.special_notes + "',"
    if (premise.company_id) premiseStatement += "'" + premise.company_id + "',"
    if (premise.business_premise_id) premiseStatement += "'" + premise.business_premise_id + "',"
    if (premise.validity_date) premiseStatement += "'" + premise.validity_date + "',"
    premiseStatement +="NOW())"
    console.log(premiseStatement)

    pool.query(premiseStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

const checkBusinessIdUniquness = (request, response, data) => {
    statement = "SELECT EXISTS(SELECT 1 FROM prm_company_premise pcp WHERE pcp.business_premise_id ='" + data.business_premise_id + "') AS exists"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        console.log(statement)
        response.status(200).json(results.rows)
    })
}

const updatePremise = (req, res, id, premise) => {
    var premiseStatement = "UPDATE prm_company_premise SET "
    if (premise.premise_name) premiseStatement += "premise_name='" + premise.premise_name + "',"
    if (premise.premise_street) premiseStatement += "premise_street='" + premise.premise_street + "',"
    if (premise.premise_house_number) premiseStatement += "premise_house_number='" + premise.premise_house_number + "',"
    if (premise.premise_house_number_additional) premiseStatement += "premise_house_number_additional='" + premise.premise_house_number_additional + "',"
    if (premise.premise_city) premiseStatement += "premise_city='" + premise.premise_city + "',"
    if (premise.premise_post_code) premiseStatement += "premise_post_code='" + premise.premise_post_code + "',"
    if (premise.premise_country_code) premiseStatement += "premise_country_code='" + premise.premise_country_code + "',"
    if (premise.premise_community) premiseStatement += "premise_community='" + premise.premise_community + "',"
    if (premise.premise_cadastral_number) premiseStatement += "premise_cadastral_number='" + premise.premise_cadastral_number + "',"
    if (premise.building_number) premiseStatement += "building_number='" + premise.building_number + "',"
    if (premise.building_section_number) premiseStatement += "building_section_number='" + premise.building_section_number + "',"
    if (premise.special_notes) premiseStatement += "special_notes='" + premise.special_notes + "',"
    if (premise.company_id) premiseStatement += "company_id='" + premise.company_id + "',"
    if (premise.validity_date) premiseStatement += "validity_date='" + premise.validity_date + "',"
    premiseStatement = premiseStatement.slice(0, -1)
    premiseStatement +=" WHERE premise_id=" + id
    console.log(premiseStatement)

    pool.query(premiseStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json(premise)
    })    
}

const deletePremise = (req, res, id) => {
    var premiseStatement = "UPDATE prm_company_premise SET premise_deleted = true WHERE premise_id=" + id
    console.log(premiseStatement)

    pool.query(premiseStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

const createPremiseDevice = (req, res, premiseDevice) => {
    var premiseDeviceStatement = "INSERT INTO prm_company_premise_device("
    if (premiseDevice.device_name) premiseDeviceStatement += "device_name,"
    if (premiseDevice.company_premise_id) premiseDeviceStatement += "company_premise_id,"
    if (premiseDevice.electronic_device_id) premiseDeviceStatement += "electronic_device_id,"
    premiseDeviceStatement += "created_date"
    premiseDeviceStatement += ") VALUES ("
    if (premiseDevice.device_name) premiseDeviceStatement += "'" + premiseDevice.device_name + "',"
    if (premiseDevice.company_premise_id) premiseDeviceStatement += "'" + premiseDevice.company_premise_id + "',"
    premiseDeviceStatement +="NOW())"
    console.log(premiseDeviceStatement)

    pool.query(premiseDeviceStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

const updatePremiseDevice = (req, res, id, premiseDevice) => {
    var premiseDeviceStatement = "UPDATE prm_company_premise_device SET "
    if (premiseDevice.device_name) premiseDeviceStatement += "device_name='" + premiseDevice.device_name + "',"
    if (premiseDevice.company_premise_id) premiseDeviceStatement += "company_premise_id='" + premiseDevice.company_premise_id + "',"
    premiseDeviceStatement = premiseDeviceStatement.slice(0, -1)
    premiseDeviceStatement +=" WHERE device_id='" + id + "'"
    console.log(premiseDeviceStatement)

    pool.query(premiseDeviceStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json(premiseDevice)
    })    
}

const deletePremiseDevice = (req, res, id) => {
    var premiseStatement = "UPDATE prm_company_premise_device SET device_deleted = true, deleted_at = NOW() WHERE premise_id=" + id
    console.log(premiseStatement)

    pool.query(premiseStatement , (error, results) => {
        if (error) {
            throw error
        } 
        res.status(200).json("OK")
    })    
}

const checkElectronicDeviceIdUniquness = (request, response, data) => {
    statement = "SELECT EXISTS(SELECT 1 FROM prm_company_premise_device pcpd WHERE pcpd.electronic_device_id ='" + data.electronic_device_id + "') AS exists"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        console.log(statement)
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCompanyPremises,
    getPremisesForCompany,
    getDevicesForCompanyPremise,
    getCompanyPremiseDevices,
    createPremise,
    updatePremise,
    deletePremise,
    getCompanyPremiseById,
    createPremiseDevice,
    updatePremiseDevice,
    deletePremiseDevice,
    getCompanyPremiseDeviceById,
    checkBusinessIdUniquness,
    checkElectronicDeviceIdUniquness
}
require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getSmsTemplates = (request, response, prm_client_id, scope) => {
    let statement = "SELECT sms_templates.* FROM sms_templates "
    statement += "LEFT JOIN clients ON sms_templates.client_id = clients.id "
    statement += "LEFT JOIN clients_prm_client_bridge cpcb ON clients.id = cpcb.clients_id "
    statement += "WHERE render = true "
    if (scope == 'All') {
    } else if (scope == 'PrmClient') {
      statement += "AND cpcb.prm_client_id = " + prm_client_id + " "
    }

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSmsTemplate = (request, response, templateID) => {
    let statement = "SELECT * FROM sms_templates "
    statement += "WHERE render=true "
    statement += "AND id='"+ templateID +"'"

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateSmsTemplate = (request, response, templateID, templateName, templateContent, templateSlug) => {
    let statement = 'UPDATE sms_templates '
    statement += "SET name='" + templateName + "', "
    statement += "content='" + templateContent + "', "
    statement += "slug='" + templateSlug + "' "
    statement += 'WHERE id=' + templateID

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ success: true })
    })
}

module.exports = {
    getSmsTemplates,
    getSmsTemplate,
    updateSmsTemplate
}

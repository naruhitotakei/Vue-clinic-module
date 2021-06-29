require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})
var moment = require('moment');  

const getEnquiries = (request, response, user_id, accessible_user_ids, prm_client_id, scope, sortBy) => {
    var statement = "SELECT enquiries.* , concat(u.title, ' ', u.first_name , ' ', u.surname) AS label FROM enquiries "
    statement +=    "JOIN clients ON enquiries.client_id = clients.id "
    statement +=    "LEFT JOIN prm_client ON prm_client.id = clients.id  "
    statement +=    "LEFT JOIN users u ON u.id = enquiries.prm_dentist_user_id  "
    statement +=    "WHERE enquiries.trashed IS FALSE ";
    statement +=    "AND clients.trashed IS FALSE ";
    statement +=    "AND prm_client.client_deleted IS FALSE ";
    if (scope=='All') {        
    } else if (scope=='PrmClient') {
        statement += "AND prm_client.id=" + prm_client_id;  
    } else if (scope=='Self') {
        statement += "AND enquiries.user_id=" + user_id; 
    } else if (scope==='Self&LinkedUsers') {
        statement += " AND (enquiries.user_id=" + user_id;
        if (accessible_user_ids) {           
            for (const acc_id in accessible_user_ids) {
                statement +=" OR enquiries.user_id=" + accessible_user_ids[acc_id];
            } 
        }
        statement += ") ";    
    }
    statement += "ORDER BY last_name ASC"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiriesById = (request, response, id) => {
    //AND clients.slug = 'primadent_si'
    pool.query("SELECT enquiries.*, c.name as country " +
        "FROM enquiries " +
        "LEFT JOIN clients ON enquiries.client_id = clients.id " +
        "LEFT JOIN countries c ON enquiries.country_id = c.id " +
        "WHERE enquiries.trashed IS FALSE AND enquiries.id = $1", [id] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEnquiry = (req, res, enquiry) => {
    var statement = "INSERT INTO enquiries ("
    if (enquiry.name) statement += "name,"
    if (enquiry.phone) statement += "phone,"
    if (enquiry.email) statement += "email,"
    if (enquiry.client_id) statement += "client_id,"
    if (enquiry.country_id) statement += "country_id,"
    if (enquiry.region_id) statement += "region_id,"
    if (enquiry.prm_dentist_user_id) statement += "prm_dentist_user_id,"
    if (enquiry.gender) statement += "gender,"
    if (enquiry.last_name) statement += "last_name,"
    statement += "lead_owner_id,"
    statement += "created_at,"
    statement += "updated_at,"
    statement += "trashed,email_sent"
    statement += ") VALUES ("
    if (enquiry.name) statement += "'" + enquiry.name + "',"
    if (enquiry.phone) statement += "'" + enquiry.phone + "',"
    if (enquiry.email) statement += "'" + enquiry.email + "',"
    if (enquiry.client_id) statement += enquiry.client_id + ","
    if (enquiry.country_id) statement += enquiry.country_id + ","
    if (enquiry.region_id) statement += enquiry.region_id + ","
    if (enquiry.prm_dentist_user_id) statement += enquiry.prm_dentist_user_id + ","
    if (enquiry.gender) statement += "'" + enquiry.gender + "',"
    if (enquiry.last_name) statement += "'" + enquiry.last_name + "',"
    if (enquiry.lead_owner_id) { statement += enquiry.lead_owner_id + ","} else {statement += "0,"}
    statement += "NOW(),NOW()," 
    statement += "false,false"    
    statement +=")"
    console.log(statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json("OK")
    })    
}

const updateEnquiry = (req, res, id, enquiry) => {
    pool.query("SELECT * FROM enquiries WHERE enquiries.id = $1", [id] , (error, results) => {
        var currentEnquiry = results.rows[0];
        time = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
        var initialUpdateStatement = "UPDATE enquiries SET "

        var statement = initialUpdateStatement
        if (enquiry.name !== currentEnquiry.name) statement += "name='" + enquiry.name + "',"
        if (enquiry.last_name !== currentEnquiry.last_name) statement += "last_name='" + enquiry.last_name + "',"
        if (enquiry.date_of_birth !== moment(currentEnquiry.date_of_birth).format('YYYY-MM-DD')) statement += "date_of_birth='" + enquiry.date_of_birth + "',"
        if (enquiry.gender !== currentEnquiry.gender) statement += "gender='"+ enquiry.gender + "',"
        if (enquiry.address_line_1 !== currentEnquiry.address_line_1) statement += "address_line_1='" + enquiry.address_line_1 + "',"
        if (enquiry.post_code !== currentEnquiry.post_code) statement += "post_code='" + enquiry.post_code + "',"
        if (enquiry.city !== currentEnquiry.city) statement += "city='" + enquiry.city + "',"
        if (enquiry.country_id !== currentEnquiry.country_id) statement += "country_id='" + enquiry.country_id + "',"
        if (enquiry.region_id !== currentEnquiry.region_id) statement += "region_id='" + enquiry.region_id + "', "
        if (enquiry.phone !== currentEnquiry.phone) statement += "phone='" + enquiry.phone + "', "
        if (enquiry.email !== currentEnquiry.email) statement += "email='" + enquiry.email + "',"
        if (enquiry.prm_dentist_user_id !== currentEnquiry.prm_dentist_user_id) statement += "prm_dentist_user_id='" + enquiry.prm_dentist_user_id + "',"
        if (enquiry.tax_registration_number !== currentEnquiry.tax_registration_number) statement += "tax_registration_number='" + enquiry.tax_registration_number + "',"
        if (enquiry.insurance_no !== currentEnquiry.insurance_no) statement += "insurance_no='" + enquiry.insurance_no + "',"
        if (enquiry.insured_at !== currentEnquiry.insured_at) statement += "insured_at='" + enquiry.insured_at + "',"
        if (enquiry.general_notes !== currentEnquiry.general_notes) {
            statement += "general_notes='" + enquiry.general_notes + "',"
            statement += "general_notes_updated_at='" + time + "',"
            enquiry.general_notes_updated_at = time
        }
        if (enquiry.allergies !== currentEnquiry.allergies) {
            statement += "allergies='" + enquiry.allergies + "',"
            statement += "allergies_updated_at='" + time + "',"
            enquiry.allergies_updated_at = time
        } 
        if (enquiry.prm_surgeon_user_id !== currentEnquiry.prm_surgeon_user_id) statement += "prm_surgeon_user_id='" + enquiry.prm_surgeon_user_id + "',"
        if (statement.length > initialUpdateStatement.length) {
            statement += "updated_at='" + time + "',"
            enquiry.updated_at = time
        }

        if (statement.length !== initialUpdateStatement.length) {
            statement = statement.slice(0, -1)
            statement +=" WHERE id=" + id
            pool.query(statement , (error, results) => {
                console.log(error)
                if (error) {
                    throw error
                }
            }) 
        }
        res.status(200).json(enquiry)
    });
}

const trashEnquiry = (request, response, id) => {
  pool.query('UPDATE enquiries SET trashed = true WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json("OK")
  })
}

const getEnquiryNotes = (request, response, enquiryId) => {
    pool.query("SELECT content, created_at, user_id FROM notes WHERE enquiry_id = $1 ORDER BY created_at", [enquiryId] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEnquiryNotes = (request, response, notes) => {
    var statement = "INSERT INTO notes ("
    if (notes.content) statement += "content,"
    if (notes.enquiry_id) statement += "enquiry_id,"
    if (notes.user_id) statement += "user_id,"
    statement += "created_at"
    statement += ") VALUES ("
    if (notes.content) statement += "'" + notes.content + "',"
    if (notes.enquiry_id) statement += "'" + notes.enquiry_id + "',"
    if (notes.user_id) statement += "'" + notes.user_id + "',"
    statement +="NOW()"
    statement +=")"
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json("OK")
    })
}

const getEnquiryAppointments = (request, response, enquiryId) => {
    pool.query("SELECT appointments.*, enquiries.*  FROM appointments LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id  WHERE enquiry_id = $1 ORDER BY date ASC", [enquiryId] , (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiryAssignments = (request, response, enquiryId) => {
    let statement = ["SELECT enquiries.id AS id, todos.description AS description, todos.due_at AS due_at, concat(title, ' ', first_name, ' ', surname) AS name FROM todos ",
                     "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                     "LEFT JOIN users ON todos.user_id = users.id",
                     "WHERE completed = FALSE and enquiries.id = $1",
                     "ORDER BY due_at ASC"].join('\n')
    pool.query(statement, [enquiryId], (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiryInvoices = (request, response, enquiryId) => {
    pool.query("SELECT * FROM invoice WHERE invoice_type != 'Offer' AND enquiries_id = $1", [enquiryId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiryOffers = (request, response, enquiryId) => {
    pool.query("SELECT * FROM invoice WHERE invoice_type = 'Offer' AND enquiries_id = $1", [enquiryId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiryServices = (request, response, enquiryId) => {
    pool.query("SELECT *, services.created_at AS done_at FROM services JOIN products ON services.product_id = products.id WHERE enquiry_id = $1 ORDER BY done_at DESC", [enquiryId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPatients = (request, response) => {
    pool.query("SELECT enquiries.*, CONCAT_WS(' ', enquiries.name, enquiries.last_name) AS full_name FROM enquiries JOIN clients ON enquiries.client_id = clients.id WHERE enquiries.trashed IS FALSE AND clients.slug = 'primadent_si'", (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getEnquiries,
  getEnquiriesById,
  createEnquiry,
  updateEnquiry,
  trashEnquiry,
  getEnquiryNotes,
  getEnquiryAppointments,
  getEnquiryAssignments,
  getEnquiryInvoices,
  getEnquiryOffers,
  getEnquiryServices,
  getPatients,
  createEnquiryNotes
}
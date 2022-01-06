var moment = require('moment');
const { pool, now } = require('~/services/db')

const getEnquiries = (request, response, user_id, accessible_user_ids, prm_client_id, scope, sortBy) => {
    let statement = "SELECT  enquiries.* , concat(u.title, ' ', u.first_name , ' ', u.surname) AS label, TO_CHAR(last_visit, 'DD.MM.YYYY') last_visit, TO_CHAR(next_visit, 'DD.MM.YYYY') next_visit, " +
      "r.name AS region_name, countries.code AS country_code, countries.name AS country_name FROM enquiries "
    statement +=    "LEFT JOIN prm_client ON prm_client.id = enquiries.prm_client_id   "
    statement +=    "LEFT JOIN users u ON u.id = enquiries.prm_dentist_user_id  "
    statement +=    "LEFT JOIN countries ON countries.id = enquiries.country_id  "
    statement +=    "LEFT JOIN regions r ON enquiries.region_id = r.id  "
    statement +=    "LEFT JOIN LATERAL (SELECT MAX(starts_at) AS last_visit, enquiry_id from appointments where starts_at < current_date AND enquiry_id = enquiries.id GROUP BY enquiry_id) past_d ON past_d.enquiry_id = enquiries.id  "
    statement +=    "LEFT JOIN LATERAL (SELECT MIN(starts_at) AS next_visit, enquiry_id from appointments where starts_at > current_date AND enquiry_id = enquiries.id GROUP BY enquiry_id) future_d ON future_d.enquiry_id = enquiries.id  "
    statement +=    "WHERE enquiries.trashed IS FALSE "
    statement +=    "AND prm_client.client_deleted IS FALSE "
    if (scope=='All') {
    } else if (scope=='PrmClient') {
        statement += "AND enquiries.prm_client_id=" + prm_client_id;
    } else if (scope=='Self') {
        statement += "AND enquiries.prm_dentist_user_id=" + user_id;
    } else if (scope==='Self&LinkedUsers') {
        statement += " AND (enquiries.prm_dentist_user_id=" + user_id;
        if (accessible_user_ids) {
            for (const acc_id in accessible_user_ids) {
                statement +=" OR enquiries.prm_dentist_user_id=" + accessible_user_ids[acc_id];
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

const createEnquiry = (req, res, enquiry, prm_client_id) => {
    var statement = "INSERT INTO enquiries ("
    if (enquiry.firstName) statement += "name,"
    if (enquiry.phone) statement += "phone,"
    if (enquiry.email) statement += "email,"
    if (enquiry.country) statement += "country_id, client_id,"
    if (enquiry.region_id) statement += "region_id,"
    if (enquiry.prm_dentist_user_id) statement += "prm_dentist_user_id,"
    if (enquiry.gender) statement += "gender,"
    if (enquiry.lastName) statement += "last_name,"
    statement += "lead_owner_id,"
    statement += "created_at,"
    statement += "updated_at,"
    statement += "trashed,email_sent"
    statement += ",prm_client_id"
    statement += ") VALUES ("
    if (enquiry.firstName) statement += "'" + enquiry.firstName + "',"
    if (enquiry.phone) statement += "'" + enquiry.phone + "',"
    if (enquiry.email) statement += "'" + enquiry.email + "',"
    if (enquiry.country && enquiry.country === 2) {
        statement += enquiry.country + ", 23,"
    } else {
        statement += enquiry.country + ", 10,"
    }
    if (enquiry.region_id) statement += enquiry.region_id + ","
    if (enquiry.prm_dentist_user_id) statement += enquiry.prm_dentist_user_id + ","
    if (enquiry.gender) statement += "'" + enquiry.gender + "',"
    if (enquiry.lastName) statement += "'" + enquiry.lastName + "',"
    if (enquiry.lead_owner_id) { statement += enquiry.lead_owner_id + ","} else {statement += "0,"}
    statement += "NOW(),NOW(),"
    statement += "false,false,"
    statement += prm_client_id
    statement += ") RETURNING *"
    console.log("Adding new patient on BE: " + statement)
    pool.query(statement , (error, results) => {
        const patient = results.rows[0];
        if (error) {
            throw error
        }
        res.status(200).json({ status: "OK", patient })
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
        if (enquiry.date_of_birth && enquiry.date_of_birth !== moment(currentEnquiry.date_of_birth).format('YYYY-MM-DD')) statement += "date_of_birth='" + enquiry.date_of_birth + "',"
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
            statement += " WHERE id=" + id
            pool.query(statement , (error, results) => {
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
    let statement = "SELECT content, notes.created_at, user_id, concat(users.title, ' ', users.first_name , ' ', users.surname) AS user_name FROM notes "
    statement += "LEFT JOIN users ON notes.user_id = users.id "
    statement += "WHERE enquiry_id = $1 "
    statement += "ORDER BY created_at "
    pool.query(statement, [enquiryId] , (error, results) => {
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
    statement += ")"
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json("OK")
    })
}

const getEnquiryPastAppointments = (request, response, enquiryId, locale) => {
    pool.query("SELECT appointments.*, enquiries.*, prm_product_group_name.*, appointments_label.*, " +
      "appointments.id AS appointment_id, prm_product_group_name.text AS product_group_text FROM appointments " +
      "LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id  " +
      "LEFT JOIN prm_product_group ON appointments.product_group_id = prm_product_group.product_group_id  " +
      "LEFT JOIN prm_product_group_name ON prm_product_group_name.product_group_id = prm_product_group.product_group_id  " +
      "LEFT JOIN appointments_label ON appointments.label_id = appointments_label.id  " +
        "WHERE enquiry_id = $1 AND prm_product_group_name.language = '" + locale + "' AND starts_at < now()::date ORDER BY starts_at DESC" , [enquiryId] , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiryFutureAppointments = (request, response, enquiryId, locale) => {
    pool.query("SELECT appointments.*, enquiries.*, prm_product_group_name.*, appointments_label.*, " +
        "appointments.id AS appointment_id, prm_product_group_name.text AS product_group_text FROM appointments " +
        "LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id  " +
        "LEFT JOIN prm_product_group ON appointments.product_group_id = prm_product_group.product_group_id  " +
        "LEFT JOIN prm_product_group_name ON prm_product_group_name.product_group_id = prm_product_group.product_group_id  " +
        "LEFT JOIN appointments_label ON appointments.label_id = appointments_label.id  " +
        "WHERE enquiry_id = $1 AND prm_product_group_name.language = '" + locale + "' AND starts_at >= now()::date ORDER BY starts_at ASC", [enquiryId], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getEnquiryAssignments = (request, response, enquiryId) => {
    let statement = ["SELECT todos.id AS id, todos.description AS description, todos.completed AS completed, todos.due_at AS due_at, concat(title, ' ', first_name, ' ', surname) AS name FROM todos ",
                     "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                     "LEFT JOIN users ON todos.user_id = users.id",
                     "WHERE enquiries.id = $1",
                     "ORDER BY due_at ASC"].join('\n')
    pool.query(statement, [enquiryId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEnquiryInvoices = (request, response, enquiryId, sortBy) => {
    let statement = `SELECT * FROM invoice WHERE enquiries_id = ${enquiryId} ORDER BY invoice_type ${sortBy}`
    pool.query(statement, (error, results) => {
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
    pool.query("SELECT *, products.name as product_name, services.created_at AS done_at, u.name as doctor FROM services LEFT JOIN products ON services.product_id = products.id LEFT JOIN client_users cu ON services.doctor_id = cu.id LEFT JOIN users u ON cu.user_id = u.id WHERE enquiry_id = $1 ORDER BY done_at DESC", [enquiryId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEnquiryService = (req, res, enquiryId, service) => {
    var statement = "INSERT INTO services (title, product_id, price, date, created_at, payment_method, doctor_id, enquiry_id, fee) VALUES ('"
    + service.title + "', " + service.product_id + ", " + service.price + ", '" + service.created_at + "', NOW(), '" + service.payment_method + "', " + service.doctor_id + ", " + enquiryId + ", " + service.fee + ")"
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json("OK")
    })

}

const getPatients = (request, response, scope, prm_client_id, user_id, accessible_user_ids) => {
  let statement = "SELECT DISTINCT ON (enquiries.id) enquiries.*, CONCAT_WS(' ', enquiries.name, enquiries.last_name) AS full_name FROM enquiries "
  statement += "WHERE enquiries.trashed = FALSE "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "AND enquiries.prm_client_id = " + prm_client_id
  } else if (scope == 'Self') {
    statement += "AND (enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id + ")"
  } else if (scope == 'Self&LinkedUsers') {
    statement += "AND (enquiries.prm_dentist_user_id = " + user_id + " OR enquiries.prm_surgeon_user_id = " + user_id
    if (accessible_user_ids) {
      for (const acc_id in accessible_user_ids) {
        statement += " OR enquiries.prm_dentist_user_id = " + accessible_user_ids[acc_id] + " OR enquiries.prm_surgeon_user_id = " + accessible_user_ids[acc_id]
      }
    }
    statement += ") "
  }

  pool.query(statement, (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getEnquirySMS = (request, response, enquiryId) => {
    let statement = `SELECT DISTINCT ON (sms_messages.id) * FROM sms_messages
    LEFT JOIN sms_templates ON sms_templates.slug = sms_messages.kind WHERE enquiry_id = ${enquiryId}`
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

async function getEnquiryByPhone(phoneNumber) {
  const statement = /* sql */ `
    SELECT * from enquiries
    WHERE phone = $1
  `;
  const { rows } = await pool.query(statement, [phoneNumber]);

  return rows[0];
}

async function createEnquiryPublic({ firstName, lastName, phone }) {
  const model = {
    name: '$1',
    last_name: '$2',
    phone: '$3',
    created_at: now(),
    updated_at: now(),
  };
  const statement = /* sql */ `
    INSERT INTO enquiries(${Object.keys(model).join(',')})
    VALUES (${Object.values(model).join(',')})
    RETURNING *
  `;
  const result = await pool.query(statement, [firstName, lastName, phone]);

  return result.rows[0];
}

module.exports = {
  getEnquiries,
  getEnquiriesById,
  createEnquiry,
  updateEnquiry,
  trashEnquiry,
  getEnquiryNotes,
  getEnquiryPastAppointments,
  getEnquiryFutureAppointments,
  getEnquiryAssignments,
  getEnquiryInvoices,
  getEnquiryOffers,
  getEnquiryServices,
  createEnquiryService,
  getPatients,
  createEnquiryNotes,
  getEnquirySMS,
  getEnquiryByPhone,
  createEnquiryPublic,
}

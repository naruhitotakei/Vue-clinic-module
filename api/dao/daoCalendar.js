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

const getApontments = (request, response, from, to, user_id, accessible_user_ids, selctedIds, prm_client_id, scope, lang ) => {
    var statement = "SELECT app.id, app.starts_at, app.ends_at, app.created_at, app.note, app.product_group_id, app.enquiry_id as app_enquiry_id, app.kind, app.patient_attended, app.appointment_canceled, app.doctor_id, app.cancelation_reason, app.all_day AS allDay, " +
        "app.time, app.location as app_location, app.doctor_name, app.enquiry_id, enq.name, enq.last_name, " +
        "app.attendance, app.product_id, app_s.location as app_s_location, app_s.doctor_name AS slot_doctor_name, pcl.id as prm_client_id, " +
        "pcl.client_name as prm_client_name, prd.name as prd_name, prd.group as prd_group, prd.category as prd_category, " +
        "prd.fee as prd_fee, prd.price_adjustment as prd_price_adjustment, prd.fee_type as prd_fee_type,  " +
        "app_lb.type as app_lb_type, app_lb.color as app_lb_color, app_lb.id as app_lb_id, " +
        "prm_pr_group.product_group_code, prm_pr_group.fee as prm_pr_group_fee, prm_pr_group_name.language, " +
        "prm_pr_group_name.text as prm_pr_group_name_text, prm_pr_group_name.id as prm_pr_group_name_id "
    statement += "FROM appointments app "
    statement += "LEFT JOIN appointment_slots app_s ON app.id = app_s.appointment_id "
    statement += "LEFT JOIN users us ON app.doctor_id = us.id "
    statement += "LEFT JOIN clients cl ON app_s.client_id = cl.id "
    statement += "LEFT JOIN prm_client pcl ON cl.id = pcl.id "
    statement += "LEFT JOIN enquiries enq ON app.enquiry_id = enq.id "
    statement += "LEFT JOIN products prd ON app.product_id = prd.id "
    statement += "LEFT JOIN appointments_label app_lb ON app.label_id = app_lb.id "
    statement += "LEFT JOIN prm_product_group prm_pr_group ON app.product_group_id = prm_pr_group.product_group_id "
    statement += "LEFT JOIN prm_product_group_name prm_pr_group_name ON prm_pr_group.product_group_id = prm_pr_group_name.product_group_id "
    statement += "WHERE app.trashed = false "
    statement += `AND prm_pr_group_name.language = '${lang}' `
    statement += `AND app.doctor_id IS NOT NULL `
    // statement += "AND pcl.client_deleted = false "
    if (scope=='All') {
    } else if (scope=='PrmClient') {
        statement += "AND enq.prm_client_id=" + prm_client_id;             
    } else if (scope=='Self') {
        statement += "AND us.id=" + user_id 
    } else if (scope==='Self&LinkedUsers') {
        statement += " AND (us.id=" + user_id;
        if (accessible_user_ids) {           
            for (const acc_id in accessible_user_ids) {
                statement +=" OR us.id=" + accessible_user_ids[acc_id];
            } 
        }
        statement += ") ";
    }
    // just selected if set
    if (selctedIds) {
        statement += " AND ("
        statement +=    "false";
        for (const id in selctedIds) {
            statement +=" OR us.id=" + selctedIds[id];
        }
    statement += ") ";  
    } 

    statement += "AND '[:from, :to]'::tsrange @> app.starts_at "
        
    statement = statement.replace(":from",from).replace(":to",to)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateAppointments = (request, response, id, appointments) => {
    let time = moment(appointments.assignmentDate).format('HH:mm');
    let statement = "UPDATE appointments SET "
    if (appointments.doctor_id) statement += "doctor_id='" + appointments.doctor_id + "',"
    if (appointments.doctor_name) statement += "doctor_name='" + appointments.doctor_name + "',"
    if (appointments.location) statement += "location='" + appointments.location + "',"
    if (appointments.notes) statement += "note='" + appointments.notes + "',"
    if (appointments.patient_id) statement +="enquiry_id=" + appointments.patient_id + ","
    if (appointments.patient_attended) statement += "patient_attended='" + appointments.patient_attended + "',"
    if (appointments.appointment_canceled) statement += "appointment_canceled=" + appointments.appointment_canceled + ","
    if (appointments.product_groups) statement += "product_group_id='" + appointments.product_groups + "',"
    if (appointments.crmProduct) statement += "product_id=" + appointments.crmProduct + ","
    if (appointments.assignmentDate) statement += "starts_at='" + moment(appointments.assignmentDate).format('YYYY-MM-DDTHH:mm') + "', date='" + moment(appointments.assignmentDate).format('YYYY-MM-DD') + "',"
    if (appointments.backgroundColor) statement += "label_id='" + appointments.backgroundColor + "',"
    if (appointments.end) statement += "ends_at='" + moment(appointments.assignmentDate).format('YYYY-MM-DD') + 'T' + moment(appointments.end).format('HH:mm') + "',"
    if (appointments.assignmentDate) statement += "time='" + time + "',"
    if (appointments.patient_attended === true) statement += "attendance='Attended',"
    if (appointments.patient_attended === false) statement += "attendance='No-show',"
    if (appointments.patient_attended === null) statement += "attendance='',"
    if (appointments.appointment_canceled) statement += "attendance='Cancelled',"
    if (appointments.cancelation_reason) statement += "cancelation_reason='" + appointments.cancelation_reason + "' "
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + id
    pool.query(statement , (error, results) => {
        if (error) {
            response.status(404).json(error)
            throw error
        }
        response.status(200).json(results)
    })
}

const createAppointment = (request, response, appointments) => {
    let time = moment(appointments.assignmentDate).format('HH:mm');
    let statement = "INSERT INTO appointments ("
    if (appointments.doctor_id) statement += "doctor_id,"
    if (appointments.doctor_name) statement += "doctor_name,"
    if (appointments.location) statement += "location,"
    if (appointments.notes) statement += "note,"
    if (appointments.patient_id) statement += "enquiry_id,"
    if (appointments.patient_attended) statement += "patient_attended,"
    if (appointments.crmProduct) statement += "product_id,"
    if (appointments.product_groups) statement += "product_group_id,"
    if (appointments.assignmentDate) statement += "starts_at, date,"
    if (appointments.backgroundColor) statement += "label_id,"
    if (appointments.end) statement += "ends_at,"
    statement += "time,"
    statement += "created_at,"
    statement += "kind"
    statement += ") VALUES ("
    if (appointments.doctor_id) statement += "'"+ appointments.doctor_id +"',"
    if (appointments.doctor_name) statement += "'"+ appointments.doctor_name +"',"
    if (appointments.location) statement += "'"+ appointments.location +"',"
    if (appointments.notes) statement += "'"+ appointments.notes +"',"
    if (appointments.patient_id) statement += "'"+ appointments.patient_id +"',"
    if (appointments.patient_attended) statement += "'" + appointments.patient_attended + "',"
    if (appointments.crmProduct) statement += "" + appointments.crmProduct + ","
    if (appointments.product_groups) statement += ""+ appointments.product_groups +","
    if (appointments.assignmentDate) statement += "'" + moment(appointments.assignmentDate).format('YYYY-MM-DDTHH:mm') + "'," + "'" + moment(appointments.assignmentDate).format('YYYY-MM-DD') + "'," 
    if (appointments.backgroundColor) statement += "'"+ appointments.backgroundColor +"',"
    if (appointments.end) statement += "'"+ moment(appointments.end).format('YYYY-MM-DDTHH:mm') +"',"
    statement += "'"+ time +"',"
    statement += "NOW(),"
    statement += "'Posvet')"
    pool.query(statement , (error, results) => {
        if (error) {
            response.status(404).json(error)
            throw error
        }
        pool.query("SELECT * FROM appointments WHERE id=(SELECT max(id) FROM appointments)" , (err, res) => {
            response.status(200).json(res.rows)
        })
    })
}

const getLabels = (request, response, lang) => {
    let statement = `SELECT appointments_label.*, app_lb_name.language, app_lb_name.text  FROM appointments_label 
    LEFT JOIN appointments_label_name as app_lb_name ON appointments_label.id = app_lb_name.appointment_label_id 
    WHERE app_lb_name.language = '${lang}' ORDER BY id`
    pool.query(statement , (err, res) => {
        response.status(200).json(res.rows)
    })
}

const createAppointmentsLabel = (request, response, label, prm_client_id) => {
    let statement = "INSERT INTO appointments_label (prm_client_id, "
    if (label.color) statement += "color"
    statement += ") VALUES (" + prm_client_id + ", "
    if (label.color) statement += "'" + label.color.hex + "')"
    statement+= " RETURNING id"
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        let label_id = results.rows[0].id;
        createAppointmentsLabelName(label_id, label.lang, label.text)
        response.status(200).json(results)
    })
}

const createAppointmentsLabelName = (label_id, lang, text) => {
    let statement = `INSERT INTO appointments_label_name (appointment_label_id, language, text) VALUES (${label_id}, '${lang}', '${text}')`
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
    })
}

const updateAppointmentsLabelName = (label_id, lang, text) => {
    let statement = "UPDATE appointments_label_name SET "
    if (lang) statement += "language='" + lang + "',"
    if (text) statement += "text='" + text + "'"
    statement += " WHERE appointment_label_id = " + label_id + " AND language = " + `'${lang}'`
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
    })
}


const updateAppointmentsLabel = (request, response, id, appointmentsLabel) => {
    pool.query("SELECT * FROM appointments_label WHERE id = $1", [id], (error, results) => {
    let currentLabel = results.rows[0]
    let statement = "UPDATE appointments_label SET "
    if (appointmentsLabel.color !== currentLabel.color) {
        statement += "color='" + appointmentsLabel.color.hex + "',"
    } else {
        statement += "color='" + appointmentsLabel.color + "',"
    }
    if (appointmentsLabel.type) statement += "type='" + appointmentsLabel.type + "' "
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + appointmentsLabel.id
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        updateAppointmentsLabelName(appointmentsLabel.id, appointmentsLabel.lang, appointmentsLabel.text)
        response.status(200).json(results)
    })
  })
}

const deleteAppointmentsLabel = (request, response, id) => {
    let statement = `DELETE FROM appointments_label WHERE id = ${id}`
    let statement_name =  `DELETE FROM appointments_label_name WHERE appointment_label_id = ${id}`
    pool.query(statement_name, (error, results) => {
        if (error) {
            throw error
        }
        pool.query(statement, (error, results) => {
            if (error) {
                throw error
            }
        })
        response.status(200).json("OK")
    })
}


const getDoctors = (request, response, user_id, accessible_user_ids, prm_client_id, scope ) => {
    var statement = "SELECT id, title, first_name, surname, concat(title, ' ', first_name , ' ', surname) AS name from users WHERE function::text LIKE '%dentist%' ";
    if (scope==='All') {
    } else if (scope==='PrmClient') {
       statement +=    "AND prm_client_id=" + prm_client_id;
    } else if (scope==='Self') {
       statement +=    "AND id=" + user_id;
    } else if (scope==='Self&LinkedUsers') {
       statement +=    "AND id=" + user_id;
       if (accessible_user_ids) {
           for (const id in accessible_user_ids) {
               statement +="OR id=" + accessible_user_ids[id];
           }
       }
    }         
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getApontments,
    getDoctors,
    updateAppointments,
    updateAppointmentsLabel,
    createAppointment,
    createAppointmentsLabel,
    getLabels,
    deleteAppointmentsLabel
}

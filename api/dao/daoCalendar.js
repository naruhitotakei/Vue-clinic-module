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
    var statement = "SELECT app.id, app.date, app.end_time, app.created_at, app.note, app.product_group_id, app.enquiry_id as app_enquiry_id, app.kind, app.patient_attended, app.appointment_canceled_in_advance_by_clinic, " +
        "app.appointment_canceled_in_advance_by_patient, app.time, app.location as app_location, app.doctor_name as app_doctor_name, app.enquiry_id, enq.name, enq.last_name, " +
        "app.attendance, app.product_id, app_s.location as app_s_location, app_s.doctor_name, us.id as doctor_user_id, pcl.id as prm_client_id, " +
        "pcl.client_name as prm_client_name, prd.name as prd_name, prd.group as prd_group, prd.category as prd_category, " +
        "prd.fee as prd_fee, prd.price_adjustment as prd_price_adjustment, prd.fee_type as prd_fee_type,  " +
        "app_lb.type as app_lb_type, app_lb.color as app_lb_color, app_lb.id as app_lb_id, " +
        "prm_pr_group.product_group_code, prm_pr_group.fee as prm_pr_group_fee, " +
        "prm_pr_group_name.text as prm_pr_group_name_text, prm_pr_group_name.id as prm_pr_group_name_id "
    statement += "FROM appointments app "
    statement += "LEFT JOIN appointment_slots app_s ON app.id = app_s.appointment_id "
    statement += "LEFT JOIN users us ON app.doctor_name = us.name "
    statement += "LEFT JOIN clients cl ON app_s.client_id = cl.id "
    statement += "LEFT JOIN prm_client pcl ON cl.id = pcl.id "
    statement += "LEFT JOIN enquiries enq ON app.enquiry_id = enq.id "
    statement += "LEFT JOIN products prd ON app.product_id = prd.id "
    statement += "LEFT JOIN appointments_label app_lb ON app.label_id = app_lb.id "
    statement += "LEFT JOIN prm_product_group prm_pr_group ON app.product_group_id = prm_pr_group.product_group_id "
    statement += "LEFT JOIN prm_product_group_name prm_pr_group_name ON prm_pr_group.product_group_id = prm_pr_group_name.product_group_id "
    statement += "WHERE app.trashed = false "
    // statement += "AND pcl.client_deleted = false "
    // statement += `AND prm_pr_group_name.language = '${lang}' `
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

    statement += "AND '[:from, :to]'::daterange @> app.date "
        
    statement = statement.replace(":from",from).replace(":to",to)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateAppointments = (request, response, id, appointments) => {
    let patient_attended = appointments.patient_attended === 'attended' ? true : appointments.patient_attended === 'not_attended' ? false : null;
    let time = moment(appointments.assignmentDate).format('HH:mm');
    let statement = "UPDATE appointments SET "
    if (appointments.doctorId) statement += "doctor_name='" + appointments.doctorId + "',"
    if (appointments.locationId) statement += "location='" + appointments.locationId + "',"
    if (appointments.notes) statement += "note='" + appointments.notes + "',"
    if (appointments.patientId) {
        if (typeof appointments.patientId == 'object')
        statement += "enquiry_id='" + appointments.patientId.full_name + "',"
    }
    if (appointments.patient_attended) statement += "patient_attended=" + patient_attended + ","
    statement += "appointment_canceled_in_advance_by_patient=" + appointments.appointment_canceled_in_advance_by_patient + ","
    statement += "appointment_canceled_in_advance_by_clinic=" + appointments.appointment_canceled_in_advance_by_clinic + ","
    if (appointments.product_groups) statement += "product_group_id='" + appointments.product_groups + "',"
    if (appointments.assignmentDate) statement += "date='" + appointments.assignmentDate + "',"
    if (appointments.backgroundColor) statement += "label_id='" + appointments.backgroundColor.id + "',"
    if (appointments.end) statement += "end_time='" + appointments.end + "',"
    if (appointments.time) statement += "time='" + time + "' "
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + id
    console.log("BE of updating an event: " + statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}

const createAppointment = (request, response, appointments) => {
    let patient_attended = appointments.patient_attended === 'attended' ? true : appointments.patient_attended === 'not_attended' ? false : null;
    let time = moment(appointments.assignmentDate).format('HH:mm');
    let statement = "INSERT INTO appointments ("
    if (appointments.doctorId) statement += "doctor_name,"
    if (appointments.locationId) statement += "location,"
    if (appointments.notes) statement += "note,"
    if (appointments.patientId) statement += "enquiry_id,"
    if (appointments.patient_attended) statement += "patient_attended,"
    if (appointments.product_groups) statement += "product_group_id,"
    if (appointments.assignmentDate) statement += "date,"
    if (appointments.backgroundColor) statement += "label_id,"
    if (appointments.end) statement += "end_time,"
    statement += "time,"
    statement += "created_at,"
    statement += "kind"
    statement += ") VALUES ("
    if (appointments.doctorId) statement += "'"+ appointments.doctorId +"',"
    if (appointments.locationId) statement += "'"+ appointments.locationId +"',"
    if (appointments.notes) statement += "'"+ appointments.notes +"',"
    if (appointments.patientId) statement += "'"+ appointments.patientId +"',"
    if (appointments.patient_attended) statement += "'"+patient_attended +"',"
    if (appointments.product_groups) statement += ""+ appointments.product_groups +","
    if (appointments.assignmentDate) statement += "'"+ appointments.assignmentDate +"',"
    if (appointments.backgroundColor) statement += "'"+ appointments.backgroundColor.id +"',"
    if (appointments.end) statement += "'"+ appointments.end +"',"
    statement += "'"+ time +"',"
    statement += "NOW(),"
    statement += "'Posvet')"
    console.log("Deployment test: " + statement)
    pool.query(statement , (error, results) => {
        if (error) {
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
    WHERE app_lb_name.language = '${lang}'`
    pool.query(statement , (err, res) => {
        response.status(200).json(res.rows)
    })
}

const createAppointmentsLabel = (request, response, label) => {
    let statement = "INSERT INTO appointments_label ("
    if (label.color) statement += "color"
    statement += ") VALUES ("
    if (label.color) statement += "'" + label.color.hex + "')"
    statement+= " RETURNING id"
    console.log("Creating label on the BE: " + statement)
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
    console.log("Creating labels name on the BE: " + statement)
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
    console.log("Updating labels name on the BE: " + statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
    })
}


const updateAppointmentsLabel = (request, response, id, appointmentsLabel) => {
    let statement = "UPDATE appointments_label SET "
    if (appointmentsLabel.color) statement += "color='" + appointmentsLabel.color.hex + "',"
    if (appointmentsLabel.type) statement += "type='" + appointmentsLabel.type + "' "
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + appointmentsLabel.id
    console.log("Updating label on the BE: " + statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        updateAppointmentsLabelName(appointmentsLabel.id, appointmentsLabel.lang, appointmentsLabel.text)
        response.status(200).json(results)
    })
}

const deleteAppointmentsLabel = (request, response, id) => {
    let statement = `DELETE FROM appointments_label WHERE id = ${id}`
    let statement_name =  `DELETE FROM appointments_label_name WHERE appointment_label_id = ${id}`
    console.log("Deleting label on the BE: " + statement)
    console.log("Deleting labels name on the BE: " + statement_name)
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
    var statement = "SELECT id, concat(title, ' ', first_name , ' ', surname) AS name from users WHERE function::text LIKE '%dentist%' ";
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
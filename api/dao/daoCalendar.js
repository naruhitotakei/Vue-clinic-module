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
    var statement = "SELECT app.id, app.date, app.note, app.product_group_id, app.enquiry_id as app_enquiry_id, app.kind, app.patient_attended, app.appointment_canceled_in_advance_by_clinic, " +
        "app.appointment_canceled_in_advance_by_patient, app.time, app.location as app_location, app.doctor_name as app_doctor_name, app.enquiry_id, enq.name, enq.last_name, " +
        "app.attendance, app.product_id, app_s.location as app_s_location, app_s.doctor_name, us.id as doctor_user_id, pcl.id as prm_client_id, " +
        "pcl.client_name as prm_client_name, prd.name as prd_name, prd.group as prd_group, prd.category as prd_category, " +
        "prd.fee as prd_fee, prd.price_adjustment as prd_price_adjustment, prd.fee_type as prd_fee_type,  " +
        "app_lb.type as app_lb_type, app_lb.color as app_lb_color, " +
        "prm_pr_group.product_group_code, prm_pr_group.fee as prm_pr_group_fee, " +
        "prm_pr_group_name.text as prm_pr_group_name_text, prm_pr_group_name.id as prm_pr_group_name_id "
    statement += "FROM appointments app "
    statement += "LEFT JOIN appointment_slots app_s ON app.id = app_s.appointment_id "
    statement += "LEFT JOIN users us ON app_s.doctor_name = us.name "
    statement += "LEFT JOIN clients cl ON app_s.client_id = cl.id "
    statement += "LEFT JOIN prm_client pcl ON cl.id = pcl.id "
    statement += "LEFT JOIN enquiries enq ON app.enquiry_id = enq.id "
    statement += "LEFT JOIN products prd ON app.product_id = prd.id "
    statement += "LEFT JOIN appointments_label app_lb ON app.id = app_lb.appointment_id "
    statement += "LEFT JOIN prm_product_group prm_pr_group ON app.product_group_id = prm_pr_group.product_group_id "
    statement += "LEFT JOIN prm_product_group_name prm_pr_group_name ON prm_pr_group.product_group_id = prm_pr_group_name.product_group_id "
    statement += "WHERE app.trashed = false "
    // statement += "AND pcl.client_deleted = false "
    // statement += `AND prm_pr_group_name.language = '${lang}' `
    if (scope=='All') {
    } else if (scope=='PrmClient') {
        statement += "AND us.prm_client_id=" + prm_client_id;             
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
    console.log(statement)
    pool.query(statement , (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateAppointments = (request, response, id, appointments) => {
    console.log(appointments)
    let patient_attended = appointments.patient_attended === 'attended' ? true : appointments.patient_attended === 'not_attended' ? false : null;
    let time = moment(appointments.assignmentDate).format('HH:mm');
    let statement = "UPDATE appointments SET "
    if (appointments.doctorId) statement += "doctor_name='" + appointments.doctorId + "',"
    if (appointments.locationId) statement += "location='" + appointments.locationId + "',"
    if (appointments.notes) statement += "note='" + appointments.notes + "',"
    if (appointments.patientId) statement += "enquiry_id='" + appointments.patientId + "',"
    if (appointments.patient_attended) statement += "patient_attended=" + patient_attended + ","
    statement += "appointment_canceled_in_advance_by_patient=" + appointments.appointment_canceled_in_advance_by_patient + ","
    statement += "appointment_canceled_in_advance_by_clinic=" + appointments.appointment_canceled_in_advance_by_clinic + ","
    if (appointments.product_groups) statement += "product_group_id='" + appointments.product_groups + "',"
    if (appointments.assignmentDate) statement += "date='" + appointments.assignmentDate + "',"
    if (appointments.time) statement += "time='" + time + "'"
    statement += " WHERE id = " + id
    console.log("==========================================================")
    console.log(statement)
    pool.query(statement , (error, results) => {
        console.log(error)
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
    if (appointments.patient_attended) statement += "patient_attended,"
    if (appointments.product_groups) statement += "product_group_id,"
    if (appointments.assignmentDate) statement += "date,"
    if (appointments.hours) statement += "hours,"
    if (appointments.minutes) statement += "minutes,"
    statement += "time,"
    statement += "kind"
    statement += ") VALUES ("
    if (appointments.doctorId) statement += "'"+ appointments.doctorId +"',"
    if (appointments.locationId) statement += "'"+ appointments.locationId +"',"
    if (appointments.notes) statement += "'"+ appointments.notes +"',"
    if (appointments.patientId) statement += "'"+ appointments.patientId +"',"
    if (appointments.patient_attended) statement += "'"+patient_attended +"',"
    if (appointments.product_groups) statement += ""+ appointments.product_groups +","
    if (appointments.assignmentDate) statement += "'"+ appointments.assignmentDate +"',"
    if (appointments.hours) statement += ""+ appointments.hours +","
    if (appointments.minutes) statement += ""+ appointments.minutes +","
    statement += "'"+ time +"',"
    statement += "'Posvet')"
    console.log(statement)
    pool.query(statement , (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        pool.query("SELECT * FROM appointments WHERE id=(SELECT max(id) FROM appointments)" , (err, res) => {
            console.log(err)
            response.status(200).json(res.rows)
        })
    })
}

const createAppointmentsLabel = (request, response, id, appointmentsLabel) => {
    let statement = "INSERT INTO appointments_label ("
    statement += "appointment_id,"
    if (appointmentsLabel.backgroundColor) statement += "color"
    statement += ") VALUES ("
    statement += "" + id + ","
    if (appointmentsLabel.backgroundColor) statement += "'" + appointmentsLabel.backgroundColor + "')"

    console.log(statement)
    pool.query(statement , (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}


const updateAppointmentsLabel = (request, response, id, appointmentsLabel) => {
    let statement = "UPDATE appointments_label SET "
    if (appointmentsLabel.backgroundColor) statement += "color='" + appointmentsLabel.backgroundColor + "'"
    statement += " WHERE appointment_id = " + id

    console.log(statement)
    pool.query(statement , (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results)
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
        console.log(error)
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
    createAppointmentsLabel
}
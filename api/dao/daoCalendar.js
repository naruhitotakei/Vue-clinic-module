require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getApontments = (request, response, from, to, user_id, accessible_user_ids, selctedIds, prm_client_id, scope ) => {
    var statement = "SELECT app.id, app.date, app.kind, app.patient_attended, app.appointment_canceled_in_advance_by_clinic, " +
        "app.appointment_canceled_in_advance_by_patient, app.time, app.location, app.enquiry_id, enq.name, enq.last_name, " +
        "app.attendance, app.product_id, app_s.location, app_s.doctor_name, us.id as doctor_user_id, pcl.id as prm_client_id, " +
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
    statement += "AND pcl.client_deleted = false "
    if (scope=='All') {
    } else if (scope=='PrmClient') {
        statement += "AND us.prm_client_id=" + prm_client_id;             
    } else if (scope=='Self') {
        statement += "AND us.id=" + user_id 
    } else if (scope==='Self&LinkedUsers') {
        if (accessible_user_ids) {
            statement += " AND ("
            statement +=    "false";
            for (const acc_id in accessible_user_ids) {
                statement +=" OR us.id=" + accessible_user_ids[acc_id];
            }
        statement += ") ";  
        }
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

const getDoctors = (request, response, user_id, accessible_user_ids, prm_client_id, scope ) => {
    var statement = "SELECT id, name from users";
    if (scope==='All') {
    } else if (scope==='PrmClient') {
       statement +=    "WHERE prm_client_id=" + prm_client_id;
    } else if (scope==='Self') {
       statement +=    "WHERE id=" + user_id;
    } else if (scope==='Self&LinkedUsers') {
       statement +=    "WHERE id=" + user_id;
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
  getDoctors
}
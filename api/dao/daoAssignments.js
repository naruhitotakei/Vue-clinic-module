require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getAssignments = (request, response, scope, userid, accessible_user_ids, prmClientId, due) =>  {
    var condition = null;
    var condition2 = null;
    if (due == "today") {
        condition = "WHERE enquiries.trashed = false AND (todos.due_at = now()::date) "
        condition2 ="OR completed_at = now()::date"
    } else if (due == "future") {
        condition = "WHERE (todos.due_at > now()::date) AND completed = false AND enquiries.trashed = false"
    } else if (due == "past") {
        condition = "WHERE (todos.due_at < now()::date)  AND completed = false AND enquiries.trashed = false"
    } else if (due == "finished") {
        condition = "WHERE ( (date_trunc('month', todos.updated_at) + INTERVAL '1 MONTH') > now()::date  ) AND completed = true AND enquiries.trashed = false"
    } else if (due == "all") {
      condition = "WHERE completed = false AND enquiries.trashed = false"
    } else {
        response.status(200).json("NOK: Unknown due " + due)
        return
    }
    if (scope == "All") {
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, " +
                         "concat(users.first_name, ' ', users.surname) AS todoname, enquiries.prm_dentist_user_id FROM todos",
                         "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                         "LEFT JOIN users ON todos.user_id = users.id",
                         condition, condition2,
                         "ORDER BY todos.due_at ASC"].join('\n') 
        pool.query(statement, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    } else if (scope == "PrmClient") {
        var prmClientCondition = due == "today" ? "OR completed_at = now()::date AND enquiries.prm_client_id = " + prmClientId : null
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, " +
                        "concat(users.first_name, ' ', users.surname) AS todoname, enquiries.prm_dentist_user_id FROM todos",
                        "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                        "LEFT JOIN users ON todos.user_id = users.id",
                        condition,
                        "AND enquiries.prm_client_id = " + prmClientId,
                        prmClientCondition,
                        "ORDER BY todos.due_at ASC"].join('\n')
        pool.query(statement, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        }) 
    } else if (scope == "Self") {
        var selfCondition = due == "today" ? "(OR completed_at = now()::date AND users.id = " + userid + ") " : null
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, " +
                        "concat(users.first_name, ' ', users.surname) AS todoname, enquiries.prm_dentist_user_id FROM todos",
                        "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                         "LEFT JOIN users ON todos.user_id = users.id",
                         condition,
                         "AND users.id=" + userid,
                         "AND enquiries.prm_client_id = " + prmClientId,
                         selfCondition,
                         "ORDER BY todos.due_at ASC"].join('\n') 
        pool.query(statement, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        }) 
    } else if (scope == "Self&LinkedUsers") {
        var conditionScope = "AND ("
        conditionScope +=    "users.id=" + userid;
        if (accessible_user_ids) {
            for (const acc_id in accessible_user_ids) {
                conditionScope +=" OR users.id=" + accessible_user_ids[acc_id];
            } 
        }
        conditionScope += ")";
        var selfAndLinkedCondition = due == "today" ? "OR completed_at = now()::date " + conditionScope : null
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, " +
                         "concat(users.first_name, ' ', users.surname) AS todoname, enquiries.prm_dentist_user_id FROM todos",
                         "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                         "LEFT JOIN users ON todos.user_id = users.id",                        
                         condition,
                         conditionScope,
                         selfAndLinkedCondition,
                         "ORDER BY todos.due_at ASC"].join('\n')
        pool.query(statement, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        }) 
    }     
}

const finishAssignment = (req, res, assignmentDescriptor) =>  {
    pool.query("UPDATE todos SET completed_by=$3, completed=$2, updated_at=now(), completed_at=now() WHERE id=$1" , [assignmentDescriptor.id, assignmentDescriptor.finished, assignmentDescriptor.completedBy])
    res.status(200).json("OK")
}

const createAssignment = (req, res, assignment) => {
  let assignmentStatement = "INSERT INTO todos ("
  if (assignment.enquiry) assignmentStatement += "enquiry_id,"
  if (assignment.description) assignmentStatement += "description,"
  if (assignment.due_at) assignmentStatement += "due_at,"
  if (assignment.user_id && !assignment.user) assignmentStatement += "user_id"
  if (assignment.user_id && assignment.user) assignmentStatement += "user_id,"
  if (assignment.user) assignmentStatement += "user_id"
  assignmentStatement += ") VALUES ("
  if (assignment.enquiry) assignmentStatement += "'" + assignment.enquiry.id + "',"
  if (assignment.description) assignmentStatement += "'" + assignment.description + "',"
  if (assignment.due_at) assignmentStatement += "'" + assignment.due_at + "',"
  if (assignment.user_id && !assignment.user) assignmentStatement += "'" + assignment.user_id + "'"
  if (assignment.user_id && assignment.user) assignmentStatement += "'" + assignment.user_id + "',"
  if (assignment.user) assignmentStatement += "'" + assignment.user.code + "'"
  assignmentStatement += ")";
  pool.query(assignmentStatement , (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json("OK")
  })
}

const updateAssignment = (req, res, id, assignment) => {
  let assignmentStatement = "UPDATE todos SET "
  if (assignment.enquiry) assignmentStatement += "enquiry_id='" + assignment.enquiry.id + "',"
  if (assignment.description) assignmentStatement += "description='" + assignment.description + "',"
  if (assignment.due_at) assignmentStatement += "due_at='" + assignment.due_at + "',"
  if (assignment.user_id) assignmentStatement += "user_id='" + assignment.user_id + "'"
  assignmentStatement +=" WHERE todos.id=" + id

  pool.query(assignmentStatement , (error, results) => {
    if (error) {
      throw error
    }
  })


  res.status(200).json(assignment)
}

module.exports = {
  getAssignments,
  finishAssignment,
  createAssignment,
  updateAssignment
}

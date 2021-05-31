require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getAssignments = (request, response, scope, userid, due) =>  {
    var condition = null;
    if (due == "today") {
        condition = "WHERE (todos.due_at = now()::date) AND completed = false"
    } else if (due == "future") {
        condition = "WHERE (todos.due_at > now()::date) AND completed = false"
    } else if (due == "past") {
        condition = "WHERE (todos.due_at < now()::date)  AND completed = false"
    } else if (due == "finished") {
        condition = "WHERE ( (date_trunc('month', todos.updated_at) + INTERVAL '1 MONTH') > now()::date  ) AND completed = true"        
    } else {
        response.status(200).json("NOK: Unknown due " + due)
        return
    }
    if (scope == "All") {
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, users.name AS todoname, dentists.name AS dentistname FROM todos",
                         "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                         "LEFT JOIN users ON todos.user_id = users.id",
                         "LEFT JOIN users dentists ON enquiries.prm_dentist_user_id = users.id",
                         condition,
                         "ORDER BY todos.due_at ASC"].join('\n') 
        pool.query(statement, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    } else if (scope == "Self") {
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, users.name AS todoname, dentists.name AS dentistname FROM todos",
                         "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                         "LEFT JOIN users ON todos.user_id = users.id",
                         "LEFT JOIN users dentists ON enquiries.prm_dentist_user_id = users.id",
                         condition,
                         "AND users.id = $1",
                         "ORDER BY todos.due_at ASC"].join('\n') 
        pool.query(statement, [userid], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })  
    } else if (scope == "AllNurses") {
        var statement = ["SELECT todos.*, enquiries.name AS patientname, enquiries.last_name AS patientlastname, users.name AS todoname, dentists.name AS dentistname FROM todos",
                         "LEFT JOIN enquiries ON todos.enquiry_id = enquiries.id",
                         "LEFT JOIN users ON todos.user_id = users.id",
                         "LEFT JOIN users dentists ON enquiries.prm_dentist_user_id = users.id",
                         condition,
                         "AND ( users.prm_role_id = (SELECT role_id FROM prm_role where role_name = 'Nurse') OR users.prm_role_id = (SELECT role_id FROM prm_role where role_name = 'SuperNurse') )",
                         "ORDER BY todos.due_at ASC"].join('\n') 
        pool.query(statement, [userid], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })  
    }
}

const finishAssignment = (req, res, assignmentDescriptor) =>  {
    pool.query("UPDATE todos SET completed=$2, updated_at=now()  WHERE id=$1" , [assignmentDescriptor.id, assignmentDescriptor.finished])
    res.status(200).json("OK")
}

const createAssignment = (req, res, assignment) => {
  let assignmentStatement = "INSERT INTO todos ("
  if (assignment.enquiry) assignmentStatement += "enquiry_id,"
  if (assignment.description) assignmentStatement += "description,"
  if (assignment.due_at) assignmentStatement += "due_at,"
  if (assignment.user_id) assignmentStatement += "user_id"
  assignmentStatement += ") VALUES ("
  if (assignment.enquiry) assignmentStatement += "'" + assignment.enquiry.id + "',"
  if (assignment.description) assignmentStatement += "'" + assignment.description + "',"
  if (assignment.due_at) assignmentStatement += "'" + assignment.due_at + "',"
  if (assignment.user_id) assignmentStatement += "'" + assignment.user_id + "'"
  assignmentStatement += ")";
  console.log(assignmentStatement)
  pool.query(assignmentStatement , (error, results) => {
    console.log(error)
    if (error) {
      throw error
    }
    res.status(200).json("OK")
  })
}

module.exports = {
  getAssignments,
  finishAssignment,
  createAssignment
}
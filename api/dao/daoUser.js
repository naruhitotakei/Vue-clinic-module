require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const bcrypt = require('bcrypt');

const loginUser = ((request, response, email, password) => {
  return new Promise((resolve, reject) =>
      pool.query('SELECT * FROM users WHERE email = $1 AND active = true', [email], (error, qResult) => {
        if (error) {
          reject("SQL users error " + error)
        }
        if (!qResult || !qResult.rows || qResult.rows.length == 0) {
          console.info("User " + email + " does not exist!")
          response.status(200).json("NOK: User does not exist");
          resolve(null)
          return
        } else if (qResult.rows.length > 1) {
          console.error("More than one user has email " + email)
          response.status(200).json("NOK: Please contact administrator");
          resolve(null)
          return
        }
        bcrypt.compare(password, qResult.rows[0].prm_password_hash).then(function (result) {
          if (!result) {
            console.info("Password does not match ")
            response.json("NOK: Wrong password");
            resolve(null)
            return
          } else if (qResult.rows[0].prm_role_id) {
            pool.query('SELECT p.resource_name, s.scope_name FROM prm_role_permission rp JOIN prm_role r ON rp.role_id=r.role_id JOIN prm_permission p ON rp.permission_id=p.permission_id JOIN prm_scope s ON p.scope_id=s.scope_id WHERE rp.role_id = $1', [qResult.rows[0].prm_role_id], (error, qRoleResult) => {
              if (error) {
                reject("SQL roles error " + error)
              }
              var user = qResult.rows[0]
              user.permissions = qRoleResult.rows
              request.session.prm_user = user
              response.status(200).json(user)
              resolve(user)
              return
            })
          } else {
            console.info("Unknown problem ")
            response.json("NOK: Unknown");
            resolve(null)
            return
          }
        });
      })
  )
})

const getUserById = ((request, response, id) => {
  return new Promise((resolve, reject) =>
    pool.query('SELECT users.*, prm_client.client_name FROM users LEFT JOIN prm_client ON users.prm_client_id = prm_client.id WHERE users.id = $1 AND active = true', [id], (error, qResult) => {

        pool.query('SELECT p.resource_name, s.scope_name FROM prm_role_permission rp JOIN prm_role r ON rp.role_id=r.role_id JOIN prm_permission p ON rp.permission_id=p.permission_id JOIN prm_scope s ON p.scope_id=s.scope_id WHERE rp.role_id = $1', [qResult.rows[0].prm_role_id], (error, qRoleResult) => {
          if (error) {
            reject("SQL roles error " + error)
          }
          var user = qResult.rows[0]
          user.permissions = qRoleResult.rows
          request.session.prm_user = user
          response.status(200).json(user)
          resolve(user)
          return
        })
      })
  )
})

const hash = ((request, response, password) => {
  bcrypt.hash(password, 12).then(function (hash) {
    bcrypt.compare(password, hash).then(function (result) {
      return res.status(200).json("OK:")
    });
  });
})

const changePassword = ((request, response, email, oldpasswordhash, credentials) => {
  if (!email) {
    response.status(200).json("NOK: Unknown user")
    return
  } else if (!credentials) {
    response.status(200).json("NOK: No credentials")
    return
  } else if (!credentials || !credentials.oldpassword || !credentials.password1 || !credentials.password2) {
    response.status(200).json("NOK: No credentials")
    return
  } else if (credentials.password1 !== credentials.password2) {
    response.status(200).json("NOK: Passwords does not match")
    return
  } else if (credentials.password1.length < 8) {
    response.status(200).json("NOK: Password to short")
    return
  }
  bcrypt.compare(credentials.oldpassword, oldpasswordhash).then(function (result) {
    if (result) {
      bcrypt.hash(credentials.password1, 12).then(function (hash) {
        pool.query("UPDATE users SET prm_password_hash = $1 WHERE email = $2", [hash, email], (error, qResult) => {
          request.session.prm_user.prm_password_hash = hash
          response.status(200).json("OK: Password changed")
          return
        })
      });
    } else {
      response.status(200).json("NOK: Wrong password")
      return
    }
  });
})

const changeLang = ((req, res, profile) => {
  var statement = "UPDATE users SET "
  if (profile.prm_locale) statement += "prm_locale='" + profile.prm_locale + "'"
  statement += " WHERE email='" + profile.email + "'"
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json("OK")
  })
})

const editProfile = ((request, response, profile) => {
  var statement = "UPDATE users SET "
  profile.first_name === null || profile.first_name === "null" ? statement += "first_name=''," : statement += "first_name='" + profile.first_name + "',"
  profile.surname === null || profile.surname === "null" ? statement += "surname=''," : statement += "surname='" + profile.surname + "',"
  profile.phone_number === null || profile.phone_number === "null" ? statement += "phone_number=''," : statement += "phone_number='" + profile.phone_number + "',"
  profile.specialization === null || profile.specialization === "null" ? statement += "specialization=''," : statement += "specialization='" + profile.specialization + "',"
  profile.position === null || profile.position === "null" ? statement += "position=''," : statement += "position='" + profile.position + "',"
  profile.title === null || profile.title === "null" ? statement += "title=''," : statement += "title='" + profile.title + "',"
  statement = statement.slice(0, -1)
  statement += " WHERE email='" + profile.email + "'"
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json("OK")
  })
})

const getDentists = (request, response, prm_client_id) => {
  pool.query("SELECT u.id as code, concat(u.title, ' ', u.first_name , ' ', u.surname) AS label FROM users u " +
      "WHERE function::text LIKE '%dentist%' AND active = true ", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSurgeons = (request, response, prm_client_id) => {
    pool.query("SELECT u.id as code, concat(u.title, ' ', u.first_name , ' ', u.surname) AS label FROM users u WHERE function::text LIKE '%surgeon%' AND active = true AND prm_client_id = " + prm_client_id, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response, prm_client_id, scope) => {
    let statement = "SELECT users.id AS id, title, first_name AS name, surname, specialization, email AS mail, phone_number AS phone, " +
        "position, prm_role_id AS role_id, role_name FROM users LEFT JOIN prm_role ON users.prm_role_id = prm_role.role_id "
    statement += "LEFT JOIN prm_client ON users.prm_client_id = prm_client.id "
    statement += "WHERE prm_client.client_deleted = false "
    statement += "AND first_name::text NOT ILIKE '%emazing%' "
    if (scope == "All") {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client.id=" + prm_client_id;
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getRoles = (request, response) => {
    pool.query("SELECT * FROM prm_role WHERE role_id != 11", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateUser = (req, res, id, user) => {
    let statement = "UPDATE users SET " + "title='" + user.title + "'," + "first_name='" + user.name + "'," + "surname='" + user.surname + "'," + "specialization='" + user.specialization + "'," + "position='" + user.position + "'," + "prm_role_id=" + user.role_id + "," + "email='" + user.mail + "'," + "phone_number='" + user.phone + "' WHERE id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
    res.status(200).json(user)
}

const getUsersForAssignments = (request, response, prm_client_id, scope) => {
    let statement = "SELECT u.id as code, concat(u.title, ' ', u.first_name , ' ', u.surname) AS label FROM users u "
    statement += "WHERE active = true "
    statement += "AND prm_role_id != 11 "
    if (scope == "All") {
    } else if (scope == 'PrmClient') {
        statement += "AND prm_client_id=" + prm_client_id;
    }
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const recordSignInTime = (request, response, user_id) => {
    let statement = "UPDATE users SET last_sign_in_at = NOW() WHERE id = " + user_id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json("OK")
    })
}

const getLegacyDoctors = (request, response, prm_client_id, scope) => {
  let statement = "SELECT DISTINCT ON (cu.user_id) cu.id as id, cu.user_id, u.name from client_users cu JOIN users u ON cu.user_id = u.id WHERE cu.access_role = 'doctor' "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
      statement += "AND u.prm_client_id = " + prm_client_id
  }
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  loginUser,
  getUserById,
  hash,
  changePassword,
  editProfile,
  changeLang,
  getDentists,
  getSurgeons,
  getUsers,
  getRoles,
  updateUser,
  getUsersForAssignments,
  recordSignInTime,
  getLegacyDoctors
}

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
            if (!qResult || !qResult.rows || qResult.rows.length==0) {
                console.info("User " + email + " does not exist!")
                response.status(200).json("NOK: User does not exist");
                resolve(null) 
                return        
            } else if (qResult.rows.length>1) {
                console.error("More than one user has email " + email)
                response.status(200).json("NOK: Please contact administrator");
                resolve(null)
                return
            }
            bcrypt.compare(password, qResult.rows[0].prm_password_hash).then(function(result) {
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
        pool.query('SELECT * FROM users WHERE id = $1 AND active = true', [id], (error, qResult) => {
            
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
    console.log("Hashing " + password)
    bcrypt.hash(password, 12).then(function(hash) {
        console.log("Hash " + hash)
        bcrypt.compare(password, hash).then(function(result) {
            console.log("Check Hash " + result)
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
    bcrypt.compare(credentials.oldpassword, oldpasswordhash).then(function(result) {
        if (result) {
            bcrypt.hash(credentials.password1, 12).then(function(hash) {
                console.log("sql " + hash + " " + email)
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

const editProfile = ((request, response, profile) => {
    var statement = "UPDATE users SET "
    if (profile.name) statement += "name='" + profile.name + "',"
    if (profile.phone_number) statement += "phone_number='" + profile.phone_number + "',"
    statement = statement.slice(0, -1)
    statement +=" WHERE email='" + profile.email + "'"
    console.log('stat: ' + statement)
    pool.query(statement , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json("OK")
    })
})

const getDentists = (request, response) => {
    pool.query("SELECT u.id as code, concat(u.title, ' ', u.name) as label FROM users_prm_client u WHERE role::text LIKE '%dentist%' AND active = true", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSurgeons = (request, response) => {
    pool.query("SELECT u.id as code, concat(u.title, ' ', u.name) as label FROM users_prm_client u WHERE role::text LIKE '%surgeon%' AND active = true", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsers = (request, response) => {
    pool.query("SELECT users.id, users.prm_role_id, users.prm_client_id, users.prm_company_id, users.name, users.email AS mail, users.phone_number AS phone, prm_role.role_name, prm_role.role_id " +
        "FROM users " +
        "LEFT JOIN prm_role ON users.prm_role_id = prm_role.role_id " +
        "WHERE users.roles::text LIKE '%doctor%' AND users.active = true" , (error, results) => {
        console.log(error)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateUser = (req, res, id, user) => {
    let statement = "UPDATE users SET " + "name='" + user.name + "', " + "email='" + user.mail + "',"
    if (user.phone) statement += "phone_number='" + user.phone + "',"
    statement = statement.slice(0, -1)
    statement += " WHERE id = " + id
    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
    })
    res.status(200).json(user)
}

module.exports = {
  loginUser,
  getUserById,
  hash,
  changePassword,
  editProfile,
  getDentists,
  getSurgeons,
  getUsers,
  updateUser
}
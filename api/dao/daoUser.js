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

const getUser = ((request, response, email, password) => {
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

const editProfile = ((request, response, email, data) => {
    if (data.email || data.name || data.phone_number) {
         var statement = ["UPDATE users SET "]
         if (data.email) {
             request.session.prm_user.email = data.email
             statement.push("email = " + data.email)
         }
         if (data.name) {
             request.session.prm_user.name = data.name
             statement.push("name = " + data.name)
         }
         if (data.phone_number) {
             request.session.prm_user.phone_number = data.phone_number
             statement.push("phone_number = '" + data.phone_number + "'")
         } 
         statement.push(" WHERE email = '" + email + "'");
         pool.query(statement.join('\n') , (error, qResult) => {
             response.status(200).json("OK: Updated")
         })                 
    } else {
        response.status(200).json("OK: Nothing to do")
    }
})

const getDentists = (request, response) => {
    pool.query("SELECT u.id as code, u.name as label FROM users u", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getUser,
  hash,
  changePassword,
  editProfile,
  getDentists
}
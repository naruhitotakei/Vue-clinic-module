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

const getUser = ((request, response, sessionData, email, password) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, qResult) => {
        if (error) {
            throw error
        }
        if (!qResult.rows || qResult.rows.length==0) {
            console.info("User " + email + " does not exist!")
            return response.status(200).json("NOK: User does not exist");        
        } else if (qResult.rows.length<1) {
            console.error("More than ose user has email " + email)
            return response.status(200).json("NOK: Please contact administrator");
        }
        bcrResult = bcrypt.compare(qResult.rows[0].encrypted_password, password, function(err, bcrResult) {
            bcrResult = qResult.rows[0].encrypted_password === password  // todo - tole odstrani
            if (qResult.rows[0].prm_role_id) {
                pool.query('SELECT p.resource_name, s.scope_name FROM prm_role_permission rp JOIN prm_role r ON rp.role_id=r.role_id JOIN prm_permission p ON rp.permission_id=p.permission_id JOIN prm_scope s ON p.scope_id=s.scope_id WHERE rp.role_id = $1', [qResult.rows[0].prm_role_id], (error, qRoleResult) => {
                    if (error) {
                        throw error
                    }
                    sessionData.user = qResult.rows[0]
                    sessionData.user.permissions = qRoleResult.rows
                    console.log(sessionData.user)
                    return response.status(200).json(sessionData.user)                    
                })
            } else if (qResult.rows[0]) {
                console.info("User "+ email +" has no roles ")
                response.json("NOK: No roles");                
            } else {
                console.info("Password does not match ")
                response.json("NOK: Wrong password");
            }
        });
    })
})

const getUserSso = ((request, response, sessionData) => {
    if (sessionData.user) { 
        return response.status(200).json(sessionData.user)
    }
    return response.status(200).json("NOK: user not logged in")
})

const logout = ((request, response, sessionData) => {
    delete sessionData.user
    return response.status(200).json("OK: user logged out")
})

module.exports = {
  getUser,
  getUserSso,
  logout
}
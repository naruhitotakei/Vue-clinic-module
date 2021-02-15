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
    if (sessionData.user) {  // user already logged in
        if (credentials.email != sessionData.user.email) {
             return response.status(200).json("NOK: Please logout first");
        }
        return response.status(200).json(sessionData.user)
    }
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
            if (bcrResult) {
                sessionData.user = qResult.rows[0]
                return response.status(200).json(qResult.rows[0])
            } else {
                console.info("Password does not match ")
                response.json("NOK: Wrong password");
            }
        });
    })
})

const getUserSso = ((request, response, sessionData) => {
    if (sessionData.user) {  // user already logged in
        return response.status(200).json(sessionData.user)
    }
})

const logout = ((request, response, sessionData) => {
    if (sessionData.user) {  // user already logged in
        sessionData.user = null
        return response.status(200).json("OK: user logged out")
    }
})

module.exports = {
  getUser,
  getUserSso,
  logout
}
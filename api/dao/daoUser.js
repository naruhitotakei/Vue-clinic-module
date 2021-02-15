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
        // todo - preveri dolzino qResult.rows
        bcrResult = bcrypt.compare(qResult.rows[0].encrypted_password, password, function(err, bcrResult) {
            bcrResult = qResult.rows[0].encrypted_password === password  // todo - tole odstrani
            if (bcrResult) {
                sessionData.user = qResult.rows[0]
                return response.status(200).json(qResult.rows[0])
            } else {
                console.log("does not match " + qResult.rows[0].encrypted_password + "/" + password)
                response.json("NOK: Wrong password");
            }
        });
    })
})

const getUserSso = ((request, response, sessionData) => {
    if (sessionData.user) {  // user already logged in
        console.log("SSO!!!!")
        return response.status(200).json(sessionData.user)
    }
})

module.exports = {
  getUser,
  getUserSso
}
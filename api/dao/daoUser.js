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
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, qResult) => {
            if (error) {
                reject("SQL users error " + error)
            }
            if (!qResult.rows || qResult.rows.length==0) {
                console.info("User " + email + " does not exist!")
                response.status(200).json("NOK: User does not exist");
                resolve(null)         
            } else if (qResult.rows.length<1) {
                console.error("More than ose user has email " + email)
                response.status(200).json("NOK: Please contact administrator");
                resolve(null)
            }
            bcrResult = bcrypt.compare(qResult.rows[0].encrypted_password, password, function(err, bcrResult) {
                bcrResult = qResult.rows[0].encrypted_password === password  // todo - tole odstrani
                if (qResult.rows[0].prm_role_id) {
                    pool.query('SELECT p.resource_name, s.scope_name FROM prm_role_permission rp JOIN prm_role r ON rp.role_id=r.role_id JOIN prm_permission p ON rp.permission_id=p.permission_id JOIN prm_scope s ON p.scope_id=s.scope_id WHERE rp.role_id = $1', [qResult.rows[0].prm_role_id], (error, qRoleResult) => {
                        if (error) {
                            reject("SQL roles error " + error)
                        }
                        var user = qResult.rows[0]
                        user.permissions = qRoleResult.rows
                        request.session.prm_user = user
                        response.status(200).json(user)
                        resolve(user)                    
                    })
                } else if (qResult.rows[0]) {
                    console.info("User "+ email +" has no roles ")
                    response.json("NOK: No roles");
                    resolve(null)                
                } else {
                    console.info("Password does not match ")
                    response.json("NOK: Wrong password");
                    resolve(null)
                }
            });
        })
    )
})

module.exports = {
  getUser
}
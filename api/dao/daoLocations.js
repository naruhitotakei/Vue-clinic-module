require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getLocationsList = (request, response, prm_client_id, scope) => {
  let statement = "SELECT lo.id, pcp.premise_name, lo.name, lo.city, lo.address FROM locations lo "
  statement += "LEFT JOIN locations_prm_company_premise_bridge lpb ON lpb.location_id = lo.id "
  statement += "LEFT JOIN prm_company_premise pcp ON lpb.premise_id = pcp.premise_id "
  statement += "LEFT JOIN prm_client pc ON pc.id = lo.prm_client_id "
  statement += "WHERE active = true "
  statement += "AND pc.client_deleted = false "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "AND pc.id = " + prm_client_id
  }
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getInactiveLocationsList = (request, response, prm_client_id, scope) => {
  let statement = "SELECT lo.id, pcp.premise_name, lo.name, lo.city, lo.address FROM locations lo "
  statement += "LEFT JOIN locations_prm_company_premise_bridge lpb ON lpb.location_id = lo.id "
  statement += "LEFT JOIN prm_company_premise pcp ON lpb.premise_id = pcp.premise_id "
  statement += "LEFT JOIN prm_client pc ON pc.id = lo.prm_client_id "
  statement += "WHERE active = false "
  statement += "AND pc.client_deleted = false "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "AND pc.id = " + prm_client_id
  }
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPremises = (request, response, prm_client_id, scope) => {
  let statement = "SELECT premise_id AS id, premise_name AS premise FROM prm_company_premise "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "WHERE prm_client_id = " + prm_client_id
  }

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createLocation = (req, res, location, prm_client_id) => {
  var statement = "INSERT INTO locations (name, city, address, active, created_at, prm_client_id) VALUES ('" + location.name + "', " + "'" + location.city + "', " + "'" + location.address + "', " + "true, NOW()," + prm_client_id + ") RETURNING id;"

  console.log("Creating location on the BE: " + statement)
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    let locationId = results.rows[0].id

    if (location.premiseId) createLocationPremiseBridgeStatement(locationId, location.premiseId)
    console.log("Location bridge statement on BE: " + createLocationPremiseBridgeStatement)


    res.status(200).json("OK")
  })
}

createLocationPremiseBridgeStatement = (locationId, premiseId) => {
  let statement = "INSERT INTO locations_prm_company_premise_bridge (location_id, premise_id, created_at) VALUES (" + locationId + "," + premiseId + ",NOW())"

  console.log("Location bridge statement on BE: " + statement)
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
}

const updateLocation = (req, res, id, location) => {
  let statement = "UPDATE locations SET " + "name='" + location.name + "', " + "city='" + location.city + "', " + "address='" + location.address + "',"
  statement = statement.slice(0, -1)
  statement += " WHERE id = " + id

  if (location.premise_id) updateLocationPremiseBridgeStatement(id, location.premise_id)

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
  res.status(200).json(location)
}

updateLocationPremiseBridgeStatement = (locationId, premiseId) => {
  let statement = "UPDATE locations_prm_company_premise_bridge SET premise_id = " + premiseId + ",updated_at = NOW() WHERE id = " + locationId
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
}

const toggleActivity = (req, res, id) => {
  pool.query("UPDATE locations SET active = NOT active, updated_at=now() WHERE id =$1", [id], (error, results) => {
    if (error) {
      throw error
    }
  })
  res.status(200).json("OK")
}

module.exports = {
  getLocationsList,
  getInactiveLocationsList,
  getPremises,
  createLocation,
  updateLocation,
  toggleActivity
}

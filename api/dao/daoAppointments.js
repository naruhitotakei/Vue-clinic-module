const { pool, now, insert } = require('~/services/db')

const getAllAppointmentsLocations = (req, res, scope, prm_client_id) => {
  let statement = 'SELECT location FROM appointments '
  statement += 'LEFT JOIN locations ON appointments.location = locations.city '
  statement += "WHERE location IS NOT NULL AND location <> '' "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += ' AND locations.prm_client_id = ' + prm_client_id + ' '
  }
  statement += 'GROUP BY location'

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getAllAppointmentsDoctors = (req, res, scope, prm_client_id) => {
  let statement =
    'SELECT DISTINCT ON(doctor_id) doctor_name, doctor_id FROM appointments '
  statement += 'LEFT JOIN users ON users.id = appointments.doctor_id '
  statement += "WHERE doctor_name IS NOT NULL AND doctor_name <> '' "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += 'AND users.prm_client_id = ' + prm_client_id + ' '
  }
  statement += 'GROUP BY doctor_name, doctor_id'

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getAppointments = async (req, res, location, doctor, date) => {
  const statement = /* sql */ `
    SELECT appointments.*, enquiries.name AS enquiry_name, enquiries.last_name AS enquiry_last_name,
    enquiries.phone AS enquiry_phone,
    products.name AS product_name FROM appointments
    LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id
    LEFT JOIN products ON appointments.product_id = products.id
    WHERE date = $1
    AND ($2::text IS NULL OR appointments.location = $2::text)
    AND ($3::int IS NULL OR appointments.doctor_id = $3::int)
    ORDER BY starts_at
  `
  let result

  try {
    result = await pool.query(statement, [
      date,
      location !== 'All Locations' ? location : null,
      doctor !== 'All Doctors' ? parseInt(doctor) : null,
    ])
  } catch (error) {
    return res.status(500).send()
  }

  res.status(200).json(result.rows)
}

const updateLevelOfInterest = (req, res, appointmentID, levelOfInterest) => {
  let statement = 'UPDATE appointments '
  statement += "SET level_of_interest='" + levelOfInterest + "' "
  statement += 'WHERE id=' + appointmentID
  console.log('Updating level of interest: ' + statement)
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({ success: true })
  })
}

const updateClinicNotes = (req, res, appointmentID, clinicNotes) => {
  let statement = 'UPDATE appointments '
  statement += "SET notes='" + clinicNotes + "' "
  statement += 'WHERE id=' + appointmentID

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({ success: true })
  })
}

const updateCallCenterNotes = (req, res, appointmentID, callCenterNotes) => {
  let statement = 'UPDATE appointments '
  statement += "SET note='" + callCenterNotes + "' "
  statement += 'WHERE id=' + appointmentID

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({ success: true })
  })
}

const updateAttendance = (req, res, appointmentID, attendance) => {
  let statement = 'UPDATE appointments '
  statement += "SET attendance='" + attendance + "' "
  statement += 'WHERE id=' + appointmentID

  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json({ success: true })
  })
}

async function createAppointment({ enquiryId }) {
  const timestamp = now()

  return insert('appointments', {
    enquiry_id: enquiryId,
    kind: 'Posvet',
    booking_source: 'online reservation',
    created_at: timestamp,
    updated_at: timestamp,
  })
}

module.exports = {
  getAllAppointmentsLocations,
  getAllAppointmentsDoctors,
  getAppointments,
  updateLevelOfInterest,
  updateClinicNotes,
  updateCallCenterNotes,
  updateAttendance,
  createAppointment,
}

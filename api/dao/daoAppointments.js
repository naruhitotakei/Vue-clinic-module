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

const getAllAppointmentsKinds = (req, res, scope, prm_client_id) => {
  let statement = 'SELECT kind FROM "appointments" WHERE kind IS NOT NULL GROUP BY kind '
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

const getAppointments = async (req, res, location, doctor, kind, date, scope, prm_client_id, user_id, accessible_user_ids, locale) => {
  let statement = "SELECT appointments.*, enquiries.name AS enquiry_name, enquiries.last_name AS enquiry_last_name, " +
    "enquiries.phone AS enquiry_phone, prm_product_group_name.text AS product_name FROM appointments "
  statement += "LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id "
  statement += "LEFT JOIN prm_product_group ON appointments.product_group_id = prm_product_group.product_group_id "
  statement += "LEFT JOIN prm_product_group_name ON prm_product_group.product_group_id = prm_product_group_name.product_group_id "
  statement += "WHERE date = $1 "
  statement += "AND ($2::text IS NULL OR appointments.location = $2::text) "
  statement += "AND ($3::int IS NULL OR appointments.doctor_id = $3::int) "
  statement += "AND ($4::text IS NULL OR appointments.kind = $4::text) "
  statement += "AND prm_product_group_name.language = '" + locale + "' "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += 'AND enquiries.prm_client_id = ' + prm_client_id
  } else if (scope == 'Self') {
    statement += 'AND (enquiries.prm_dentist_user_id = ' + user_id + ' OR enquiries.prm_surgeon_user_id = ' + user_id + ')'
  } else if (scope == 'Self&LinkedUsers') {
    statement += 'AND (enquiries.prm_dentist_user_id = ' + user_id + ' OR enquiries.prm_surgeon_user_id = ' + user_id
    if (accessible_user_ids) {
      for (const acc_id in accessible_user_ids) {
        statement += ' OR enquiries.prm_dentist_user_id = ' + accessible_user_ids[acc_id] + ' OR enquiries.prm_surgeon_user_id = ' + accessible_user_ids[acc_id]
      }
    }
    statement += ') '
  }
  statement += "ORDER BY starts_at "

  let result

  try {
    result = await pool.query(statement, [
      date,
      location !== 'All Locations' ? location : null,
      doctor !== 'All Doctors' ? parseInt(doctor) : null,
      kind !== 'All Kinds' ? kind : null,
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
  getAllAppointmentsKinds,
  getAppointments,
  updateLevelOfInterest,
  updateClinicNotes,
  updateCallCenterNotes,
  updateAttendance,
  createAppointment,
}

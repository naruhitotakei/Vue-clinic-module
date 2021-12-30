require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
})

const getAllAppointmentsLocations = (req, res) => {
    let statement = "SELECT location FROM appointments "
    statement += "WHERE location IS NOT NULL AND location <> ''"
    statement += "GROUP BY location"

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getAllAppointmentsDoctors = (req, res) => {
    let statement = "SELECT doctor_name FROM appointments "
    statement += "WHERE doctor_name IS NOT NULL AND doctor_name <> ''"
    statement += "GROUP BY doctor_name"

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getAppointments = (req, res, location, doctor, date) => {
    let statement = "SELECT appointments.*, enquiries.name AS enquiry_name, enquiries.last_name AS enquiry_last_name, "
    statement += "enquiries.phone AS enquiry_phone, "
    statement += "products.name AS product_name FROM appointments "
    statement += "LEFT JOIN enquiries ON appointments.enquiry_id = enquiries.id "
    statement += "LEFT JOIN products ON appointments.product_id = products.id "
    statement += "WHERE date='" + date + "'"

    if (location !== 'All Locations') {
        statement += " AND location='" + location + "'"
    }
    if (doctor !== 'All Doctors') {
        statement += " AND doctor_name='" + doctor + "'"
    }

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updateLevelOfInterest = (req, res, appointmentID, levelOfInterest) => {
    let statement = "UPDATE appointments "
    statement += "SET level_of_interest='" + levelOfInterest + "' "
    statement += "WHERE id=" + appointmentID

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({ success: true })
    })
}

const updateNotes = (req, res, appointmentID, notes) => {
    let statement = "UPDATE appointments "
    statement += "SET notes='" + notes + "' "
    statement += "WHERE id=" + appointmentID

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({ success: true })
    })
}

const updateAttendance = (req, res, appointmentID, attendance) => {
    let statement = "UPDATE appointments "
    statement += "SET attendance='" + attendance + "' "
    statement += "WHERE id=" + appointmentID

    pool.query(statement, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({ success: true })
    })
}

async function createAppointment ({ enquiryId }) {
    const model = {
      enquiry_id: '$1',
      created_at: now(),
      updated_at: now(),
    };
    const statement = /* sql */ `
      INSERT INTO appointments(${Object.keys(model).join(',')})
      VALUES (${Object.values(model).join(',')})
      RETURNING *
    `;
    const result = await pool.query(statement, [enquiryId]);
    return result.rows[0];
}

module.exports = {
    getAllAppointmentsLocations,
    getAllAppointmentsDoctors,
    getAppointments,
    updateLevelOfInterest,
    updateNotes,
    updateAttendance,
    createAppointment
}

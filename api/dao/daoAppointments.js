const { now, insert } = require('~/services/db')

const daoAppointments = {
  createAppointment,
}

module.exports = daoAppointments

async function createAppointment({ enquiryId }) {
  const timestamp = now()

  return insert('appointments', {
    enquiry_id: enquiryId,
    kind: 'Posvet',
    created_at: timestamp,
    updated_at: timestamp,
  })
}

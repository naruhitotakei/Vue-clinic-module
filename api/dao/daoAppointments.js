const { pool, now } = require('~/services/db')

const daoAppointments = {
  createAppointment,
}

module.exports = daoAppointments

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
  console.log({ enquiryId, statement });
  const result = await pool.query(statement, [enquiryId]);

  return result.rows[0];
}

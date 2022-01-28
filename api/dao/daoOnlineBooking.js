require('dotenv').config()
const moment = require('moment-timezone')

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getOnlineBookingProducts = async (
  request,
  response,
  prm_client_id,
  scope,
  locale,
  premiseId,
) => {
  const statement = /* sql */ `
    SELECT
      online_booking_service.id,
      online_booking_service.default_duration,
      online_booking_service.default_online_price,
      online_booking_service_name.text AS booking_service_text,
      online_booking_service_name.language,
      users.id AS doctor_id,
      trim(concat(users.title, ' ', users.first_name, ' ', users.surname)) AS doctor_name,
      prm_company_premise.premise_id AS premise_id,
      prm_company_premise.premise_name,
      prm_product_group_name.text AS product_group_text,
      prm_product_group_name.language,
      prm_product_group.product_group_id AS product_group_id
    FROM online_booking_service
    LEFT JOIN online_booking_service_name ON online_booking_service.id = online_booking_service_name.online_booking_id
    LEFT JOIN prm_product_group ON online_booking_service.product_group_id = prm_product_group.product_group_id
    LEFT JOIN prm_product_group_name ON prm_product_group.product_group_id = prm_product_group_name.product_group_id
    LEFT JOIN online_booking_users_bridge ON online_booking_service.id = online_booking_users_bridge.online_booking_id
    LEFT JOIN users ON online_booking_users_bridge.doctor_id = users.id
    LEFT JOIN online_booking_premise_bridge ON online_booking_service.id = online_booking_premise_bridge.id
    LEFT JOIN prm_company_premise ON online_booking_premise_bridge.premise_id = prm_company_premise.premise_id
    WHERE online_booking_service.trashed IS FALSE AND online_booking_service_name.language = $1
    AND prm_product_group_name.language = $1
    AND prm_company_premise.premise_id = $2
    ${scope === 'PrmClient' ? /* sql */ `AND users.prm_client_id = $3` : ''}
    ORDER BY booking_service_text
  `

  const { rows } = await pool.query(statement, [
    locale,
    premiseId,
    ...(scope === 'PrmClient' ? [prm_client_id] : []),
  ])

  const grouped = rows.reduce((grouped, row) => {
    if (grouped[row.id] == null) {
      grouped[row.id] = []
    }

    grouped[row.id].push(row)

    return grouped
  }, {})

  return Object.entries(grouped)
    .map(([serviceId, rows]) => {
      const [{ doctor_id, doctor_name, ...service }] = rows

      return {
        ...service,
        doctors: rows
          .filter(({ doctor_id }) => doctor_id != null)
          .map(({ doctor_id, doctor_name }) => ({
            id: doctor_id,
            name: doctor_name,
          })),
      }
    })
    .sort(({ booking_service_text: a }, { booking_service_text: b }) =>
      a.localeCompare(b),
    )
}

const getOnlineBookingProductNaming = (request, response, id) => {
  pool.query(
    'SELECT language, text FROM online_booking_service_name WHERE online_booking_id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    },
  )
}

const getOnlineBookingProductsPublic = (request, response, locale) => {
  const statement = /* sql */ `
        SELECT
            online_booking_service.id,
            online_booking_service.default_duration,
            online_booking_service.default_online_price,
            online_booking_service_name.text
        FROM online_booking_service
        JOIN online_booking_service_name
        ON online_booking_service.id = online_booking_service_name.online_booking_id
        WHERE online_booking_service.id IN (
            SELECT DISTINCT online_booking_users_bridge.online_booking_id
            FROM appointment_slots
            JOIN online_booking_users_bridge
            ON appointment_slots.doctor_id = online_booking_users_bridge.doctor_id
            WHERE appointment_slots.appointment_id IS null
            AND appointment_slots.starts_at BETWEEN $1::date AND $1::date + interval '30' day
        )
        AND online_booking_service_name.language = $2
        ORDER BY online_booking_service_name.text
    `

  const startDate = moment()
    .tz('Europe/Ljubljana')
    .add(1, 'day')
    .format('YYYY-MM-DD')

  pool.query(statement, [startDate, locale], (error, results) => {
    if (error) {
      response.status(500).send(error)

      return
    }

    response.status(200).json(results.rows)
  })
}

const getOnlineBookingProductGroups = (
  request,
  response,
  prm_client_id,
  scope,
  locale,
) => {
  let statement =
    'SELECT prm_product_group.product_group_id AS id, prm_product_group_name.text AS text, '
  statement +=
    'prm_product_group_name.language AS language, prm_product_group.prm_client_id AS prm_client_id FROM prm_product_group '
  statement +=
    'LEFT JOIN prm_product_group_name ON prm_product_group_name.product_group_id = prm_product_group.product_group_id '
  statement += "WHERE language = '" + locale + "' "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += 'AND prm_client_id = ' + prm_client_id
  }
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPremises = (request, response, prm_client_id, scope) => {
  let statement =
    'SELECT premise_id AS id, premise_name AS name, prm_client_id FROM prm_company_premise '
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += 'WHERE prm_client_id = ' + prm_client_id
  }
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createOnlineBookingProduct = async (req, res, product) => {
  let productStatement = 'INSERT INTO online_booking_service ('
  if (product.default_duration) productStatement += 'default_duration,'
  if (product.default_online_price) productStatement += 'default_online_price,'
  if (product.product_group_id) productStatement += 'product_group_id,'
  productStatement += 'created_at'
  productStatement += ') VALUES ('
  if (product.default_duration)
    productStatement += "'" + product.default_duration + "',"
  if (product.default_online_price)
    productStatement += "'" + product.default_online_price + "',"
  if (product.product_group_id)
    productStatement += "'" + product.product_group_id + "',"
  productStatement += 'NOW()'
  productStatement += ') RETURNING id'
  pool.query(productStatement, async (error, results) => {
    if (error) {
      throw error
    }
    let serviceId = results.rows[0].id

    if (product.slovenian)
      createOnlineBookingNameStatement(
        'online_booking_service_name',
        'online_booking_id',
        serviceId,
        'sl',
        product.slovenian,
      )
    if (product.english)
      createOnlineBookingNameStatement(
        'online_booking_service_name',
        'online_booking_id',
        serviceId,
        'en',
        product.english,
      )
    if (product.italian)
      createOnlineBookingNameStatement(
        'online_booking_service_name',
        'online_booking_id',
        serviceId,
        'it',
        product.italian,
      )

    if (product.doctor_ids) {
      createOnlineBookingDoctorStatement(serviceId, product.doctor_ids)
    }

    if (product.premise_id)
      createOnlineBookingPremiseStatement(serviceId, product.premise_id)

    res.status(200).json('OK')
  })
}

const createOnlineBookingNameStatement = (
  table,
  idName,
  id,
  language,
  text,
) => {
  let statement =
    'INSERT INTO ' +
    table +
    ' (' +
    idName +
    ',language, text, created_at) VALUES (' +
    id +
    ",'" +
    language +
    "','" +
    text +
    "',NOW())"
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
}

const createOnlineBookingDoctorStatement = async (
  serviceId,
  doctorIds = [],
) => {
  if (doctorIds.length === 0) {
    return
  }

  const statement = /* sql */ `
    INSERT INTO online_booking_users_bridge (online_booking_id, doctor_id, created_at)
    VALUES ${doctorIds
      .map((_, index) => /* sql */ `($1, $${index + 2}, NOW())`)
      .join(',')}
  `

  await pool.query(statement, [serviceId, ...doctorIds])
}

const createOnlineBookingPremiseStatement = (serviceId, premiseId) => {
  let statement =
    'INSERT INTO online_booking_premise_bridge (online_booking_id, premise_id, created_at) VALUES (' +
    serviceId +
    ',' +
    premiseId +
    ',NOW())'
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
}

const deleteOnlineBookingProduct = (request, response, id) => {
  pool.query(
    'DELETE FROM online_booking_service WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json('OK')
    },
  )
}

const updateOnlineBookingProduct = async (req, res, id, product) => {
  var statement = 'UPDATE online_booking_service SET '
  if (product.default_duration)
    statement += "default_duration='" + product.default_duration + "',"
  if (product.default_online_price)
    statement += "default_online_price='" + product.default_online_price + "',"
  if (product.product_group_id)
    statement += "product_group_id='" + product.product_group_id + "',"
  statement = statement.slice(0, -1)
  statement += ' WHERE id=' + id
  if (product.slovenian)
    updateOnlineBookingNameStatement(
      'online_booking_service_name',
      'online_booking_id',
      id,
      'sl',
      product.slovenian,
    )
  if (product.english)
    updateOnlineBookingNameStatement(
      'online_booking_service_name',
      'online_booking_id',
      id,
      'en',
      product.english,
    )
  if (product.italian)
    updateOnlineBookingNameStatement(
      'online_booking_service_name',
      'online_booking_id',
      id,
      'it',
      product.italian,
    )
  if (product.doctor_ids) {
    const { assignmentsPermission } = require('~/shared/permission')
    const { getScope } = require('~/shared/get-scope')
    const { getDoctors } = require('~/dao/daoCalendar')
    const doctors = await getDoctors(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, assignmentsPermission),
    )
    updateOnlineBookingDoctorStatement(id, product.doctor_ids, doctors)
  }
  if (product.premise_id)
    updateOnlineBookingPremiseStatement(id, product.premise_id)
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
  res.status(200).json(product)
}

const updateOnlineBookingNameStatement = (
  table,
  idName,
  id,
  language,
  text,
) => {
  let statement =
    'UPDATE ' +
    table +
    " SET text='" +
    text +
    "' WHERE " +
    idName +
    '=' +
    id +
    " AND language ='" +
    language +
    "'"
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
}

const updateOnlineBookingDoctorStatement = async (
  serviceId,
  doctorIds = [],
  doctors = [],
) => {
  await Promise.all([
    (async () => {
      const doctorIdMap = doctorIds.reduce((doctorIdMap, id) => {
        doctorIdMap[id] = true

        return doctorIdMap
      }, {})
      const removedDoctorsIds = doctors
        .filter(({ id }) => doctorIdMap[id] == null)
        .map(({ id }) => id)

      if (removedDoctorsIds.length === 0) {
        return
      }

      const statement = /* sql */ `
        DELETE FROM online_booking_users_bridge
        WHERE online_booking_id = $1
        AND doctor_id IN (${removedDoctorsIds
          .map((_, index) => /* sql */ `$${index + 2}`)
          .join(',')})
      `

      await pool.query(statement, [serviceId, ...removedDoctorsIds])
    })(),
    (async () => {
      if (doctorIds.length === 0) {
        return
      }

      const statement = /* sql */ `
        INSERT INTO online_booking_users_bridge (online_booking_id, doctor_id, created_at)
        VALUES ${doctorIds
          .map((_, index) => /* sql */ `($1, $${index + 2}, NOW())`)
          .join(',')}
        ON CONFLICT ON CONSTRAINT online_booking_doctor_unique
        DO NOTHING;
      `

      await pool.query(statement, [serviceId, ...doctorIds])
    })(),
  ])
}

const updateOnlineBookingPremiseStatement = (serviceId, premiseId) => {
  let statement =
    'UPDATE online_booking_premise_bridge SET premise_id = ' +
    premiseId +
    ',updated_at = NOW() WHERE id = ' +
    serviceId
  pool.query(statement, (error, results) => {
    if (error) {
      throw error
    }
  })
}

module.exports = {
  getOnlineBookingProducts,
  getOnlineBookingProductNaming,
  getOnlineBookingProductsPublic,
  getOnlineBookingProductGroups,
  getPremises,
  createOnlineBookingProduct,
  deleteOnlineBookingProduct,
  updateOnlineBookingProduct,
}

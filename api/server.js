const moduleAlias = require('module-alias')
const get = require('lodash/get')

moduleAlias.addAliases({
  '~': __dirname,
})

const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1922e9135f0a45a292341f0137316fc7',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'development' ? true : false,
})
const session = require('express-session')
var cors = require('cors')
const app = express(),
  bodyParser = require('body-parser')
port = 3080

///////////////////////////////////
//
// brute force attack configuration
//
///////////////////////////////////t
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore()
const failCallback = function (req, res, next, nextValidRequestDate) {
  res
    .status(429)
    .json(
      'NOK: Too many failed attempts in a short period of time, please try again later',
    )
}
// Start slowing requests after 5 failed attempts for the same user
const userBruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 10 * 1000, // 10 seconds
  maxWait: 60 * 1000, // 1 minute
  failCallback: failCallback,
})

const daoUser = require('./dao/daoUser')
const daoHome = require('./dao/daoHome')
const daoEnquiries = require('./dao/daoEnquiries')
const daoAssignments = require('./dao/daoAssignments')
const daoStatistics = require('./dao/daoStatistics')
const daoReporting = require('./dao/daoReporting')
const daoCallCenter = require('./dao/daoCallCenter')
const fiscalVerification = require('./services/fiscalVerification')
const daoInvoices = require('./dao/daoInvoices')
const daoAdvPayments = require('./dao/daoAdvPayments')
const daoOffers = require('./dao/daoOffers')
const daoCodeLists = require('./dao/daoCodeLists')
const daoProducts = require('./dao/daoProducts')
const daoBusiness = require('./dao/daoBusiness')
const daoCountries = require('./dao/daoCountries')
const daoCalendar = require('./dao/daoCalendar')
const daoAppointments = require('./dao/daoAppointments')
const daoCompanies = require('./dao/daoCompanies')
const daoLocations = require('./dao/daoLocations')
const daoSmsTemplates = require('./dao/daoSmsTemplates')
const daoCompanyPremises = require('./dao/daoCompanyPremises')
const daoAppointmentSlots = require('./dao/daoAppointmentSlots')
const daoOnlineBooking = require('./dao/daoOnlineBooking')
const awsS3 = require('./services/awsS3')
const daoConfig = require('./dao/daoConfig')
const { getScope } = require('~/shared/get-scope')

app.use(
  fileUpload({
    createParentPath: true,
  }),
)
app.use(
  cors({
    origin: process.env.APP_URL || 'http://localhost:8080',
    credentials: true,
  }),
)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../prmApp/dist')))

// if (process.env.NODE_ENV === 'development') {
//   const cookieParser = require('cookie-parser')
//   app.use(cookieParser())
// }

app.use(
  session({
    // ...(() => {
    //   if (process.env.NODE_ENV === 'development') {
    //     //
    //   } else {
    //     return {}
    //   }

    //   const SQLiteStore = require('connect-sqlite3')(session)
    //   console.log('yooo')
    //   return {
    //     store: new SQLiteStore(),
    //   }
    // })(),
    resave: true,
    saveUninitialized: true,
    secret: 'BwhFeenj9DcRqANH',
    cookie: { maxAge: null },
  }),
)
app.use(rollbar.errorHandler())

///////////////////////////////////
//
// REST SERVER
//
///////////////////////////////////
const homePermission = 'Home'
const enquiriesPermission = 'Patients'
const { assignmentsPermission } = require('~/shared/permission')
const clinicStatisticsPermission = 'Statistics For Clinic'
const reportingEmazingPermission = 'Emazing'
const missingServicesPermission = 'Missing Services'
const invoicesPermission = 'Invoices'
const advPaymentsPermission = 'Advance Payments'
const offersPermission = 'Offers'
const productsPermission = 'Services and Products'
const calendarPermission = 'Calendar'
const appointmentsPermission = 'Appointments'
const locationsPermission = 'Locations'
const appointmentSlotsPermission = 'Free Slots'
const usersPermission = 'Users'
const onlineBookingPermission = 'Online Booking'
const SMSTemplatesPermission = 'SMS Templates'

///////////////////////////////////
// user login, logout, ...
///////////////////////////////////
app.set('trust proxy', 1)

if (process.env.NODE_ENV === 'development') {
  const { authMock } = require('~/middlewares/auth-mock')

  app.use(authMock)
}

// login - email and password in body
app.post(
  '/api/login',
  userBruteforce.getMiddleware({
    key: function (req, res, next) {
      next('req.body.loginEmail')
    },
  }),
  async function (req, res) {
    const credentials = req.body
    req.session.prm_user = await daoUser.loginUser(
      req,
      res,
      credentials.loginEmail,
      credentials.loginPassword,
    )
  },
)

// get loged user data
app.get('/api/login', (req, res) => {
  if (req.session.prm_user) {
    daoUser.getUserById(req, res, req.session.prm_user.id)
  } else {
    res.status(200).json('NOK: user not logged in')
  }
})

// logout user
app.get('/api/logout', (req, res) => {
  delete req.session.prm_user
  return res.status(200).json('OK: user logged out')
})

// /api/hash?password=
app.get('/api/hash', (req, res) => {
  var password = req.param('password')
  daoUser.hash(req, res, password)
})

// /api/password
app.post('/api/password', async function (req, res) {
  const credentials = req.body
  if (req.session.prm_user) {
    daoUser.changePassword(
      req,
      res,
      req.session.prm_user.email,
      req.session.prm_user.prm_password_hash,
      credentials,
    )
  } else {
    res.status(200).json('NOK: user not logged in')
  }
})

// /api/password
app.post('/api/profile', async function (req, res) {
  const data = req.body
  if (req.session.prm_user) {
    daoUser.editProfile(req, res, data)
  } else {
    res.status(200).json('NOK: user not logged in')
  }
})

// /change locale
app.post('/api/profile/change-lang', async function (req, res) {
  const data = req.body
  if (req.session.prm_user) {
    daoUser.changeLang(req, res, data)
  } else {
    res.status(200).json('NOK: user not logged in')
  }
})

// record sign in time
app.put('/api/sign-in-time', (req, res) => {
  const id = req.session.prm_user.id
  if (req.session.prm_user) daoUser.recordSignInTime(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/dentists', async function (req, res) {
  if (req.session.prm_user) {
    daoUser.getDentists(req, res, req.session.prm_user.prm_client_id)
  } else {
    res.status(200).json('NOK: user not logged in')
  }
})

app.get('/api/surgeons', async function (req, res) {
  if (req.session.prm_user) {
    daoUser.getSurgeons(req, res, req.session.prm_user.prm_client_id)
  } else {
    res.status(200).json('NOK: user not logged in')
  }
})

app.get('/api/legacy-doctors', async function (req, res) {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  ) {
    daoUser.getLegacyDoctors(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, enquiriesPermission),
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

///////////////////////////////////
// home
///////////////////////////////////

app.get('/api/home/todays-appointments/:locale', (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, homePermission)
  )
    daoHome.getTodaysAppointments(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.prm_client_id,
      locale,
      getScope(req.session.prm_user.permissions, homePermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/home/staff', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, homePermission)
  )
    daoHome.getStaff(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, homePermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/home/open-assignments', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, homePermission)
  )
    daoHome.getAssignmentsForUser(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/home/appointments-for-two-weeks', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, homePermission)
  )
    daoHome.getAppointmentsForTwoWeeks(
      req,
      res,
      getScope(req.session.prm_user.permissions, homePermission),
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// calendar
///////////////////////////////////
app.get('/api/calendar/:statrtdate/:enddate/:lang', (req, res) => {
  const statrtdate = req.params.statrtdate
  const enddate = req.params.enddate
  var selctedIds = req.query.selctedIds
  let lang = req.params.lang
  if (selctedIds) {
    selctedIds = JSON.parse(selctedIds)
  }
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.getApontments(
      req,
      res,
      statrtdate,
      enddate,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      selctedIds,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, calendarPermission),
      lang,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/calendar/labels/:lang', (req, res) => {
  let lang = req.params.lang
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.getLabels(req, res, lang)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/calendar', (req, res) => {
  const appointment = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.createAppointment(req, res, appointment)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/calendar/doctors', async (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  ) {
    const doctors = await daoCalendar.getDoctors(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, calendarPermission),
    )

    return res.status(200).json(doctors)
  } else res.status(401).json('OK: user unauthorized')
})

app.put('/api/calendar/:id', (req, res) => {
  const id = req.params.id
  const appointment = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.updateAppointments(req, res, id, appointment)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/calendar/label/:id', (req, res) => {
  const id = req.params.id
  const appointmentLabel = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.updateAppointmentsLabel(req, res, id, appointmentLabel)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/calendar/label', (req, res) => {
  const appointmentLabel = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.createAppointmentsLabel(
      req,
      res,
      appointmentLabel,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/calendar/label/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, calendarPermission)
  )
    daoCalendar.deleteAppointmentsLabel(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// appointments
///////////////////////////////////

app.get('/api/appointments/locations', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.getAllAppointmentsLocations(
      req,
      res,
      getScope(req.session.prm_user.permissions, appointmentsPermission),
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/appointments/doctors', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.getAllAppointmentsDoctors(
      req,
      res,
      getScope(req.session.prm_user.permissions, appointmentsPermission),
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/appointments', (req, res) => {
  const location = req.query.location
  const doctor = req.query.doctor
  const date = req.query.date
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.getAppointments(
      req,
      res,
      location,
      doctor,
      date,
      getScope(req.session.prm_user.permissions, appointmentsPermission),
      req.session.prm_user.prm_client_id,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_locale,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/appointments/update_interest', (req, res) => {
  const appointmentID = req.body.id
  const levelOfInterest = req.body.interest

  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.updateLevelOfInterest(
      req,
      res,
      appointmentID,
      levelOfInterest,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/appointments/update_clinic_notes', (req, res) => {
  const appointmentID = req.body.id
  const clinicNotes = req.body.clinicNotes

  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.updateClinicNotes(req, res, appointmentID, clinicNotes)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/appointments/update_call_center_notes', (req, res) => {
  const appointmentID = req.body.id
  const callCenterNotes = req.body.callCenterNotes

  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.updateCallCenterNotes(
      req,
      res,
      appointmentID,
      callCenterNotes,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/appointments/update_attendance', (req, res) => {
  const appointmentID = req.body.id
  const attendance = req.body.attendance

  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, appointmentsPermission)
  )
    daoAppointments.updateAttendance(req, res, appointmentID, attendance)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// free slots
///////////////////////////////////

app.get('/api/calendar/free-slots', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      appointmentSlotsPermission,
    )
  )
    daoAppointmentSlots.getFreeSlots(
      req,
      res,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/calendar/create-free-slots', (req, res) => {
  const slot = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      appointmentSlotsPermission,
    )
  )
    daoAppointmentSlots.createFreeSlots(
      req,
      res,
      slot,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/calendar/delete-free-slot/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      appointmentSlotsPermission,
    )
  )
    daoAppointmentSlots.deleteFreeSlot(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// products
///////////////////////////////////
app.get('/api/products/:locale', (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProducts(req, res, locale)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/products/:id/product-naming', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductNaming(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/productGroups/:locale', (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductGroups(req, res, locale)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/productGroups/:id/product-naming', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductGroupNaming(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/productTypes', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductTypes(req, res)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/products', (req, res) => {
  const product = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.createProduct(req, res, product)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/products/:id', (req, res) => {
  const id = req.params.id
  const product = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.updateProduct(req, res, id, product)
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.deleteProduct(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/productGroups', (req, res) => {
  const productGroup = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.createProductGroup(req, res, productGroup)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/productGroups/:id', (req, res) => {
  const id = req.params.id
  const productGroup = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.updateProductGroup(req, res, id, productGroup)
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/productGroups/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.deleteProductGroup(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/productCategories/:locale', (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductCategories(req, res, locale)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/productCategories/:id/product-naming', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductCategoryNaming(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/productCategories', (req, res) => {
  const productCategory = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.createProductCategory(req, res, productCategory)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/productCategories/:id', (req, res) => {
  const id = req.params.id
  const productCategory = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.updateProductCategory(req, res, id, productCategory)
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/productCategories/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.deleteProductCategory(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/productGroups/:id/product-naming', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getProductGroupNaming(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/old-products/', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoProducts.getOldProducts(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, productsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// business
///////////////////////////////////

app.get('/api/business/:locale', (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoBusiness.getBusiness(req, res, locale)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/business/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoBusiness.getBusinessByID(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/business/:id', (req, res) => {
  const id = req.params.id
  const business = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoBusiness.updateBusiness(req, res, id, business)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/business', (req, res) => {
  const business = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoBusiness.createBusiness(req, res, business)
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/business/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoBusiness.deleteBusiness(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// countries
///////////////////////////////////
app.get('/api/countries/', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoCountries.getCountries(req, res)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// locations
///////////////////////////////////

app.get('/api/locations', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, locationsPermission)
  )
    daoLocations.getLocationsList(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, locationsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/inactive-locations', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, locationsPermission)
  )
    daoLocations.getInactiveLocationsList(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, locationsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/get-premises-for-locations', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, locationsPermission)
  )
    daoLocations.getPremises(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, locationsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/locations', (req, res) => {
  const location = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, locationsPermission)
  )
    daoLocations.createLocation(
      req,
      res,
      location,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/locations/:id', (req, res) => {
  const id = req.params.id
  const location = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, locationsPermission)
  )
    daoLocations.updateLocation(req, res, id, location)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/locations/:id/activation', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, locationsPermission)
  )
    daoLocations.toggleActivity(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// settings -> users
///////////////////////////////////

app.get('/api/users', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, usersPermission)
  ) {
    daoUser.getUsers(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, usersPermission),
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.get('/api/users-roles', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, usersPermission)
  ) {
    daoUser.getRoles(req, res)
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const user = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, usersPermission)
  ) {
    daoUser.updateUser(req, res, id, user)
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.get('/api/users-assignments', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, usersPermission)
  ) {
    daoUser.getUsersForAssignments(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, usersPermission),
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

///////////////////////////////////
// settings -> sms templates
///////////////////////////////////

app.get('/api/sms-templates', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, SMSTemplatesPermission)
  ) {
    daoSmsTemplates.getSmsTemplates(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, SMSTemplatesPermission),
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.get('/api/sms-template/:id', (req, res) => {
  const templateID = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, SMSTemplatesPermission)
  ) {
    daoSmsTemplates.getSmsTemplate(req, res, templateID)
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.put('/api/sms-template/update', (req, res) => {
  const templateID = req.body.id
  const templateName = req.body.name
  const templateContent = req.body.content
  const templateSlug = req.body.slug
  const templateLang = req.body.language
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, SMSTemplatesPermission)
  ) {
    daoSmsTemplates.updateSmsTemplate(
      req,
      res,
      templateID,
      templateName,
      templateContent,
      templateSlug,
      templateLang,
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

///////////////////////////////////
// settings -> online booking
///////////////////////////////////

app.get('/api/online-booking-products/:locale', async (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  ) {
    const products = await daoOnlineBooking.getOnlineBookingProducts(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, onlineBookingPermission),
      locale,
      req.query.premiseId,
    )

    return res.status(200).json(products)
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.get('/api/online-booking-products/:id/naming', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  )
    daoOnlineBooking.getOnlineBookingProductNaming(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/online-booking-product-groups/:locale', (req, res) => {
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  ) {
    daoOnlineBooking.getOnlineBookingProductGroups(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, onlineBookingPermission),
      locale,
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.get('/api/premises', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  ) {
    daoOnlineBooking.getPremises(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, onlineBookingPermission),
    )
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.post('/api/add-online-booking-service', (req, res) => {
  const onlineBookingService = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  )
    daoOnlineBooking.createOnlineBookingProduct(req, res, onlineBookingService)
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/delete-online-booking-service/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  )
    daoOnlineBooking.deleteOnlineBookingProduct(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/update-online-booking-service/:id', (req, res) => {
  const id = req.params.id
  const service = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, onlineBookingPermission)
  )
    daoOnlineBooking.updateOnlineBookingProduct(req, res, id, service)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// enquiries, patients
///////////////////////////////////

app.get('/api/enquiries', (req, res) => {
  let sortBy = req.query.sort
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiries(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, enquiriesPermission),
      sortBy,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/patients', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getPatients(
      req,
      res,
      getScope(req.session.prm_user.permissions, enquiriesPermission),
      req.session.prm_user.prm_client_id,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiriesById(
      req,
      res,
      id,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/notes', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryNotes(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/enquiries/notes', (req, res) => {
  const notes = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.createEnquiryNotes(req, res, notes)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/:locale/past-appointments', (req, res) => {
  const id = req.params.id
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryPastAppointments(req, res, id, locale)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/:locale/future-appointments', (req, res) => {
  const id = req.params.id
  const locale = req.params.locale
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryFutureAppointments(req, res, id, locale)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/assignments', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryAssignments(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/sms', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquirySMS(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/invoices', (req, res) => {
  const id = req.params.id
  let sortBy = req.query.sort
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryInvoices(req, res, id, sortBy)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/services', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryServices(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/enquiries/:id/services', (req, res) => {
  const id = req.params.id
  const service = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.createEnquiryService(req, res, id, service)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/enquiries/:id/offers', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.getEnquiryOffers(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/enquiries', (req, res) => {
  const enquiry = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.createEnquiry(
      req,
      res,
      enquiry,
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/enquiries/:id/update-enquiry', (req, res) => {
  const enquiry = req.body
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.updateEnquiry(req, res, id, enquiry)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/enquiries/:id/trashed', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, enquiriesPermission)
  )
    daoEnquiries.trashEnquiry(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/apitest/createenquiries', (req, res) => {
  const enquiry = {
    name: 'aaaaaa',
    phone: '123',
    email: 'email',
    client_id: 23,
    gender: 'female',
    last_name: 'priimek',
    lead_owner_id: 0,
  }
  daoEnquiries.createEnquiry(req, res, enquiry)
})

app.get('/apitest/deleteenquiries/:id', (req, res) => {
  const id = req.params.id
  daoEnquiries.deleteEnquiries(req, res, id)
})

///////////////////////////////////
// assignments
///////////////////////////////////
app.get('/api/assignments/:due', (req, res) => {
  const due = req.params.due
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoAssignments.getAssignments(
      req,
      res,
      getScope(req.session.prm_user.permissions, assignmentsPermission),
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      due,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/assignments', (req, res) => {
  const assignmentDescriptor = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoAssignments.finishAssignment(req, res, assignmentDescriptor)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/assignments-create', (req, res) => {
  const assignment = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoAssignments.createAssignment(req, res, assignment)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/assignments-update', (req, res) => {
  const assignment = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoAssignments.createAssignment(req, res, assignment)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/assignments/:id', (req, res) => {
  const id = req.params.id
  const assignment = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, productsPermission)
  )
    daoAssignments.updateAssignment(req, res, id, assignment)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// companies TODO: Check permissions for accessing companies
///////////////////////////////////
app.get('/api/companies', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoCompanies.getCompanies(req, res)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/companies/:id', (req, res) => {
  const id = req.params.id

  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoCompanies.getCompanyById(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/companies/', (req, res) => {
  const company = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoCompanies.createCompany(req, res, company)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/companies/:id', (req, res) => {
  const id = req.params.id
  const company = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoCompanies.updateCompany(req, res, id, company)
  else res.status(401).json('OK: user unauthorized')
})

app.delete('/api/companies/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, assignmentsPermission)
  )
    daoCompanies.deleteCompany(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// invoices, fiscal verification
///////////////////////////////////
app.get('/api/invoice/premises/:premiseId', (req, res) => {
  const premiseId = req.params.premiseId
  // todo which permission?
  // todo which company (cert, vat)

  fiscalVerification.registerPremises(premiseId)
})

app.get('/api/invoices', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getInvoices(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, invoicesPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/invoices/serial-number', (req, res) => {
  const data = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getSerialForInvoiceNumberBasedOnType(req, res, data)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/invoices/furs-serial-number', (req, res) => {
  const data = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getSerialForFursInvoiceNumberBasedOnType(req, res, data)
  else res.status(401).json('OK: user unauthorized')
})

app.post('/api/invoices', (req, res) => {
  const invoice = req.body
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  ) {
    daoInvoices
      .createInvoices(req, res, invoice)
      .then((result) => {
        const invoiceId = get(result, '[0].rows[0].invoice_id')
        if (invoiceId) {
          res.status(200).json(invoiceId)
        } else {
          res.status(400).json('Invoice id not found!')
        }
      })
      .catch((reason) => {
        console.error(reason)
        res.status(400).json(reason)
      })
  } else {
    res.status(401).json('OK: user unauthorized')
  }
})

app.put('/api/invoices/:id', (req, res) => {
  const id = req.params.id
  const invoice = req.body

  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.updateInvoices(req, res, id, invoice)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/invoices/:id', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getInvoiceById(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/invoices/company/:id/consecutive-number', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getConsecutiveInvoiceNumberForCompany(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/invoices/:id/items', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getItemsOfInvoiceById(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/invoices/:id/payment-items', (req, res) => {
  const id = req.params.id
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, invoicesPermission)
  )
    daoInvoices.getPaymentItemsOfInvoiceById(req, res, id)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/advPayments', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, advPaymentsPermission)
  )
    daoAdvPayments.getAdvPayments(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, advPaymentsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/offers', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, offersPermission)
  )
    daoOffers.getOffers(
      req,
      res,
      req.session.prm_user.id,
      req.session.prm_user.accessible_user_ids,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, offersPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// statistics & Reporting
///////////////////////////////////
app.get('/api/statistics/clinic', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoReporting.getClinicStatistics(
      req,
      res,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/clinic/attendance', (req, res) => {
  const clinicId = 123 // todo - get it from session
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoStatistics.getClinicAttendance(req, res, clinicId)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/visits-by-country', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, homePermission)
  )
    daoStatistics.getVisitsByCountryInAWeek(
      req,
      res,
      getScope(req.session.prm_user.permissions, homePermission),
      req.session.prm_user.prm_client_id,
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/doctors-per-week', (req, res) => {
  if (req.session.prm_user && req.session.prm_user.permissions)
    daoStatistics.getDoctorsStatisticPerWeek(req, res)
  else res.status(401).json('OK: user unauthorized')
})

app.get(
  '/api/report/emazing/services/:statrtdate/:enddate/:countrie',
  (req, res) => {
    const statrtdate = req.params.statrtdate
    const enddate = req.params.enddate
    const countrie = req.params.countrie
    if (
      req.session.prm_user &&
      req.session.prm_user.permissions &&
      checkPermission(
        req.session.prm_user.permissions,
        reportingEmazingPermission,
      )
    )
      daoReporting.getEmazingServicesReport(
        req,
        res,
        statrtdate,
        enddate,
        countrie,
        req.session.prm_user.prm_client_id,
        getScope(req.session.prm_user.permissions, reportingEmazingPermission),
      )
    else res.status(401).json('OK: user unauthorized')
  },
)

app.get(
  '/api/report/emazing/serviceslist/:statrtdate/:enddate/:countrie',
  (req, res) => {
    const statrtdate = req.params.statrtdate
    const enddate = req.params.enddate
    const countrie = req.params.countrie
    if (
      req.session.prm_user &&
      req.session.prm_user.permissions &&
      checkPermission(
        req.session.prm_user.permissions,
        reportingEmazingPermission,
      )
    )
      daoReporting.getServiceList(
        req,
        res,
        statrtdate,
        enddate,
        countrie,
        req.session.prm_user.prm_client_id,
        getScope(req.session.prm_user.permissions, reportingEmazingPermission),
      )
    else res.status(401).json('OK: user unauthorized')
  },
)

app.get('/api/report/emazing/countrylist/:statrtdate/:enddate', (req, res) => {
  const statrtdate = req.params.statrtdate
  const enddate = req.params.enddate
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      reportingEmazingPermission,
    )
  )
    daoReporting.getCountryList(req, res, statrtdate, enddate)
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/clinic-stats/:start/:end', (req, res) => {
  const start = req.params.start
  const end = req.params.end
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoStatistics.getClinicStats(
      req,
      res,
      start,
      end,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/revenue-by-product/:start/:end', (req, res) => {
  const start = req.params.start
  const end = req.params.end
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoStatistics.getRevenueByProduct(
      req,
      res,
      start,
      end,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/revenue-by-doctor/:start/:end', (req, res) => {
  const start = req.params.start
  const end = req.params.end
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoStatistics.getRevenueByDoctor(
      req,
      res,
      start,
      end,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/new-leads/:start/:end', (req, res) => {
  const start = req.params.start
  const end = req.params.end
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoStatistics.getNewEnquiriesPerDay(
      req,
      res,
      start,
      end,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/statistics/new-enquiries/:start/:end', (req, res) => {
  const start = req.params.start
  const end = req.params.end
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(
      req.session.prm_user.permissions,
      clinicStatisticsPermission,
    )
  )
    daoStatistics.getNewEnquiries(
      req,
      res,
      start,
      end,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get(
  '/api/statistics/appointments-by-product/:start/:end/:locale',
  (req, res) => {
    const start = req.params.start
    const end = req.params.end
    const locale = req.params.locale
    if (
      req.session.prm_user &&
      req.session.prm_user.permissions &&
      checkPermission(
        req.session.prm_user.permissions,
        clinicStatisticsPermission,
      )
    )
      daoStatistics.getAppointmentsByProduct(
        req,
        res,
        start,
        end,
        req.session.prm_user.prm_client_id,
        getScope(req.session.prm_user.permissions, clinicStatisticsPermission),
        locale,
      )
    else res.status(401).json('OK: user unauthorized')
  },
)

///////////////////////////////////
// Call Center
///////////////////////////////////

app.get('/api/call-center/missing-services/:start/:end', (req, res) => {
  const start = req.params.start
  const end = req.params.end
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, missingServicesPermission)
  )
    daoCallCenter.getAppointmentsWithMissingServices(
      req,
      res,
      start,
      end,
      req.session.prm_user.prm_client_id,
      getScope(req.session.prm_user.permissions, missingServicesPermission),
    )
  else res.status(401).json('OK: user unauthorized')
})

app.get('/api/call-center/prm-client-info', (req, res) => {
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, missingServicesPermission)
  )
    daoCallCenter.getPrmClientInfo(req, res, req.session.prm_user.prm_client_id)
  else res.status(401).json('OK: user unauthorized')
})

app.put('/api/call-center/update-prm-client-info', (req, res) => {
  const info = req.body.info
  if (
    req.session.prm_user &&
    req.session.prm_user.permissions &&
    checkPermission(req.session.prm_user.permissions, missingServicesPermission)
  )
    daoCallCenter.updatePrmClientInfo(
      req,
      res,
      req.session.prm_user.prm_client_id,
      info,
    )
  else res.status(401).json('OK: user unauthorized')
})

///////////////////////////////////
// codelist methodes
///////////////////////////////////
app.get('/api/codelist/countries', (req, res) => {
  daoCodeLists.getCountriesList(req, res)
})

app.get('/api/codelist/countries-with-patients', (req, res) => {
  daoCodeLists.getCountriesWithPatients(req, res)
})

app.get('/api/codelist/regions', (req, res) => {
  daoCodeLists.getRegionsList(req, res)
})

app.get('/api/codelist/municipalities', (req, res) => {
  daoCodeLists.getMunicipalitiesList(req, res)
})

app.get('/api/codelist/locations', (req, res) => {
  daoCodeLists.getLocationsList(req, res)
})

app.get('/api/codelist/country/:id/tax-rate', (req, res) => {
  const id = req.params.id
  daoCodeLists.getTaxRateList(req, res, id)
})

app.get('/api/codelist/clients', (req, res) => {
  daoCodeLists.getClients(req, res)
})

app.get('/api/codelist/week-dates', (req, res) => {
  daoCodeLists.getDatesForCurrentWeek(req, res)
})

///////////////////////////////////
// company premises
///////////////////////////////////
app.get('/api/company-premises', (req, res) => {
  daoCompanyPremises.getCompanyPremises(req, res)
})

app.post('/api/company-premises/check-business-id', (req, res) => {
  const data = req.body
  daoCompanyPremises.checkBusinessIdUniquness(req, res, data)
})

app.post('/api/company-premises', (req, res) => {
  const premise = req.body
  daoCompanyPremises.createPremise(req, res, premise)
})

app.put('/api/company-premises/:id', (req, res) => {
  const id = req.params.id
  const premise = req.body
  daoCompanyPremises.updatePremise(req, res, id, premise)
})

app.get('/api/company-premises/:id', (req, res) => {
  const id = req.params.id
  daoCompanyPremises.getCompanyPremiseById(req, res, id)
})

app.delete('/api/company-premises/:id', (req, res) => {
  const id = req.params.id
  daoCompanyPremises.deletePremise(req, res, id)
})

app.get('/api/company-premise-devices', (req, res) => {
  daoCompanyPremises.getCompanyPremiseDevices(req, res)
})

app.post(
  '/api/company-premise-devices/check-electronic-device-id',
  (req, res) => {
    const data = req.body
    daoCompanyPremises.checkElectronicDeviceIdUniquness(req, res, data)
  },
)

app.post('/api/add-premise-device', (req, res) => {
  const premiseDevice = req.body
  daoCompanyPremises.createPremiseDevice(req, res, premiseDevice)
})

app.put('/api/company-premise-devices/:id', (req, res) => {
  const id = req.params.id
  const premiseDevice = req.body
  daoCompanyPremises.updatePremiseDevice(req, res, id, premiseDevice)
})

app.get('/api/company-premise-devices/:id', (req, res) => {
  const id = req.params.id
  daoCompanyPremises.getCompanyPremiseDeviceById(req, res, id)
})

app.delete('/api/company-premise-devices/:id', (req, res) => {
  const id = req.params.id
  daoCompanyPremises.deletePremiseDevice(req, res, id)
})

app.get('/api/:companyId/company-premises', (req, res) => {
  const companyId = req.params.companyId
  daoCompanyPremises.getPremisesForCompany(req, res, companyId)
})

app.get('/api/company-premises/:companyPremiseId/devices', (req, res) => {
  const companyPremiseId = req.params.companyPremiseId
  daoCompanyPremises.getDevicesForCompanyPremise(req, res, companyPremiseId)
})

////////////////////////////////////
// Files
///////////////////////////////////
app.get('/api/files/', async function (req, res) {
  if (req.session.prm_user) {
    const rv = await awsS3.listBucketObjects()
    res.status(200).json(rv)
  } else res.status(401).json('OK: user unauthorized')
})

app.get('/api/:prefix/files/', async function (req, res) {
  let prefix = req.params.prefix
  if (req.session.prm_user) {
    const rv = await awsS3.listBucketObjectsWithPrefix(prefix)
    res.status(200).json(rv)
  } else res.status(401).json('OK: user unauthorized')
})

app.get('/api/files/:fileName/download', async function (req, res) {
  let fileName = req.params.fileName
  if (req.session.prm_user) {
    const rv = await awsS3.download(fileName)
    res.status(200).json(rv)
  } else res.status(401).json('OK: user unauthorized')
})

app.post('/api/files/upload/:id', async function (req, res) {
  let id = req.params.id
  if (req.session.prm_user) {
    const rv = await awsS3.fileUpload(
      id,
      id + '-picture-' + Date.now(),
      req.files.file.data,
      req.files.file.mimetype,
    )
    res.status(200).json(rv)
  } else res.status(401).json('OK: user unauthorized')
})

app.post('/api/files/avatar', async function (req, res) {
  let files = req.files
  if (req.session.prm_user) {
    const rv = await awsS3.upload(
      'avatar-' + req.session.prm_user.id,
      req.files.file.data,
      req.files.file.mimetype,
      'avatar-' + req.session.prm_user.id,
      'avatar',
    )
    res.status(200).json(rv.status)
  } else res.status(401).json('OK: user unauthorized')
})

app.get('/api/files/avatar', async function (req, res) {
  if (req.session.prm_user) {
    const rv = await awsS3.download('avatar-' + req.session.prm_user.id)
    if (rv.status == 'OK') {
      res.writeHead(200, {
        'Content-Disposition':
          `attachment; filename=` + 'avatar-' + req.session.prm_user.id,
        'Content-Type': rv.data.ContentType,
      })
      const download = Buffer.from(rv.data.Body)
      res.end(download)
    } else {
      res.download('./resources/avatar-default.png', 'avatar-default.png')
    }
  } else res.status(401).json('OK: user unauthorized')
})

app.get('/api/files/:key', async function (req, res) {
  let key = req.params.key
  if (req.session.prm_user) {
    const rv = await awsS3.download(key)
    if (rv.status == 'OK') {
      // res.writeHead(200, {
      //   'Content-Disposition': `attachment; filename=` + 'avatar-' + req.session.prm_user.id,
      //   'Content-Type': rv.data.ContentType,
      // })
      const download = Buffer.from(rv.data.Body)
      res.end(download)
    } else {
      res.download('./resources/avatar-default.png', 'avatar-default.png')
    }
  } else res.status(401).json('OK: user unauthorized')
})

app.post('/api/files/avatar/:id', async function (req, res) {
  let id = req.params.id
  if (req.session.prm_user) {
    const rv = await awsS3.upload(
      'avatar-' + id,
      req.files.file.data,
      req.files.file.mimetype,
      'avatar-' + id,
      'avatar',
    )
    res.status(200).json(rv.status)
  } else res.status(401).json('OK: user unauthorized')
})

app.get('/api/files/avatar/:id', async function (req, res) {
  let id = req.params.id
  const rv = await awsS3.download('avatar-' + id)
  if (rv.status == 'OK') {
    const download = Buffer.from(rv.data.Body)
    res.end(download)
  } else {
    res.download('./resources/avatar-default.png', 'avatar-default.png')
  }
})

///////////////////////////////////
// common methodes
///////////////////////////////////
const checkPermission = function (permissionsList, permission) {
  if (!permissionsList) return false
  for (var i = 0; i < permissionsList.length; i++) {
    if (permissionsList[i].resource_name == permission) return true
  }
  return false
}

///////////////////////////////////
// Server
///////////////////////////////////
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../prmApp/build/index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})

///////////////////////////////////
// booking methods
///////////////////////////////////
app.post('/api/booking/sendsms', (req, res) => {
  const phone = req.body.phone

  if (phone) {
    const vonage = require('./services/vonage')

    vonage.verify.request(
      {
        number: phone,
        brand: 'SMART PRM Dental',
      },
      (error, result) => {
        if (error) {
          res.status(500)
        } else {
          const { request_id } = result
          res.status(200).json({
            success: true,
            result,
            requestId: request_id,
          })
        }
      },
    )
  } else {
    res.status(400).json('No phone number')
  }
})

app.post('/api/booking/confirm-and-save', (req, res) => {
  const { code, selectedSlot, requestId } = req.body

  if (code) {
    const vonage = require('./services/vonage')

    vonage.verify.check(
      {
        request_id: requestId,
        code,
      },
      (error, result) => {
        if (error != null) {
          res.status(500)

          return
        }

        if (result.status === '16') {
          res.status(422).json(result)

          return
        }

        if (result.status !== '0') {
          res.status(500)

          return
        }

        res.status(200).json({ success: true, code, selectedSlot, result })
      },
    )
  } else {
    res.status(400).json('No confirmation code')
  }
})

app.get('/api/config', (request, response) => {
  daoConfig.getConfig(
    request,
    response,
    request.headers['x-real-ip'],
    request.query.premiseId,
  )
})

app.use('/api/available-services', require('~/controllers/available-services'))
app.use('/api/available-dates', require('~/controllers/available-dates'))
app.use('/api/available-doctors', require('~/controllers/available-doctors'))
app.use('/api/appointment-slots', require('~/controllers/appointment-slots'))
app.use('/api/appointments', require('~/controllers/appointments'))
app.get('/api/public/online-booking-products', (req, res) => {
  const locale = req.query.locale
  daoOnlineBooking.getOnlineBookingProductsPublic(req, res, locale)
})

app.post('/api/files/logo/:id', async function (req, res) {
  if (req.session.prm_user == null) {
    res.status(401).send('user unauthorized')

    return
  }

  const { id } = req.params
  const { logo } = req.files
  const rv = await awsS3.upload(
    `logo-${id}`,
    logo.data,
    logo.mimetype,
    `logo-${id}`,
    'logo',
  )

  res.status(200).json(rv.status)
})

app.get('/api/files/logo/:id', async function (req, res) {
  let id = req.params.id
  const rv = await awsS3.download(`logo-${id}`)

  if (rv.status !== 'OK') {
    res.download('./resources/avatar-default.png', 'avatar-default.png')

    return
  }

  const download = Buffer.from(rv.data.Body)
  res.end(download)
})

app.get('/api/debug', (request, response) => {
  const { query, body, ip, headers } = request
  const result = { query, body, ip, headers }

  response.json(result)
})

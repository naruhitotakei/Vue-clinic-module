const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: '1922e9135f0a45a292341f0137316fc7',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'development' ? true : false
});
const session = require("express-session");
var cors = require('cors')
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const daoUser = require('./dao/daoUser')
const daoEnquiries = require('./dao/daoEnquiries')
const daoAssignments = require('./dao/daoAssignments')
const daoStatistics = require('./dao/daoStatistics')
const daoReporting = require('./dao/daoReporting')
const fiscalVerification = require('./services/fiscalVerification')
const daoInvoices = require('./dao/daoInvoices')
const daoAdvPayments = require('./dao/daoAdvPayments')
const daoOffers = require('./dao/daoOffers')
const daoCodeLists = require('./dao/daoCodeLists')
const daoProducts = require('./dao/daoProducts')
const daoBusiness = require('./dao/daoBusiness')
const daoCountries = require('./dao/daoCountries')
const daoCalendar = require('./dao/daoCalendar')
const daoCompanies = require('./dao/daoCompanies')
const daoLocations = require('./dao/daoLocations')
const daoCompanyPremises = require('./dao/daoCompanyPremises')
const awsS3 = require('./services/awsS3')

app.use(fileUpload({
    createParentPath: true
}));
app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:8080',
    credentials: true
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../prmApp/dist')));
app.use(session({resave: true, saveUninitialized: true, secret: 'BwhFeenj9DcRqANH', cookie: { maxAge: null }}));
app.use(rollbar.errorHandler());
 
///////////////////////////////////
//
// REST SERVER
//
///////////////////////////////////
const enquiriesPermission = "Patients"
const assignmentsPermission = "Assignments"
const clinicStatisticsPermission = "Statistics For Clinic"
const reportingEmazingPermission = "Emazing"
const invoicesPermission = "Invoices"
const advPaymentsPermission = "Advance Payments"
const offersPermission = "Offers"
const productsPermission = "Services and Products"
const calendarPermission = "Calendar"
const locationsPermission = "Locations"
const usersPermission = "Users"

///////////////////////////////////
// user login, logout, ...
///////////////////////////////////

// login - email and password in body
app.post('/api/login', async function(req, res) {
   const credentials = req.body
   req.session.prm_user = await daoUser.loginUser(req, res, credentials.loginEmail, credentials.loginPassword)
});

// get loged user data
app.get('/api/login', (req, res) => {
   if (req.session.prm_user) { 
        daoUser.getUserById(req, res, req.session.prm_user.id)
   } else {
       res.status(200).json("NOK: user not logged in")
   }
});

// logout user
app.get('/api/logout', (req, res) => {
   delete req.session.prm_user
   return res.status(200).json("OK: user logged out")
});

// /api/hash?password=
app.get('/api/hash', (req, res) => { 
    var password = req.param('password');
    daoUser.hash(req, res, password) 
});

// /api/password
app.post('/api/password', async function(req, res) {
    const credentials = req.body
    if (req.session.prm_user) { 
        daoUser.changePassword(req, res, req.session.prm_user.email, req.session.prm_user.prm_password_hash, credentials)
    } else {
       res.status(200).json("NOK: user not logged in")
    }    
});

// /api/password
app.post('/api/profile', async function(req, res) {
    const data = req.body
    if (req.session.prm_user) { 
        daoUser.editProfile(req, res, data)
    } else {
       res.status(200).json("NOK: user not logged in")
    }    
});

app.post('/api/profile/change-lang', async function(req, res) {
  const data = req.body
  if (req.session.prm_user) {
    daoUser.changeLang(req, res, data)
  } else {
    res.status(200).json("NOK: user not logged in")
  }
});

app.get('/api/dentists', async function(req, res) {
    if (req.session.prm_user) { 
        daoUser.getDentists(req, res)
    } else {
       res.status(200).json("NOK: user not logged in")
    }    
});

app.get('/api/surgeons', async function (req, res) {
    if (req.session.prm_user) {
        daoUser.getSurgeons(req, res)
    } else {
        res.status(200).json("NOK: user not logged in")
    }
});

///////////////////////////////////
// calendar
///////////////////////////////////
app.get('/api/calendar/:statrtdate/:enddate/:lang', (req, res) => {
    const statrtdate = req.params.statrtdate
    const enddate = req.params.enddate
    var selctedIds = req.query.selctedIds;
    let lang = req.params.lang;
    if (selctedIds) {
        selctedIds = JSON.parse(selctedIds);
    }
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, calendarPermission))
        daoCalendar.getApontments(req, res, statrtdate, enddate, req.session.prm_user.id, req.session.prm_user.accessible_user_ids, selctedIds, req.session.prm_user.prm_client_id, getScope(req.session.prm_user.permissions, calendarPermission), lang)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/calendar', (req, res) => {
  const appointment = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoCalendar.createAppointment(req, res, appointment)
  else
    res.status(401).json("OK: user unauthorized")
});

app.get('/api/calendar/doctors', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, calendarPermission))
        daoCalendar.getDoctors(req, res, req.session.prm_user.id, req.session.prm_user.accessible_user_ids, req.session.prm_user.prm_client_id, getScope(req.session.prm_user.permissions, assignmentsPermission))
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/calendar/:id', (req, res) => {
  const id = req.params.id
  const appointment = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoCalendar.updateAppointments(req, res, id, appointment)
  else
    res.status(401).json("OK: user unauthorized")
});

app.put('/api/calendar/label/:id', (req, res) => {
  const id = req.params.id
  const appointmentLabel = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoCalendar.updateAppointmentsLabel(req, res, id, appointmentLabel)
  else
    res.status(401).json("OK: user unauthorized")
});
app.post('/api/calendar/label/:id', (req, res) => {
  const id = req.params.id
  const appointmentLabel = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoCalendar.createAppointmentsLabel(req, res, id, appointmentLabel)
  else
    res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// products
///////////////////////////////////
app.get('/api/products/:locale', (req, res) => {
    const locale = req.params.locale
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProducts(req, res, locale)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/products/:id/product-naming', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductNaming(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productGroups/:locale', (req, res) => {
    const locale = req.params.locale
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductGroups(req, res, locale)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productGroups/:id/product-naming', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductGroupNaming(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productTypes', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductTypes(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/products', (req, res) => {
    const product = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.createProduct(req, res, product)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/products/:id', (req, res) => {
    const id = req.params.id
    const product = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.updateProduct(req, res, id, product)
    else
        res.status(401).json("OK: user unauthorized")
});

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.deleteProduct(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/productGroups', (req, res) => {
    const productGroup = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.createProductGroup(req, res, productGroup)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/productGroups/:id', (req, res) => {
    const id = req.params.id
    const productGroup = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.updateProductGroup(req, res, id, productGroup)
    else
        res.status(401).json("OK: user unauthorized")
});

app.delete('/api/productGroups/:id', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.deleteProductGroup(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productCategories/:locale', (req, res) => {
    const locale = req.params.locale
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductCategories(req, res, locale)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productCategories/:id/product-naming', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductCategoryNaming(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/productCategories', (req, res) => {
    const productCategory = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.createProductCategory(req, res, productCategory)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/productCategories/:id', (req, res) => {
    const id = req.params.id
    const productCategory = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.updateProductCategory(req, res, id, productCategory)
    else
        res.status(401).json("OK: user unauthorized")
});

app.delete('/api/productCategories/:id', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.deleteProductCategory(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productGroups/:id/product-naming', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductGroupNaming(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// business
///////////////////////////////////

app.get('/api/business/:locale', (req, res) => {
    const locale = req.params.locale
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoBusiness.getBusiness(req, res, locale)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/business/:id', (req, res) => {
  const id = req.params.id
  if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoBusiness.getBusinessByID(req, res, id)
  else
    res.status(401).json("OK: user unauthorized")
});

app.put('/api/business/:id', (req, res) => {
  const id = req.params.id
  const business = req.body
  if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoBusiness.updateBusiness(req, res, id, business)
  else
    res.status(401).json("OK: user unauthorized")
});

app.post('/api/business', (req, res) => {
  const business = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoBusiness.createBusiness(req, res, business)
  else
    res.status(401).json("OK: user unauthorized")
});

app.delete('/api/business/:id', (req, res) => {
  const id = req.params.id
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
    daoBusiness.deleteBusiness(req, res, id)
  else
    res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// countries
///////////////////////////////////
app.get('/api/countries/', (req, res) => {
  if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoCountries.getCountries(req, res)
  else
    res.status(401).json("OK: user unauthorized")
});


///////////////////////////////////
// locations
///////////////////////////////////

app.get('/api/locations', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, locationsPermission))
        daoLocations.getLocationsList(req, res, req.session.prm_user.prm_client_id, getScope (req.session.prm_user.permissions, locationsPermission))
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/inactive-locations', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, locationsPermission))
        daoLocations.getInactiveLocationsList(req, res, req.session.prm_user.prm_client_id, getScope(req.session.prm_user.permissions, locationsPermission))
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/locations', (req, res) => {
    const location = req.body
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, locationsPermission))
        daoLocations.createLocation(req, res, location)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/locations/:id', (req, res) => {
    const id = req.params.id
    const location = req.body
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, locationsPermission))
        daoLocations.updateLocation(req, res, id, location)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/locations/:id/activation', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, locationsPermission))
        daoLocations.toggleActivity(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// settings -> users
///////////////////////////////////

app.get('/api/users', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, usersPermission)) {
        daoUser.getUsers(req, res, req.session.prm_user.prm_client_id, getScope(req.session.prm_user.permissions, usersPermission))
    } else {
        res.status(401).json("OK: user unauthorized")
    }
});

app.get('/api/users-roles', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, usersPermission)) {
        daoUser.getRoles(req, res)
    } else {
        res.status(401).json("OK: user unauthorized")
    }
});

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = req.body
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, usersPermission)) {
        daoUser.updateUser(req, res, id, user)
    } else {
        res.status(401).json("OK: user unauthorized")
    }
});

///////////////////////////////////
// enquiries, patients
///////////////////////////////////

app.get('/api/enquiries', (req, res) => {
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.getEnquiries(req, res, req.session.prm_user.id, req.session.prm_user.accessible_user_ids, req.session.prm_user.prm_client_id, getScope(req.session.prm_user.permissions, calendarPermission))
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/patients', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getPatients(req, res)
    else
        res.status(401).json("OK: user unauthorized")
  });

app.get('/api/enquiries/:id', (req, res) => {
  const id = req.params.id
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.getEnquiriesById(req, res, id)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/enquiries/:id/notes', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getEnquiryNotes(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/enquiries/notes', (req, res) => {
  const notes = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
    daoEnquiries.createEnquiryNotes(req, res, notes)
  else
    res.status(401).json("OK: user unauthorized")
});

app.get('/api/enquiries/:id/appointments', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getEnquiryAppointments(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/enquiries/:id/invoices', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getEnquiryInvoices(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/enquiries/:id/services', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getEnquiryServices(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/enquiries/:id/offers', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getEnquiryOffers(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/enquiries', (req, res) => {
  const enquiry = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.createEnquiry(req, res, enquiry)
  else
      res.status(401).json("OK: user unauthorized")
});

app.put('/api/enquiries/:id', (req, res) => {
  const enquiry = req.body
  const id = req.params.id
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.updateEnquiry(req, res, id, enquiry)
  else
      res.status(401).json("OK: user unauthorized")
});

app.put('/api/enquiries/:id/trashed', (req, res) => {
  const id = req.params.id
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.trashEnquiry(req, res, id)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/apitest/createenquiries', (req, res) => {
  const enquiry = {
    name: 'aaaaaa',
    phone: '123',
    email: 'email',
    client_id: 23,
    gender: 'female',
    last_name: 'priimek',
    lead_owner_id: 0
  }
  daoEnquiries.createEnquiry(req, res, enquiry)
});

app.get('/apitest/updateenquiries/:id', (req, res) => {
  const enquiry = {
    name: 'aaaaaa',
    phone: '123',
    email: 'email1',
    client_id: 23,
    gender: 'male',
    last_name: 'priimek',
    lead_owner_id: 0
  }
  const id = req.params.id
  daoEnquiries.updateEnquiry(req, res, id, enquiry)
});

app.get('/apitest/deleteenquiries/:id', (req, res) => {
  const id = req.params.id
  daoEnquiries.deleteEnquiries(req, res, id)
});

///////////////////////////////////
// assignments
///////////////////////////////////
app.get('/api/assignments/:due', (req, res) => {
  const due = req.params.due
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
      daoAssignments.getAssignments(req, res, getScope(req.session.prm_user.permissions, assignmentsPermission), req.session.prm_user.id, req.session.prm_user.accessible_user_ids, req.session.prm_user.prm_client_id, due)
  else
      res.status(401).json("OK: user unauthorized")
});

app.post('/api/assignments', (req, res) => {
  const assignmentDescriptor = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
      daoAssignments.finishAssignment(req, res, assignmentDescriptor)
  else
      res.status(401).json("OK: user unauthorized")
});

app.post('/api/assignments-create', (req, res) => {
  const assignment = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
    daoAssignments.createAssignment(req, res, assignment)
  else
    res.status(401).json("OK: user unauthorized")
});

app.post('/api/assignments-update', (req, res) => {
  const assignment = req.body
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
    daoAssignments.createAssignment(req, res, assignment)
  else
    res.status(401).json("OK: user unauthorized")
});

app.put('/api/assignments/:id', (req, res) => {
  const id = req.params.id
  const assignment = req.body
  if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
    daoAssignments.updateAssignment(req, res, id, assignment)
  else
    res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// companies TODO: Check permissions for accessing companies
///////////////////////////////////
app.get('/api/companies', (req, res) => {
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
  daoCompanies.getCompanies(req, res)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/companies/:id', (req, res) => {
    const id = req.params.id

    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
    daoCompanies.getCompanyById(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/companies/', (req, res) => {
    const company = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
    daoCompanies.createCompany(req, res, company)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/companies/:id', (req, res) => {
    const id = req.params.id
    const company = req.body
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
    daoCompanies.updateCompany(req, res, id, company)
    else
        res.status(401).json("OK: user unauthorized")
});

app.delete('/api/companies/:id', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, assignmentsPermission))
    daoCompanies.deleteCompany(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// invoices, fiscal verification
///////////////////////////////////
app.get('/api/invoice/premises/:premiseId', (req, res) => {
  const premiseId = req.params.premiseId
  console.log('GET: api/invoice/premises called for ', premiseId)
  // todo which permission?
  // todo which company (cert, vat)

  fiscalVerification.registerPremises(premiseId)

});

app.get('/api/invoices', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.getInvoices(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

app.post('/api/invoices', (req, res) => {
    const invoice = req.body
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.createInvoices(req, res, invoice)
    else
        res.status(401).json("OK: user unauthorized")
});

app.put('/api/invoices/:id', (req, res) => {
    const id = req.params.id
    const invoice = req.body

    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.updateInvoices(req, res, id, invoice)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/invoices/:id', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.getInvoiceById(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/invoices/company/:id/consecutive-number', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.getConsecutiveInvoiceNumberForCompany(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/invoices/:id/items', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.getItemsOfInvoiceById(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/invoices/:id/payment-items', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.getPaymentItemsOfInvoiceById(req, res, id)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/advPayments', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, advPaymentsPermission))
        daoAdvPayments.getAdvPayments(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/offers', (req, res) => {
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, offersPermission))
        daoOffers.getOffers(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// statistics & Reporting
///////////////////////////////////
app.get('/api/statistics/clinic', (req, res) => {
  const clinicId = 123 // todo - get it from session
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, clinicStatisticsPermission))
      daoStatistics.getClinicStatistics(req, res, clinicId)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/statistics/clinic/attendance', (req, res) => {
  const clinicId = 123 // todo - get it from session
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, clinicStatisticsPermission))
      daoStatistics.getClinicAttendance(req, res, clinicId)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/report/emazing/services/:statrtdate/:enddate/:countrie', (req, res) => {
  const statrtdate = req.params.statrtdate
  const enddate = req.params.enddate
  const countrie = req.params.countrie
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, reportingEmazingPermission))
      daoReporting.getEmazingServicesReport(req, res, statrtdate, enddate, countrie)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/report/emazing/serviceslist/:statrtdate/:enddate/:countrie', (req, res) => {
  const statrtdate = req.params.statrtdate
  const enddate = req.params.enddate
  const countrie = req.params.countrie
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, reportingEmazingPermission))
      daoReporting.getServiceList(req, res, statrtdate, enddate, countrie)
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/report/emazing/countrylist/:statrtdate/:enddate', (req, res) => {
  const statrtdate = req.params.statrtdate
  const enddate = req.params.enddate
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, reportingEmazingPermission))
      daoReporting.getCountryList(req, res, statrtdate, enddate)
  else
      res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// codelist methodes
///////////////////////////////////
app.get('/api/codelist/countries', (req, res) => {
    daoCodeLists.getCountriesList(req, res)
});

app.get('/api/codelist/regions', (req, res) => {
    daoCodeLists.getRegionsList(req, res)
});

app.get('/api/codelist/locations', (req, res) => {
    daoCodeLists.getLocationsList(req, res)
});

app.get('/api/codelist/country/:id/tax-rate', (req, res) => {
    const id = req.params.id
    daoCodeLists.getTaxRateList(req, res, id)
});
app.get('/api/codelist/clients', (req, res) => {
    daoCodeLists.getClients(req, res)
});

///////////////////////////////////
// company premises
///////////////////////////////////
app.get('/api/company-premises', (req, res) => {
    daoCompanyPremises.getCompanyPremises(req, res)
});

app.post('/api/company-premises/check-business-id', (req, res) => {
    const data = req.body
    daoCompanyPremises.checkBusinessIdUniquness(req, res, data)
});

app.post('/api/company-premises', (req, res) => {
    const premise = req.body
    daoCompanyPremises.createPremise(req, res, premise)
});

app.put('/api/company-premises/:id', (req, res) => {
    const id = req.params.id
    const premise = req.body
    daoCompanyPremises.updatePremise(req, res, id, premise)
});

app.get('/api/company-premises/:id', (req, res) => {
    const id = req.params.id
    daoCompanyPremises.getCompanyPremiseById(req, res, id)
});

app.delete('/api/company-premises/:id', (req, res) => {
    const id = req.params.id
    daoCompanyPremises.deletePremise(req, res, id)
});

app.get('/api/company-premise-devices', (req, res) => {
    daoCompanyPremises.getCompanyPremiseDevices(req, res)
});

app.post('/api/company-premise-devices/check-electronic-device-id', (req, res) => {
    const data = req.body
    daoCompanyPremises.checkElectronicDeviceIdUniquness(req, res, data)
});

app.post('/api/company-premise-devices', (req, res) => {
    const premiseDevice = req.body
    daoCompanyPremises.createPremiseDevice(req, res, premiseDevice)
});

app.put('/api/company-premise-devices/:id', (req, res) => {
    const id = req.params.id
    const premiseDevice = req.body
    daoCompanyPremises.updatePremiseDevice(req, res, id, premiseDevice)
});

app.get('/api/company-premise-devices/:id', (req, res) => {
    const id = req.params.id
    daoCompanyPremises.getCompanyPremiseDeviceById(req, res, id)
});

app.delete('/api/company-premise-devices/:id', (req, res) => {
    const id = req.params.id
    daoCompanyPremises.deletePremiseDevice(req, res, id)
});

app.get('/api/:companyId/company-premises', (req, res) => {
    const companyId = req.params.companyId
    daoCompanyPremises.getPremisesForCompany(req, res, companyId)
});

app.get('/api/company-premises/:companyPremiseId/devices', (req, res) => {
    const companyPremiseId = req.params.companyPremiseId
    daoCompanyPremises.getDevicesForCompanyPremise(req, res, companyPremiseId)
});

////////////////////////////////////
// Files
///////////////////////////////////
app.post('/api/files/avatar', async function(req, res) {
  let files = req.files
  if(req.session.prm_user) {
      const rv = await awsS3.upload('avatar-' + req.session.prm_user.id, req.files.file.data, req.files.file.mimetype)
      res.status(200).json(rv.status)
  }
  else
      res.status(401).json("OK: user unauthorized")
});

app.get('/api/files/avatar', async function(req, res) {
  if(req.session.prm_user) {  
      const rv = await awsS3.download('avatar-' + req.session.prm_user.id)
      if (rv.status=='OK') {
          res.writeHead(200, {
              'Content-Disposition': `attachment; filename=` + 'avatar-' + req.session.prm_user.id,
              'Content-Type': rv.data.ContentType,
          })
          const download = Buffer.from(rv.data.Body)
          res.end(download)
      } else {
          res.download('./resources/avatar-default.png', 'avatar-default.png'); 
      }
  }
  else
      res.status(401).json("OK: user unauthorized")
});


///////////////////////////////////
// common methodes
///////////////////////////////////
const checkPermission = function(permissionsList, permission) {
    if(!permissionsList) return false
    for(var i=0; i<permissionsList.length; i++) {
        if (permissionsList[i].resource_name == permission) return true
    }
    return false
}

const getScope = function(permissionsList, permission) {
    if(!permissionsList) return null
    for(var i=0; i<permissionsList.length; i++) {
        if (permissionsList[i].resource_name == permission) return permissionsList[i].scope_name
    }
    return null
}

///////////////////////////////////
// Server
///////////////////////////////////
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../prmApp/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

///////////////////////////////////
// booking methods
///////////////////////////////////
app.post('/api/booking/sendsms', (req, res) => {
    const phone = req.body.phone
    if(phone) {
        res.status(200).json({ success: true })
    } else {
        res.status(400).json("No phone number")
    }
});

app.post('/api/booking/confirm-and-save', (req, res) => {
    const { code, selectedSlot } = req.body
    if(code) {
        res.status(200).json({ success: true, code, selectedSlot })
    } else {
        res.status(400).json("No confirmation code")
    }
});

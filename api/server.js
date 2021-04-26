const path = require('path');
const express = require('express');
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: '1922e9135f0a45a292341f0137316fc7',
  captureUncaught: true,
  captureUnhandledRejections: true
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
const daoCodeLists = require('./dao/daoCodeLists')
const daoProducts = require('./dao/daoProducts')

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
const productsPermission = "Services and Products"

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

app.get('/api/dentists', async function(req, res) {
    if (req.session.prm_user) { 
        daoUser.getDentists(req, res)
    } else {
       res.status(200).json("NOK: user not logged in")
    }    
});

///////////////////////////////////
// products
///////////////////////////////////
app.get('/api/products', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProducts(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productCategories', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductCategories(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productGroups', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductGroups(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

app.get('/api/productTypes', (req, res) => {
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, productsPermission))
        daoProducts.getProductTypes(req, res)
    else
        res.status(401).json("OK: user unauthorized")
});

///////////////////////////////////
// enquiries, patients
///////////////////////////////////
app.get('/api/enquiries', (req, res) => {
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.getEnquiries(req, res)
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

app.get('/api/enquiries/:id/appointments', (req, res) => {
    const id = req.params.id
    if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
        daoEnquiries.getEnquiryAppointments(req, res, id)
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

app.delete('/api/enquiries/:id', (req, res) => {
  const id = req.params.id
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.deleteEnquiries(req, res, id)
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
      daoAssignments.getAssignments(req, res, getScope(req.session.prm_user.permissions, assignmentsPermission), req.session.prm_user.id, due)
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

app.get('/api/invoices/:id', (req, res) => {
    const id = req.params.id
    if (req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, invoicesPermission))
        daoInvoices.getInvoicesById(req, res, id)
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
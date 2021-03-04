const path = require('path');
const express = require('express');
const session = require("express-session");

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const daoUser = require('./dao/daoUser')
const daoEnquiries = require('./dao/daoEnquiries')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../prmApp/dist')));
app.use(session({resave: true, saveUninitialized: true, secret: 'BwhFeenj9DcRqANH', cookie: { maxAge: null }}));

///////////////////////////////////
//
// REST SERVER
//
///////////////////////////////////
const enquiriesPermission = "Enquiries"

///////////////////////////////////
// user login, logout, ...
///////////////////////////////////

// login - email and password in body
app.post('/api/login', async function(req, res) {
   const credentials = req.body
   console.log('POST: api/login called for ' + credentials.loginEmail) 
   req.session.prm_user = await daoUser.getUser(req, res, credentials.loginEmail, credentials.loginPassword)
});

// get loged user data
app.get('/api/login', (req, res) => {
   console.log('GET: api/login called')
   if (req.session.prm_user) { 
        res.status(200).json(req.session.prm_user)
   } else {
       res.status(200).json("NOK: user not logged in")
   }
});

// logout user
app.get('/api/logout', (req, res) => {
   console.log('GET: api/logout called ')
   delete req.session.prm_user
   return res.status(200).json("OK: user logged out")
});

// /api/hash?password=
app.get('/api/hash', (req, res) => { 
    var password = req.param('password');
    daoUser.hash(req, res, password) 
});

///////////////////////////////////
// enquiries, patients
///////////////////////////////////
app.get('/api/enquiries', (req, res) => {
  console.log('GET: api/enquiries called')
  if(req.session.prm_user && req.session.prm_user.permissions && checkPermission(req.session.prm_user.permissions, enquiriesPermission))
      daoEnquiries.getEnquiries(req, res)
  else    
      res.status(401).send(`NOK: No permission ` + enquiriesPermission)
});

app.post('/api/enquiries', (req, res) => {
   const enquiry = req.body.enquiry;
   console.log('POST: api/enquiries called with ', enquiry)
   res.json("OK:");
});

app.delete('/api/enquiries/:id', (req, res) => {
   const id = req.params.id
   console.log('DELETE: api/enquiries for ', id)
   res.json("OK: " + id);
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

///////////////////////////////////
// Server
///////////////////////////////////
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../prmApp/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
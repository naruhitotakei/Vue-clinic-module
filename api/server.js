const path = require('path');
const express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const daoEnquiries = require('./dao/daoEnquiries')
const daoUser = require('./dao/daoUser')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../prmApp/dist')));
app.use(session({resave: true, saveUninitialized: true, secret: 'BwhFeenj9DcRqANH', cookie: { maxAge: null }}));

///////////////////////////////////
//
// REST SERVER
//
///////////////////////////////////

///////////////////////////////////
// user login, logout, ...
///////////////////////////////////

// login - email and password in body
app.post('/api/login', (req, res) => {
   const credentials = req.body.credentials
   console.log('POST: api/login called ')   
   sessionData = req.session;
   if (sessionData.user) {  // user already logged in
       if (credentials.email == sessionData.user.email) {
           res.json(sessionData.user)
       } else {
           res.json("NOK: Please logout first");
       }
   } else {
       userData = daoUser.getUser(credentials.email)
       if (userData) {
           bcrypt.compare(credentials.password, userData.encrypted_password, function(err, result) {
               if (result == true) {
                   sessionData.user = userData
                   res.json(sessionData.user)
               } else {
                   res.json("NOK: Wrong password");
               }
           });
       } else {
           res.json("NOK: User does not exist");
       }
   }
});

// get loged user data
app.get('/api/login', (req, res) => {
   console.log('GET: api/login called ')
   sessionData = req.session;
   if (sessionData.user) {  // user already logged in
       res.json(sessionData.user)
   } else {
       res.json("NOK");
   }
});

// logout user
app.get('/api/logout', (req, res) => {
   console.log('GET: api/logout called ')
   sessionData = req.session;
   sessionData.destroy(function(err) {
       if(err){
           console.error('Error destroying session')
           res.json("NOK");
       } else {
           res.json("OK");
       }
   });
});

///////////////////////////////////
// enquiries, patients
///////////////////////////////////
app.get('/api/enquiries', (req, res) => {
  console.log('GET: api/enquiries called')
  daoEnquiries.getEnquiries(req, res)
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

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../prmApp/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
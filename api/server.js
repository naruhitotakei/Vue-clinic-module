const path = require('path');
// rest server
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const daoEnquiries = require('./dao/daoEnquiries')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../prmApp/dist')));

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
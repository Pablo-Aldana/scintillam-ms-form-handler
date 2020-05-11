const express = require('express');
const fileUpload = require('./lib/index');
const app = express();
const testService = require('./service/testService');
const createContact = require('./service/createContact');


const {PORT} = require('./config.js');

app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
  console.log("My name is : ",req.body.name);
  
  test(req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line
  console.log('number of files >>>', req.files.sampleFile.length);
  if(req.files.sampleFile.length !=undefined) {
    for(var i = 0; i < req.files.sampleFile.length; i++) {
      console.log('file number >>>',i);
      uploadfile(req.files.sampleFile[i]);
    }
  }
  else {
    uploadfile(req.files.sampleFile)
  }
 
  function uploadfile(file) {
    sampleFile = file;

    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  });}
  res.send('File uploaded');
});


app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
  console.log("My enviroment ", process.env.PABLO);
});

async function test(req) {
  console.log("I'm testing");
  await testService.test();
  let contact = {
    email: req.email, 
    firstName: req.firstName,
    lastName: req.lastName,
    phone: req.phone,
    company: req.company,
    companyDescription: req.companyDescription,
    website: "https://weveris.com",
    language: req.language
  };

   createContact.hubSpotCreateContact(contact);
}


const express = require('express');
const fileUpload = require('./lib/index');
const app = express();
const createContact = require('./service/createContact');
const sendErrorEmail = require('./service/sendEmail');
const cors = require('cors');

/*const corsOptions = {
  origin: 'https://scintillam.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/

const {PORT} = require('./config.js');

if(process.env.NODE_ENV == "DEV") {
  app.use('/form', express.static(__dirname + '/index.html'));
}

// default options
//app.use(cors());
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', cors(), function(req, res) {
  
  try {
    if ( !req.body ) {
      return res.status(500).send("Invalid Data form");
    }
    
    saveEntry(req.body);
 
    if (req.files  && Object.keys(req.files).length != 0) {
      console.log('req.files >>>', req.files); // eslint-disable-line
      console.log('number of files >>>', req.files.sampleFile.length);
      if (req.files.sampleFile.length !=undefined) {
        for (var i = 0; i < req.files.sampleFile.length; i++) {
          console.log('file number >>>',i);
          uploadfile(req.files.sampleFile[i]);
        }
      }
      else {
        uploadfile(req.files.sampleFile);
      }
    }
  } catch (err){
    console.log(err);
    sendErrorEmail(err + " with form " + err);
    return res.status(500).send(err);
  }
  return res.status(200).send("OK");
});

function uploadfile(file) {

  let sampleFile;
  let uploadPath;

  if (checkFileType(file.data)){
    sampleFile = file;
  
    uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
          
  }
  else {
    throw ("unkown file format");
  }
}

function checkFileType(bufferData) {

  var headerArray = new Uint8Array(bufferData).subarray(0, 4);      
  var header = "";
  
  for (var i = 0; i < headerArray.length; i++) {
    header += headerArray[i].toString(16);
  }
  
  var type = false;
  switch (header) {
    case "89504e47":
      type = true;
      break;
    case "47494638":
      type = true;
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      type = true;
      break;
    default:
      type = false; 
      break;
  }
  return type;
}

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});

function saveEntry(req) {
  let contact = {
    email: req.email, 
    firstName: req.firstName,
    lastName: req.lastName,
    phone: req.phone,
    company: req.company,
    companyDescription: req.companyDescription,
    website: req.website,
    language: req.language
  };

  createContact.hubSpotCreateContact(contact);
}


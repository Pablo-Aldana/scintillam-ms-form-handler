"use strict";
const nodemailer = require("nodemailer");
const message = {
  ES: {
    subject: "Bienvenido a Scintillam"
  },
  EN: {
    subject: "Welcome to Scintillam"
  }
};
const {EMAIL, PASSWORD, EMAILHOST, EMAILTO} = require("../config.js");

const fs = require('fs');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const path = require('path');

const transporter = nodemailer.createTransport({
  host: EMAILHOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL, // generated ethereal user
    pass: PASSWORD // generated ethereal password
  }
});
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(contact) {
   
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let filePath = path.join(__dirname, 'mailTemplate'+contact.language+'.html');
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Scintillam" ${EMAIL}`, // sender address
    to: contact.email, // list of receivers
    //subject: "Hello ✔", // Subject line
    subject: message[contact.language].subject + " " + contact.firstName,
    text: message[contact.language].bodyText, // plain text body
    html: await readFile(filePath, 'utf8') // html body
  });

  console.log("Message sent: %s", info.messageId);
}

async function sendErrorEmail(errorMessage) {
  let info = await transporter.sendMail({
    from: `"Scintillam" ${EMAIL}`, 
    to: EMAILTO, 
    subject: "Error in Form Registration",
    text: errorMessage, 
    html: errorMessage 
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = {sendEmail, sendErrorEmail};
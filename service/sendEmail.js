"use strict";
const nodemailer = require("nodemailer");
const message = {
    ES: {
        subject: "Bienvenido a Scintillam",
        body: "Es un placer tenerte aqui",
        bodyText: ""
    },
    EN: {
        subject: "Welcome to Scintillam",
        body: "It is a pleasure to have you here",
        bodyText: ""
    }
}
const {EMAIL, PASSWORD} = require("../config.js");

const fs = require('fs');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const path = require('path');


// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(contact) {
   
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let filePath = path.join(__dirname, 'mailTemplate'+contact.language+'.html');
  let transporter = nodemailer.createTransport({
    host: "ams101.arvixeshared.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL, // generated ethereal user
      pass: PASSWORD // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Scintillam" ${EMAIL}`, // sender address
    to: contact.email, // list of receivers
    //subject: "Hello ✔", // Subject line
    subject: message[contact.language].subject,
    text: message[contact.language].bodyText, // plain text body
    html: await readFile(filePath, 'utf8') // html body
   // html: await readFile('http://2stefano.aldana.me/scintillam_mail/mailTemplateEN.html', 'utf8') // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendEmail().catch(console.error);
module.exports = {sendEmail};
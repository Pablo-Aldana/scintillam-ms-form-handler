'use strict';
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  EMAILHOST: process.env.EMAILHOST,
  HOSTNAME: process.env.HOSTNAME,	
  EMAILTO: process.env.EMAILTO,	
  DEV: process.env.DEV,
  HUBSPOTFORMURL: process.env.HUBSPOTFORMURL
};

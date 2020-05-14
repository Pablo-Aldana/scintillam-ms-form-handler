'use strict';
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  EMAILHOST: process.env.EMAILHOST,
  EMAILTO: process.env.EMAILTO,
  HUBSPOTFORMURL: process.env.HUBSPOTFORMURL
};
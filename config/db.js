const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.NAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PD,
    port: 5432,
});

const pool2 = new Pool({
  user: process.env.NAME,
  host: process.env.HOST,
  database: process.env.DB2,
  password: process.env.PD,
  port: 5432,
});

pool.on('connect', () => {
  console.log('Succesfully conected to User database');
});

pool2.on('connect', () => {
  console.log('Succesfully conected to Chat Database');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  qchats: (text, params) => pool2.query(text, params),
};
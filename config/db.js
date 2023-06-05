const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.NAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PD,
    port: 5432,
});

pool.on('connect', () => {
  console.log('Succesfully conected to database');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
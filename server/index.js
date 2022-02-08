// routes go in here
const express = require('express');
const { Pool } = require('pg');

require('dotenv/config');

const app = express();

app.use(express.json())


app.get('/', (req, res) => {
  res.status(200).json({});
  return;
});

app.get('/qa/questions', (req, res) => {
  res.status(200).json({})
  return;
});
// const pool = new Pool({
//   host: process.env.DB_Host,
//   user: process.env.DB_User,
//   port: process.env.DB_Port,
//   // dot env to hide password
//   password: process.env.DB_Password,
//   database: 'questions_and_answers'
//   // max: set max number of connections?
//   // connectionTimeoutMillis: how long to wait if every connection is busy
//   // idleTimeoutMillis: how long to wait until the connection attempt is dropped (its using memory so not specifying is bad)
// });

// pool.connect();

module.exports = app;

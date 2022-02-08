const express = require('express');
const { pool } = require('../db/connection.js')
const questions = require('./routes/questions.js')
const answers = require('./routes/answers.js')

require('dotenv/config');

const app = express();

app.use(express.json())

app.use(questions);
app.use(answers);

/*
pool.connect() causes an error when running the tests
No tests fail because of this (so far)
Jest has detected the following 1 open handle potentially keeping Jest from exiting:
  ●  TCPWRAP
*/
// pool.connect();

module.exports = app;

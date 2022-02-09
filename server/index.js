const express = require('express');
const { pool } = require('../db/connection.js')
const questions = require('./routes/questions.js')
const answers = require('./routes/answers.js')

require('dotenv/config');

const app = express();

app.use(express.json())

app.use(questions);
app.use(answers);

module.exports = app;

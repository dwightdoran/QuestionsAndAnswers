// routes go in here
const express = require('express');
const { Pool } = require('pg');

require('dotenv/config');

const app = express();

app.use(express.json())


app.get('/', (req, res) => {
  res.status(200).json({homepage: 'home'});
  return;
});

app.get('/qa/questions', (req, res) => {
  res.status(200).json({success: true, successMsg: 'Grabbed questions'})
  return;
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  // from client is the req.params.question_id
  res.status(200).json({success: true, successMsg: `Grabbed answers for question ${req.params.question_id}`});
  return;
})

app.post('/qa/questions', (req, res) => {
  res.status(200).json({success: true, successMsg: 'Posted question to database'})
  return;
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.status(200).json({success: true, successMsg: `Posted answer for question ${req.params.question_id} to database`})
  return;
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.status(200).json({success: true, helpful: `question ${req.params.question_id} marked as helpful`})
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  res.status(200).json({success: true, reported: `question ${req.params.question_id} marked as reported`})
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.status(200).json({success: true, helpful: `answer ${req.params.answer_id} marked as helpful`})
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.status(200).json({success: true, reported: `answer ${req.params.answer_id} marked as reported`})
})

const pool = new Pool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  port: process.env.DB_Port,
  password: process.env.DB_Password,
  database: 'questions_and_answers',
  max: 20,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
});

// pool.connect();

module.exports = app;

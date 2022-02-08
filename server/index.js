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
  res.status(200).json({hello: 'hey'})
  return;
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  // from client is the req.params.question_id
  res.status(200).json({hey: `${req.params.question_id}`});
  return;
})

app.post('/qa/questions', (req, res) => {
  res.status(200).json({post: 'inside post question'})
  return;
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.status(200).json({postAnswers: 'inside post answers'})
  return;
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.status(200).json({helpful: 'question marked as helpful'})
})
app.put('/qa/questions/:question_id/report', (req, res) => {
  res.status(200).json({reported: 'question marked as reported'})
})
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.status(200).json({helpful: 'answer marked as helpful'})
})
app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.status(200).json({reported: 'answer marked as reported'})
})
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

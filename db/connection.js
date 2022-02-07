// // connect to db
// const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'dwightdoran',
//   port: 5432,
//   // dot env to hide password
//   password: '',
//   database: 'questions_and_answers'
//   // max: set max number of connections?
//   // connectionTimeoutMillis: how long to wait if every connection is busy
//   // idleTimeoutMillis: how long to wait until the connection attempt is dropped (its using memory so not specifying is bad)
// });

// pool.connect();

// pool.query(`SELECT questions_id, question_body, question_date_written,
// asker_name, question_reported, question_helpfulness,
// answers_id, answer_body, answer_date_written, answerer_name, answer_reported,
// answer_helpfulness
// FROM questions, answers
// WHERE questions.questions_id = answers.question_id
// AND product_id = 150000;`, (err, res) => {
//   if (err) {
//     console.log('error with query :', err)
//   } else {
//     console.table(res.rows)
//   }
// })

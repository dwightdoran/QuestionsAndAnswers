// import the db connection (pool)
const { pool } = require('../../db/connection.js')

exports.questionsModels = {
  getQuestions: (params, cb) => {
    const queryString = `SELECT question_body FROM questions WHERE questions.questions_id = 10`;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(queryString, (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        cb(null, result.rows);
      })
    })
  },

  createQuestion: (params, cb) => {

    const queryString = `SELECT question_body FROM questions WHERE questions.questions_id = 15`;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(queryString, (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        cb(null, result.rows);
      })
    })
  },

  markQuestionHelpful: (params, cb) => {
  },

  markQuestionReported: (params, cb) => {
  }
}
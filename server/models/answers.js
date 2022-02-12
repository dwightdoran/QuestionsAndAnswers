const { pool } = require('../../db/connection.js')

exports.answersModels = {
  getAnswers: (params, cb) => {
    // grab question_id from front end
    const queryString =
    `SELECT
      answers_id, answer_body, answer_date_written, answerer_name, answer_helpfulness,
      photos_url
    FROM answers AS a
    FULL JOIN photos AS p
    ON p.answer_id = a.answers_id
    WHERE question_id = ${params}
    ORDER BY answer_id`;
    pool.connect((err, client, release) => {
      return err ?
      console.error('Error acquiring client', err.stack) :
      client.query(queryString, (err, result) => {
        return err ?
        console.error('Error executing query', err.stack) :
        cb(null, result.rows);
      })
    })
  },

  createAnswer: () => {
  },

  markAnswerHelpful: () => {
  },

  markAnswerReported: () => {
  }
}
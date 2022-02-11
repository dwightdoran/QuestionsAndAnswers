// import the db connection (pool)
const { pool } = require('../../db/connection.js')

exports.questionsModels = {
  // 1. pass the product_id from front end
  getQuestions: (params, cb) => {
    const queryString =
    `SELECT
      questions_id, question_body, question_date_written, asker_name, question_reported, question_helpfulness,
      answers_id, answer_body, answer_date_written, answerer_name, answer_helpfulness,
      photos_url
    FROM questions AS q
    FULL JOIN answers AS a
    ON q.questions_id = a.question_id
    FULL JOIN photos AS p
    ON p.answer_id = a.answers_id
    WHERE product_id = ${params}
    ORDER BY question_id`;
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        fetchQuestions = async () => {
          await client.query(queryString, (err, result) => {
          return err ?
          console.error('Error executing query', err.stack) :
          (cb(null, result.rows));
        })}
      }
      fetchQuestions();
    })
  },

  createQuestion: (params, cb) => {
    // what is required data for creating a question?
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
    // Update Helpful column
  },

  markQuestionReported: (params, cb) => {
    // Update reported column
  }
}

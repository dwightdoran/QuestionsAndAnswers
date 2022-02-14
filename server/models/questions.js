// import the db connection (pool)
const { pool } = require('../../db/connection.js')

exports.questionsModels = {
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
    const queryString = `INSERT INTO questions
    (product_id, asker_name, asker_email, question_body, question_date_written)
    VALUES (${params[0]}, '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}')`;
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        addQuestion = async () => {
          await client.query(queryString, (err, result) => {
          return err ?
          console.error('Error executing query', err.stack) :
          cb(null, result.rows);
        })}
      }
      addQuestion();
    })
  },

  markQuestionHelpful: (params, cb) => {
    // Update Helpful column
    const queryString = `
    UPDATE question
    SET answer_helpfulness = ,
    WHERE question_id = ${params};`
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        updateQuestion = async () => {
          await client.query(queryString, (err, result) => {
          return err ?
          console.error('Error executing query', err.stack) :
          cb(null, result.rows);
        })}
      }
      updateQuestion();
    })
  },

  markQuestionReported: (params, cb) => {
    // Update reported column
  }
};

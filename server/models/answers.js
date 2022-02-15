const { pool } = require('../../db/connection.js')

exports.answersModels = {
  getAnswers: (params, cb) => {
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
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        grabAnswers = async () => {
          await client.query(queryString, (err, result) => {
          return err ?
          cb(err, null) :
          cb(null, result.rows);
        })}
      }
      grabAnswers();
    })
  },

  createAnswer: (params, cb) => {
    const queryString =`BEGIN;
    INSERT INTO answers
      (question_id, answerer_name, answerer_email, answer_body, answer_date_written, answer_reported, answer_helpfulness)
    VALUES
      (${params[0]}, '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}', false, 0);
    INSERT INTO photos
      (answer_id, photos_url)
    VALUES
      (${params[0]}, '${params[5]}');
    COMMIT;`

    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        addAnswer = async () => {
          await client.query(queryString, (err, result) => {
          return err ?
          cb(err, null) :
          (console.log(result.rows),cb(null, result.rows));
        })}
      }
      addAnswer();
    })
  },

  markAnswerHelpful: () => {
  },

  markAnswerReported: () => {
  }
}
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
    WHERE question_id = $1
    ORDER BY answer_id`;
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        grabAnswers = async () => {
          await client.query(queryString, params, (err, result) => {
          return err ?
          cb(err, null) :
          cb(null, result.rows);
        })}
      }
      grabAnswers();
      release();
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
          (cb(null, result.rows));
        })}
      }
      addAnswer();
      release();
    })
  },

  markAnswerHelpful: (params, cb) => {
    const queryString = `
    UPDATE answers
    SET answer_helpfulness = answer_helpfulness + 1
    WHERE answers_id = $1`
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        updateAnswer= async () => {
          await client.query(queryString, params, (err, result) => {
          return err ?
          console.error('Error executing query', err.stack) :
          cb(null, result.rows);
        })}
      }
      updateAnswer();
      release();
    })
  },

  markAnswerReported: (params, cb) => {
    const queryString = `
    UPDATE answers
    SET answer_reported = NOT answer_reported
    WHERE answers_id = $1`
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error acquiring client', err.stack)
      } else {
        reportAnswer = async () => {
          await client.query(queryString, params, (err, result) => {
          return err ?
          console.error('Error executing query', err.stack) :
          (cb(null, result.rows));
        })}
      }
      reportAnswer();
      release();
    })
  }
}
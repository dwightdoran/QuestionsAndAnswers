// import the db connection (pool)
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  port: process.env.DB_Port,
  password: process.env.DB_Docker_Password,
  database: process.env.DB_Name,
  max: 40,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
});

pool.getQuestions = async (params) => {
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
  WHERE product_id = $1
  ORDER BY question_id`;
  const questions = await pool.query(queryString, params);
  return questions.rows;
};

pool.getAnswers = async (params) => {
  const queryString =
  `SELECT
    answers_id, answer_body, answer_date_written, answerer_name, answer_helpfulness,
    photos_url
  FROM answers AS a
  FULL JOIN photos AS p
  ON p.answer_id = a.answers_id
  WHERE question_id = $1
  ORDER BY answer_id`;
  const answers = await pool.query(queryString, params);
  return answers.rows;
};

pool.createQuestion = async (params) => {
  const queryString = `INSERT INTO questions
  (product_id, asker_name, asker_email, question_body, question_date_written, question_reported, question_helpfulness)
  VALUES ($1, $2, $3, $4, $5, false, 0)`;
  const createdQuestion = await pool.query(queryString, params);
  return params[0];
};

pool.createAnswer = async (params) => {
  const queryString =`
  INSERT INTO answers
    (question_id, answerer_name, answerer_email, answer_body, answer_date_written, answer_reported, answer_helpfulness)
  VALUES
    ($1, $2, $3, $4, $5, false, 0)`
  const createdAnswer = await pool.query(queryString, params);
  return params[0];
}

pool.addPhotos = async (params) => {
  const queryString = `
  INSERT INTO photos
    (answer_id, photos_url)
  VALUES
    ($1, $2)`
  const photoIns = await pool.query(queryString, params)
}

pool.markQuestionHelpful = async (params) => {
  const queryString = `
  UPDATE questions
  SET question_helpfulness = question_helpfulness + 1
  WHERE questions_id = $1`
  const helpful = await pool.query(queryString, params);
  return params[0]
};

pool.markAnswerHelpful = async (params) => {
  const queryString = `
  UPDATE answers
  SET answer_helpfulness = answer_helpfulness + 1
  WHERE answers_id = $1`
  const helpful = await pool.query(queryString, params);
  return params[0];
},

pool.markQuestionReported = async (params) => {
  const queryString = `
  UPDATE questions
  SET question_reported = NOT question_reported
  WHERE questions_id = $1`
  const report = await pool.query(queryString, params);
  return params[0];
};

pool.markAnswerReported = async (params) => {
  const queryString = `
  UPDATE answers
  SET answer_reported = NOT answer_reported
  WHERE answers_id = $1`
  const report = await pool.query(queryString, params);
  return params[0];
}

module.exports = { pool };
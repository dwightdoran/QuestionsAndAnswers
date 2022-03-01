const express = require('express');
const { dataConverter } = require('./utils/dataConverter.js');
const { questionsConv, answersConv } = dataConverter;
const redis = require('redis');
const { promisify } = require('util');
require('dotenv/config');

// local host port 6739
module.exports = (database) => {
  const app = express();
  app.use(express.json())

  const client = redis.createClient();
  client.connect();

  const GET_ASYNC = promisify(client.get).bind(client);
  const SET_ASYNC = promisify(client.set).bind(client);

  app.get('/qa/questions', async (req, res, next) => {
    try {
      const product_id = Number(req.query.product_id);
      // redis get here
      const reply = await GET_ASYNC(product_id);
      console.log('reply')
      if (reply) {
        res.send(reply)
      }
      const questions = await database.getQuestions([product_id])
      // redis save here
      const result = questionsConv(questions, product_id)
      const saveResult = await SET_ASYNC(product_id, JSON.stringify(result))
      console.log('new data cached')
      res.status(200).send({
        success: true,
        successMsg: 'Grabbed questions',
        data: result
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to grab questions',
        error: err.message
      })
    }
  })

  app.get('/qa/questions/:question_id/answers', async (req, res) => {
    try {
      const question_id = Number(req.params.question_id);
      const answers = await database.getAnswers([question_id])
      res.status(200).send({
        success: true,
        successMsg: `Grabbed answers for question ${question_id}`,
        data: answersConv(answers, question_id)
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to grab answers',
        error: err.message
      })
    }
  })

  app.post('/qa/questions', async (req, res) => {
    try {
      const { product_id, name, email, body, date_written } = req.body;
      if (!name || !email || !body || !product_id) {
        throw err
      }
      const params = [product_id, name, email, body, date_written];
      const question = await database.createQuestion(params);
      res.status(200).send({
        success: true,
        successMsg: 'Posted question to database',
        data: product_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to post question',
        error: err.message
      })
    }
  })

  app.post('/qa/questions/:question_id/answers', async (req, res) => {
    try {
      const { body, name, email, photos, date_written } = req.body;
      if (!name || !email || !body) {
        throw err
      };
      const question_id = Number(req.params.question_id);
      const params1 = [question_id, name, email, body, date_written];
      const params2 = [question_id, photos]
      const answers = await database.createAnswer(params1);
      const newPhotos = await database.addPhotos(params2);
      res.status(200).send({
        success: true,
        successMsg: `Posted answer for question ${question_id} to database`,
        data: question_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to post answer',
        error: err.message
      })
    }
  })


  // ========= PUT =======>
  app.put('/qa/questions/:question_id/helpful', async (req, res) => {
    try {
      const question_id = Number(req.params.question_id);
      if (isNaN(question_id)) {
        throw err
      }
      const helpful = await database.markQuestionHelpful([question_id])
      res.status(200).send({
        success: true,
        successMsg: `question ${question_id} marked as helpful`,
        id: question_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to update question helpfulness',
        error: err.message
      })
    }
  })
  app.put('/qa/questions/:question_id/report', async (req, res) => {
    try {
      const question_id = Number(req.params.question_id);
      if (isNaN(question_id)) {
        throw err
      }
      const report = await database.markQuestionReported([question_id]);
      res.status(200).send({
        success: true,
        successMsg: `question ${question_id} marked as reported`,
        data: question_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to report question',
        error: err.message
      })
    }
  })
  app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
    try {
      const answer_id = Number(req.params.answer_id);
      if (isNaN(answer_id)) {
        throw err
      }
      const helpful = await database.markAnswerHelpful([answer_id]);
      res.status(200).send({
        success: true,
        successMsg: `answer ${answer_id} marked as helpful`,
        data: answer_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to put answer',
        error: err.message
      })
    }
  })
  app.put('/qa/answers/:answer_id/report', async (req, res) => {
    try {
      const answer_id = Number(req.params.answer_id);
      if (isNaN(answer_id)) {
        throw err
      }
      const report = await database.markAnswerReported([answer_id]);
      res.status(200).send({
        success: true,
        successMsg: `answer ${answer_id} marked as reported`,
        data: answer_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to report answer',
        error: err.message
      })
    }
  })
  return app;
}

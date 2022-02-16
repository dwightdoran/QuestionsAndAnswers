const express = require('express');
const { dataConverter } = require('./utils/dataConverter.js');
const { questionsConv, answersConv } = dataConverter;
require('dotenv/config');

module.exports = (database) => {
  const app = express();
  app.use(express.json())

  app.get('/qa/questions', async (req, res) => {
    try {
      const product_id = Number(req.query.product_id);
      const questions = await database.getQuestions([product_id])
      res.status(200).send({
        success: true,
        successMsg: 'Grabbed questions',
        data: questionsConv(questions, product_id)
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
        successMsg: 'Grabbed answers',
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
      const params = [product_id, name, email, body, date_written];
      const question = await database.createQuestion(params);
      res.status(200).send({
        success: true,
        successMsg: 'Posted question',
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
      const question_id = Number(req.params.question_id);
      const params1 = [question_id, name, email, body, date_written];
      const params2 = [question_id, photos]
      const answers = await database.createAnswer(params1);
      const newPhotos = await database.addPhotos(params2);
      res.status(200).send({
        success: true,
        successMsg: 'Posted answer',
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
      const helpful = await database.markQuestionHelpful([question_id])
      res.status(200).send({
        success: true,
        successMsg: 'Updated question helpfulness',
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
      const report = await database.markQuestionReported([question_id]);
      res.status(200).send({
        success: true,
        successMsg: 'Reported question',
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
      const answers_id = Number(req.params.answer_id);
      const helpful = await database.markAnswerHelpful([answers_id]);
      res.status(200).send({
        success: true,
        successMsg: 'Updated answer helpfulness',
        data: answers_id
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
      const answers_id = Number(req.params.answer_id);
      const report = await database.markAnswerReported([answers_id]);
      res.status(200).send({
        success: true,
        successMsg: 'Reported answer',
        data: answers_id
      })
    } catch (err) {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to put answer',
        error: err.message
      })
    }
  })
  return app;
}

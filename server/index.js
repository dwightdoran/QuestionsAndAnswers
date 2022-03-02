const express = require('express');
const { dataConverter } = require('./utils/dataConverter.js');
const { questionsConv, answersConv } = dataConverter;
const Redis = require('redis');
const { promisify } = require('util');
const cors = require('cors')
require('dotenv/config');

module.exports = (database) => {
  const app = express();
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  var map ={
    hit: 0,
    miss: 0
  }
  const client = Redis.createClient({
    legacyMode: true
  });
  client.connect();
  client.on('connect', () => {
    console.log('connected to redis')
  })


  app.get('/qa/questions', async (req, res, next) => {
    const product_id = Number(req.query.product_id);
    // function that gets cached data or sets new cache
    const questions = await getOrSetCache(product_id.toString(), async () => {
      const questions = await database.getQuestions([product_id])
      const result = questionsConv(questions, product_id)
      return result
    })
    if (questions.results.length > 0) {
      res.status(200).send({
        success: true,
        successMsg: 'Grabbed questions',
        data: questions
      })
    } else {
      res.status(500).send({
        success: true,
        successMsg: 'Failed to grab questions',
      })
    }
  })

  app.get('/qa/questions/:question_id/answers', async (req, res) => {
    const question_id = Number(req.params.question_id);
    // function that gets cached data or sets new cache
    const answers = await getOrSetCache(question_id.toString(), async () => {
      const answers = await database.getAnswers([question_id])
      const result = answersConv(answers, question_id)
      return result
    })
    if (answers.results.length > 0) {
      res.status(200).send({
        success: true,
        successMsg: `Grabbed answers for question ${question_id}`,
        data: answers
      })
    } else {
      res.status(500).send({
        success: false,
        successMsg: 'Failed to grab answers'
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

  const getOrSetCache = (key, cb) => {
    return new Promise((resolve, reject) => {
      client.get(key, async (err, data) => {
        if (err) return reject(err)
        if (data !== null) return resolve(JSON.parse(data))
        const freshData = await cb();
        client.set(key, JSON.stringify(freshData))
        resolve(freshData)
      })
    })
  }

  return app;
}

const express = require('express');
const { answers } = require('../controllers/answers.js')

const router = express.Router();

router.route('/qa/questions/:question_id/answers')
  .get((req, res) => {answers.getAnswers(req, res)})
  .post((req, res) => {answers.createAnswer(req, res)})

router.route('/qa/answers/:answer_id/helpful')
  .put((req, res) => {answers.markAnswerHelpful(req, res)})

router.route('/qa/answers/:answer_id/report')
  .put((req, res) => {answers.markAnswerReported(req, res)})

module.exports = router;

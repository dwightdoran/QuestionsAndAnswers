const express = require('express');
const { questions } = require('../controllers/questions.js')

const router = express.Router();

router.route('/qa/questions')
  .get((req, res) => {questions.getQuestions(req, res)})
  .post((req, res) => {questions.createQuestion(req, res)})

router.route('/qa/questions/:question_id/helpful')
  .put(questions.markQuestionHelpful)

router.route('/qa/questions/:question_id/report')
  .put(questions.markQuestionReported)

module.exports = router;

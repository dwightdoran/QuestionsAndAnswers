const express = require('express');
const { questions } = require('../controllers/questions.js')

const router = express.Router();

router.route('/qa/questions')
  .get(questions.getQuestions)
  .post(questions.createQuestion)

router.route('/qa/questions/:question_id/helpful')
  .put(questions.markQuestionHelpful)

router.route('/qa/questions/:question_id/report')
  .put(questions.markQuestionReported)

module.exports = router;

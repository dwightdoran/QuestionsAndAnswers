const express = require('express');
const { answers } = require('../controllers/answers.js')

const router = express.Router();

router.route('/qa/questions/:question_id/answers')
  .get(answers.getAnswers)
  .post(answers.createAnswer)

router.route('/qa/answers/:answer_id/helpful')
  .put(answers.markAnswerHelpful)

router.route('/qa/answers/:answer_id/report')
  .put(answers.markAnswerReported)

module.exports = router;

const { answersModels } = require('../models/answers.js')

exports.answers = {
  getAnswers : (req, res) => {
    let question_id = Number(req.params.question_id) || 263761;
    answersModels.getAnswers(question_id, (err, result) => {
      err ? console.log('error grabbing data from db ',err) :
      res.status(200).json({
        success: true,
        successMsg: `Grabbed answers for question ${req.params.question_id}`,
        data: result
      });
    })
    return;
  },

  createAnswer : (req, res) => {
    const { body, name, email, photos, date_written } = req.body;
    const question_id = Number(req.params.question_id);
    answersModels.createAnswer([question_id, name, email, body, date_written, photos], (err, result) => {
      err ? console.log('error grabbing data from db ',err) :
        res.status(200).json({
          success: true,
          successMsg: 'Posted answer to database'
        })
    })
    return;
  },

  markAnswerHelpful: (req, res) => {
    const answers_id = Number(req.params.answer_id);
    answersModels.markAnswerHelpful(answers_id, (err, result) => {
      err ? res.status(500).send('Error posted answer helpfulness') :
      res.status(200).json({
          success: true,
          successMsg: `Successfully posted answer helpfulness `
        })
    })
    return;
  },

  markAnswerReported: (req, res) => {
    const answers_id = Number(req.params.answer_id);
    answersModels.markAnswerReported(answers_id, (err, result) => {
      err ? res.status(500).send('Error marking answer reported') :
      res.status(200).json({
          success: true,
          successMsg: `Successfully submitted report for answer ${answers_id}`
        })
    })
    return;
  }
}

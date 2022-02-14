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
    res.status(200).json({success: true, successMsg: `Posted answer for question ${req.params.question_id} to database`})
    return;
  },

  markAnswerHelpful: (req, res) => {
    res.status(200).json({success: true, helpful: `answer ${req.params.answer_id} marked as helpful`})
    return;
  },

  markAnswerReported: (req, res) => {
    res.status(200).json({success: true, reported: `answer ${req.params.answer_id} marked as reported`})
    return;
  }
}

// import questions model functions
const { questionsModels } = require('../models/questions.js')

exports.questions = {
  getQuestions: (req, res) => {
    // 10 is arbitrary for a product_id which is needed to get the correct questions
    // get this number from the front end
    questionsModels.getQuestions(64620, (err, result) => {
      err ? console.log('error grabbing data from db ',err) :
        res.status(200).json({
          success: true,
          successMsg: 'Grabbed questions',
          data: result
        })
    });
    return;
  },

  createQuestion: (req, res) => {
    // returns the newly created question? or list of all questions?
    questionsModels.createQuestion([], (err, result) => {
      err ? console.log('error grabbing data from db ',err) :
        res.status(200).json({
          success: true,
          successMsg: 'Posted question to database'
        })
    })
    return;
  },

  markQuestionHelpful: (req, res) => {
    res.status(200).json({success: true, helpful: `question ${req.params.question_id} marked as helpful`})
    return;
  },

  markQuestionReported: (req, res) => {
    res.status(200).json({success: true, reported: `question ${req.params.question_id} marked as reported`})
    return;
  }
}

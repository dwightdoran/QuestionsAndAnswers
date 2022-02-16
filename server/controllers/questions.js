// import questions model functions
const { questionsModels } = require('../models/questions.js');
const { dataConverter } = require('../utils/dataConverter.js');
const { questionsConv } = dataConverter;

exports.questions = {
  getQuestions: (req, res) => {
    let product_id = Number(req.query.product_id);
    questionsModels.getQuestions([product_id], (err, result) => {
      err ? console.log('error grabbing data from db ',err) :
      res.status(200).send({
        success: true,
        successMsg: 'Grabbed questions',
        data: questionsConv(result, product_id)
      })

    });
    return;
  },

  createQuestion: (req, res) => {
    const { body, name, email, product_id, date_written } = req.body
    questionsModels.createQuestion([product_id, name, email, body, date_written], (err, result) => {
      err ? res.status(500).send('Error Posting question to Database') :
        res.status(200).json({
          success: true,
          successMsg: 'Posted question to database'
        })
    })
    return;
  },

  markQuestionHelpful: (req, res) => {
    const question_id = Number(req.params.question_id);
    questionsModels.markQuestionHelpful([question_id], (err, result) => {
      err ? res.status(500).send('Error posted question helpfulness') :
      res.status(200).json({
          success: true,
          successMsg: 'Successfully posted question helpfulness'
        })
    })
    return;
  },

  markQuestionReported: (req, res) => {
    const question_id = Number(req.params.question_id);
    questionsModels.markQuestionReported([question_id], (err, result) => {
      err ? res.status(500).send('Error posted question helpfulness') :
      res.status(200).json({
          success: true,
          successMsg: `Successfully submitted report for question ${question_id}`
        })
    })
    return;
  }
}

// import questions model functions
const { questionsModels } = require('../models/questions.js')

exports.questions = {
  getQuestions: (req, res) => {
    let product_id = Number(req.query.product_id) || 64620;
    questionsModels.getQuestions(product_id, (err, result) => {
      err ? console.log('error grabbing data from db ',err) :
      res.status(200).send({
        success: true,
        successMsg: 'Grabbed questions',
        data: transformQuestions(result, product_id)
      })

    });
    return;
  },

  createQuestion: (req, res) => {
    const { body, name, email, product_id, date_written } = req.body
    // returns the newly created question? or list of all questions?
    questionsModels.createQuestion([product_id, name, email, body, date_written], (err, result) => {
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

const transformQuestions = (questionsArray, product_id) => {
  // console.log(questionsArray)
  let resultQuestions = {
    product_id: product_id || 64620,
    results: questionsArray
  };

  return resultQuestions;
}


exports.questions = {

  getQuestions: (req, res) => {
    res.status(200).json({success: true, successMsg: 'Grabbed questions'})
    return;
  },

  createQuestion: (req, res) => {
    res.status(200).json({success: true, successMsg: 'Posted question to database'})
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

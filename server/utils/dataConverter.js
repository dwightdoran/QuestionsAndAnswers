
exports.dataConverter = {
  // converts data recieved from database to structure the front end expects
  questionsConv: (input, product_id) => {
    let data = {};
    data['product_id'] = product_id;
    let results = [];
    let questionsMap = {};
    let index = 0;
    for (var i = 0; i < input.length; i++) {
      let currentAnswer = input[i].answers_id
      let currentQuestion = questionsMap[input[i].questions_id]
      if (currentQuestion === undefined) {
        questionsMap[input[i].questions_id] = index;
        let questionObj = {};
        questionObj.question_id = input[i].questions_id;
        questionObj.question_body = input[i].question_body;
        questionObj.question_date = input[i].question_date_written;
        questionObj.asker_name = input[i].asker_name;
        questionObj.question_helpfulness = input[i].question_helpfulness;
        questionObj.reported = input[i].question_reported;
        questionObj.answers = {};
        questionObj.answers[currentAnswer] = {};
        questionObj.answers[currentAnswer].id = input[i].answers_id;
        questionObj.answers[currentAnswer].body = input[i].answer_body;
        questionObj.answers[currentAnswer].date = input[i].answer_date_written;
        questionObj.answers[currentAnswer].answerer_name = input[i].answerer_name
        questionObj.answers[currentAnswer].helpfulness = input[i].answer_helpfulness
        questionObj.answers[currentAnswer].photos = [input[i].photos_url];
        results.push(questionObj);
        index++;
      } else if (results[currentQuestion].answers[currentAnswer] === undefined) {
        results[currentQuestion].answers[currentAnswer] = {};
        results[currentQuestion].answers[currentAnswer].id = input[i].answers_id;
        results[currentQuestion].answers[currentAnswer].body = input[i].answer_body;
        results[currentQuestion].answers[currentAnswer].date = input[i].answer_date_written;
        results[currentQuestion].answers[currentAnswer].answerer_name = input[i].answerer_name
        results[currentQuestion].answers[currentAnswer].helpfulness = input[i].answer_helpfulness
        results[currentQuestion].answers[currentAnswer].photos = [input[i].photos_url];
      }
    }
    data['results'] = results;
    return data
  },
  // converts data recieved from database to structure the front end expects
  answersConv: (input, question_id, page, count) => {
    let data = {};
    data.question = JSON.stringify(question_id);
    data.page = page || 1;
    data.count = count || 5;
    data.results = [];
    for (var i = 0; i < input.length; i++) {
      let answerObj = {};
      answerObj.answer_id = Number(input[i].answers_id);
      answerObj.body = input[i].answer_body
      answerObj.date = input[i].answer_date_written
      answerObj.answerer_name = input[i].answerer_name
      answerObj.helpfulness = input[i].answer_helpfulness
      answerObj.photos = []
      if (input[i].photos_url !== null &&  input[i].photos_url !== 'undefined') {
        let photo = {};
        photo.url = input[i].photos_url
        answerObj.photos.push(photo)
      }
      data.results.push(answerObj);
    }
    return data;
  }
};
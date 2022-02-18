const request = require('supertest');
const makeApp = require('./index.js');
const { pool } = require('../db/database.js')
const { dataConverter } = require('./utils/dataConverter')
const { questionsConv, answersConv } = dataConverter ;



const getQuestions = jest.fn();
const getAnswers = jest.fn();
const createQuestion = jest.fn();
const createAnswer = jest.fn();
const addPhotos = jest.fn();
const markQuestionHelpful = jest.fn();
const markAnswerHelpful = jest.fn();
const markQuestionReported = jest.fn();
const markAnswerReported = jest.fn();

const { testData } = require('./utils/testData.js')

const mockApp = makeApp({
  getQuestions,
  getAnswers,
  createQuestion,
  createAnswer,
  addPhotos,
  markQuestionHelpful,
  markAnswerHelpful,
  markQuestionReported,
  markAnswerReported
})

const app = makeApp(pool)

const question_id = 10;
const answer_id = 50;

beforeEach(() => {
  createQuestion.mockReset();
  createAnswer.mockReset();
  createQuestion.mockResolvedValue(0);
  createAnswer.mockResolvedValue(0);
})

describe('route tests', () => {
  // ============== GET routes ================== //
  describe('GET route tests', () => {
    describe('GET /qa/questions route', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(app)
        .get('/qa/questions/?product_id=64621')
        expect(response.statusCode).toBe(200);
      })
      test('responds with json data type', async () => {
        const response = await request(app)
        .get('/qa/questions/?product_id=64621')
        .query({product_id: 64621})
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with Success message after Get', async () => {
        const response = await request(app)
        .get('/qa/questions/?product_id=64621')
        expect(response.body.successMsg).toEqual('Grabbed questions')
      })
      test('responds with Fail message after Get with bad product_id', async () => {
        const response = await request(app)
        .get('/qa/questions/?product_id=hey')
        expect(response.body.successMsg).toEqual('Failed to grab questions')
      })
    })
    describe('GET /qa/questions/:question_id/answers route', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(app)
        .get(`/qa/questions/${question_id}/answers`)
        expect(response.statusCode).toBe(200);
      })
      test('responds with json data type', async () => {
        const response = await request(app)
        .get(`/qa/questions/${question_id}/answers`)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with Success message after Get', async () => {
        const response = await request(app)
        .get(`/qa/questions/${question_id}/answers`)
        expect(response.body.successMsg).toEqual(`Grabbed answers for question ${question_id}`)
      })
      test('responds with Fail message after Get with bad question_id', async () => {
        const response = await request(app)
        .get(`/qa/questions/bad_id/answers`)
        expect(response.body.successMsg).toEqual('Failed to grab answers')
      })
    })
  })


  // ============== POST routes ================== //
  describe('POST route tests', () => {
    describe('POST /qa/questions route', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(mockApp)
        .post('/qa/questions').send(testData.testQuestions[0])
        expect(response.statusCode).toBe(200)
      })
      test('responds with json data type', async () => {
        const response = await request(mockApp)
        .post('/qa/questions').send(testData.testQuestions[0])
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with Success message after Post', async () => {
        const response = await request(mockApp)
        .post('/qa/questions').send(testData.testQuestions[0])
        expect(response.body.successMsg).toEqual('Posted question to database')
      })
      test('responds with Fail message after Post with bad req.body', async () => {
        const response = await request(app)
        .post('/qa/questions/').send({})

        expect(response.body.successMsg).toEqual('Failed to post question')
      })
      test('saves question to the database', async () => {
        for (const question of testData.testQuestions) {
          createQuestion.mockReset();
          const response = await request(mockApp)
          .post('/qa/questions').send(question)
          expect(createQuestion.mock.calls.length).toBe(1)
          expect(createQuestion.mock.calls[0][0][0]).toBe("64620")
          expect(createQuestion.mock.calls[0][0][2]).toBe("test@gmail.com")
          expect(createQuestion.mock.calls.length).toBe(1)
        }
      })
    })
    describe('POST /qa/questions/:question_id/answers route', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(mockApp)
        .post(`/qa/questions/${question_id}/answers`)
        .send(testData.testAnswers[0])
        expect(response.statusCode).toBe(200)
      })
      test('responds with json data type', async () => {
        const response = await request(mockApp)
        .post(`/qa/questions/${question_id}/answers`)
        .send(testData.testAnswers[0])
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with Success message after Post', async () => {
        const response = await request(mockApp)
        .post(`/qa/questions/${question_id}/answers`)
        .send(testData.testAnswers[0])
        expect(response.body.successMsg).toEqual(`Posted answer for question ${question_id} to database`)
      })
      test('responds with Fail message after Post with bad question_id', async () => {
        const response = await request(mockApp)
        .post(`/qa/questions/bad_id/answers`)
        .send({})
        expect(response.body.successMsg).toEqual('Failed to post answer')
      })
      test('saves answer to the database', async () => {
        for (const answer of testData.testAnswers) {
          createAnswer.mockReset();
          const response = await request(mockApp)
          .post('/qa/questions/${question_id}/answers').send(answer)
          expect(createAnswer.mock.calls.length).toBe(1)
          expect(createAnswer.mock.calls[0][0][3]).toBe(answer.body)
          expect(createAnswer.mock.calls[0][0][2]).toBe(answer.email)
          expect(createAnswer.mock.calls.length).toBe(1)
        }
      })
    })
  })


  // ============== PUT routes ================== //
  describe('PUT route tests', () => {
    describe('PUT /qa/questions/:question_id/helpful', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/helpful`)
        expect(response.statusCode).toBe(200)
      })
      test('responds with json object', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/helpful`)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with helpful message on question', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/helpful`)
        expect(response.body.successMsg).toEqual(`question ${question_id} marked as helpful`)
      })
      test('responds with fail message on question with bad question_id', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/bad_id/helpful`)
        expect(response.body.successMsg).toEqual('Failed to update question helpfulness')
      })
    })

    describe('PUT /qa/questions/:question_id/report', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/report`)
        expect(response.statusCode).toBe(200)
      })
      test('responds with json object', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/report`)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with reported message on question', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/report`)
        expect(response.body.successMsg).toEqual(`question ${question_id} marked as reported`)
      })
      test('responds with fail message on question with bad question_id', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/bad_id/report`)
        expect(response.body.successMsg).toEqual('Failed to report question')
      })
      test('responds with question id after database is updated', async () => {
        const response = await request(mockApp)
        .put(`/qa/questions/${question_id}/report`)
        expect(markQuestionReported.mock.calls[0][0][0]).toBe(10)
      })
    })


    describe('PUT /qa/answers/:answer_id/report', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/report`)
        expect(response.statusCode).toBe(200)
      })
      test('responds with json object', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/report`)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with report message on answer', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/report`)
        expect(response.body.successMsg).toEqual(`answer ${answer_id} marked as reported`)
      })
      test('responds with answer id after answer is successfully reported', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/report`)
        expect(markAnswerReported.mock.calls[0][0][0]).toBe(50)
      })
      test('responds with fail message on answer with bad answer_id', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/bad_id/report`)
        expect(response.body.successMsg).toEqual('Failed to report answer')
      })
    })

    describe('PUT /qa/answers/:answer_id/helpful', () => {
      test('responds with a status code of 200', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/helpful`)
        expect(response.statusCode).toBe(200)
      })
      test('responds with json object', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/helpful`)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      })
      test('responds with helpful message on answer', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/${answer_id}/helpful`)
        expect(response.body.successMsg).toEqual(`answer ${answer_id} marked as helpful`)
      })
      test('responds with fail message on answer with bad answer_id', async () => {
        const response = await request(mockApp)
        .put(`/qa/answers/bad_id/helpful`)
        expect(response.body.successMsg).toEqual('Failed to put answer')
      })
    })
  })
})

describe('Helper Function tests', () => {
  describe('Questions Converter', () => {
    test('Should convert Questions Data recieved in tables from DB to structure for the Front End', () => {
      expect(questionsConv(testData.mockQuestionData, 64621).product_id).toEqual(64621)
      expect(questionsConv(testData.mockQuestionData, 64621).results.length).toEqual(5)
      expect(questionsConv(testData.mockQuestionData, 64621).results[0].reported).toEqual(false)
    })
  })
  describe('Answers Converter', () => {
    test('Should convert Answers Data recieved in tables from DB to structure for the Front End', () => {
      expect(answersConv(testData.mockAnswerData, 563774).question).toEqual('563774')
      expect(answersConv(testData.mockAnswerData, 563774).results[0].answer_id).toEqual(1101684)
      expect(answersConv(testData.mockAnswerData, 563774).results[0].answerer_name).toEqual('Jeanette.Rath')
    })
  })
})

const request = require('supertest');
const makeApp = require('./index.js');
const { pool }= require('../db/database.js')

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

describe('tests', () => {


  xdescribe('should connect', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app)
      .get('/')
      expect(response.statusCode).toBe(200);
    })
    test('json in content type header', async () => {
      const response = await request(app)
      .get('/')
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })


  // ============== GET routes ================== //
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
      expect(response.res.text).toEqual(expect.stringContaining('Grabbed questions'))
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
  })


  // ============== POST routes ================== //
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


  // ============== PUT routes ================== //
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
    test('responds with answer id after answer is reported', async () => {
      const response = await request(mockApp)
      .put(`/qa/answers/${answer_id}/report`)
      expect(markAnswerReported.mock.calls[0][0][0]).toBe(50)
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
  })
})

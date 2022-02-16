const request = require('supertest');
const app = require('./index.js');
const { pool } = require('../db/connection.js')
const question_id = 10;
const answer_id = 50;
const testQuestion = {
  "body": "test the post route?",
  "name": "test guy",
  "email": "test@gmail.com",
  "photos": "photo urls go here",
  "date_written": "2022-2-14 10:28:13"
};

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
      expect(response.res.text).toEqual(expect.stringContaining(`Grabbed answers for question ${question_id}`))
    })
  })


  // ============== POST routes ================== //
  describe('POST /qa/questions route', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .post('/qa/questions')
      expect(response.statusCode).toBe(200)
    })
    test('responds with json data type', async () => {
      const response = await request(app)
      .post('/qa/questions')
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('responds with Success message after Post', async () => {
      const response = await request(app)
      .post('/qa/questions')
      expect(response.res.text).toEqual(expect.stringContaining('Posted question to database'))
    })
  })
  describe('POST /qa/questions/:question_id/answers route', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .post(`/qa/questions/${question_id}/answers`)
      .send(testQuestion)
      expect(response.statusCode).toBe(200)
    })
    test('responds with json data type', async () => {
      const response = await request(app)
      .post(`/qa/questions/${question_id}/answers`)
      .send(testQuestion)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('responds with Success message after Post', async () => {
      const response = await request(app)
      .post(`/qa/questions/${question_id}/answers`)
      .send(testQuestion)
      expect(response.res.text).toEqual(expect.stringContaining(`Posted answer for question ${question_id} to database`))
    })
  })


  // ============== PUT routes ================== //
  describe('PUT /qa/questions/:question_id/helpful', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .put(`/qa/questions/${question_id}/helpful`)
      expect(response.statusCode).toBe(200)
    })
    test('responds with json object', async () => {
      const response = await request(app)
      .put(`/qa/questions/${question_id}/helpful`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('responds with helpful message on question', async () => {
      const response = await request(app)
      .put(`/qa/questions/${question_id}/helpful`)
      expect(response.res.text).toEqual(expect.stringContaining(`question ${question_id} marked as helpful`))
    })
  })

  describe('PUT /qa/questions/:question_id/report', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .put(`/qa/questions/${question_id}/report`)
      expect(response.statusCode).toBe(200)
    })
    test('responds with json object', async () => {
      const response = await request(app)
      .put(`/qa/questions/${question_id}/report`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('responds with reported message on question', async () => {
      const response = await request(app)
      .put(`/qa/questions/${question_id}/report`)
      expect(response.res.text).toEqual(expect.stringContaining(`question ${question_id} marked as reported`))
    })
  })


  describe('PUT /qa/answers/:answer_id/report', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .put(`/qa/answers/${answer_id}/report`)
      expect(response.statusCode).toBe(200)
    })
    test('responds with json object', async () => {
      const response = await request(app)
      .put(`/qa/answers/${answer_id}/report`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('responds with report message on answer', async () => {
      const response = await request(app)
      .put(`/qa/answers/${answer_id}/report`)
      expect(response.res.text).toEqual(expect.stringContaining(`answer ${answer_id} marked as reported`))
    })
  })

  describe('PUT /qa/answers/:answer_id/helpful', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .put(`/qa/answers/${answer_id}/helpful`)
      expect(response.statusCode).toBe(200)
    })
    test('responds with json object', async () => {
      const response = await request(app)
      .put(`/qa/answers/${answer_id}/helpful`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('responds with helpful message on answer', async () => {
      const response = await request(app)
      .put(`/qa/answers/${answer_id}/helpful`)
      expect(response.res.text).toEqual(expect.stringContaining(`answer ${answer_id} marked as helpful`))
    })
  })
})

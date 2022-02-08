const request = require('supertest');
const app = require('./index.js');

describe('tests', () => {

  describe('should connect', () => {
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

  describe('GET /qa/questions route', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .get('/qa/questions')
      expect(response.statusCode).toBe(200);
    })
    test('responds with json data type', async () => {
      const response = await request(app)
      .get('/qa/questions')
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('GET /qa/questions/:question_id/answers route', () => {
    test('responds with a status code of 200', async () => {
      const response = await request(app)
      .get('/qa/questions/:question_id/answers')
      expect(response.statusCode).toBe(200);
    })
    test('responds with json data type', async () => {
      const response = await request(app)
      .get('/qa/questions/:question_id/answers')
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  xdescribe('POST /qa/questions route', () => {
    test('responds with a status code of 200', async () => {
    })
    test('responds with json data type', async () => {
    })
  })


  xdescribe('POST /qa/questions/:question_id/answers route', () => {
    test('responds with a status code of 200', async () => {
    })
    test('responds with json data type', async () => {
    })
  })

  xdescribe('PUT /qa/questions/:question_id/helpful', () => {
    test('responds with a status code of 200', async () => {
    })
    test('responds with json data type', async () => {
    })
  })

  xdescribe('PUT /qa/questions/:question_id/report', () => {
    test('responds with a status code of 200', async () => {
    })
    test('responds with json data type', async () => {
    })
  })

  xdescribe('PUT /qa/answers/:answer_id/helpful', () => {
    test('responds with a status code of 200', async () => {
    })
    test('responds with json data type', async () => {
    })
  })

  xdescribe('PUT /qa/answers/:answer_id/report', () => {
    test('responds with a status code of 200', async () => {
    })
    test('responds with json data type', async () => {
    })
  })
})

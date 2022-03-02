import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '30s', target: 1200}
    // { duration: '30s', target: 1350}
    // { duration: '30s', target: 1400}
    // { duration: '30s', target: 1500}
    // { duration: '30s', target: 1600}
    // { duration: '10s', target: 1700}
  ]
}
var id = 900001
export default function () {
  // GET question
  // http.get(`http://localhost:3000/qa/questions?product_id=${Math.floor(Math.random() * (1000011 - 900001) + 900001)} `);

  // GET answer
  // http.get(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * (3518963 - 3168963) + 3168963)}/answers`)

  // POST question
  // const url = 'http://localhost:3000/qa/questions'
  // const params = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  // const payload = JSON.stringify({
  //     "body": "stress test",
  //     "name": "d",
  //     "email": "test@gmail.com",
  //     "product_id": Math.floor(Math.random() * (1000011 - 900001) + 900001),
  //     "date_written": "2022-2-14 10:28:12",
  //     "reported": "false",
  //     "helpful": "0"
  // })
  // http.post(url, payload, params);

  // POST Answer
  const url = `http://localhost:3000/qa/questions/${Math.floor(Math.random() * (3518963 - 3168963) + 3168963)}/answers`
  const payload = JSON.stringify({
    "body": "stressful test?",
    "name": "dd",
    "email": "test@gmail.com",
    "photos": "photo urls here",
    "date_written": "2022-2-14 10:28:12"
  })
  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  http.post(url, payload, params);
  // http.post(`http://localhost:3000/qa/questions/${Math.floor(Math.random() * (3518963 - 3168963) + 3168963)}/answers`);
  // sleep(1);
}


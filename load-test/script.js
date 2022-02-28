import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '10s', target: 10},
    // { duration: '10s', target: 100}
    // { duration: '30s', target: 1000}
    // { duration: '30s', target: 1200}
    { duration: '1m', target: 1350}
    // { duration: '10s', target: 1400}
    // { duration: '10s', target: 1500}
    // { duration: '10s', target: 1600}
  ]
}

export default function () {
  http.get(`http://localhost:3000/qa/questions?product_id=${Math.floor(Math.random() * (1000011 - 900001) + 900001)} `);
  sleep(1);
}


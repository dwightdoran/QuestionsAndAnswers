import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3000/qa/questions?product_id=64620');
  sleep(1);
}
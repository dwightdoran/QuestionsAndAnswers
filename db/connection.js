// // connect to db
const { Pool } = require('pg');

exports.pool = new Pool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  port: process.env.DB_Port,
  password: process.env.DB_Password,
  database: 'questions_and_answers',
  max: 10,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
});

// routes go in here
const express = require('express');

const app = express();

app.use(express.json())

app.get('/', async (req, res) => {
  res.sendStatus(200)
  return;
})

module.exports = app;
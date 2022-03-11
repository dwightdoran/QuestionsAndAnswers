const makeApp = require('./index.js');
const { pool } = require('../db/database.js')
require('newrelic');
const port = process.env.Server_Port || 3000;

const app = makeApp(pool);

app.listen(port, () => console.log(`listening on port ${port}`));

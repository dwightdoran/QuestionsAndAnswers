const app = require('./index.js');
const port = process.env.Server_Port || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

const makeApp = require('./index.js');
const questionsDataBase = require('./models/questions.js')
// console.log(questionsDataBase)
const answersDataBase = require('./models/answers.js')

const port = process.env.Server_Port || 3000;

const app = makeApp.app(questionsDataBase, answersDataBase);

app.listen(port, () => console.log(`listening on port ${port}`));


exports.dataConverter = {
  questionsConv: (result, product_id) => {
    let resultQuestions = {
      product_id: product_id,
      results: result
    };
    return resultQuestions;
  },

  answersConv: () => {

  }
}

// [
//   {
//     questions_id: '246188',
//     question_body: 'Nulla voluptatum hic dolores numquam ut magni at dignissimos totam.',
//     question_date_written: 2021-03-27T12:29:14.000Z,
//     asker_name: 'Haylie_Wunsch79',
//     question_reported: false,
//     question_helpfulness: 0,
//     answers_id: '480519',
//     answer_body: 'Vel ea officia corporis quaerat quia praesentium velit culpa.',
//     answer_date_written: 2020-10-18T04:58:20.000Z,
//     answerer_name: 'Cristal_Swaniawski',
//     answer_helpfulness: 4,
//     photos_url: 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
//   },
//   {
//     questions_id: '246188',
//     question_body: 'Nulla voluptatum hic dolores numquam ut magni at dignissimos totam.',
//     question_date_written: 2021-03-27T12:29:14.000Z,
//     asker_name: 'Haylie_Wunsch79',
//     question_reported: false,
//     question_helpfulness: 0,
//     answers_id: '480519',
//     answer_body: 'Vel ea officia corporis quaerat quia praesentium velit culpa.',
//     answer_date_written: 2020-10-18T04:58:20.000Z,
//     answerer_name: 'Cristal_Swaniawski',
//     answer_helpfulness: 4,
//     photos_url: 'undefined'
//   },
//   {
//     questions_id: '246188',
//     question_body: 'Nulla voluptatum hic dolores numquam ut magni at dignissimos totam.',
//     question_date_written: 2021-03-27T12:29:14.000Z,
//     asker_name: 'Haylie_Wunsch79',
//     question_reported: false,
//     question_helpfulness: 0,
//     answers_id: '480520',
//     answer_body: 'Assumenda ut reprehenderit reprehenderit beatae in qui eos dolorum corrupti.',
//     answer_date_written: 2020-08-27T18:30:28.000Z,
//     answerer_name: 'Keshawn_Bailey',
//     answer_helpfulness: 18,
//     photos_url: 'https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
//   },
//   {
//     questions_id: '246188',
//     question_body: 'Nulla voluptatum hic dolores numquam ut magni at dignissimos totam.',
//     question_date_written: 2021-03-27T12:29:14.000Z,
//     asker_name: 'Haylie_Wunsch79',
//     question_reported: false,
//     question_helpfulness: 0,
//     answers_id: '480520',
//     answer_body: 'Assumenda ut reprehenderit reprehenderit beatae in qui eos dolorum corrupti.',
//     answer_date_written: 2020-08-27T18:30:28.000Z,
//     answerer_name: 'Keshawn_Bailey',
//     answer_helpfulness: 18,
//     photos_url: 'undefined'
//   },
//   {
//     questions_id: '246188',
//     question_body: 'Nulla voluptatum hic dolores numquam ut magni at dignissimos totam.',
//     question_date_written: 2021-03-27T12:29:14.000Z,
//     asker_name: 'Haylie_Wunsch79',
//     question_reported: false,
//     question_helpfulness: 0,
//     answers_id: '480521',
//     answer_body: 'Aspernatur id sunt voluptates temporibus quisquam.',
//     answer_date_written: 2020-10-29T02:47:42.000Z,
//     answerer_name: 'Morris.Farrell',
//     answer_helpfulness: 15,
//     photos_url: 'undefined'
//   }
// ]
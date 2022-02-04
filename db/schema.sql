-- set up schema

-- CREATE DATABASE questions_and_answers;

\c questions_and_answers;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  questions_id BIGSERIAL PRIMARY KEY,
  product_id BIGINT,
  question_body VARCHAR(255),
  question_date_written TEXT,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  question_reported BOOLEAN,
  question_helpfulness INTEGER
);

CREATE TABLE answers (
  answers_id BIGSERIAL PRIMARY KEY,
  question_id BIGINT REFERENCES questions(questions_id),
  answer_body VARCHAR(255),
  date_written TEXT,
  answerer_name VARCHAR(100),
  answerer_email VARCHAR(100),
  answer_reported BOOLEAN,
  answer_helpfulness INTEGER
);

CREATE TABLE photos (
  photos_id BIGSERIAL PRIMARY KEY,
  answer_id BIGINT REFERENCES answers(answers_id),
  url TEXT
);

\copy questions FROM 'data/questions.csv' DELIMITER ',' CSV HEADER;
\copy answers FROM 'data/answers.csv' DELIMITER ',' CSV HEADER;
\copy photos FROM 'data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- SELECT questions_id, question_body, question_date_written,
-- asker_name, question_reported, question_helpfulness,
-- answers_id, answer_body, date_written, answerer_name, answer_reported,
-- answer_helpfulness
-- FROM questions, answers
-- WHERE questions.questions_id = answers.question_id
-- AND product_id = 15;

-- CREATE INDEX idx_question_id ON questions(questions_id) AND answers(question_id)
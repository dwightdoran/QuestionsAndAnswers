-- set up schema
DROP DATABASE IF EXISTS questions_and_answers;
CREATE DATABASE questions_and_answers;

\c questions_and_answers;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  questions_id BIGSERIAL PRIMARY KEY,
  product_id BIGINT,
  question_body VARCHAR(255),
  question_epoch BIGINT,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  question_reported BOOLEAN,
  question_helpfulness INTEGER
);

CREATE TABLE answers (
  answers_id BIGSERIAL PRIMARY KEY,
  question_id BIGINT REFERENCES questions(questions_id),
  answer_body VARCHAR(255),
  answer_epoch BIGINT,
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

ALTER TABLE questions ADD question_date_written TIMESTAMP;
ALTER TABLE answers ADD answer_date_written TIMESTAMP;

UPDATE questions SET question_date_written = to_timestamp(floor(question_epoch/1000));
UPDATE answers SET answer_date_written = to_timestamp(floor(answer_epoch/1000));

CREATE INDEX idx_question_id ON questions(questions_id);
CREATE INDEX idx_question_id_answers ON answers(question_id);
CREATE INDEX idx_product_id ON questions(product_id);

ALTER TABLE questions DROP COLUMN question_epoch;
ALTER TABLE answers DROP COLUMN answer_epoch;

-- change query to answer_date_written
-- SELECT questions_id, question_body, question_date_written,
-- asker_name, question_reported, question_helpfulness,
-- answers_id, answer_body, answer_date_written, answerer_name, answer_reported,
-- answer_helpfulness
-- FROM questions, answers
-- WHERE questions.questions_id = answers.question_id
-- AND product_id = 150000;

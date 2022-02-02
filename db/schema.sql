-- set up schema

-- CREATE DATABASE questions_and_answers;

\c questions_and_answers;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT,
  body VARCHAR(255),
  date_written TEXT,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported BOOLEAN,
  helpfulness INTEGER
);

CREATE TABLE answers (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGINT REFERENCES questions(id),
  body VARCHAR(255),
  date_written TEXT,
  answerer_name VARCHAR(100),
  answerer_email VARCHAR(100),
  reported BOOLEAN,
  helpfulness INTEGER
);

CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  answer_id BIGINT REFERENCES answers(id),
  url TEXT
);

\copy questions FROM 'data/questions.csv' WITH (format csv, header);
\copy answers FROM 'data/answers.csv' WITH (format csv, header);
\copy photos FROM 'data/answers_photos.csv' WITH (format csv, header);

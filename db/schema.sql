-- set up schema

-- CREATE DATABASE questions_and_answers;

USE questions_and_answers;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY
);

CREATE TABLE questions (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id),
  body VARCHAR(255),
  date_written DATE,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported BOOLEAN,
  helpfulness INTEGER
);

CREATE TABLE answers (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGINT REFERENCES questions(id),
  body VARCHAR(255),
  date_written DATE,
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

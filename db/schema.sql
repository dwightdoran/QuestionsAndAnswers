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
  photos_url TEXT
);
-- copy csv files data into database;

-- \copy questions FROM 'data/questions.csv' DELIMITER ',' CSV HEADER;
-- \copy answers FROM 'data/answers.csv' DELIMITER ',' CSV HEADER;
-- \copy photos FROM 'data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- docker file run
-- \copy questions FROM '/var/lib/postgresql/data/data/questions.csv' DELIMITER ',' CSV HEADER;
-- \copy answers FROM '/var/lib/postgresql/data/data/answers.csv' DELIMITER ',' CSV HEADER;
-- \copy answers FROM '/var/lib/postgresql/data/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- add columns to questions and answers tables with timestamp datatype
-- ALTER TABLE questions ADD question_date_written TIMESTAMP;
-- ALTER TABLE answers ADD answer_date_written TIMESTAMP;

-- set the new columns values to the timestamp gotten from the old column values
-- UPDATE questions SET question_date_written = to_timestamp(floor(question_epoch/1000));
-- UPDATE answers SET answer_date_written = to_timestamp(floor(answer_epoch/1000));

-- index primary and foreign keys
-- CREATE INDEX idx_question_id ON questions(questions_id);
-- CREATE INDEX idx_question_id_answers ON answers(question_id);
-- CREATE INDEX idx_product_id ON questions(product_id);
-- CREATE INDEX idx_photos_id ON photos(answer_id);

-- drop columns with old time data
-- ALTER TABLE questions DROP COLUMN question_epoch;
-- ALTER TABLE answers DROP COLUMN answer_epoch;

-- reset pkey(serial) values
-- SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'questions_id'), (SELECT MAX(questions_id) FROM questions)+1);
-- SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'answers_id'), (SELECT MAX(answers_id) FROM answers)+1);
-- SELECT pg_catalog.setval(pg_get_serial_sequence('photos', 'photos_id'), (SELECT MAX(photos_id) FROM photos)+1);
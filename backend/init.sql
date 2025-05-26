CREATE TABLE IF NOT EXISTS test_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

INSERT INTO test_table (name)
SELECT 'Алиса'
WHERE NOT EXISTS (SELECT 1 FROM test_table WHERE name = 'Алиса');

INSERT INTO test_table (name)
SELECT 'Боб'
WHERE NOT EXISTS (SELECT 1 FROM test_table WHERE name = 'Боб');
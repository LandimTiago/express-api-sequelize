const { Pool } = require('pg');

const {
  DATABASE_DB,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} = require('../env');

module.exports = new Pool({
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_DB,
});

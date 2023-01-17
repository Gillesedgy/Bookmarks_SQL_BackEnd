//IMPORTS / DEPENDENCIES
const pgp = require("pg-promise")();
require("dotenv").config();

// All the .env variables
const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};
//db WILL REFERENCE THE BOOKMARKS_DEV DATABASE
const db = pgp(cn);

module.exports = db;

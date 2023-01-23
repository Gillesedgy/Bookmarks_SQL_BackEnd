//IMPORTS / DEPENDENCIES
const pgp = require("pg-promise")();
// ALLOWS US TO ACCESS AND USE ALL .env VARIABLES
require("dotenv").config();

// All THE .env VARIABLES
const cn = { 
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};
//db WILL REFERENCE THE BOOKMARKS_DEV DATABASE
const db = pgp(cn);

module.exports = db;

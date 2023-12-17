 // database.js
 const Pool = require('pg').Pool;
 const pool = new Pool({
     user: "postgres",
     password: "homeworkiv",
     database: "homeworkIV",
     host: "localhost",
     port: "5432"
 });
 
 module.exports = pool;
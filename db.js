// db.js
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '641325',
  database: 'board'
});

conn.connect();
module.exports = conn;

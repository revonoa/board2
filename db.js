// db.js
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: '59.22.64.219',
  user: 'chan',
  password: '641325',
  database: 'board'
});

conn.connect();
module.exports = conn;

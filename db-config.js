const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'dgmendoza1015',
  password: 'Mendoza1015#',
  database: 'newsletter'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

module.exports = db;

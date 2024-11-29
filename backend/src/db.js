const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'buzmrpsobqx3ropldyas-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'u45njkkveehnihdj',
  password: process.env.DB_PASSWORD || '7uJRuFoZQ0gWY1Ddd9gH',
  database: process.env.DB_NAME || 'buzmrpsobqx3ropldyas',
  port:3306
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('MySQL connected');
});

module.exports = db;

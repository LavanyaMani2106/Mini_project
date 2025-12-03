
require('dotenv').config();
const app = require('./app');
const db = require('./db'); // Initialize database

const PORT = process.env.PORT || 5000;

// Database is now SQLite - automatically initialized via db.js
// User authentication and stress session data are stored persistently

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Database: SQLite (hakuna_matata.db)');
});

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'hakuna_matata.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
function initializeDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT '',
      preferences TEXT DEFAULT '{"theme":"light","notifications":true}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create stress_sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS stress_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      session_id TEXT NOT NULL,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      readings TEXT DEFAULT '[]',
      avg_stress INTEGER DEFAULT 0,
      max_stress INTEGER DEFAULT 0,
      min_stress INTEGER DEFAULT 0,
      duration INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_stress_sessions_user_id ON stress_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_stress_sessions_date ON stress_sessions(date);
  `);

  console.log('✅ Database initialized successfully');
}

// Initialize on first load
initializeDatabase();

module.exports = db;

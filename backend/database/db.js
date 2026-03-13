

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/logs.db", (err) => {
    if (err) {
        console.error("Database error:", err.message);
    } else {
        console.log("SQLite connected");
    }
});

db.run(`
CREATE TABLE IF NOT EXISTS errors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hash TEXT UNIQUE,
    error TEXT,
    analysis TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;
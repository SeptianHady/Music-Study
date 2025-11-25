import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'music.db');
const db = new Database(dbPath);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS musics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL,
    mood TEXT,
    spotify_link TEXT
  );
`;

db.exec(createTableQuery);

export default db;
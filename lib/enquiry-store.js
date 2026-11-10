import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

let database;

function getDatabase() {
  if (database) return database;
  const filename = resolve(/*turbopackIgnore: true*/ process.env.ENQUIRY_DB_PATH || 'data/enquiries.sqlite');
  mkdirSync(dirname(filename), { recursive: true });
  const connection = new DatabaseSync(filename);
  try {
    connection.exec('PRAGMA busy_timeout = 5000');
    connection.exec(readFileSync(resolve('db/schema.sql'), 'utf8'));
  } catch (error) {
    connection.close();
    throw error;
  }
  database = connection;
  return database;
}

export function saveEnquiry(id, details, items) {
  getDatabase().prepare(
    'INSERT INTO enquiries (id, name, email, phone, city, message, items_json) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING',
  ).run(id, details.name, details.email, details.phone, details.city, details.message, JSON.stringify(items));
}

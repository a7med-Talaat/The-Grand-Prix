const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'grandprix.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.all("SELECT * FROM meetups", (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('--- Meetups Table ---');
            console.table(rows);
        }
    });
});

db.close();

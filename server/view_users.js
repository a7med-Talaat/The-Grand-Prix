const db = require('./database');

console.log('Fetching users from database...\n');

db.all('SELECT id, username, country, role, password FROM users', [], (err, rows) => {
    if (err) {
        throw err;
    }

    if (rows.length === 0) {
        console.log('No users found in the database.');
    } else {
        console.table(rows);
        console.log(`\nTotal Users: ${rows.length}`);
    }
});

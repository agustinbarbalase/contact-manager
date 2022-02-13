const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Connecting the database
const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect((err) => {
  if (err) throw err;
  console.log('DB is connected');
});

// Read and execute database.sql
const database = fs.readFileSync(path.join(__dirname, "./database.sql"), 'utf-8');
client.query(database, (err) => {
  if (err) throw err;
  console.log('Tasks executed succesfully');
})

module.exports = client;

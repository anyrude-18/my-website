// server.js

const express = require('express');
const mysql = require('mysql');
const app = express();

// Connect to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aj#64213',
  database: 'online auction system',
});

connection.connect();

// Define an API endpoint for fetching auction data
app.get('/api/auctions', (req, res) => {
  // Query the MySQL database for the featured auctions
  const query = `
    SELECT * FROM auctions
    WHERE featured = true;
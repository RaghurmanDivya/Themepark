require('dotenv').config(); // Add this to use .env variables
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'assets')));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000, access server with http://localhost:3000');
});

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'medhaxl'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log(`Connected to the database: ${db.config.database}`);
});

// Serve the login.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// API to insert billing record
app.post('/billing', (req, res) => {
    const { adultsCount, childrenCount, seniorsCount, buffetCount, drinksCount, snacksCount, specialAccessCount, totalPrice, name, email, phonenum, billingStatus } = req.body;

    const sql = `
        INSERT INTO billing (adultsCount, childrenCount, seniorsCount, buffetCount, drinksCount, snacksCount, specialAccessCount, totalPrice, name, email, phonenum, billingStatus)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [adultsCount, childrenCount, seniorsCount, buffetCount, drinksCount, snacksCount, specialAccessCount, totalPrice, name, email, phonenum, billingStatus], (err, result) => {
        if (err) {
            console.error('Error inserting record:', err);
            res.status(500).json({ message: 'Error inserting record' });
        } else {
            res.status(200).json({ message: 'Record inserted successfully', data: result });
        }
    });
});

// POST API to insert data into the help table
app.post('/help', (req, res) => {
    const { issue, email, rating } = req.body;

    // Check if the required fields are present
    if (!issue || !email || !rating) {
        return res.status(400).json({ error: 'Issue, email, and rating are required.' });
    }

    // Insert the data into the help table
    const query = 'INSERT INTO help (issue, email, rating) VALUES (?, ?, ?)';
    db.query(query, [issue, email, rating], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error occurred.' });
        }
        res.status(201).json({ message: 'Record inserted successfully', id: result.insertId });
    });
});

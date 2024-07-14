const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

// Create connection to the new database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'dbPass1*', // Replace with your MySQL root password
    database: 'new_showcase_db', // Replace with your database name
    authSwitchHandler: function({ pluginName, pluginData }, cb) {
      if (pluginName === 'caching_sha2_password') {
        const password = 'dbPass1*'; // Replace with your MySQL root password
        const securePassword = Buffer.from(password + '\0');
        cb(null, securePassword);
      }
    }
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the process if connection fails
  }
  console.log('MySQL Connected...');
});

// Endpoint to submit survey data
// Handle POST request to insert survey data
app.post('/api/survey', (req, res) => {
    const { email, name, projectTitle, projectDescription, sponsor, teamMembers, courseNumber, demo, power, nda, youtubeLink } = req.body;
    const sql = 'INSERT INTO survey_entries (email, name, projectTitle, description, sponsor, teamMembers, courseNumber, demo, power, nda, youtubeLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [email, name, projectTitle, projectDescription, sponsor, teamMembers, courseNumber, demo, power, nda, youtubeLink], (err, result) => {
      if (err) {
        console.error('Error inserting survey data:', err);
        return res.status(500).send('Server error');
      }
      console.log('Survey data inserted successfully');
      res.status(200).send('Survey data inserted');
    });
  });
  
// Endpoint to retrieve survey data by major
app.get('/api/survey/:major', (req, res) => {
  const major = req.params.major;
  const sql = 'SELECT * FROM survey_entries WHERE major = ?';
  db.query(sql, [major], (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

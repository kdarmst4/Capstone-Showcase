const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mysql = require(process.env.PRODUCTION_DB_MYSQL_PACKAGE);

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.PRODUCTION_DB_HOST, 
  user: process.env.PRODUCTION_DB_USERNAME,
  password: process.env.PRODUCTION_DB_PASSWORD,
  database: process.env.PRODUCTION_DB_DATABASE, 
  // authSwitchHandler: function ({ pluginName, pluginData }, cb) {
  //   if (pluginName === "caching_sha2_password") {
  //     const password = "test"; // Replace with BlueHost MySQL root password
  //     const securePassword = Buffer.from(password + "\0");
  //     cb(null, securePassword);
  //   }
  // },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});

app.post("/api/survey", (req, res) => {
  const {
    email,
    name,
    projectTitle,
    projectDescription,
    sponsor,
    numberOfTeamMembers,
    teamMemberNames,
    courseNumber,
    demo,
    power,
    nda,
    youtubeLink,
  } = req.body;
  console.log("Received survey data:", req.body);

  const sql =
    "INSERT INTO survey_entries (email, name, projectTitle, projectDescription, sponsor, numberOfTeamMembers, teamMemberNames, courseNumber, demo, power, nda, youtubeLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  console.log("Executing SQL:", sql);

  // We have to change `nda` and `demo` to either 1 (True) or 0 (False) since the DB stores these fields
  // as TINYINT(1) and the survey gives us either 'yes' or 'no' Strings.
  if (nda == 'yes') {
    ndaValue = 1
  } else {
    ndaValue = 0
  }

  if (demo == 'yes') {
    demoValue = 1
  } else {
    demoValue = 0
  }

  db.query(
    sql,
    [
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      numberOfTeamMembers,
      teamMemberNames,
      courseNumber,
      demoValue,
      power,
      ndaValue,
      youtubeLink,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting survey data:", err);
        return res.status(500).send("Server error");
      }
      console.log("Survey data inserted successfully");
      res.status(200).send("Survey data inserted");
    }
  );
});

app.get("/api/survey/:major", (req, res) => {
  const major = req.params.major;
  const sql = "SELECT * FROM survey_entries WHERE major = ?";
  db.query(sql, [major], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

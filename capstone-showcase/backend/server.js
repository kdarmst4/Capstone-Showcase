const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "162.241.218.157", //Replace with BlueHost database host
  user: "jmtlqnmy_showcase_entries_2024",
  password: "showcase2024summer", //Replace with BlueHost database password
  database: "jntlqnmy_capstone_project_submission", // Replace with BlueHost database name
  authSwitchHandler: function ({ pluginName, pluginData }, cb) {
    if (pluginName === "caching_sha2_password") {
      const password = "showcase2024summer"; // Replace with BlueHost MySQL root password
      const securePassword = Buffer.from(password + "\0");
      cb(null, securePassword);
    }
  },
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
    teamMembers,
    courseNumber,
    demo,
    power,
    nda,
    youtubeLink,
  } = req.body;
  console.log("Received survey data:", req.body);
  const sql =
    "INSERT INTO survey_entries (email, name, projectTitle, description, sponsor, teamMembers, courseNumber, demo, power, nda, youtubeLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  console.log("Executing SQL:", sql);
  db.query(
    sql,
    [
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      teamMembers,
      courseNumber,
      demo,
      power,
      nda,
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

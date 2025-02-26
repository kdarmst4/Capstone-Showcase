const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();

const dotenv = require("dotenv");


dotenv.config();
const mysql = require(process.env.PRODUCTION_DB_MYSQL_PACKAGE);

app.use(bodyParser.json());
const corsOptions = {
  origin: (origin, callback) => {
    // Check if origin is from any subdomain of asucapstone.com
    if (origin && origin.endsWith('.asucapstone.com')) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the origin
    }
  },
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));


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

const privateKey = fs.readFileSync("./keySSL.pem", "utf8")
const certificate = fs.readFileSync("./certSSL.pem", "utf8")

const credentials = {key: privateKey, cert: certificate};

https.createServer(credentials, app).listen(3000, '0.0.0.0', () => {
  console.log("HTTPS Server started on port 3000");
});

/*app.listen(3000,'0.0.0.0', () => {
  console.log("Server started on port 3000");
});*/

app.post("/api/survey", (req, res) => {
  const {
    email,
    name,
    projectTitle,
    projectDescription,
    sponsor,
    numberOfTeamMembers,
    teamMemberNames,
    major,
    demo,
    power,
    nda,
    showDemo,
    youtubeLink,
  } = req.body;
  console.log("Received survey data:", req.body);

  let youtubeLinkValue = youtubeLink || null;

  const sql =
    "INSERT INTO survey_entries (email, name, projectTitle, projectDescription, sponsor, numberOfTeamMembers, teamMemberNames, major, demo, power, nda, youtubeLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  console.log("Executing SQL:", sql);

  // We have to change `nda` and `demo` to either 1 (True) or 0 (False) since the DB stores these fields
  // as TINYINT(1) and the survey gives us either 'yes' or 'no' Strings.
  if (nda == "yes") {
    ndaValue = 1;
  } else {
    ndaValue = 0;
  }

  if (demo == "yes") {
    demoValue = 1;
  } else {
    demoValue = 0;
  }

  if (power == "yes") {
    powerValue = 1;
  } else {
    powerValue = 0;
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
      major,
      demoValue,
      powerValue,
      ndaValue,
      youtubeLinkValue,
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



// Endpoint to fetch projects by major
app.get("/api/survey/:major", (req, res) => {
  const { major } = req.params;
  console.log("Major requested:", major); // Log the requested major

  const sql = "SELECT * FROM survey_entries WHERE major = ?";
  db.query(sql, [major], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results); // Log the query results
    res.json(results);
  });
});

//Endpoint to fetch submissions for Admin Page
app.get("/api/admin/submissions", (req, res) => {
  const sql = "SELECT * FROM survey_entries";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching submissions:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});


app.put("/api/admin/submissions/:id", (req, res) => {
  const { id } = req.params;
  const {
    email,
    name,
    projectTitle,
    projectDescription,
    sponsor,
    numberOfTeamMembers,
    teamMemberNames,
    major,
    demo,
    power,
    nda,
    youtubeLink,
  } = req.body;

  let youtubeLinkValue = youtubeLink || null;
  let ndaValue = nda === "yes" ? 1 : 0;
  let demoValue = demo === "yes" ? 1 : 0;
  let powerValue = power === "yes" ? 1 : 0;

  console.log("Updating survey data:", req.body); // Ensure data is logged

  const sql =
    "UPDATE survey_entries SET email = ?, name = ?, projectTitle = ?, projectDescription = ?, sponsor = ?, numberOfTeamMembers = ?, teamMemberNames = ?, major = ?, demo = ?, power = ?, nda = ?, youtubeLink = ? WHERE id = ?";

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
      major,
      demoValue,
      powerValue,
      ndaValue,
      youtubeLinkValue,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating survey data:", err);
        return res.status(500).send("Server error");
      }
      console.log("Survey data updated successfully");
      res.status(200).send("Survey data updated");
    }
  );
});
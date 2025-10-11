const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const fs = require("fs");
// the || was an addition make sure to recomove it
const mysql = require(process.env.LOCAL_DB_MYSQL_PACKAGE || "mysql2");

//Local DB Different
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USERNAME || "root",
  password: process.env.LOCAL_DB_PASSWORD || "password",
  database:
    process.env.LOCAL_DB_DATABASE ||
    "asucapstone_jmtlqnmy_capstone_project_submission",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});

//SAME AS PROD DB

//Poster Image Directory
const uploadDir = "./posterUploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//Team Images Directory
const uploadTeamDir = "./teamUploads";
if (!fs.existsSync(uploadTeamDir)) {
  fs.mkdirSync(uploadTeamDir);
}

//Poster Image Upload Storage
const storagePoster = multer.diskStorage({
  destination: "./posterUploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storagePoster });

//Team Images Upload Storage
const storageTeam = multer.diskStorage({
  destination: "./teamUploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadTeam = multer({ storage: storageTeam });

app.post("/api/survey/uploadsPoster", upload.single("poster"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/posterUploads/${req.file.filename}`;
  console.log("Uploaded file:", req.file.filename);
  console.log("Picture Path:", filePath);
  res.json({ path: filePath });
});
app.get('/api/survey/:id', (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).send("Bad request");
  }

  const sql = "SELECT * FROM survey_entries WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching survey entry:", err);
      return res.status(500).send("Server error");
    }
    if (results.length === 0) {
      return res.status(404).send("Survey entry not found");
    }
    res.status(200).json(results[0]);
  });
});

app.post(
  "/api/survey/uploadsTeam",
  uploadTeam.array("contentTeamFiles", 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No team images uploaded" });
    }

    const paths = req.files.map((file) => `/teamUploads/${file.filename}`);
    console.log("Uploaded team files:", paths);
    res.json({ paths });
  }
);

// this is the api route in the localserver.js file 
app.post('/api/signin', (req, res) => {

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
    major,
    demo,
    power,
    nda,
    posterApproved,
    attendance,
    zoomLink,
    youtubeLink,
    posterPicturePath,
    teamPicturePath,
  } = req.body;

  // Convert string values to correct types
  let youtubeLinkValue = youtubeLink || null;
  let zoomLinkValue = zoomLink || null;
  let ndaValue = nda === "yes" ? 1 : 0;
  let demoValue = demo === "yes" ? 1 : 0;
  let powerValue = power === "yes" ? 1 : 0;
  let attendanceValue = attendance === "inPerson" ? 1 : 0;
  let posterNDA = posterApproved === "yes" ? 1 : 0;

  // Get the current date and time for submitDate
  let submitDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  console.log("Received survey data:", req.body);

  const sql = `INSERT INTO survey_entries (
      email, name, projectTitle, projectDescription, sponsor, numberOfTeamMembers, teamMemberNames, major, demo, power, nda, posterNDA, attendance, zoomLink, youtubeLink,
      posterPicturePath, teamPicturePath, submitDate,
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      Number(numberOfTeamMembers),
      teamMemberNames,
      major,
      demoValue,
      powerValue,
      ndaValue,
      posterNDA,
      attendanceValue,
      zoomLinkValue,
      youtubeLinkValue,
      posterPicturePath,
      teamPicturePath,
      submitDate, // Include the current date and time for submitDate
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

app.use("/posterUploads", express.static("posterUploads"));
app.use("/teamUploads", express.static("teamUploads"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

/// Endpoint to fetch projects by major and semester
app.get("/api/survey/:major/term=:semester-:year", (req, res) => {
  const { major, semester, year } = req.params;
  console.log("Request parameters:", req.params); // Log all parameters

  console.log("Major requested:", major);
  console.log("Semester requested:", semester);
  console.log("Year requested:", year);

  if (!semester || !year) {
    console.error("Error: Invalid semester or year");
    return res.status(400).send("Bad request");
  }

  let startMonth, endMonth;
  if (semester === "sp") {
    startMonth = "04";
    endMonth = "05";
  } else if (semester === "fa") {
    startMonth = "11";
    endMonth = "12";
  } else {
    console.error("Error: Invalid semester");
    return res.status(400).send("Bad request");
  }

  const startDate = `${year}-${startMonth}-01 00:00:00`;
  const endDate = `${year}-${endMonth}-01 00:00:00`;

  const sql =
    "SELECT * FROM survey_entries ORDER BY projectTitle";
  db.query(sql, [major, startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results);
    res.json(results);
  });
});

// Endpoint to fetch projects by semester
app.get("/api/survey/:semester/:year", (req, res) => {
  const { semester, year } = req.params;
  console.log("Semester requested:", semester);
  console.log("Year requested:", year);

  if (!semester || !year) {
    console.error("Error: Invalid semester or year");
    return res.status(400).send("Bad request");
  }

  let startMonth, endMonth;
  if (semester === "sp") {
    startMonth = "04";
    endMonth = "05";
  } else if (semester === "fa") {
    startMonth = "11";
    endMonth = "12";
  } else {
    console.error("Error: Invalid semester");
    return res.status(400).send("Bad request");
  }

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const startDate = `${year}-${startMonth}-01 00:00:00`;
  const endDay = getLastDayOfMonth(year, parseInt(endMonth));
  const endDate = `${year}-${endMonth}-${endDay} 23:59:59`;

  console.log(`Querying from ${startDate} to ${endDate}`);

  const sql = "SELECT * FROM showcaseentries WHERE DateStamp BETWEEN ? AND ?";
  db.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results);
    res.json(results);
  });
});

//get endpoint to fetch all the winners of prev projects
app.get("/api/winners", (req, res) => {
  const sql = `SELECT 
  CourseNumber AS course,
  VideoLinkRaw AS video,
  shouldDisplay,
  position AS position,
  MemberNames AS members,
  Sponsor,
  ProjectDescription AS description,
  ProjectTitle,
  winning_pic,
  shouldDisplay,
  NDA,
  EntryID,
  YEAR(DateStamp) AS year,
  CASE 
    WHEN MONTH(DateStamp) IN (12, 1, 2) THEN 'Winter'
    WHEN MONTH(DateStamp) IN (3, 4, 5) THEN 'Spring'
    WHEN MONTH(DateStamp) IN (6, 7, 8) THEN 'Summer'
    WHEN MONTH(DateStamp) IN (9, 10, 11) THEN 'Fall'
  END AS semester
FROM showcaseentries
WHERE position IS NOT NULL;`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving winners data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results);
    res.json(results);
  });
});

//getting a specific winner by id
app.get("/api/winner/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT 
  CourseNumber AS course,
  VideoLinkRaw AS video,
  shouldDisplay,
  position AS position,
  MemberNames AS members,
  Sponsor,
  ProjectDescription AS description,
  ProjectTitle,
  winning_pic,
  shouldDisplay,
  NDA,
  EntryID,
  YEAR(DateStamp) AS year,
  CASE 
    WHEN MONTH(DateStamp) IN (12, 1, 2) THEN 'Winter'
    WHEN MONTH(DateStamp) IN (3, 4, 5) THEN 'Spring'
    WHEN MONTH(DateStamp) IN (6, 7, 8) THEN 'Summer'
    WHEN MONTH(DateStamp) IN (9, 10, 11) THEN 'Fall'
  END AS semester
FROM showcaseentries
WHERE position IS NOT NULL AND EntryID = ?;`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error retrieving winners data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results);
    res.json(results);
  });
});

// Endpoint to fetch projects by major
app.get("/api/survey/:major", (req, res) => {
  const { major } = req.params;
  console.log("Major requested:", major); // Log the requested major

  const sql =
    "SELECT * FROM survey_entries WHERE major = ? ORDER BY projectTitle";
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

//Endpoint to get a list of all the project titles for Survey Page
app.get("/api/projects", (req, res) => {
  db.query(
    "SELECT project_id, project_title FROM project_entries",
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database query failed" });
        return;
      }
      res.json(results);
    }
  );
});

// app.get('/api/projects/:semester/:year/:department', (req, res) => {
app.get("/api/projects/:semester/:year", (req, res) => {
  const { semester, year } = req.params;
  let startMonth, endMonth;
  if (semester === "sp") {
    startMonth = "04";
    endMonth = "05";
  } else if (semester === "fa") {
    startMonth = "11";
    endMonth = "12";
  } else {
    res.status(400).json({ error: "Invalid semester" });
    return;
  }
  const startDate = `${year}-${startMonth}-01 00:00:00`;
  const endDate = `${year}-${endMonth}-01 00:00:00`;
  // db.query('SELECT * FROM project_entries WHERE submitDate BETWEEN ? AND ? AND department = ?', [startDate, endDate, department], (err, results) => {
  db.query('SELECT * FROM showcaseentries WHERE DateStamp BETWEEN ? AND ?', [startDate, endDate], (err, results) => {
  // db.query("SELECT * FROM survey_entries;", (err, results) => {
    if (err) {
      console.error("here is the error", err);
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(results);
  });
});

app.put("/api/admin/submissions/:id", (req, res) => {
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
    posterApproved,
    attendance,
    zoomLink,
    youtubeLink,
    posterPicturePath,
    teamPicturePath,
  } = req.body;

  // Convert string values to correct types
  let youtubeLinkValue = youtubeLink || null;
  let zoomLinkValue = zoomLink || null;
  let ndaValue = nda === "yes" ? 1 : 0;
  let demoValue = demo === "yes" ? 1 : 0;
  let powerValue = power === "yes" ? 1 : 0;
  let attendanceValue = attendance === "inPerson" ? 1 : 0;
  let posterNDA = posterApproved === "yes" ? 1 : 0;

  const id = req.params.id;

  const sql = `
    UPDATE survey_entries SET
      email = ?, name = ?, projectTitle = ?, projectDescription = ?, sponsor = ?,
      numberOfTeamMembers = ?, teamMemberNames = ?, major = ?, demo = ?, power = ?, nda = ?, posterNDA = ?,
      attendance = ?, zoomLink = ?, youtubeLink = ?, posterPicturePath = ?, teamPicturePath = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      Number(numberOfTeamMembers),
      teamMemberNames,
      major,
      demoValue,
      powerValue,
      ndaValue,
      posterNDA,
      attendanceValue,
      zoomLinkValue,
      youtubeLinkValue,
      posterPicturePath,
      teamPicturePath,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating submission:", err);
        return res.status(500).send("Server error");
      }
      console.log("Submission updated successfully");
      res.status(200).send("Submission updated");
    }
  );
});



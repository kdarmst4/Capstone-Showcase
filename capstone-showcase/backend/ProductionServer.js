const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const app = express();

const dotenv = require("dotenv");


dotenv.config();
const mysql = require(process.env.PRODUCTION_DB_MYSQL_PACKAGE);

app.use(bodyParser.json());
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin || // allow non-browser tools like curl/postman
      origin === 'https://asucapstone.com:3000' ||
      origin.endsWith('.asucapstone.com')
    ) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const db = mysql.createConnection({
  host: process.env.PRODUCTION_DB_HOST,
  user: process.env.PRODUCTION_DB_USERNAME,
  password: process.env.PRODUCTION_DB_PASSWORD,
  database: process.env.PRODUCTION_DB_DATABASE,
  
});



db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});




//PERMS to Connect/Create Server
const privateKey = fs.readFileSync("./keySSL.pem", "utf8")
const certificate = fs.readFileSync("./certSSL.pem", "utf8")

const credentials = {key: privateKey, cert: certificate};


app.use("/posterUploads", express.static("posterUploads"));
app.use("/teamUploads", express.static("teamUploads"));









//Image Upload And Storgae API

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
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storagePoster });

//Team Images Upload Storage
const storageTeam = multer.diskStorage({
  destination: "./teamUploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
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
  res.json({ path:filePath });
});

app.post("/api/survey/uploadsTeam", uploadTeam.array("contentTeamFiles", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No team images uploaded" });
  }

  const paths = req.files.map(file => `/teamUploads/${file.filename}`);
  console.log("Uploaded team files:", paths);
  res.json({ paths });
});




//Survey Upload API
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
    youtubeLink,
    posterPicturePath,
    teamPicturePath
  } = req.body;

  // Convert string values to correct types
  let youtubeLinkValue = youtubeLink || null;
  
  let ndaValue = nda === "yes" ? 1 : 0;
  let demoValue = demo === "yes" ? 1 : 0;
  let powerValue = power === "yes" ? 1 : 0;
  let attendanceValue = attendance === "inPerson" ? 1 : 0;
  let posterNDA = posterApproved === "yes" ? 1 : 0;

  // Get the current date and time for submitDate
  let submitDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  console.log("Received survey data:", req.body);

  const sql =
    `INSERT INTO survey_entries (
      email, name, projectTitle, projectDescription, sponsor, numberOfTeamMembers, teamMemberNames, major, demo, power, nda, posterNDA, attendance, youtubeLink,
      posterPicturePath, teamPicturePath, submitDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      youtubeLinkValue,
      posterPicturePath,
      teamPicturePath,
      submitDate,  // Include the current date and time for submitDate
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


//Server Start
https.createServer(credentials, app).listen(3000, '0.0.0.0', () => {
  console.log("HTTPS Server started on port 3000");
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

// Endpoint to fetch projects by major and semester
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

  const sql = "SELECT * FROM survey_entries WHERE major = ? AND submitDate BETWEEN ? AND ?";
  db.query(sql, [major, startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results);
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

// Endpoint to fetch submissions by semester
app.get("/api/admin/submissions/term=:semester-:year", (req, res) => {
  const { semester, year } = req.params;
  console.log("Semester requested:", semester, year); // Log the requested semester and year

  if (semester === "sp") {
    var month = "04"
  }
  else if (semester === "fa") {
    var month = "11"
  }
  else {
    console.error("Error: Invalid semester");
    return res.status(400).send("Bad request");
  }
  
  const startDate = `${year}-${month}-01 00:00:00`
  const endDate = `${year}-${month}-30 23:59:59`

  const sql = "SELECT * FROM survey_entries WHERE submitDate BETWEEN ? AND ?";
  db.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results); // Log the query results
    res.json(results);
  });
});

//Endpoint to get a list of all the project titles for Survey Page
app.get('/api/projects', (req, res) => {
  db.query('SELECT project_id, project_title FROM project_entries', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
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
    posterImage,
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
      posterImage,
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
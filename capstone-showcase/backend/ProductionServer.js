const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();
const mysql = require(process.env.PRODUCTION_DB_MYSQL_PACKAGE);

app.use(bodyParser.json());
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin || // allow non-browser tools like curl/postman
      origin === "https://showcase.asucapstone.com" ||
      origin.endsWith(".asucapstone.com")
    ) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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

/*
//PERMS to Connect/Create Server Note ***Removed to test new proxy method***
const privateKey = fs.readFileSync("./keySSL.pem", "utf8")
const certificate = fs.readFileSync("./certSSL.pem", "utf8")

const credentials = {key: privateKey, cert: certificate};
*/

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

//Winner Images Directory
const uploadWinnerDir = "./winnerUploads";
if (!fs.existsSync(uploadWinnerDir)) {
  fs.mkdirSync(uploadWinnerDir);
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
//winner upload storage
const storageWinner = multer.diskStorage({
  destination: "./winnerUploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadWinner = multer({ storage: storageWinner });

app.post("/api/survey/uploadsPoster", upload.single("poster"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/posterUploads/${req.file.filename}`;
  console.log("Uploaded file:", req.file.filename);
  console.log("Picture Path:", filePath);
  res.json({ path: filePath });
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
    email, name, projectTitle, projectDescription, sponsor, teamMemberNames, numberOfTeamMembers, major, demo, power, nda,
    youtubeLink, posterPicturePath, submitDate, attendance, posterNDA, teamPicturePath, zoomLink
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      email,
      name,
      projectTitle,
      projectDescription,
      sponsor,
      teamMemberNames,
      Number(numberOfTeamMembers),
      major,
      demoValue,
      powerValue,
      ndaValue,
      youtubeLinkValue,
      posterPicturePath,
      submitDate,
      attendanceValue,
      posterNDA,
      teamPicturePath,
      zoomLinkValue,
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
http.createServer(app).listen(3000, "127.0.0.1", () => {
  console.log("HTTP Server started on port 3000");
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

  const sql =
    "SELECT * FROM survey_entries WHERE major = ? AND submitDate BETWEEN ? AND ? ORDER BY projectTitle";
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
app.get("/api/survey/term=:semester-:year", (req, res) => {
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

  const sql =
    "SELECT * FROM survey_entries WHERE submitDate BETWEEN ? AND ? ORDER BY projectTitle";
  db.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    console.log("Query results:", results);
    results.sort((a, b) => a.projectTitle.localeCompare(b.projectTitle));
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

// Endpoint to fetch projects by semester
app.get("/api/survey/:semester/:year", (req, res) => {
  const { semester, year } = req.params;
  // console.log("Semester requested:", semester);
  // console.log("Year requested:", year);

  if (!semester || !year) {
    // console.error("Error: Invalid semester or year");
    return res.status(400).send("Bad request");
  }

  let startMonth, endMonth;
  if (semester === "sp") {
    startMonth = "00";
    endMonth = "04";
  } else if (semester === "su") {
    startMonth = "05";
    endMonth = "08";
  } else if (semester === "fa") {
    startMonth = "09";
    endMonth = "12";
  } else if (semester === "all") {
    startMonth = "00";
    endMonth = "12";
  } else {
    res.status(400).json({ error: "Invalid semester" });
    return;
  }

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const startDate = `${year}-${startMonth}-01 00:00:00`;
  const endDay = getLastDayOfMonth(year, parseInt(endMonth));
  const endDate = `${year}-${endMonth}-${endDay} 23:59:59`;

  // console.log(`Querying from ${startDate} to ${endDate}`);

  const sql = "SELECT * FROM showcaseentries WHERE DateStamp BETWEEN ? AND ?";
  db.query(sql, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).send("Server error");
    }
    // console.log("Query results:", results);
    res.json(results);
  });
});

// fetch all projects submission by given data (achu)
// app.get('/api/projects/:semester/:year/:department', (req, res) => {
app.get("/api/projects/:semester/:year", (req, res) => {
  const { semester, year } = req.params;
  let startMonth, endMonth;
  if (semester === "sp") {
    startMonth = "00";
    endMonth = "04";
  } else if (semester === "su") {
    startMonth = "05";
    endMonth = "08";
  } else if (semester === "fa") {
    startMonth = "09";
    endMonth = "12";
  } else if (semester === "all") {
    startMonth = "00";
    endMonth = "12";
  } else {
    res.status(400).json({ error: "Invalid semester" });
    return;
  }
  const startDate = `${year}-${startMonth}-01 00:00:00`;
  const endDate = `${year}-${endMonth}-01 00:00:00`;
  // db.query('SELECT * FROM project_entries WHERE submitDate BETWEEN ? AND ? AND department = ?', [startDate, endDate, department], (err, results) => {
  db.query(
    "SELECT * FROM showcaseentries WHERE DateStamp BETWEEN ? AND ?",
    [startDate, endDate],
    (err, results) => {
      // db.query("SELECT * FROM survey_entries;", (err, results) => {
      if (err) {
        console.error("here is the error", err);
        res.status(500).json({ error: "Database query failed" });
        return;
      }
      res.json(results);
    }
  );
});

app.post("/api/signin", (req, res) => {
  // defining variables from request body
  const { username, password } = req.body;
  const saltRounds = 10; // Number of hashing rounds
  const secretJWTKey = process.env.JWT_SECRET_KEY || "test-key"; // Using a test key for now

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  // Hashing the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;

    // Querying the SQL server for the given username
    const sql =
      "SELECT * FROM admin_pass_hash WHERE username = ? OR email = ? AND PASS_HASH = ? LIMIT 1";
    db.query(sql, [username, username, hash], (err, results) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      // Checking the fetched user data
      try {
        if (results.length === 0) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        // Comparing the password hashes
        bcrypt.compare(password, results[0].pass_hash, (err, pwmatches) => {
          if (err) throw err;
          if (pwmatches) {
            const jwtToken = jwt.sign(
              {
                username: results[0].username,
                email: results[0].email,
              },
              secretJWTKey,
              { expiresIn: "30d" } // Token expiring in 1 month
            );
            return res.status(200).json({ jwtToken });
          } else {
            return res.status(401).json({ error: "Invalid credentials" });
          }
        });
      } catch {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    });
  });
});


app.get("/api/downloadProjects/:startDate/:endDate/:discipline", (req, res) => {
  const { startDate, endDate, discipline } = req.params;
  let query = "";
  let queryParams = [];
  // query = 'select * from survey_entries where submitDate BETWEEN ? AND ? AND major = ?';
  query = "SELECT * FROM showcaseentries WHERE DateStamp BETWEEN ? AND ?";
  queryParams = [startDate, endDate];
  if (discipline && discipline !== "all") {
    query += " AND major = ?";
    queryParams.push(discipline);
  }
  try {
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(200).json({ results });
    });
  } catch (error) {
    return res.status(500).json({ error: "Database query failed" });
  }
});

app.put("/api/:id/update", (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  let query = "UPDATE showcaseentries SET ";
  for (const key of keys) {
    query += `${key} = ?, `;
  }
  query = query.slice(0, -2); // Remove trailing comma and space
  query += ` WHERE EntryID = ${id}`;

  db.query(query, values, (err) => {
    if (err) {
      return res.status(500).send("Server error");
    }
  
    res.status(200).json({ message: "Entry updated successfully" });
  });
});

app.get('/api/single_survey/:id', (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).send("Bad request");
  }

  const sql = "SELECT * FROM survey_entries WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      // console.error("Error fetching survey entry:", err);
      return res.status(500).send("Server error");
    }
    if (results.length === 0) {
      return res.status(404).send("Survey entry not found");
    }
    res.status(200).json(results[0]);
  });
});

app.post("/api/set_winners", uploadWinner.any(), (req, res) => {
  //need to ensure that not more that 3 winners are selected 
  //set the 3 prev winners to null in db before setting new winners
try {
    const winners = [];
    // Determine number of winners by checking body keys for projectIdX
    const projectIdKeys = Object.keys(req.body).filter((k) => /^projectId\d+$/.test(k));
    const count = projectIdKeys.length;

    for (let i = 1; i <= count; i++) {
      const projectId = req.body[`projectId${i}`];
      const position = req.body[`position${i}`];

      // Collect files for this winner (fieldnames like picture{i}_{j})
      const filesForWinner = (req.files || []).filter((f) => new RegExp(`^picture${i}(_\\d+)?$`).test(f.fieldname));
      const filePaths = filesForWinner.map((f) => {
        return `/winnerUploads/${f.filename}`;
      });

      winners.push({ projectId: Number(projectId), position: Number(position), pictures: filePaths });
    }

    console.log("Parsed winners:", winners);

    db.beginTransaction((err) => {
      if (err) {
        console.error("Transaction error:", err);
        return res.status(500).json({ success: false, error: "Database transaction error" });
      }
      winners.forEach((winner) =>
      {
        db.query(
          "UPDATE survey_entries SET position = ? , winning_pic = ? WHERE id = ?",
          [winner.position, winner.pictures.join(","), winner.projectId],
          (err, results) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error updating winner:", err);
                return res.status(500).json({ success: false, error: "Database update error" });
              });
            }
          }
        );
      });
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error("Commit error:", err);
            return res.status(500).json({ success: false, error: "Database commit error" });
          });
        }
      });
    });
    return res.status(200).json({ success: true, winners });
  } catch (err) {
    console.error("Error handling set_winners:", err);
    return res.status(500).json({ success: false, error: "Server error parsing winners" });
  }
});
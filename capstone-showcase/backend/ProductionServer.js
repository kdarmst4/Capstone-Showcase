const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const multer = require("multer");
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

//PERMS to Connect/Create Server
const privateKey = fs.readFileSync("./keySSL.pem", "utf8")
const certificate = fs.readFileSync("./certSSL.pem", "utf8")

const credentials = {key: privateKey, cert: certificate};


app.use("/posterUploads", express.static("posterUploads"));

//Server Start
https.createServer(credentials, app).listen(3000, '0.0.0.0', () => {
  console.log("HTTPS Server started on port 3000");
});

/*app.listen(3000,'0.0.0.0', () => {
  console.log("Server started on port 3000");
});*/



//Image Upload And Storgae API

//File Directory Check
const uploadDir = "./posterUploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//File Storage and Naming
const storage = multer.diskStorage({
  destination: "./posterUploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

//API call to upload poster image
app.post("/api/survey/uploads", upload.single("poster"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/posterUploads/${req.file.filename}`;
  console.log("Uploaded file:", req.file.filename);
  console.log("Picture Path:", filePath);
  res.json({ path:filePath });
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
    youtubeLink,
    posterPicturePath,
  } = req.body;



  let youtubeLinkValue = youtubeLink || null;
  let ndaValue = nda === "yes" ? 1 : 0;
  let demoValue = demo === "yes" ? 1 : 0;
  let powerValue = power === "yes" ? 1 : 0;

  console.log("Received survey data:", req.body);

  const sql =
    "INSERT INTO survey_entries (email, name, projectTitle, projectDescription, sponsor, numberOfTeamMembers, teamMemberNames, major, demo, power, nda, youtubeLink, posterPicturePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
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
      posterPicturePath,
      
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
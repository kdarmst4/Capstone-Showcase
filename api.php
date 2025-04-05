<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "127.0.0.1"; 
$user = "asucapstone_showcase_entry";
$password = "AsuCapstoneShowcase";
$database = "asucapstone_jmtlqnmy_capstone_project_submission";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$sql = "SELECT * FROM survey_entries";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(["message" => "No records found"]);
}

$conn->close();
?>
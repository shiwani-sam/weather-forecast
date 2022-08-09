<?php

// Connect to database
$mysqli = new mysqli("localhost", "root", "", "weather");

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// First, check requested data is present and fresh
include('data-import.php');

// Select weather data for given parameters
$sql = "SELECT *
        FROM weather
        WHERE city = '{$_GET['city']}'
        ORDER BY weather_when DESC limit 1";
$result = $mysqli->query($sql);

// Get data, convert to JSON and print
$row = $result->fetch_assoc();
print json_encode($row);

// Free result set and close connection
$result->free_result();
$mysqli->close();

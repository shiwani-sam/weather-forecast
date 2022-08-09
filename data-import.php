<?php
// Select weather data for given parameters
$sql = "SELECT *
        FROM weather
        WHERE city = '{$_GET['city']}'
        AND weather_when >= DATE_SUB(NOW(), INTERVAL 10 SECOND)
        ORDER BY weather_when DESC limit 1";
$result = $mysqli->query($sql);

// If 0 record found
if ($result->num_rows == 0) {
    $url = 'https://api.openweathermap.org/data/2.5/weather?q=' . $_GET['city'] . '&appid=44088dbf1877f26e7f7d922f02bafce4&units=metric';

    // Get data from openweathermap and store in JSON object
    $data = file_get_contents($url);
    $json = json_decode($data, true);

    // Fetch required fields
    $weather_main = $json['weather'][0]['main']; // used to change images in javaScript switch case
    $weather_description = $json['weather'][0]['description'];
    $weather_temperature = $json['main']['temp'];
    $weather_wind = $json['wind']['speed'];
    $weather_when = date("Y-m-d H:i:s"); // now
    $city = $json['name'];
    $weather_pressure = $json['main']['pressure']; // pressure
    $weather_humidity = $json['main']['humidity'];
    $weather_degree = $json['wind']['deg'];
    $day = date('l');

    // Build INSERT SQL statement
    $sql = "INSERT INTO weather (weather_main, weather_description, weather_temperature, weather_wind, weather_when, city, weather_pressure, weather_humidity, weather_degree, day)
            VALUES('{$weather_main}', '{$weather_description}', '{$weather_temperature}', '{$weather_wind}', '{$weather_when}', '{$city}', {$weather_pressure}, {$weather_humidity}, {$weather_degree}, '{$day}')";

    // Run SQL statement and report errors
    if (!$mysqli->query($sql)) {
        echo ("<h4>SQL error description: " . $mysqli->error . "</h4>");
    }
}

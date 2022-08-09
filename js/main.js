let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
let lat = "lat=52.1798&"; // latitude
let lon = "lon=-0.0989&"; // longitude
let apiKey = "&appid=44088dbf1877f26e7f7d922f02bafce4";
let mainUrl = queryUrl + lat + lon + apiKey;

fetch(mainUrl)
  .then((response) => response.json())
  .then((data) => {
    let name = "South Cambridgeshire";
    let main = data.current.weather[0].main;
    let description = data.current.weather[0].description.toLowerCase();
    let temp = Math.round(data.current.temp);
    let pressure = data.current.pressure;
    let humidity = data.current.humidity;
    let wind_speed = data.current.wind_speed;
    let wind_direction = "and direction towards " + data.current.wind_deg + "°";

    let date = new Date();
    let timestamp = date.toLocaleString("en-GB", { timeZone: data.timezone });

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = new Date();
    let dayName = days[day.getDay()];

    document.getElementById("city-name").innerHTML = name;
    document.getElementById("main").innerHTML = description;
    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById("pressure").innerHTML = pressure + " hPa";
    document.getElementById("humidity").innerHTML = humidity + "%";
    document.getElementById("windspeed").innerHTML =
      wind_speed + " m/s " + wind_direction;
    document.getElementById("date").innerHTML = timestamp;
    document.getElementById("day").innerHTML = dayName;

    // Backgrounds
    switch (main) {
      case "Snow":
        document.getElementById("bg").style.backgroundImage =
          "url('images/snow.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-snow right"></i>';
        break;
      case "Clouds":
        document.getElementById("bg").style.backgroundImage =
          "url('images/clouds.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-cloudy"></i>';
        break;
      case "Fog":
        document.getElementById("bg").style.backgroundImage =
          "url('images/fog.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-fog"></i>';
        break;
      case "Rain":
        document.getElementById("bg").style.backgroundImage =
          "url('images/rain.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-rain"></i>';
        break;
      case "Clear":
        document.getElementById("bg").style.backgroundImage =
          "url('images/clear.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-day-sunny"></i>';
        break;
      case "Thunderstorm":
        document.getElementById("bg").style.backgroundImage =
          "url('images/thunderstrom.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-day-thunderstorm"></i>';
        break;
      default:
        document.getElementById("bg").style.backgroundImage =
          "url('images/clear.jpg')";
        document.getElementById("weather-icon").innerHTML =
          '<i class="wi wi-day-sunny"></i>';
        break;
    }
  });

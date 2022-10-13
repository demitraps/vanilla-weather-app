function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let ordinalIndicator = `th`;
  if (date === 1) {
    ordinalIndicator = `st`;
  } else if (date === 2) {
    ordinalIndicator = `nd`;
  } else if (date === 3) {
    ordinalIndicator = `rd`;
  }

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day}, ${month} ${date}${ordinalIndicator} ${year}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `           <div class="col-2">
                <div class="forecast-day">${day}</div>
                <div class="forecast-max">23°C</div>
                <div class="forecast-min">17°C</div>
                <div class="forecast-icon">
                  <i class="fa-solid fa-cloud-moon-rain"></i>
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "dd2a5d7d493e17a8e3e933b9b0723398";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weatherToday(response) {
  let temperatureElement = document.querySelector("#displayed-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let feelsLikeElement = document.querySelector("#feels-like-temp");
  let tempMinElement = document.querySelector("#min-today");
  let tempMaxElement = document.querySelector("#max-today");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.classList = "fa-solid";
  let iconSelection = response.data.weather[0].icon;

  if (iconSelection === "01d") {
    weatherIconElement.classList.add("fa-sun");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1502200893034-b7bca90610ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80")`;
  } else if (iconSelection === "01n") {
    weatherIconElement.classList.add("fa-moon");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1532978379173-523e16f371f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`;
  } else if (iconSelection === "02d") {
    weatherIconElement.classList.add("fa-cloud-sun");
    document.getElementById("github").style.color = "#393e46";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80")`;
  } else if (iconSelection === "02n") {
    weatherIconElement.classList.add("fa-cloud-moon");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1604338140746-e5c59638aeda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`;
  } else if (iconSelection === "03d" || iconSelection === "04d") {
    weatherIconElement.classList.add("fa-cloud");
    document.getElementById("github").style.color = "#222831";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1543587044-ab01bb69aca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`;
  } else if (iconSelection === "03n" || iconSelection === "04n") {
    weatherIconElement.classList.add("fa-cloud");
    document.getElementById("github").style.color = "#222831";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1594887384928-0568e6034b54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80")`;
  } else if (iconSelection === "09d" || iconSelection === "09n") {
    weatherIconElement.classList.add("fa-cloud-showers-heavy");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1511935456800-a6bffda8bb9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")`;
  } else if (iconSelection === "10d") {
    weatherIconElement.classList.add("fa-cloud-sun-rain");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.pexels.com/photos/1089455/pexels-photo-1089455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`;
  } else if (iconSelection === "10n") {
    weatherIconElement.classList.add("fa-cloud-moon-rain");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80")`;
  } else if (iconSelection === "11d" || iconSelection === "11n") {
    weatherIconElement.classList.add("fa-cloud-bolt");
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1576290134419-915a21939122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")`;
  } else if (iconSelection === "13d" || iconSelection === "13n") {
    weatherIconElement.classList.add("fa-snowflake");
    document.getElementById("weather-app").style.color = "#3a4750";
    document.getElementById("city-input").style.color = "#3a4750";
    document.getElementById("github").style.color = "#222831";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1422930717940-92ec7c690afc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80")`;
  } else if (iconSelection === "50d" || iconSelection === "50n") {
    weatherIconElement.classList.add("fa-smog");
    document.getElementById("weather-app").style.color = "#757a79";
    document.getElementById("city-input").style.color = "#393e46";
    document.getElementById("github").style.color = "#393e46";
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("https://images.unsplash.com/photo-1603794052293-650dbdeef72c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80")`;
  } else {
    weatherIconElement.classList.add("fa-circle");
  }

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°C";
  tempMinElement.innerHTML = Math.round(response.data.main.temp_min) + "°C";
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max) + "°C";
  humidityElement.innerHTML = Math.round(response.data.main.humidity) + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = Math.round(response.data.main.temp);
  feelingTemperature = Math.round(response.data.main.feels_like);
  minTemperature = Math.round(response.data.main.temp_min);
  maxTemperature = Math.round(response.data.main.temp_max);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "dd2a5d7d493e17a8e3e933b9b0723398";
  let citySearched = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherToday);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function convertToFahreneit(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#displayed-temperature");
  let displayedUnit = document.querySelector("#displayed-unit");
  let feelsLikeElement = document.querySelector("#feels-like-temp");
  let tempMinElement = document.querySelector("#min-today");
  let tempMaxElement = document.querySelector("#max-today");
  let fahreneitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let fahreneitFeelTemperature = Math.round((feelingTemperature * 9) / 5 + 32);
  let fahreneitMinTemperature = Math.round((minTemperature * 9) / 5 + 32);
  let fahreneitMaxTemperature = Math.round((maxTemperature * 9) / 5 + 32);
  displayedTemperature.innerHTML = fahreneitTemperature;
  displayedUnit.innerHTML = "°F";
  feelsLikeElement.innerHTML = `${fahreneitFeelTemperature}°F`;
  tempMinElement.innerHTML = `${fahreneitMinTemperature}°F`;
  tempMaxElement.innerHTML = `${fahreneitMaxTemperature}°F`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#displayed-temperature");
  let displayedUnit = document.querySelector("#displayed-unit");
  let feelsLikeElement = document.querySelector("#feels-like-temp");
  let tempMinElement = document.querySelector("#min-today");
  let tempMaxElement = document.querySelector("#max-today");
  displayedTemperature.innerHTML = celsiusTemperature;
  displayedUnit.innerHTML = "°C";
  feelsLikeElement.innerHTML = `${feelingTemperature}°C`;
  tempMinElement.innerHTML = `${minTemperature}°C`;
  tempMaxElement.innerHTML = `${maxTemperature}°C`;
}

let celsiusTemperature = null;
let feelingTemperature = null;
let minTemperature = null;
let maxTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahreneitSwitch = document.querySelector("#fahreneit-switch");
fahreneitSwitch.addEventListener("click", convertToFahreneit);

let celsiusSwitch = document.querySelector("#celsius-switch");
celsiusSwitch.addEventListener("click", convertToCelsius);

searchCity("Athens");

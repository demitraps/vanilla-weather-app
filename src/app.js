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

  let iconSelection = response.data.weather[0].icon;
  weatherIconElement.classList.remove("fa-cloud-moon-rain");
  console.log(response.data.weather[0].icon);

  if (iconSelection === "01d") {
    weatherIconElement.classList.add("fa-sun");
  } else if (iconSelection === "01n") {
    weatherIconElement.classList.add("fa-moon");
  } else if (iconSelection === "02d") {
    weatherIconElement.classList.add("fa-cloud-sun");
  } else if (iconSelection === "02n") {
    weatherIconElement.classList.add("fa-cloud-moon");
  } else if (
    iconSelection === "03d" ||
    iconSelection === "03n" ||
    iconSelection === "04d" ||
    iconSelection === "04n"
  ) {
    weatherIconElement.classList.add("fa-cloud");
  } else if (iconSelection === "09d" || iconSelection === "09n") {
    weatherIconElement.classList.add("fa-cloud-showers-heavy");
  } else if (iconSelection === "10d") {
    weatherIconElement.classList.add("fa-cloud-sun-rain");
  } else if (iconSelection === "10n") {
    weatherIconElement.classList.add("fa-cloud-moon-rain");
  } else if (iconSelection === "11d" || iconSelection === "11n") {
    weatherIconElement.classList.add("fa-cloud-bolt");
  } else if (iconSelection === "13d" || iconSelection === "13n") {
    weatherIconElement.classList.add("fa-snowflake");
  } else if (iconSelection === "50d" || iconSelection === "50n") {
    weatherIconElement.classList.add("fa-smog");
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

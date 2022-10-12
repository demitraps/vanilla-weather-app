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
  console.log(response.data);
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
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°C";
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°C";
  tempMinElement.innerHTML = Math.round(response.data.main.temp_min) + "°C";
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max) + "°C";
  humidityElement.innerHTML = Math.round(response.data.main.humidity) + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "dd2a5d7d493e17a8e3e933b9b0723398";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(weatherToday);

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
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°C";
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°C";
  tempMinElement.innerHTML = Math.round(response.data.main.temp_min) + "°C";
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max) + "°C";
  humidityElement.innerHTML = Math.round(response.data.main.humidity) + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
}

let apiKey = "dd2a5d7d493e17a8e3e933b9b0723398";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(weatherToday);

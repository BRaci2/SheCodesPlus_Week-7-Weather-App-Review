// change date & time
function dateTime(timestamp) {
  let daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = daysWeek[date.getDay()];
  let dateToday = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${month} ${dateToday}, ${year} 🌎 Last Updated: ${hours}:${minutes}`;
}

function getTemperature(response) {
  let currentTemp = document.querySelector("#temp");
  let currentCity = document.querySelector("#city");
  let country = document.querySelector("#country");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let currentDateTime = document.querySelector("#date");
  let weatherIcon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;

  celciusTemp = response.data.main.temp;
  currentTemp.innerHTML = Math.round(celciusTemp);
  currentCity.innerHTML = `${response.data.name}`;
  country.innerHTML = `${response.data.sys.country}`;
  description.innerHTML = `${response.data.weather[0].main}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  currentDateTime.innerHTML = dateTime(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  console.log(response);
}
// unit conversion - Temperature
function showFTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");

  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheitTemp = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
}
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFTemp);

function showCTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemp);
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCTemp);

let celciusTemp = null;

// change city

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let cityText = document.querySelector("#city");

  let apiKey = `01a738ffcc406d9b10304ab407495deb`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputElement.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

let enterLocation = document.querySelector("#city-input-form");
enterLocation.addEventListener("submit", handleSubmit);

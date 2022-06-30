const input = document.querySelector("#city");
const submit = document.querySelector("button");
const img = document.querySelector("img");
let imgSrc;
const weatherOverviewDescription = document.querySelector(".weather-overview__description");
const weatherOverviewCity = document.querySelector(".weather-overview__city");
const weatherOverviewDate = document.querySelector(".weather-overview__date");
const weatherOverviewTime = document.querySelector(".weather-overview__time");
const weatherOverviewTemperatureInC = document.querySelector(
  ".weather-overview__temperature-unit-c"
);
const weatherOverviewTemperatureInF = document.querySelector(
  ".weather-overview__temperature-unit-f"
);
const changeUnit = document.querySelector(".change-unit");
const weatherOverviewUnitF = document.querySelector(".weather-overview__unit-f");
const weatherOverviewUnitC = document.querySelector(".weather-overview__unit-c");
const DEFAULT_CITY = "Hong Kong";

function capitalizeFirstLetter(input) {
  let words = input.split(" ");
  let output = "";
  words.map((word) => {
    output += word[0].toUpperCase() + word.substring(1) + " ";
  });
  return output;
}

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.1).toFixed(1);
}

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.1) * 1.8 + 32).toFixed(1);
}

async function getNowWeatherdata(city) {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae8cd9a9523028cbc67cee595ccbca5b`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        weatherOverviewAddHTML(response);
        weatherDetailsAddHTML(response);
      })
      .then(() => {
        img.src = `http://openweathermap.org/img/wn/${imgSrc}@2x.png`;
      });
  } catch (error) {
    console.error(error);
  }
}

function weatherOverviewAddHTML(response) {
  weatherOverviewDescription.innerHTML = capitalizeFirstLetter(response.weather[0].description);
  weatherOverviewCity.innerHTML = response.name;
  weatherOverviewDate.innerHTML = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  weatherOverviewTime.innerHTML = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  weatherOverviewTemperatureInC.innerHTML = kelvinToCelsius(response.main.temp) + " °C";
  weatherOverviewTemperatureInF.innerHTML = kelvinToFahrenheit(response.main.temp) + " °F";
  imgSrc = response.weather[0].icon;
}

const feelsLikeDateInC = document.querySelector("#feels-like-unit-c");
const feelsLikeDateInF = document.querySelector("#feels-like-unit-f");
const humidityData = document.querySelector("#humidity");
const chanceOfRain = document.querySelector("#chance-of-rain");
const windSpeedInKMPH = document.querySelector("#wind-speed-kmph");
const windSpeedInMPH = document.querySelector("#wind-speed-mph");

function metrePerSecondToKilometrePerHour(input) {
  return (input * 3.6).toFixed(1);
}

function metrePerSecondToMilesPerHour(input) {
  return (input * 2.2369).toFixed(1);
}

function weatherDetailsAddHTML(response) {
  feelsLikeDateInC.innerHTML = kelvinToCelsius(response.main.feels_like) + " °C";
  feelsLikeDateInF.innerHTML = kelvinToFahrenheit(response.main.temp) + " °F";
  humidityData.innerHTML = response.main.humidity + " %";
  windSpeedInKMPH.innerHTML = metrePerSecondToKilometrePerHour(response.wind.speed) + " km/h";
  windSpeedInMPH.innerHTML = metrePerSecondToMilesPerHour(response.wind.speed) + " mph";
}

const currentDayPlusOneDay = document.querySelector(".current-day-plus-one__day");
const currentDayPlusTwoDay = document.querySelector(".current-day-plus-two__day");
const currentDayPlusThreeDay = document.querySelector(".current-day-plus-three__day");
const currentDayPlusFourDay = document.querySelector(".current-day-plus-four__day");
const currentDayPlusFiveDay = document.querySelector(".current-day-plus-five__day");
const currentDayPlusSixDay = document.querySelector(".current-day-plus-six__day");
const currentDayPlusSevenDay = document.querySelector(".current-day-plus-seven__day");

const currentDayPlusOneTemperatureInC = document.querySelector(
  ".current-day-plus-one__temperature"
);
const currentDayPlusTwoTemperatureInC = document.querySelector(
  ".current-day-plus-two__temperature"
);
const currentDayPlusThreeTemperatureInC = document.querySelector(
  ".current-day-plus-three__temperature"
);
const currentDayPlusFourTemperatureInC = document.querySelector(
  ".current-day-plus-four__temperature"
);
const currentDayPlusFiveTemperatureInC = document.querySelector(
  ".current-day-plus-five__temperature"
);
const currentDayPlusSixTemperatureInC = document.querySelector(
  ".current-day-plus-six__temperature"
);
const currentDayPlusSevenTemperatureInC = document.querySelector(
  ".current-day-plus-seven__temperature"
);

let date = new Date();
let datePlusOne = new Date(date);
datePlusOne.setDate(date.getDate() + 1);
let datePlusTwo = new Date(date);
datePlusTwo.setDate(date.getDate() + 2);
let datePlusThree = new Date(date);
datePlusThree.setDate(date.getDate() + 3);
let datePlusFour = new Date(date);
datePlusFour.setDate(date.getDate() + 4);
let datePlusFive = new Date(date);
datePlusFive.setDate(date.getDate() + 5);
let datePlusSix = new Date(date);
datePlusSix.setDate(date.getDate() + 6);
let datePlusSeven = new Date(date);
datePlusSeven.setDate(date.getDate() + 7);

async function get5DaysForecastWeatherdata(city) {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ae8cd9a9523028cbc67cee595ccbca5b`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        currentDayPlusOneDay.innerHTML = datePlusOne.toLocaleDateString("en-us", {
          weekday: "long",
        });
        currentDayPlusTwoDay.innerHTML = datePlusTwo.toLocaleDateString("en-us", {
          weekday: "long",
        });
        currentDayPlusThreeDay.innerHTML = datePlusThree.toLocaleDateString("en-us", {
          weekday: "long",
        });
        currentDayPlusFourDay.innerHTML = datePlusFour.toLocaleDateString("en-us", {
          weekday: "long",
        });
        currentDayPlusFiveDay.innerHTML = datePlusFive.toLocaleDateString("en-us", {
          weekday: "long",
        });
        currentDayPlusSixDay.innerHTML = datePlusSix.toLocaleDateString("en-us", {
          weekday: "long",
        });
        currentDayPlusSevenDay.innerHTML = datePlusSeven.toLocaleDateString("en-us", {
          weekday: "long",
        });

        currentDayPlusOneTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[1].main.temp) + " °C";
        currentDayPlusTwoTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[2].main.temp) + " °C";
        currentDayPlusThreeTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[3].main.temp) + " °C";
        currentDayPlusFourTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[4].main.temp) + " °C";
        currentDayPlusFiveTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[5].main.temp) + " °C";
        currentDayPlusSixTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[6].main.temp) + " °C";
        currentDayPlusSevenTemperatureInC.innerHTML =
          kelvinToCelsius(response.list[7].main.temp) + " °C";
        console.log(response);
      });
  } catch (error) {
    console.error(error);
  }
}

submit.addEventListener("click", (e) => {
  let city = input.value;
  getNowWeatherdata(city);
  get5DaysForecastWeatherdata(city);
});

getNowWeatherdata(DEFAULT_CITY);
get5DaysForecastWeatherdata(DEFAULT_CITY);

changeUnit.addEventListener("click", (e) => {
  weatherOverviewUnitF.classList.toggle("hide");
  weatherOverviewUnitC.classList.toggle("hide");
  weatherOverviewTemperatureInF.classList.toggle("hide");
  weatherOverviewTemperatureInC.classList.toggle("hide");
  windSpeedInKMPH.classList.toggle("hide");
  windSpeedInMPH.classList.toggle("hide");
  feelsLikeDateInC.classList.toggle("hide");
  feelsLikeDateInF.classList.toggle("hide");
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let city = input.value;
    getNowWeatherdata(city);
    get5DaysForecastWeatherdata(city);
  } else return;
});

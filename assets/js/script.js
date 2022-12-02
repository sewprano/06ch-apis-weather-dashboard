// API
const openWeatherApiRootUrl = 'https://api.openweathermap.org';
// const openWeatherApiKey = '2d3415aa1f4826fcc57e3388eb7614e0'; 
const openWeatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9' //using class repo key until mine activated

// DOM Elements
const citySearchEl = $('#city-search');
const cityInputEl = $('#input');
const weatherEl = $('#weather');
const forecastEl = $('#forecast');
const historyEl = $('#history');
const searchErrorEl = $('#error-msg')

let historyList = [];

//Display History
function displayHistory() {
    if (localStorage.getItem('search-history')) {
        historyList = JSON.parse(localStorage.getItem('search-history'));
    }
    let listFrag = $(document.createDocumentFragment());

    console.log(historyList);
    for (let i = historyList.length -1; i>= 0; i--) {
        listFrag.append(displayHistoryButton (historyList[i]));
    }

    return listFrag;
}

function displayHistoryButton(buttonName) {
    let buttonEl = $('<button>').addClass("btn btn-light");
    buttonEl.text(buttonName);
    buttonEl.data('city', buttonName);

    return buttonEl;
}

function citySearch(event) {
    event.preventDefault();
    fetchLatLon(cityInputEl.val());

}

function createWeatherCard() {

}

function createForecastCard() {

}

function displayWeather(cityName, weather, timezone) {
    let date = day.js().tz(timezone).format('M/D/YYYY');

    //variables for fetch request
    let temp = weather.temp;
    let windSpeed = weather.wind_speed;
    let humidity = weather.humidity;
    let uv = weather.uvi;
    let weatherIconUrl = `${openWeatherImageRootUrl}/${weather.weather[0].icon}.png`;

    //elements
    let weatherIconEl = $('<img>').attr({src:weatherIconUrl, alt: weather.weather[0].main + 'weather Icon'});
    let cityNameEl = $('<h2>').addClass(card-header);

    
}

function displayForecast(cityName, weather, timezone) {
    let date = day.js().tz(timezone).format('M/D/YYYY');

    //create document fragment
    let weatherFrag = $(document.createDocumentFragment());

    

    let weatherIconUrl = `${openWeatherImageRootUrl}/${weather.weather[0].icon}.png`;
    let weatherIconEl = $('<img>').attr({src:weatherIconUrl, alt: weather.weather[0].main + 'weather Icon'});

    //unix timestamps for forecast
    let startDate = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
    let endDate = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();
}

async function fetchLatLon(searchTerm) {
    const fetchUrl = `${openWeatherApiRootUrl}/geo/1.0/direct?q=${searchTerm}&appid=${openWeatherApiKey}`;
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            alert("Error " + response.statusText);
            return;
        }
        const data = await response.json();
       

        if (!data[0]) {
            searchErrorEl.text(`${searchTerm} not found, please try again`);
        } else {
            historyList.push(data[0].name);
            localStorage.setItem('search-history', JSON.stringify(historyList));
            historyEl.html(displayHistory());
            searchErrorEl.text('');
            fetchWeather(data[0]);
        }

    } catch (error) {
        console.error(error);
    }
}

async function fetchWeather(location) {
    const lat = location.lat;
    const lon = location.lon;
    const fetchUrl = `${openWeatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${openWeatherApiKey}`;
    
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            alert("Error " + response.statusText);
            return;
        }
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error)
    }
}

function init() {
    historyEl.html(displayHistory());

}

citySearchEl.on("submit", citySearch);

 init();

// Old code:
// const requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=2d3415aa1f4826fcc57e3388eb7614e0";
// const requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=miami,USA&APPID=2d3415aa1f4826fcc57e3388eb7614e0";
// fetch(requestUrl)
// .then(function(response) {
//     return response.json();
// })
// .then(function (data) {
//    console.log(data);
// }); 

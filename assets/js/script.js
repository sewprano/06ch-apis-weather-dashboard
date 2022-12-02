// API
const openWeatherApiRootUrl = 'https://api.openweathermap.org';
// const openWeatherApiKey = '2d3415aa1f4826fcc57e3388eb7614e0'; 
const openWeatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9' //using class repo key until mine activated

// DOM Elements
const citySearchEl = $('#city-search');
const cityInputEl = $('#input');
const weatherEl = $('#today');
const forecastEl = $('#forecast');
const historyEl = $('#history');
const searchErrorEl = $('#error-msg')

let historyList = [];

//dayjs timezone plugins
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

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
    cityInputEl.val('');
}

function createWeatherCard(cityName, date, conditions, temp, humidity, windSpeed, uv, icon) {
    let uvColor;
    const cardTemplate = `
    <div class="card-header bg-dark text-light">
        <h2>${cityName}</h2>
        <h3>${conditions}<img src="${icon}" alt="${conditions} weather Icon" /></h3>
        <h4>${date}</h4>
    </div>
    <div class="card-body">
        <div>Temp: ${temp}&#8457;</div>
        <div>Wind Speed: ${windSpeed} mph</div>
        <div>Humidity: ${humidity}%</div>
        <div class="${uvColor}">UV Index: ${uv}</div>
    </div>`

    weatherEl.html(cardTemplate);
}

function createForecastCard(date, conditions, temp, humidity, windSpeed, icon) {
     const cardTemplate = `
     <div class="card">
        <div class="card-header bg-dark text-light">
        <h4 class="fs-5">${date}</h4>
        <h5>${conditions}<img src="${icon}" alt="${conditions} weather Icon" /></h5>
        </div>
        <div class="card-body">
            <div>Temp: ${temp}&#8457;</div>
            <div>Wind Speed: ${windSpeed}</div>
            <div>Humidity: ${humidity}%</div>
        </div>
    </div>
     `
     return cardTemplate;
}

function displayWeather(cityName, current, timezone) {
    const date = dayjs().tz(timezone).format('M/D/YYYY');

    //variables for fetch request
    const temp = current.temp;
    const windSpeed = current.wind_speed;
    const humidity = current.humidity;
    const uv = current.uvi;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}.png`;

    createWeatherCard(cityName, date, current.weather[0].main, temp, humidity, windSpeed, uv, weatherIconUrl);
    
}

function displayForecast(forecast, timezone) {
    const date = dayjs().tz(timezone).format('M/D/YYYY');

    //unix timestamps for forecast
    const startDate = dayjs().tz(timezone).add(1, 'day').startOf('day').unix();
    const endDate = dayjs().tz(timezone).add(6, 'day').startOf('day').unix();
    const rowEl = $('<div>').addClass('row');
    for (let i = 0; i < forecast.length; i++) {
        if (forecast[i].dt >= startDate && forecast[i].dt < endDate) {
            const colEl = $('<div>').addClass('col my-3');
            const weatherIconUrl = `https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png`;
            const date = dayjs.unix(forecast[i].dt).tz(timezone).format('M/D/YYYY');
            const card = createForecastCard(date, forecast[i].weather[0].main, forecast[i].temp.day, forecast[i].humidity, forecast[i].wind_speed, weatherIconUrl );
            colEl.html(card);
            rowEl.append(colEl);
        }
    }
    forecastEl.html(rowEl);
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
            if(historyList.length > 10) {
                historyList.shift();
            }
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
    const fetchUrl = `${openWeatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${openWeatherApiKey}`;
    
    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            alert("Error " + response.statusText);
            return;
        }
        const data = await response.json();
        displayWeather(location.name, data.current, data.timezone);
        displayForecast(data.daily, data.timezone);

    } catch (error) {
        console.error(error)
    }
}

function init() {
    historyEl.html(displayHistory());

}

citySearchEl.on('submit', citySearch);
historyEl.on('click', 'button', function(event){
    fetchLatLon($(event.target).data('city'))
});

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

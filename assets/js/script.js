// API
const openWeatherApiRootUrl = 'https://api.openweathermap.org';
const openWeatherApiKey = '2d3415aa1f4826fcc57e3388eb7614e0';

// DOM Elements
const citySearchEl = $('#search');
const cityInputEl = $('#input');
const weatherEl = $('#weather');
const forecastEl = $('#forecast');
const historyEl = $('#history');

const history = [];

//Display History
function displayHistory() {
    let historyList = JSON.parse(localStorage.getItem('history'))
    let listFrag = $(document.createDocumentFragment());

    for (let i = historyList.length -1; i>= 0; i--) {
        listFrag.append(displayHistoryButton (historyList[i]));
    }

    return listFrag;
}

function displayHistoryButton(buttonName) {
    let buttonEl = $('<button').addClass(btn);
    buttonEl.text(buttonName);
    buttonEl.data('city', buttonName);

    return buttonEl;
}

function displayWeather(cityName, weather, timezone) {
    let date = day.js().tz(timezone).format('M/D/YYYY');
}




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

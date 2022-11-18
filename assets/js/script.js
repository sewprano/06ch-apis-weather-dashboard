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

function displayHistory() {
    let historyList = JSON.parse(localStorage.getItem('history'))
    let 
    
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

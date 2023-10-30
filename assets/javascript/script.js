// generated API key to request data 
const apiKey = "94e6bf67634acaba77df3c9e64af09de";


//const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

// base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


let history = [];

$(document).ready(function () {
    if (localStorage.getItem('history')) {
        history = JSON.parse(localStorage.getItem('history'));
    }
    showHistory();
});

// Function for the search history buttons added. The history items are appended to the div with an id of "history" in the HTML. When the search history buttons are clicked, then the "getGeo" function is activated for that city.
function showHistory() {
    $('#clear-history').hide();
    $('#history').html('');
    history.forEach(function (item, i) {
        $('<button>', {
            id: 'history-item-' + i,
            class: 'btn btn-secondary w-100 mb-3',
            html: item
        }).appendTo('#history');

        $('#history-item-' + i).on('click', function () {
            getGeo(item);
        });
    });

    if (history.length > 0) {
        $('#clear-history').show();
    }
}

// Function for clearing the history/removing the search history from the local storage. This removes the search history buttons from the webpage.
function clearHistory() {
    localStorage.removeItem('history');
    history = [];
    showHistory();
}

function getGeo(city) {
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

    fetch(geoUrl).then(response => response.json()).then(data => {
        //console.log(data);
        if (data.length == 0) {
            alert('City Not Found');
        }
        else {
            let name = data[0].name;
            let lat = data[0].lat;
            let lon = data[0].lon;

            if (!history.includes(name)) {
                history.unshift(name);
                if (history.length > 8) {
                    history.pop();
                }
                localStorage.setItem('history', JSON.stringify(history));
                showHistory();
            }
            getWeather(name, lat, lon);
            getForecast(name, lat, lon);
        }
    });
}

// function gets current weather data for city and displays to page
async function getWeather(name, lat, lon) {
    let weatherUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    let response = await fetch(weatherUrL);
    let data = await response.json();
    //console.log(data);
    // date, month, and year is accessed through moment.js
    const date = moment().format("M/D/YYYY");
    $(".border").css({ display: "block" });
    $("#forecast-container").css({ display: "block" });
    $("#title").text(name + " " + "(" + (`${date}`) + ")");
    // appends the weather icon to #title
    $("#title").append(`<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />`);
    $("#temp").text(`Temp: ${data.main.temp}` + " \u00B0F");
    $("#wind").text(`Wind: ${data.wind.speed}` + " MPH");
    $("#humidity").text(`Humidity: ${data.main.humidity}` + " %");
}

async function getForecast(name, lat, lon) {
    let forecastUrL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    let response = await fetch(forecastUrL);
    let data = await response.json();

    //console.log(data.list);

    const today = moment(new Date()).format("YYYY-MM-DD");

    let new_day = '';
    const forecast = [];
    for (let i = 0; i < data.list.length; i++) {
        let day = data.list[i].dt_txt.split(' ')[0];
        if (day == today) { continue; }

        if (new_day != day) {
            new_day = day;
            forecast.push({
                'day': moment(day).format("M/D/YYYY"),
                'temp': data.list[i].main.temp,
                'wind': data.list[i].wind.speed,
                'humidity': data.list[i].main.humidity,
                'icon': 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png'
            });
        }
    }

    $('#forecast').html('');
    forecast.forEach(function (day, i) {
        //console.log(day, i);
        let forecastClass = 'col-lg p-0 pb-3 ps-lg-3';
        if (i == 0) {
            forecastClass = 'col-lg p-0 pb-3';
        }

        $('<div>', {
            id: 'forecast-' + i,
            class: forecastClass,
        }).appendTo('#forecast');

        $('<div>', {
            id: 'forecast-data-' + i,
            class: 'text-white bg-navy-blue p-2 small',
        }).appendTo('#forecast-' + i);
        
        $('<p>', {
            class: 'fw-bold mb-0',
            html: day.day
        }).appendTo('#forecast-data-' + i);
         // appends weather icon 
        $('<p>', {
            class: 'p-0 m-0',
            html: '<img src="' + day.icon + '" />'
        }).appendTo('#forecast-data-' + i);
        // appends the temperature and degrees fahrenheit
        $('<p>', {
            class: 'mt-0',
            html: 'Temp: ' + day.temp + ' &deg;F'
        }).appendTo('#forecast-data-' + i);
        // appends the wind speed and "MPH"
        $('<p>', {
            html: 'Wind: ' + day.wind + ' MPH'
        }).appendTo('#forecast-data-' + i);
        // appends the humidity and % symbol 
        $('<p>', {
            html: 'Humidity: ' + day.humidity + ' %'
        }).appendTo('#forecast-data-' + i);
    });
}

// Event listener for the #search-btn. "City Name Required" is displayed if the user does not enter any city in the search box. If the user does enter a city name, then the getGeo() function is started.
$("#search-btn").on("click", function () {
    if ($('#city').val().trim() == '') {
        alert('City Name Required');
    } else {
        let cityName = $("#city").val();
        getGeo(cityName);
    }
});

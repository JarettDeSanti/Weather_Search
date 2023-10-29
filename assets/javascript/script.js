// generated API key to request data 
const apiKey = "94e6bf67634acaba77df3c9e64af09de";


//const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

// base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?


function getGeo(city) {
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}
  `
    fetch(geoUrl).then(response => response.json()).then(data => {
        console.log(data)
        let name = data[0].name;
        let lat = data[0].lat;
        let lon = data[0].lon;
        getWeather(name, lat, lon)
    })
}


async function getWeather(name, lat, lon) {
    let weatherUrL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    let response = await fetch(weatherUrL)
    let data = await response.json()
    console.log(data)
    const date = moment().format("M/D/YYYY");
    $(".border").css({ display: "block" });
    $("#forecast-container").css({ display: "block" });
    $("#title").text(name + " " + "(" + (`${date}`) + ")");
    $("#temp").text(`Temp: ${data.main.temp}` + " \u00B0F")
    $("#wind").text(`Wind: ${data.wind.speed}` + " MPH")
    $("#humidity").text(`Humidity: ${data.main.humidity}` + " %")
}

$("#search-btn").on("click", function () {
    let cityName = $("#city").val();
    getGeo(cityName);
})

$('#search-btn').on('click', function () {
    if ($('#city').val().trim() == '') {
        alert('City Name Required');
    }
});
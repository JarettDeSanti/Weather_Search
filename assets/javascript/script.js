// generated API key to request data 
const apiKey = "94e6bf67634acaba77df3c9e64af09de";

//variable to store user input for city name
// const city = 'New York';

//variable that stores the OpenWeather Current Weather Data URL for city

//const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

//this is used to make server-side API calls
//Fetch API is a web API built into the browser


// TODO: adjust application to accept user input to store in city, state and country variables

// base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// response data is typically in the form of JSON or XML document

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
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    let response = await fetch(weatherURL)
    let data = await response.json()
    console.log(data)
    const date = moment().format("M/D/YYYY");
    $("#title").text(name + " " + "(" + (`${date}`) + ")");
    $("#temp").text(`Temp: ${data.main.temp}` + " \u00B0F")
    $("#wind").text(`Wind: ${data.wind.speed}` + " MPH")
    $("#humidity").text(`Humidity: ${data.main.humidity}` + " MPH")
}

$("#search-btn").on("click", function () {
    let cityName = $("#city").val();
    getGeo(cityName);
})


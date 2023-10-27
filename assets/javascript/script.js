// generated API key to request data 
var apiKey = "94e6bf67634acaba77df3c9e64af09de";

// variable to store user input for city name
var city;

// variable that stores the OpenWeather Current Weather Data URL for city
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

// this is used to make server-side API calls
// Fetch API is a web API built into the browser
fetch(queryURL)

// TODO: adjust application to accept user input to store in city, state and country variables

// base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// response data is typically in the form of JSON or XML document


let weather = {
    "apiKey": "9bd268d4c8215d5911e3593a2eb52db8",
    fetchWeather: function(lat, lon) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Windspeed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function() {
        this.fetchcityweather(document.querySelector(".search-bar").value);
    },
    fetchcityweather: function(nam) {
        // const { lat, lon } = nam
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + nam + "&limit=5&appid=" + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.cityweather(data));
    },
    cityweather: function(data) {
        const { lat, lon } = data[0];
        const { name } = data[0];
        console.log( name, lat, lon );
        this.fetchWeather(lat, lon);
    },
};
document.querySelector(".search button").addEventListener("click", function(){weather.search()});
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});
weather.fetchcityweather("Budapest");
var URL = "https://fcc-weather-api.glitch.me/api/current?";
window.onload = function (ev) {

    function updateData(weatherInformation) {
        document.getElementById("temperature").innerHTML = weatherInformation.temp;
        document.getElementById("city").innerHTML = weatherInformation.city;
        document.getElementById("country").innerHTML = weatherInformation.country;
        document.getElementById("humidity").innerHTML = weatherInformation.humidity;
        document.getElementById("pressure").innerHTML = weatherInformation.pressure;
        document.getElementById("wind").innerHTML = weatherInformation.wind;
        document.getElementById("clouds").innerHTML = weatherInformation.clouds;
        document.getElementById("maxTemperature").innerHTML = weatherInformation.maxTemperature;
        document.getElementById("minTemperature").innerHTML = weatherInformation.minTemperature;
        document.getElementById("description").innerHTML = weatherInformation.description;
    }
    if (navigator.geolocation) {
        var getPosition = function (position) {
            prepareRequest(Math.floor(position.coords.latitude), Math.floor(position.coords.longitude));
        }
    } else {
        console.log("Browser does not support Navigator Element");
    }
    navigator.geolocation.getCurrentPosition(getPosition);

    function prepareRequest(lat, lon) {
        var uri = URL + "lat=" + lat + "&" + "lon=" + lon;
        sendRequestForData(uri);
    }

    function sendRequestForData(uri) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                var weatherInformation = {};
                weatherInformation.temp = Math.floor(responseData.main.temp);
                weatherInformation.country = responseData.sys.country;
                weatherInformation.city = responseData.name;
                weatherInformation.humidity = responseData.main.humidity;
                weatherInformation.pressure = responseData.main.pressure;
                weatherInformation.wind = responseData.wind.speed;
                weatherInformation.clouds = responseData.clouds.all;
                weatherInformation.maxTemperature = Math.floor(responseData.main.temp_min);
                weatherInformation.minTemperature = Math.floor(responseData.main.temp_max);
                weatherInformation.description = responseData.weather[0].description;
                updateData(weatherInformation);
            }
        };
        xhr.open('GET', uri, true);
        xhr.send();
    }
};
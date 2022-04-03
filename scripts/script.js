(() => {

    const cityWeatherDiv = document.querySelector(".city-weather-div");
    cityWeatherDiv.style.visibility = "hidden";

    const cityInput = document.querySelector("#city-inp");
    const citySearchBtn = document.querySelector("#search-btn");

    const cityNamePara = document.querySelector(".city-info-div h1");
    const weatherImg = document.querySelector(".weather-div-icon img");
    const weatherStatusPara = document.querySelector(".weather-div-icon p");
    const currentDatePara = document.querySelector(".date");

    const temperatureTxt = document.querySelector(".temp");
    const humidityPara = document.querySelector("#humidity-para span");
    const pressurePara = document.querySelector("#pressure-para span");

    const unitAlternator = document.querySelector("#show-celsius");


    const API_KEY = "05f35fff75710441e7ff239d7e736fe8";


    citySearchBtn.addEventListener("click", getWeather);

    async function getJSONData(url) {

        try {
            let response = await fetch(url);
            let jsonData = await response.json();
            return jsonData;
        } catch {
            console.log("Erorr in Getting the weather data for the city...");
            alert("Erorr in Getting the weather data for the city...");
            return -1;
        }

    }

    function parseData(data) {
        cityNamePara.textContent = data.name;
        weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherStatusPara.textContent = data.weather[0].description;
        currentDatePara.textContent = new Date().toDateString();
        temperatureTxt.textContent = `${data.main.temp} ${(unitAlternator.checked) ? "C" : "F"}`;
        humidityPara.textContent = data.main.humidity;
        pressurePara.textContent = data.main.pressure;
    }



    function getCityWeatherData(cityName, unit) {
    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        if (unit) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        }
        let jsonData = getJSONData(url);
        jsonData.then(parseData)
    }

    function getWeather(e) {
    
        if (cityInput.value.length === 0) {
            alert("Please Enter the city name");
            return;
        }

        const cityName = cityInput.value;
        const cityWeatherData = getCityWeatherData(cityName, unitAlternator.checked);


        cityWeatherDiv.style.visibility = "visible";
        cityInput.value = "";
    }


    unitAlternator.addEventListener("change", () => {
        const cityWeatherData = getCityWeatherData(
            cityNamePara.textContent,
            unitAlternator.checked
        );
    });

})();
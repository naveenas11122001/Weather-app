//---------- API Key ---------//
const apiKey = "cff10eebfaa01dcd11b48584e21f8822";

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        alert("Failed to fetch weather data.");
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById("weatherDisplay");

    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    const {
        main: { temp, humidity },
        weather,
        wind: { speed },
        sys: { country },
        name
    } = data;

    const [{ main: weatherMain, description, icon }] = weather;

    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    `;

    weatherDisplay.innerHTML = weatherHTML;
}

async function getWeather()
{
    const city = document.getElementById("city").value;

    const apiKey = "b8ddae2db25df782340a7be4f863080f";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try
    {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("weather").innerHTML =
        `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Condition: ${data.weather[0].main}</p>
        `;
    }
    catch(error)
    {
        document.getElementById("weather").innerHTML =
        "City Not Found";
    }
}
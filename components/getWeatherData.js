const getWeatherData = function() {

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=48.1351&lon=-11.5820&exclude=hourly&units=metric&appid=a97a7baa9ba0e0dee8bd7d5db6f4e087')
        .then((response) => response.json()) 
        .then((data) => { 
            let weatherData = "";

            document.querySelector('.weather-title').style.display = "block";

            for( i = 0; i < 5; i++) {
                const minTemp = Math.round((data.daily[i].temp.min) * 10) / 10;
                const maxTemp = Math.round((data.daily[i].temp.max) * 10) / 10;
                const desc = data.daily[i].weather[0].description;
                const cloudsPerc = data.daily[i].clouds;
                const pressure = data.daily[i].pressure;
                const date = new Date(data.daily[i].dt * 1000);
                
                weatherData += `
                    <div class="weather-day-container">
                        <div class="weather-date-container">
                            <p> <span class="dark">${addDate(date)}</span> <i>${i === 0 ? 'today' : ''}</i></p>
                            <div class="weather-daily-temp">
                                <p class=${(minTemp <= 14 && 'blue-background') || (minTemp <= 17 && 'green-background') || (minTemp <= 25 && 'orange-background') || (minTemp > 25 && 'red-background')}>${minTemp}C</p>
                                <p class=${(maxTemp <= 14 && 'blue-background') || (maxTemp <= 20 && 'green-background') || (maxTemp <= 25 && 'orange-background') || (maxTemp > 25 && 'red-background')}>${maxTemp}C</p>
                            </div>
                        </div>
                        <p><span class="light">${desc}</span></p>
                        <p><span class="dark">clouds</span>: <span class="light">${cloudsPerc}%, ${pressure}hpa </span> </p>
                    </div>  
                `;
            }
            document.querySelector('.weather').innerHTML = weatherData;
            })
    .catch((error) => {
        console.log(error)
    })
}

function addDate(i) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = days[i.getDay()];
    let date = i.getDate();
    let month = months[i.getMonth()];

    return `
        ${day} ${date} ${month}
    `;
}
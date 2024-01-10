// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// 7dec1f8466ed99faa1a30b88421da41d
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const cityInputField = document.querySelector('#city-input')
const submitButton = document.querySelector('#submit-button')
const currentForecastSection = document.querySelector('#current-forecast-section')
const fiveDayForecastSection = document.querySelector('#five-day-forecast-section')

let cityInput
let cityLat
let cityLong
let responseArray = []
let fiveDayArray = []
let currentWeather
const fiveDayIndex = [1, 2, 3, 4, 5]

const createCurrentForecast = (day) => {
    let forecastDiv = document.createElement('div')
    let dateDisplay = document.createElement('h2')
    dateDisplay.textContent = dayjs().format('MM/DD/YYYY')
    forecastDiv.appendChild(dateDisplay)
    let iconDisplay = document.createElement('img')
    iconDisplay.src =  `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
    forecastDiv.appendChild(iconDisplay)
    let temperatureDisplay = document.createElement('p')
    temperatureDisplay.textContent = 'Temp: ' + day.main.temp
    forecastDiv.appendChild(temperatureDisplay)
    let humidityDisplay = document.createElement('p')
    humidityDisplay.textContent = 'Humidity: ' + day.main.humidity
    forecastDiv.appendChild(humidityDisplay)
    let windSpeedDisplay = document.createElement('p')
    windSpeedDisplay.textContent = 'Wind Speed: ' + day.wind.speed
    forecastDiv.appendChild(windSpeedDisplay)
    currentForecastSection.appendChild(forecastDiv)

}

const createFiveDayForecast = (day, index) => {
    let forecastDiv = document.createElement('div')
    let dateDisplay = document.createElement('h3')
    dateDisplay.textContent = dayjs().add(index + 1, 'day').format('MM/DD/YYYY')
    forecastDiv.appendChild(dateDisplay)
    let iconDisplay = document.createElement('img')
    iconDisplay.src =  `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
    forecastDiv.appendChild(iconDisplay)
    let temperatureDisplay = document.createElement('p')
    temperatureDisplay.textContent = 'Temp: ' + day.main.temp
    forecastDiv.appendChild(temperatureDisplay)
    let humidityDisplay = document.createElement('p')
    humidityDisplay.textContent = 'Humidity: ' + day.main.humidity
    forecastDiv.appendChild(humidityDisplay)
    let windSpeedDisplay = document.createElement('p')
    windSpeedDisplay.textContent = 'Wind Speed: ' + day.wind.speed
    forecastDiv.appendChild(windSpeedDisplay)
    fiveDayForecastSection.appendChild(forecastDiv)
}

const filterResponseArray = (response) => {
    if (response.dt_txt.includes('12:00:00')) {
        return response
    }
}

const getForecast = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&units=imperial&appid=7dec1f8466ed99faa1a30b88421da41d`)
    const data = await response.json()
    console.log(data)
    currentWeather = data.list[0]
    responseArray = data.list
    createCurrentForecast(responseArray[0])
    fiveDayArray = responseArray.filter(filterResponseArray)
    if(fiveDayArray.length > 5){
        fiveDayArray.shift()
    }
    console.log(fiveDayArray)
    fiveDayArray.forEach(createFiveDayForecast)
}

const getCoordinates = async () => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=7dec1f8466ed99faa1a30b88421da41d`)
    const data = await response.json()
    console.log(data)
    cityLat = data[0].lat
    cityLong = data[0].lon
    getForecast()
}

const saveInput = () => {
    cityInput = cityInputField.value
    localStorage.setItem('city', cityInput)
    getCoordinates()
}

submitButton.addEventListener('click', saveInput)
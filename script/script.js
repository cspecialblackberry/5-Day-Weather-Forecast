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

let cityLat
let cityLong

const getForecast = async() => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&appid=7dec1f8466ed99faa1a30b88421da41d`)
    const data = await response.json()
    console.log(data)
}


const getCoordinates = async() => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInputField.value}&limit=1&appid=7dec1f8466ed99faa1a30b88421da41d`)
    const data = await response.json()
    console.log(data)
    cityLat = data[0].lat
    cityLong = data[0].lon
    console.log(cityLat)
    console.log(cityLong)
    getForecast()
}

submitButton.addEventListener('click', getCoordinates)
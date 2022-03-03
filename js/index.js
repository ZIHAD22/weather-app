const API_KEY = `e0960319f367343c6ceca2d747f36b8c`

// featcing function
const fetching = async (url) => {
  const data = await fetch(url)
  const result = await data.json()
  return result
}

const searchResult = async () => {
  const city = document.getElementById('city').value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  const searchingResult = await fetching(url)
  displayData(searchingResult)
}

const displayData = (data) => {
  console.log(data)
  const displayWeather = document.getElementById('weather')
  displayWeather.textContent = ''
  const div = document.createElement('div')
  const {
    name,
    main: { temp },
  } = data
  const main = data.weather.map((e) => e.main)
  const icon = data.weather.map((e) => e.icon)
  console.log(main, icon)
  div.innerHTML = `
        <img width="100px" src="https://openweathermap.org/img/wn/${icon}.png" alt="" />
        <h1>${name}</h1>
        <h3><span>${(temp - 273.15).toFixed(2)}</span>&deg;C</h3>
        <h1 class="lead">${main}</h1>
  
  `

  displayWeather.appendChild(div)
}

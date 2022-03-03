const API_KEY = `e0960319f367343c6ceca2d747f36b8c`

// fetching function
const fetching = async (url) => {
  const data = await fetch(url)
  const result = await data.json()
  return result
}

// searching function
const searchResult = async () => {
  toggle('spinner', 'block', 'd-none')
  toggle('weather', 'none')
  const city = document.getElementById('city')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}`
  city.value = ''
  const searchingResult = await fetching(url)
  displayData(searchingResult)
  toggle('spinner', 'none')
  toggle('weather', 'block')
}

// toggle spinner function
const toggle = (id, style, isRemoved) => {
  const object = document.getElementById(id)
  object.style.display = style
  isRemoved ? object.classList.remove(isRemoved) : ''
}

// display function
const displayData = (data) => {
  if (data.cod == 404) {
    const displayWeather = document.getElementById('weather')
    displayWeather.textContent = ''
    const div = document.createElement('div')
    div.innerHTML = `
    
        <h2>${data.message.toUpperCase()}</h2>
    
    `
    displayWeather.appendChild(div)
  } else {
    const displayWeather = document.getElementById('weather')
    displayWeather.textContent = ''
    const div = document.createElement('div')
    const {
      name,
      main: { temp },
    } = data
    const main = data.weather.map((e) => e.main)
    const icon = data.weather.map((e) => e.icon)
    div.innerHTML = `
              <img width="100px" src="https://openweathermap.org/img/wn/${icon}.png" alt="" />
              <h1>${name}</h1>
              <h3><span>${(temp - 273.15).toFixed(2)}</span>&deg;C</h3>
              <h1 class="lead">${main}</h1>
        
        `

    displayWeather.appendChild(div)
  }
}

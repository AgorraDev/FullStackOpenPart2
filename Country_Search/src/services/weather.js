import axios from 'axios'
const baseURL = 'http://api.weatherstack.com'
const apiKey =  import.meta.env.VITE_SOME_KEY
//WeatherStack used for api

const currentWeather = (location) => {
    const req = axios.get(`${baseURL}/current?access_key=${apiKey}&query=${location}`)
    return req.then(res => res.data)
}

export default {currentWeather}
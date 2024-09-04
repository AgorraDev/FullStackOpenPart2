import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const allCountries = () => {
    const req = axios.get(baseURL)
    return req.then(res => res.data)
}

export default {allCountries}
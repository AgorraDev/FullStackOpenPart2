import { useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

import countryService from './services/countries.js'
import allCountries from './services/countries.js'

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  axios
    countryService
      .allCountries()
      .then(initialCountries => {
        setCountries(initialCountries)   
      })
      .catch(err => {
        alert('Error:', err)
      })

  return (
    <>
      <Search setSearch={setSearch}/>
      <Countries countries={countries} 
                 search={search}
                />
    </>
  )
}

export default App

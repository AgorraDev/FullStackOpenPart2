import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'

import servicePerson from './services/person'


const App = () => {
 
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')


  axios
    servicePerson
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
      .catch(err => {
        alert('Error:', err)
      })


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}/>

      <PersonForm persons={persons} setPersons={setPersons} filter={filter}/>
      <h2>Numbers</h2>
      <Person persons={persons} filter={filter}/>
    </div>
  )
}

export default App
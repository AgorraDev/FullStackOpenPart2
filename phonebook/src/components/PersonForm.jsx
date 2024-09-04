import { useState } from "react"
import axios from 'axios'
import personService from '../services/person'
import Notification from './Notification'




const PersonForm = ({persons, setPersons, filter}) => {
 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [success, setSuccess] = useState(null)

    const addName = (e) => {
        e.preventDefault()
        
        const personToUpdate = persons.find(person => person.name === newName)

        if (personToUpdate) {
        
        const updtatedPerson = {...personToUpdate, number: newNumber}
        const id = updtatedPerson.id
        console.log(id);
        
          if(window.confirm
          (`${newName} already exists in phonebook, would you like to update the number?`)) {
              personService
                .updateNumber(id, updtatedPerson)
                .then(returnedPerson => {
                  setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                  setNewName('')
                  setNewNumber('')
                  setSuccess(`${newName} was successfully updated!`),
                  setTimeout(() => {
                    setSuccess(null)
                  }, 3000)
                })
                .catch(err => {
                  console.error('Error updating person', err);
                  alert(`Error updating ${updtatedPerson.name}`)
                })
              }
        } else {
          const newPerson = {
            name: newName,
            number: newNumber
          }
          
          personService
              .create(newPerson)
              .then(returnedPerson => {
                setPersons(persons.concat(newPerson),
                setNewName(''),
                setNewNumber(''),
              )
                setSuccess(
                  `${newName} has been added to the phonebook!`
                )
                setTimeout(() => {
                  setSuccess(null)
                }, 3000)
              })
               .catch(err => {
                alert('Error', err)
               })  
        }
      }
      const handleNameChange = (e) => {
        setNewName(e.target.value)
      }
      const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
      }
      const filteredList = persons.filter(person => 
        person.name && person.name.toLowerCase().includes(filter.toLowerCase())
      )
    return(
        <>
        <Notification message={success}/>
        <form onSubmit={addName}> 
        <div>
        name: <input value={newName}
        onChange={handleNameChange}/>
        </div>
        <div>
        number: <input value={newNumber}
        onChange={handleNumberChange}/>
        </div>
        <div>
        <button
        type="submit">add</button>
        </div>
        
        {filteredList.map(person => 
        <div key={person.id}>
        <p>{person.name}</p>
        </div>
        )}
  
        </form>
        </>
    )
}

export default PersonForm
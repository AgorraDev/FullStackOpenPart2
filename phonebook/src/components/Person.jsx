import axios from "axios";
import servicePerson from '../services/person.js'
const Person = ({persons, filter}) => {

    const filteredList = persons.filter(person => 
        person.name &&  person.name.toLowerCase().includes(filter.toLowerCase())
      )

    const handleDelete = (person) => {

        if(window.confirm(`Would you like to remove ${person.name} from the phonebook?`)) {
            servicePerson
                .removePerson(person.id)
        }

    }

    return (
        <>
        {filteredList.map(person =>
        <div key={person.id}>
        <p>{person.name} | {person.number}</p>
        <button onClick={() => handleDelete(person)}>Delete</button>
        </div>
        )}
        </>
    )
}

export default Person
import axios from "axios"
const baseURL = 'http://localhost:3001/persons'


const getAll = () => {
        const req = axios.get(baseURL)
        return req.then(res => res.data)
}

const create = (newPerson) => {
        const req = axios.post(baseURL, newPerson)
        return req.then(res => res.data)
}

const removePerson = (personID) => {
        axios.delete(`${baseURL}/${personID}`)  
}

const updateNumber = (id, updatedNumber) => {
        const req = axios.put(`${baseURL}/${id}`, updatedNumber)
        return req.then(res => res.data)
       
}
export default { getAll, create, removePerson, updateNumber }
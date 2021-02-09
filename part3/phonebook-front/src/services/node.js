import axios from 'axios'

const url = '/api/persons'

const getPersons = () =>{
  const request = axios.get(url)
  return request.then(response => response.data)
}

const addPerson = (newPerson) =>{
  const request = axios.post(url, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) =>{
  const request = axios.delete( `${url}/${id}`)
  return request.then(response => response.data)
}

const updatePerson =(id, target) =>{
  const request = axios.put(`${url}/${id}`, target)
  return request.then(response => response.data)
}

export default { getPersons, addPerson, deletePerson, updatePerson }

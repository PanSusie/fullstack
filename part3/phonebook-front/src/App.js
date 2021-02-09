import React, { useState,useEffect } from 'react'
import phoneService from './services/node'
import {PersonForm, Filter, Persons} from './components/Node'
import Notification from './components/Notification'


const App = (phonebook) => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [showName, setShowName] = useState(true)
    const [error, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)

    const nameList = persons.map(person => person.name.toLowerCase())

    //retrieve persons data from the server 3001
    useEffect(() => {
      phoneService
      .getPersons()
      .then(defaultPhoneBook => {
        setPersons(defaultPhoneBook)
      })
    }, [])


    // add a name
    const addName = (event) => {
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      const personIndex = nameList.indexOf(newName.toLowerCase())
      if (personIndex >= 0) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const changedPerson = {...nameObject, number: newNumber}

          phoneService
          .updatePerson(persons.filter(person => person.name === newName)[0].id, changedPerson)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.id !== personIndex+1 ? person: returnedPersons))
          })
          .catch(error => {
            setErrorMessage(
              `'${newName}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }

      } else {
          phoneService
          .addPerson(nameObject)
          .then(returnedPersons =>{
            setPersons(persons.concat(returnedPersons))
            setNewName('')
            setNewNumber('')
            setNotification(
              `add a new person '${newName}' to phone book`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              error.response.data.error
             )
            setTimeout(() => {
               setErrorMessage(null)
             }, 5000)
          })
        }

    }

    const deleteName = (id, name) => {
      if (window.confirm(`Delete ${name} ? `)) {

      phoneService
      .deletePerson(id)
      .then(response =>{
        setPersons(persons.filter(person => person.id !== id))
      })

      }
    }


    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
      setFilterName(event.target.value)
      const filter = event.target.value.toLowerCase()
      //const nameList = persons.map(person => person.name.toLowerCase())

      if (nameList.indexOf(filter) >= 0) {
        setShowName(false)
      }else{
        setShowName(true)
      }
    }


    const nameFilter = showName ?
      persons :
      persons.filter(person => person.name.toLocaleLowerCase() === filterName.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={error} notification={notification}/>
      <Filter value={filterName} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
      onSubmit={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {nameFilter.map((person,i)=> <Persons key={i} person={person} onClick={()=> deleteName(person.id, person.name)}/>)}
    </div>
  )
}

export default App

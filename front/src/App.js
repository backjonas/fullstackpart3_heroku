import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import requestService from './services/requests'
import Notification from './components/Notification'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [currentMessage, setCurrentMessage] = useState({content: null, type: ''})


  const fetchPeople = () => {
    requestService.getAll().then(returnedPeople => {
      setPeople(returnedPeople)
    })
  }

  useEffect(fetchPeople, [])

  const showNotification = (message) => {
    setCurrentMessage(message)
    setTimeout(() => {          
      setCurrentMessage({content: null, type: null})        
    }, 5000)

  }

  const updatePerson = (oldPerson, newPerson) => {
    if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
      requestService.update(oldPerson.id, newPerson)
        .then(returnedPerson => {
          setPeople(people.map(person => 
            person.id !== returnedPerson.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')
          showNotification({
            content: `The number for ${returnedPerson.name} was updated`,
            type: 'success'
          })        
        })
        .catch((error) => {
          showNotification({
            content: error.response.data.error,
            type: 'error'
          })
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = people.find(person => person.name === newName)
    const newPerson = { name : newName, number: newNumber }

    if (oldPerson) {
      updatePerson(oldPerson, newPerson)
    } else {
      requestService
        .create(newPerson)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification({
            content: `${returnedPerson.name} was added to the phonebook`,
            type: 'success'
          })
        })
        .catch(error => {
          showNotification({
            content: error.response.data.error,
            type: 'error'
          })
        });
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
    {
      requestService
        .remove(person.id)
        .then(response => {
          setPeople(people.filter(object => object.id !== person.id))
          showNotification({
            content: `The number for ${person.name} has been removed from the server`,
            type: 'success'
          })
        })
        .catch(() => {
          setPeople(people.filter(object => object.id !== person.id))
          showNotification({
            content: `The number for ${person.name} has already been removed from the server`,
            type: 'error'
          })
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={currentMessage} />
      <Filter 
        currentFilter={currentFilter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new person</h2>
      <PersonForm 
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList 
        people={people} 
        currentFilter={currentFilter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
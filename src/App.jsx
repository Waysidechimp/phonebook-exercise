import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const AddPerson = (event) => {
    event.preventDefault()
    console.log("Submitting Name")
    const personObject = {
      name: newName,
      number: newNumber
    }

    const NameCompare = (person) => person.name === personObject.name
    const confirmText = `${personObject.name} is already added to 
    phonebook, replace the old number with a new one?`
    if(persons.some(NameCompare) && window.confirm(confirmText)) {
      UpdatePerson(personObject)
      return
    }
      
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const UpdatePerson = (personObj) => {
    const personId = persons.find((person) => person.name === personObj.name).id
    console.log(personId)
    personService
      .update(personId, personObj)
      .then((updatedPerson) => {
        setPersons(persons.map(person =>
          person.id !== personId ? person : updatedPerson
        ))
        setNewName('')
        setNewNumber('')
      })
  }

  const RemovePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    console.log(`Removing Person ${person.name}`)

    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)

      setPersons(persons.filter((person) => person.id != id))
    }
  }

  const handleNameChange = (event) => {
    console.log(`name change ${event.target.value}`)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(`number change ${event.target.value}`)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(`filter change ${event.target.value}`)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm AddPerson={AddPerson} newName={newName}
       newNumber={newNumber} handleNameChange={handleNameChange} 
       handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteButton={RemovePerson} />
    </div>
  )
}

export default App
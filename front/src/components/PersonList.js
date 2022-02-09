import React from 'react'

const Person = ({person, removePerson}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={removePerson}>delete</button>
    </li>
  )
}

const PersonList = ({people, currentFilter, removePerson}) => {
  const regexp = new RegExp(currentFilter, 'i')
  const peopleToShow = people.filter(person => 
                       regexp.test(person.name))

    return (
      <ul> 
        {peopleToShow.map(person => 
          <Person 
          key={person.name} 
          person={person}
          removePerson={() => removePerson(person)}
          />
        )}
      </ul>
    )
}

export default PersonList
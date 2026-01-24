import Person from "./Person"

const Persons = ({persons, filter, deleteButton}) => {
    return(
        <ul>
        {persons.filter((person) => 
        person.name.toLowerCase().includes(filter))
        .map(person => 
        <Person name={person.name} number={person.number} id={person.id} key={person.id} deleteButton={() => deleteButton(person.id)} />)}
        </ul>
    )
}

export default Persons
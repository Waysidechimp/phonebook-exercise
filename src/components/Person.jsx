const Person = (props) => {
    return (
        <li>
            {props.name}    {props.number}
            <button onClick={() => props.deleteButton(props.id)}>delete</button>
        </li>
    )
}

export default Person
import axios from "axios";
import React from "react";

function Add(props) {
  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (props.persons.some((person) => person.name === props.newName)) {
      alert(`${props.newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: props.newName,
        number: props.newNumber
      };

      axios
        .post("http://localhost:3001/persons/", newPerson)
        .then(response => {
          props.setPersons(props.persons.concat(response.data));
          props.setNewName("");
          props.setNewNumber("");
        })
        .catch(error => {
          alert(
            "There was an error adding the person to the server"
          );
        })
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={props.newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Add;

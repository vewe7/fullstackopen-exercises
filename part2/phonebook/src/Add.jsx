import React from "react";
import personService from "./services/persons";

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

      personService
        .create(newPerson)
        .then(resPerson => {
          props.setPersons(props.persons.concat(resPerson));
          props.setNewName("");
          props.setNewNumber("");
          props.setActionMessage(`Added ${resPerson.name}`);
          props.setActionSuccess(true);

          setTimeout(() => {
            setActionMessage(null);
          }, 5000);
        })
        .catch(error => {
          props.setActionMessage(`Error adding person to the server`);
          props.setActionSuccess(false);

          setTimeout(() => {
            setActionMessage(null);
          }, 5000);
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

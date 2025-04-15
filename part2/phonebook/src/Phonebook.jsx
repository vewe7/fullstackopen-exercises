import React from "react";
import personService from "./services/persons";

const Listing = ({ person }) => {
  return (
    <div>
      {person.name} {person.number} <DeleteButton person={person} />
    </div>
  );
};

const DeleteButton = ({ person }) => {
  const deletePerson = () => {

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          location.reload();
        });
    }
  };

  return (
    <button onClick={deletePerson}>delete</button>
  );
};

const Phonebook = ({ persons, search }) => {
  const nameContains = (person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div>
      {persons.filter(nameContains).map((person) => (
        <Listing key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Phonebook;

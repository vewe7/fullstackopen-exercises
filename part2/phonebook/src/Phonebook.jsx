import React from "react";
import personService from "./services/persons";

function Listing({ person, setActionMessage, setActionSuccess }) {
  return (
    <div>
      {person.name} {person.number}
      <DeleteButton setActionMessage={setActionMessage} setActionSuccess={setActionSuccess} person={person} />
    </div>
  );
}

function DeleteButton({ setActionMessage, setActionSuccess, person }) {
  const deletePerson = () => {

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          location.reload();
        })
        .catch(error => {
          setActionMessage(`${person.name} has already been removed from server`);
          setActionSuccess(false);

          setTimeout(() => {
            setActionMessage(null);
          }, 5000)
        });
    }
  };

  return (
    <button onClick={deletePerson}>delete</button>
  );
}

function Phonebook({ setActionMessage, setActionSuccess, persons, search }) {
  const nameContains = (person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div>
      {persons.filter(nameContains).map((person) => (
        <Listing
          setActionMessage={setActionMessage}
          setActionSuccess={setActionSuccess}
          person={person}
          key={person.id}
        />
      ))}
    </div>
  );
}

export default Phonebook;

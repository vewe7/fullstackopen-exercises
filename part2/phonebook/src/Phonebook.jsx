import React from "react";

const Listing = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
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

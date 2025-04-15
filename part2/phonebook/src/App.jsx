import { useState, useEffect } from "react";
import personService from "./services/persons";
import Phonebook from "./Phonebook";
import Search from "./Search";
import Add from "./Add";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <h2>Add New</h2>
      <Add
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <h2>Numbers</h2>
      <Phonebook persons={persons} search={searchValue} />
    </div>
  );
}

export default App;

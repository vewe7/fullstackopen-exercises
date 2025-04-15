import { useState, useEffect } from "react";
import personService from "./services/persons";
import Phonebook from "./Phonebook";
import Notification from "./Notification";
import Search from "./Search";
import Add from "./Add";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [actionMessage, setActionMessage] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(false);

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
      <Notification success={actionSuccess} message={actionMessage} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />

      <h2>Add New</h2>
      <Add
        setActionMessage={setActionMessage}
        setActionSuccess={setActionSuccess}
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
      <Phonebook
        setActionMessage={setActionMessage}
        setActionSuccess={setActionSuccess}
        persons={persons}
        search={searchValue}
      />
    </div>
  );
}

export default App;

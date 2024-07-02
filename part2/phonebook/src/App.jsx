import { useState } from "react";
import Phonebook from "./Phonebook";
import Search from "./Search";
import Add from "./Add";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

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

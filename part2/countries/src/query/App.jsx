import { useState, useEffect } from 'react';
import './App.css';
import restCountries from "./api/restcountries";
import Search from "./Search";
import Results from "./Results";

export default function App() {
  const [countryNames, setCountryNames] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    restCountries
      .getAllNames()
      .then(responseData => {
        setCountryNames(responseData.map((country) => country.name.common));
      });
  }, []);

  if (countryNames == null) {
    return null;
  }

  return (
    <div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Results countries={countryNames} search={searchValue} />
    </div>
  );
}

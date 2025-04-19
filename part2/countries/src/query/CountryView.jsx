import { useState, useEffect } from 'react';
import restCountries from "./api/restcountries";
import "./App.css";

export default function CountryView({ countryName }) {
  const [capital, setCapital] = useState("");
  const [area, setArea] = useState(0);
  const [languages, setLanguages] = useState(null);
  const [flagUrl, setFlagUrl] = useState("");
  const [requestError, setRequestError] = useState(false);

  useEffect(() => {
    restCountries
      .getCountryData(countryName)
      .then(responseData => {
        setCapital(responseData.capital);
        setArea(responseData.area);
        setLanguages(Object.values(responseData.languages));
        setFlagUrl(responseData.flags.svg);
        setRequestError(false);
      })
      .catch(error => {
        setRequestError(true);
      });
  }, []);

  if (languages === null) {
    return null;
  }

  if (requestError) {
    return (
      <div>There was an error getting country data for {countryName}</div>
    );
  }

  return (
    <div>
      <h1>{countryName}</h1>
      <div>Capital {capital}</div>
      <div>Area {area}</div>

      <h2>Languages</h2>
      <ul>
        {languages.map((language) =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={flagUrl} className="flag-image" />
    </div>
  );
}


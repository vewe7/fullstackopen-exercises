import { useState, useEffect } from "react";
import CountryView from "./CountryView";

export default function Results({ countries, search }) {
  const [viewCountryName, setViewCountryName] = useState("");

  useEffect(() => {
    if (matches.length === 1) {
      setViewCountryName(matches[0]);
    } else {
      setViewCountryName("");
    }
  }, [search]);

  const nameContains = (country) => {
    return country.toLowerCase().includes(search.toLowerCase());
  };

  const matches = countries.filter(nameContains);

  if (matches.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    );
  }

  if (viewCountryName !== "") {
    return (<CountryView countryName={viewCountryName} />);
  }

  return (
    <div>
      {matches.map((countryName) => (
        <div key={countryName}>
          {countryName} <button onClick={() => setViewCountryName(countryName)}>Show</button>
        </div>
      ))}
    </div>
  );
}

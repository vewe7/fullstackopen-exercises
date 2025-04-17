import React from "react";
import persnoService from "./api/restcountries";

function Results({ countries, search }) {
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

  return (
    <div>
      {matches.map((country) => (
        <div key={country}>
          {country}
        </div>
      ))}
    </div>
  );
}

export default Results;

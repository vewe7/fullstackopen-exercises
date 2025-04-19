import CountryView from "./CountryView";

export default function Results({ countries, search }) {
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

  if (matches.length == 1) {
    return (<CountryView countryName={matches[0]} />);
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

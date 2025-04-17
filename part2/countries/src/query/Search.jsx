import React from "react";

function Search({ searchValue, setSearchValue }) {
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      find countries {" "}
      <input value={searchValue} onChange={handleSearchChange} />
    </div>
  );
}

export default Search;

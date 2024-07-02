import React from "react";

const Search = ({ searchValue, setSearchValue }) => {
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      filter by name:{" "}
      <input value={searchValue} onChange={handleSearchChange} />
    </div>
  );
};

export default Search;

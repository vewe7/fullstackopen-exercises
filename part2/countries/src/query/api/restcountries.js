import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllNames = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
};

const getCountryData = (countryName) => {
  const request = axios.get(`${baseUrl}/name/${countryName}`);
  return request.then(response => response.data);
};

export default { getAllNames, getCountryData };

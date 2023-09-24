import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

CitiesProvider.propTypes = {
  children: PropTypes.node,
};

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        console.error(err.message);
        throw new Error("Couldn't fetch the data");
      } finally {
        setIsLoading(false);
      }
    }

    getCities();
  }, []);

  async function getCityById(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (err) {
      console.error(err.message);
      throw new Error("Couldn't fetch the data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.error(err.message);
      throw new Error("Couldn't create the data");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCityById(id) {
    try {
      setIsLoading(true);

      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      console.error(err.message);
      throw new Error("Couldn't delete the data");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCityById,
        createCity,
        deleteCityById,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };

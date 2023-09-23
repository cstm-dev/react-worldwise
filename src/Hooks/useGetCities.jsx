import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

function useGetCities() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return { cities, isLoading };
}

export default useGetCities;

import { CitiesContext } from "contexts/_components.jsx";
import { useContext } from "react";

function useCities() {
  const citiesContext = useContext(CitiesContext);

  if (citiesContext === undefined)
    throw new Error("Cities context outside of its provider");

  return citiesContext;
}

export default useCities;

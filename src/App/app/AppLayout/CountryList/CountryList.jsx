import styles from "./CountryList.module.css";
import { Spinner, Message } from "utilities/_components.jsx";
import { CountryListItem } from "app/_components.jsx";
import PropTypes from "prop-types";
import { useCities } from "hooks/_components.jsx";

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const uniqueCountries = cities.reduce((acc, curr) => {
    if (!acc.map((city) => city.country).includes(curr.country))
      return [...acc, curr];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((city) => (
        <CountryListItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CountryList;

import { Message, Spinner } from "utilities/_components.jsx";
import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import { CityListItem } from "app/_components.jsx";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityListItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;

import styles from "./CountryListItem.module.css";
import PropTypes from "prop-types";

CountryListItem.propTypes = {
  city: PropTypes.object,
};

function CountryListItem({ city }) {
  const { emoji, country } = city;

  return (
    <li className={styles.countryListItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryListItem;

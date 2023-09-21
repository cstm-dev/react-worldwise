import PropTypes from "prop-types";
import styles from "./CityListItem.module.css";

CityListItem.propTypes = {
  city: PropTypes.object,
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityListItem({ city }) {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityListItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityListItem;

import PropTypes from "prop-types";
import styles from "./CityListItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "hooks/_components.jsx";
import { createFlagEmoji, formatDate } from "helpers/_functions.js";

CityListItem.propTypes = {
  city: PropTypes.object,
};

function CityListItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityListItem} ${
          id === currentCity.id ? styles["cityListItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{createFlagEmoji(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityListItem;

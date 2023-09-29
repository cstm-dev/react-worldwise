import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./City.module.css";
import { useCities } from "hooks/_components.jsx";
import { Button, Spinner } from "utilities/_components.jsx";
import { createFlagEmoji, formatDate } from "helpers/_functions.js";

function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentCity, getCityById, isLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(() => {
    getCityById(id);
  }, [id, getCityById]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{createFlagEmoji(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;

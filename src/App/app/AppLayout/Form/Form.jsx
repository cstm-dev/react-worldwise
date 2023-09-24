import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { Button, Message, Spinner } from "utilities/_components.jsx";
import { useCities, useUrlPosition } from "hooks/_components.jsx";
import { createFlagEmoji } from "helpers/_functions";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

function Form() {
  const navigate = useNavigate();
  const [curLat, curLng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoFetch, setIsLoadingGeoFetch] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!curLat && !curLng) return;

    async function fetchGeoLocationData() {
      try {
        setIsLoadingGeoFetch(true);
        setGeoCodeError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${curLat}&longitude=${curLng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a country. Please click somewhere else."
          );

        setCityName(data.city || data.locality || "unknown");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        console.error(err.message);
        setGeoCodeError(err.message);
      } finally {
        setIsLoadingGeoFetch(false);
      }
    }

    fetchGeoLocationData();
  }, [curLat, curLng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: curLat, lng: curLng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeoFetch) return <Spinner />;
  if (!curLat && !curLng)
    return <Message message="Start by clicking somewhere on the map." />;
  if (geoCodeError) return <Message message={geoCodeError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{createFlagEmoji(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
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
    </form>
  );
}

export default Form;

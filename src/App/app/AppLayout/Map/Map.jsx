import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useCities, useGeolocation } from "hooks/_components.jsx";
import { Button } from "utilities/_components.jsx";
import ChangeCenter from "./ChangeCenter/ChangeCenter.jsx";
import ClickHandle from "./ClickHandle/ClickHandle.jsx";
import { createFlagEmoji } from "helpers/_functions.js";

function Map() {
  const { cities } = useCities();
  const {
    isLoading: geoIsLoading,
    position: geoPosition,
    getPosition: geoGetPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([50, 13]);
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={geoGetPosition}>
          {geoIsLoading ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{createFlagEmoji(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <ClickHandle />
      </MapContainer>
    </div>
  );
}

export default Map;

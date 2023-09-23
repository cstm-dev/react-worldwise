import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

function ChangeCenter({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}

export default ChangeCenter;

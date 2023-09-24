import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [currentPosition] = useSearchParams();
  const lat = currentPosition.get("lat");
  const lng = currentPosition.get("lng");

  return [lat, lng];
}

export default useUrlPosition;

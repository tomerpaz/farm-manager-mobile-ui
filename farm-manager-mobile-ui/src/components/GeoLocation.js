import { useEffect } from "react"
import { useMap } from "react-leaflet"
import {LocateControl} from "leaflet.locatecontrol"
const locateOptions = {
  position: "topleft",
  // Set other options in here for locate control
  flyTo: true,
  drawCircle: false,
  showPopup: false,
  keepCurrentZoomLevel: true,
  enableHighAccuracy: true,
  cacheLocation: false,
  watch: true,
}
const control = new LocateControl(locateOptions)
let ok = false;
const GeoLocation = () => {
  // Access the map context with the useMap hook
  const map = useMap()

  // Add locate control once the map loads
  useEffect(() => {
    map.addControl(control);
    return () => map.removeControl(control);
  }, [map])

  return null
}

export default GeoLocation
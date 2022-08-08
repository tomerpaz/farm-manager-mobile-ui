import { useEffect } from "react"
import { useMap } from "react-leaflet"
import Locate from "leaflet.locatecontrol"
const locateOptions = {
  position: "topleft",
  // Set other options in here for locate control
  flyTo: true,
  drawCircle: false,
  showPopup: false,
  keepCurrentZoomLevel: true,
}
const locateControl = new Locate(locateOptions)
let ok = false;
const GeoLocation = () => {
  // Access the map context with the useMap hook
  const map = useMap()

  // Add locate control once the map loads
  useEffect(() => {
    map.addControl(locateControl);
    return () => map.removeControl(locateControl);
  }, [map])

  return null
}

export default GeoLocation
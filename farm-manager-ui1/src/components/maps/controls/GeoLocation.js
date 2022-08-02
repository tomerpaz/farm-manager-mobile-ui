import { useEffect } from "react"
import { useMap } from "react-leaflet"
import Locate from "leaflet.locatecontrol"

const GeoLocation = () => {
  // Access the map context with the useMap hook
  const map = useMap()

  // Add locate control once the map loads
  useEffect(() => {
    const locateOptions = {
      position: "topleft",
      // Set other options in here for locate control
      flyTo: true,
      drawCircle: false,
      showPopup: false,
      keepCurrentZoomLevel: true,
    }
    const locateControl = new Locate(locateOptions)
    locateControl.addTo(map)
  }, [map])

  return null
}

export default GeoLocation
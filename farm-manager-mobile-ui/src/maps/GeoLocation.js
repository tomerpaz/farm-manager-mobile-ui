import { useEffect, useState } from "react"
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
const locateControl = new Locate(locateOptions);


const GeoLocation = (props) => {

    const map = useMap()

    useEffect(() => {
        locateControl.addTo(map)
    }, [])

    return null;
}

export default GeoLocation
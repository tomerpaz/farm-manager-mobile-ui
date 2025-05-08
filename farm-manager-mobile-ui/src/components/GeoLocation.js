import { useEffect } from "react"
import { useMap } from "react-leaflet"
import { LocateControl } from "leaflet.locatecontrol"
import { useDispatch, useSelector } from "react-redux"
import { selectActiveGPS, setAccuracy, setActiveGPS, setLatitude, setLongitude } from "../features/app/appSlice"
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

  const dispatch = useDispatch()

  const activeGPS = useSelector(selectActiveGPS);


  // if (activeGPS) {
  //   control.start();
  // }
  // Access the map context with the useMap hook
  const map = useMap()

  map.on('locationfound', function (evt) {
    var LatLng = evt.latlng;
    var longitude = LatLng.lng;
    var latitude = LatLng.lat;
    map.setView([latitude, longitude]);
    dispatch(setLatitude(latitude.toFixed(5)));
    dispatch(setLongitude(longitude.toFixed(5)));
    dispatch(setAccuracy(evt.accuracy));
  });

  // map.on('locateactivate', function (evt) {
  //   // console.log("locateactivate", evt);
  //   console.log('set active GPS')
  //   dispatch(setActiveGPS(true));

  // });

  map.on('locatedeactivate', function (evt) {
    console.log('locatedeactivate', evt)
    if (!activeGPS) {
      dispatch(setLatitude(null));
      dispatch(setLongitude(null));
      dispatch(setAccuracy(null));
      
    }

  });

  // Add locate control once the map loads
  useEffect(() => {
    map.addControl(control);

    return () => {
      map.removeControl(control)
    };
  }, [map])

  return null
}

export default GeoLocation
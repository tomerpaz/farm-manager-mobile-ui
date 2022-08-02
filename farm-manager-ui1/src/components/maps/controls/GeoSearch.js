import React, { useEffect } from "react";
import L from "leaflet";

import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { BACKEND_URL } from "../../../config";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl:  BACKEND_URL + "/images/marker-icon.png",
  shadowUrl: BACKEND_URL + "/images/marker-shadow.png"
});

const  GeoSearch = (props) => {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
  
      const searchControl = new GeoSearchControl({
        provider,
        marker: {
          icon
        },
        autoClose: true,
        retainZoomLevel: true,
        autoComplete: true,
        autoCompleteDelay: 250,
        resultFormat: (e)=>e.result.label,
        updateMap: true,
        searchLabel: props.inputPlaceholder,
         ...props,
      
      });
  
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, [props]);
  
    return null;
  }

export default GeoSearch


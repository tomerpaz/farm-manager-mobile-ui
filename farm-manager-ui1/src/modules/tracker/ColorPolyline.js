import React, { useState, useEffect } from 'react';

import { useMap } from "react-leaflet";
import L from "leaflet";
import hotline from "leaflet-hotline";
import { isArrayEmpty } from '../../components/filters/filterUtil';


// interface Props {
//   data: number[][];
// }

/**
 * Renderes a path on the map for the passed geojson file
 * that changes color according to the elevation.
 *
 * https://github.com/iosphere/Leaflet.hotline/
 */
export const ColoredPath = (props) => {
  const map = useMap();

  useEffect(() => {
    // if (!isArrayEmpty(props.data)) {
      L.hotline(props.data, {
        min: props.min,
        max: props.max,
        palette: props.palette,
        weight: 5,
        outlineColor: '#000000',
        outlineWidth: 1,
        smoothFactor: props.smoothFactor,
      }).addTo(map);
    // }
    return () => {
      // if (!isArrayEmpty(props.data)) {
        // To avoid having the path drawn twice on the map in some edge cases:
       // map.remove();
      // }
    };
  }, []);

  return null;
};
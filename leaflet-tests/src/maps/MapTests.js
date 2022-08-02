import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Circle } from "react-leaflet";

import { EditControl } from "react-leaflet-draw"
const position = [51.505, -0.09]

// render(
//   <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//     <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//   </MapContainer>
// )

// import React, { useState, useEffect } from 'react';


const MapTests = (props) => {

  return (
    <div id="map" dir='ltr' >

      <MapContainer style={{ height: 700, width: '100%' }} center={position} zoom={13} scrollWheelZoom={false}>



        <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={e => console.log(e)}
            onCreated={e => console.log(e)}
            onDeleted={e => console.log(e)}
            draw={{
              rectangle: false
            }}
          />
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>


        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
export default MapTests;
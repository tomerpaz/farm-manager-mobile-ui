import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Circle } from "react-leaflet";
const position = [51.505, -0.09]

const FieldsMap = (props) => {

    return (
        <div id="map" dir='ltr' >

            <MapContainer style={{ height: window.screen.height -250, width: '100%' }} center={position} zoom={13} scrollWheelZoom={false}>

                {/* <FeatureGroup>
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
          </FeatureGroup> */}


                {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}

                <TileLayer
                    // attribution='&amp;copy <a href="http://www.esri.com/">Esri</a>'
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    maxZoom={18}
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
export default FieldsMap;






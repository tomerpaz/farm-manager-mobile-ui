import { makeStyles } from '@mui/styles';
import {
    MapContainer as Map, Polygon,
} from 'react-leaflet';
import { BORDER_COLOR_DARK, defaultCenter } from '../../App';
import { height160 } from '../../utils';
import { isEmpty } from '../../utils/StringUtil';
import MapTooltip, { MAX_PER_MAP } from '../overview/map/MapTooltip';
import SatelliteMapProvider from '../../components/maps/SatelliteMapProvider';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(1),
    },
}));

function getMapCenter(gisPolygons) {
    const fistPolygon = gisPolygons.filter(e => !isEmpty(e.coordinates) && e.lat && e.lng).find(e => true);
    if (!isEmpty(fistPolygon)) {
        return [fistPolygon.lat, fistPolygon.lng];
    }
    return defaultCenter;
}

function getTextArr(name, id) {
    const textArr = [];
    if (id && !isEmpty(id)) {
        textArr.push(id);
        if (!isEmpty(name)) {
            textArr.push(", ");
        }

    }
    if (name && !isEmpty(name)) {
        textArr.push(name);
    }

    return textArr;

}

const PolygonMap = (props) => {
    const classes = useStyles();
    const { gisPolygons, showName, showId, user: { mapProvider }, googleMapKey, bingMapKey, } = props;
    const showToolTip = showName || showId;

    return (
        <div dir='ltr' style={{ style: 'flex', flex: 1 }}>
        {gisPolygons.length > 0 && <Map dir='ltr' style={{ zIndex: 1, height: height160, width: '100%', border: '2px solid ' + BORDER_COLOR_DARK, borderRadius: 8 }}
                dragging={true}
                center={getMapCenter(gisPolygons)} zoom={14} zoomControl={true}
            >
                <SatelliteMapProvider mapPovider={mapProvider} googleMapKey={googleMapKey} bingMapKey={bingMapKey} />
                {gisPolygons.filter(e => !isEmpty(e.coordinates)).map((e, index) => {
                    return (
                        <Polygon
                            key={e.id}
                            color={'white'}
                            positions={JSON.parse(e.coordinates)}>
                            {showToolTip && index < MAX_PER_MAP && <MapTooltip textArr={[getTextArr(showId ? e.externalId : null, showName ? e.name : null)]}>  </MapTooltip>}
                        </Polygon>
                    )
                })}
            </Map>
            }
        </div>
    )
}
export default PolygonMap;




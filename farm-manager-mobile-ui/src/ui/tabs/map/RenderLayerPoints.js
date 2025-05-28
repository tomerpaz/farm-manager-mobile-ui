import { CircleMarker } from 'react-leaflet';
import { MapToolTip } from '../../FarmUtil';

const RenderLayerPoints = ({layer}) => {
  return (
    <div>
      {layer.elements.map((e, index) => {
        return (
          <CircleMarker
            key={index + layer.id}
            center={[e.lat, e.lng]}
            color={layer.color}
            fillColor={layer.color}
            fillOpacity={1}
            radius={15}
          >
            <MapToolTip
              textArr={[e.name]} />
          </CircleMarker>
        );
      })}
    </div>
  )
}

export default RenderLayerPoints

import L from "leaflet";
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet.fullscreen';

const FullscreenControl = createControlComponent(props => L.control.fullscreen(props))

export default FullscreenControl

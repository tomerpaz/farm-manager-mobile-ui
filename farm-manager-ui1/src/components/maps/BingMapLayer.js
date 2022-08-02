import { createLayerComponent } from '@react-leaflet/core';
import bingTileLayer from 'leaflet-bing-layer';
import PropTypes from 'prop-types';

const IMAGERY_SETS = [
  'Aerial',
  'AerialWithLabels',
  'AerialWithLabelsOnDemand',
  'CanvasDark',
  'CanvasLight',
  'CanvasGray',
  'Road',
  'RoadOnDemand',
  'OrdnanceSurvey',
];

// const CULTURES = [
//   'af', 'am', 'ar-sa', 'as', 'az-Latn', 'be', 'bg', 'bn-BD',
//   'bn-IN', 'bs', 'ca', 'ca-ES-valencia', 'cs', 'cy', 'da', 'de',
//   'de-de', 'el', 'en-GB', 'en-US', 'es', 'es-ES', 'es-US', 'es-MX',
//   'et', 'eu', 'fa', 'fi', 'fil-Latn', 'fr', 'fr-FR', 'fr-CA', 'ga',
//   'gd-Latn', 'gl', 'gu', 'ha-Latn', 'he', 'hi', 'hr', 'hu', 'hy',
//   'id', 'ig-Latn', 'is', 'it', 'it-it', 'ja', 'ka', 'kk', 'km',
//   'kn', 'ko', 'kok', 'ku-Arab', 'ky-Cyrl', 'lb', 'lt', 'lv',
//   'mi-Latn', 'mk', 'ml', 'mn-Cyrl', 'mr', 'ms', 'mt', 'nb', 'ne',
//   'nl', 'nl-BE', 'nn', 'nso', 'or', 'pa', 'pa-Arab', 'pl',
//   'prs-Arab', 'pt-BR', 'pt-PT', 'qut-Latn', 'quz', 'ro', 'ru',
//   'rw', 'sd-Arab', 'si', 'sk', 'sl', 'sq', 'sr-Cyrl-BA',
//   'sr-Cyrl-RS', 'sr-Latn-RS', 'sv', 'sw', 'ta', 'te', 'tg-Cyrl',
//   'th', 'ti', 'tk-Latn', 'tn', 'tr', 'tt-Cyrl', 'ug-Arab', 'uk',
//   'ur', 'uz-Latn', 'vi', 'wo', 'xh', 'yo-Latn', 'zh-Hans',
//   'zh-Hant', 'zu',
// ];

const createBingTileLayer = (props, context) => {
  const instance = new bingTileLayer(props);

  // Fix attribution not showing initially.
  // TODO: Remove once
  // https://github.com/digidem/leaflet-bing-layer/pull/30
  // is merged.
  instance._onAdd = instance.onAdd;
  instance.onAdd = function (map) {
    this._onAdd(map);
    this._updateAttribution();
  };

  return { instance, context };
};

const BingTileLayer =
  createLayerComponent(createBingTileLayer, () => null);

BingTileLayer.propTypes = {
  bingMapsKey: PropTypes.string.isRequired,
  imagerySet: PropTypes.oneOf(IMAGERY_SETS),
//   culture: PropTypes.oneOf(CULTURES),
  style: PropTypes.string,
};

BingTileLayer.defaultProps = {
  imagerySet: IMAGERY_SETS[0],
  culture: 'en-US',
  style: null,
};

export default BingTileLayer;
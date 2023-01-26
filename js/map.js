import {setInitialPageState, setActivePageState} from './page-state.js'
import {createAdPopup} from './card.js';
import {getData} from './api.js';
import {debounce} from './util.js';
import {filterData} from './filter.js';

const ZOOM = 13;
const MAX_AD_COUNT = 10;
const TokyoCenter = {
  LAT: 35.67240,
  LNG: 139.75266,
}
const address = document.querySelector('#address');
const filters = document.querySelector('.map__filters');

setInitialPageState();

const map = L.map('map-canvas')
  .setView({
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

/**
 * Функция отрисовывает на карте пин объявления
 * @param {object} adItem объект с данными объявления
 */
const renderPin = (adItem)=>{
  const marker = L.marker(
    {
      lat: adItem.location.lat,
      lng: adItem.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(pinGroup)
    .bindPopup(createAdPopup(adItem));

};

const pinGroup = L.layerGroup().addTo(map);
/**
 * Функция отчищает открытые объявления
 */
const clearPinGroup = () => { pinGroup.clearLayers();}

/**
 * Функция отрисовывает группу пинов объявления на карте
 * @param {array} adList
 */
const showPins = (adList) => {
  clearPinGroup();
  adList.slice(0, MAX_AD_COUNT).forEach(renderPin);
};

map.on('load',
  getData((ads) => {
    if(ads) {setActivePageState()}
    filters.addEventListener('change', debounce( () => showPins(filterData(ads))) );
  }),
).setView({
  lat: TokyoCenter.LAT,
  lng: TokyoCenter.LNG,
}, ZOOM);

getData(showPins);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(
  {
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);
address.value = `${TokyoCenter.LAT}, ${TokyoCenter.LNG}`;

mainPin.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const resetMap = () => {
  mainPin.setLatLng(TokyoCenter);
  address.value = `${TokyoCenter.LAT}, ${TokyoCenter.LNG}`;
  map.setView(TokyoCenter, ZOOM);
  map.closePopup();
  getData(showPins);
  filters.reset();
};

export {resetMap}

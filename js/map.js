import {setInitialPageState, setActivePageState} from './page-state.js'
import {createAdPopup} from './card.js';
import {getData} from './api.js';

const TokyoCenter = {
  LAT: 35.68949,
  LNG: 139.69171,
}
const address = document.querySelector('#address');

setInitialPageState();

const map = L.map('map-canvas')
  .setView({
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

map.on('load',
  setActivePageState(),
);

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

const pinGroup = L.layerGroup().addTo(map);
const clearPinGroup = () => {   pinGroup.clearLayers();}

const showPins = (adList) => {
  clearPinGroup();
  adList.forEach((adItem)=>{
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

  });
};

getData(showPins);


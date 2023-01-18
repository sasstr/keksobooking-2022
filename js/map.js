import {setInitialPageState, setActivePageState} from './page-state.js'
import {createAdPopup} from './card.js';
import {getData} from './api.js';

const ZOOM = 13;
// const MAX_AD_COUNT = 10;
const TokyoCenter = {
  LAT: 35.67240,
  LNG: 139.75266,
}
const address = document.querySelector('#address');
// const filters = document.querySelector('.map__filters');

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
  setActivePageState(), // устанавливаем форму в активное состояние, но форму для фильтрации только после получения данных с сервера.
  // @TODO  getData => array  => filtres.addEventListener('change', ()=> {}) Получаем данные с сервера
  // Вешаем на форму фильтров слушатель событий который отфильтрует нужные пины getFiltredAds и оставит их не более 10
  // и добавить дебаунс на обработку событий на фильтре
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

// const resetMap = () => {
//   mainPinMarker.setLatLng(TokyoCenter);
//   address.value = `${TokyoCenter.LAT}, ${TokyoCenter.LNG}`;
//   map.setView(TokyoCenter, ZOOM);
//   map.closePopup();
//   getData(showPins);

// };

getData(showPins);


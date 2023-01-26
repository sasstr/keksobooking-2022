import {resetMap} from './map.js';

const PriceMin = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const ROOMS = {'1': {'1': 'для 1 гостя'}, '2': {'1': 'для 1 гостя', '2': 'для 2 гостей'}, '3': {'1': 'для 1 гостя', '2': 'для 2 гостей', '3': 'для 3 гостей'}, '100': {'0': 'не для гостей'}};

const GUESTS = {
  '0': '100',
  '1': '1',
  '2': '2',
  '3': '3',
};

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const adFormReset = form.querySelector('.ad-form__reset');

/**
 * Функция синхронизирует по полю количество мест поле количество комнат
 * @param {evt} evt
 * @return {void}
 */
const guestChangeHandler = (evt) => {
  roomNumber.value = GUESTS[(evt.target.value + '')];
}

capacity.addEventListener('change', guestChangeHandler );

/**
 * Функция для каждого типа жилья устанавливает минимальную стоимость в плейсхолдере и значение min для инпута.
 * @return {void}
 */
const priceChangeHandler = () => {
  price.placeholder = PriceMin[type.value];
  price.min = PriceMin[type.value];
}

type.addEventListener('change', priceChangeHandler);

/**
 * Функция синхронизирует время въезда и выезда
 * @param {evt} evt
 * @return {void}
 */
const timeChangeHandler = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

time.addEventListener('change', timeChangeHandler);

/** Функция создает список select с кол-ом гостей в соответсвии с кол-ом комнат
 * @return {void}
 */
const selectRoomsChangeHandler = () => {
  capacity.removeEventListener('change', guestChangeHandler );
  capacity.innerHTML = '';
  const roomCount = roomNumber.options[roomNumber.selectedIndex].value;
  const room = ROOMS[roomCount];
  const keys = Object.keys(room);
  keys.forEach((value, i)=>{
    const valueString = room[keys[i]];
    const option = new Option(valueString, value, false, false);
    capacity.add(option);
  });
};

roomNumber.addEventListener('change', selectRoomsChangeHandler);

const formResetHandler = (evtForm) => {
  evtForm.target.preventDefault();
  form.reset();
  resetMap();
};

adFormReset.addEventListener('reset', formResetHandler);

import { resetMap } from './map.js';
import { clearImages } from './file-uploader.js';
import { sendData } from './api.js';
import { showSuccessMessage,
  showErrorMessage } from './state-messages.js';

const ROOMS = {'1': {'1': 'для 1 гостя'}, '2': {'1': 'для 1 гостя', '2': 'для 2 гостей'}, '3': {'1': 'для 1 гостя', '2': 'для 2 гостей', '3': 'для 3 гостей'}, '100': {'0': 'не для гостей'}};

const ROOMS_LIST = {'1': 'для 1 гостя', '2': 'для 2 гостей', '3': 'для 3 гостей', '0': 'не для гостей' };

const GUESTS = {
  '0': '100',
  '1': '1',
  '2': '2',
  '3': '3',
};
const PriceMin = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const body = document.querySelector('body');
const adForm = body.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeElement = adForm.querySelector('.ad-form__element--time');
const timeInSelect = timeElement.querySelector('#timein');
const timeOutSelect = timeElement.querySelector('#timeout');
const roomNumberSelect = body.querySelector('#room_number');
const capacitySelect = body.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

/**
 * Функция синхронизирует по полю количество мест поле количество комнат
 * @param {evt} evt
 * @return {void}
 */
const guestChangeHandler = (evt) => {
  roomNumberSelect.value = GUESTS[(evt.target.value + '')];
}

capacitySelect.addEventListener('change', guestChangeHandler );

/**
 * Функция для каждого типа жилья устанавливает минимальную стоимость в плейсхолдере и значение min для инпута.
 * @return {void}
 */
const priceChangeHandler = () => {
  priceInput.placeholder = PriceMin[typeSelect.value];
  priceInput.min = PriceMin[typeSelect.value];
}

typeSelect.addEventListener('change', priceChangeHandler);

/**
 * Функция синхронизирует время въезда и выезда
 * @param {evt} evt
 * @return {void}
 */
const timeChangeHandler = (evt) => {
  timeInSelect.value = evt.target.value;
  timeOutSelect.value = evt.target.value;
}

timeElement.addEventListener('change', timeChangeHandler);

/** Функция создает список select с кол-ом гостей в соответсвии с кол-ом комнат
 * @return {void}
 */
const selectRoomsChangeHandler = () => {
  capacitySelect.removeEventListener('change', guestChangeHandler );
  capacitySelect.innerHTML = '';
  const roomCount = roomNumberSelect.options[roomNumberSelect.selectedIndex].value;
  const room = ROOMS[roomCount];
  const keys = Object.keys(room);
  keys.forEach((value, i)=>{
    const valueString = room[keys[i]];
    const option = new Option(valueString, value, false, false);
    capacitySelect.add(option);
  });
};

roomNumberSelect.addEventListener('change', selectRoomsChangeHandler);

/**
 *  Функция для сброса списка комнат создавая новый список
 *  @returns {void}
 */
const resetRoomAmountList = () => {
  capacitySelect.innerHTML = '';
  const room = ROOMS_LIST;
  const keys = Object.keys(room);
  keys.forEach((value, i)=>{
    const valueString = room[keys[i]];
    const option = new Option(valueString, value, false, false);
    capacitySelect.add(option);
  });
  capacitySelect.addEventListener('change', guestChangeHandler )
  capacitySelect.selectedIndex = 1;
};

/**
 *  Функция сбрасывает форму на начальное состояние
 * @returns {void}
 */
const resetForm = () => {
  adForm.reset();
  clearImages();
  resetMap();
  resetRoomAmountList();
  priceInput.placeholder = PriceMin[typeSelect.value];
}

/**
 *  Функция слушатель события для сбрасывания формы
 * @param {Event} evtForm
 * @returns {void}
 */
const formClickHandler = (evtForm) => {
  evtForm.preventDefault();
  resetForm();
};

resetButton.addEventListener('click', formClickHandler);

/**
 *  Функция слушатель события отправки формы
 * @param {event} evt
 * @returns {void}
 */
const adFormSubmitHandler = (evt) => {
  evt.preventDefault();
  sendData(
    showSuccessMessage,
    showErrorMessage,
    new FormData(evt.target),
  );
};

adForm.addEventListener('submit', adFormSubmitHandler);

export {resetForm}

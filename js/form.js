import {resetMap} from './map.js';
import { clearImages } from './file-uploader.js';
import { isEscEvent } from './util.js';
import { sendData } from './api.js';

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

const body = document.querySelector('body');
const form = body.querySelector('.ad-form');
const filter = body.querySelector('.map__filters');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = body.querySelector('#room_number');
const capacity = body.querySelector('#capacity');
const adFormReset = form.querySelector('.ad-form__reset');

const successTemplate = body.querySelector('#success').content;
const newMessage = successTemplate.querySelector('.success');
const successMessage = newMessage.cloneNode(true);

const errorTemplate = body.querySelector('#error').content;
const newError = errorTemplate.querySelector('.error');
const errorMessage = newError.cloneNode(true);

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

/**
 *
 */
const resetForm = () => {
  form.reset();
  resetMap();
  filter.reset();
  clearImages();
}

/**
 *  Функция слушатель события для сбрасывания формы
 * @param {Event} evtForm
 */
const formResetHandler = (evtForm) => {
  evtForm.target.preventDefault();
  resetForm();
};

adFormReset.addEventListener('reset', formResetHandler);

/**
 * Функция показывает сообщение об успешном отправке формы при успехе, и выводит ошибку, если форма не отправлена
 * @param {function} onSuccess функция, вызываемая при успешной отправке формы
 */
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
}

/**
 * Функция показывает сообщение об успешной отправке формы
 */
const showSuccessMessage = () => {
  body.appendChild(successMessage);
  resetForm();
  document.addEventListener('keydown', successMessageEscKeydownHandler);
}

setUserFormSubmit(showSuccessMessage);

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evt} evt
 */
const successMessageEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

/**
 * Функция удаляет сообщение об успешной отправке формы
 */
const closeSuccessMessage = () => {
  body.removeChild(successMessage);
  document.removeEventListener('keydown', successMessageEscKeydownHandler);
}

successMessage.addEventListener('click', () => {
  closeSuccessMessage();
});

/**
 * Функция показывает сообщение об ошибке отправки формы
 */
const showErrorMessage = () => {
  body.appendChild(errorMessage);
  document.addEventListener('keydown', errorMessageEscKeydownHandler);
}

/**
 * Функция закрывает сообщение об ошибке по нажатию кнопки Esc
 */
const closeErrorMessage = () => {
  body.removeChild(errorMessage);
  document.removeEventListener('keydown', errorMessageEscKeydownHandler);
}

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evt} evt
 */
const errorMessageEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

errorMessage.addEventListener('click', () => {
  closeErrorMessage();
});

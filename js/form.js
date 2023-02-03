import { resetMap } from './map.js';
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

const ROOMS_LIST = {'1': 'для 1 гостя', '2': 'для 2 гостей', '3': 'для 3 гостей', '0': 'не для гостей' };

const GUESTS = {
  '0': '100',
  '1': '1',
  '2': '2',
  '3': '3',
};

const body = document.querySelector('body');
const adForm = body.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const time = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = body.querySelector('#room_number');
const capacity = body.querySelector('#capacity');
const adFormReset = adForm.querySelector('.ad-form__reset');

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

const resetRoomAmountList = () => {
  capacity.removeEventListener('change', guestChangeHandler );
  capacity.innerHTML = '';
  const room = ROOMS_LIST;
  const keys = Object.keys(room);
  keys.forEach((value, i)=>{
    const valueString = room[keys[i]];
    const option = new Option(valueString, value, false, false);

    capacity.add(option);
    capacity.addEventListener('change', guestChangeHandler )
  });
};

/**
 *  Функция сбрасывает форму на начальное состояние
 */
const resetForm = () => {
  adForm.reset();
  clearImages();
  resetMap();
  resetRoomAmountList();
}

/**
 *  Функция слушатель события для сбрасывания формы
 * @param {Event} evtForm
 */
const formResetHandler = (evtForm) => {
  evtForm.preventDefault();
  resetForm();
};

adFormReset.addEventListener('click', formResetHandler);

/**
 *  Функция слушатель события отправки формы
 * @param {event} evt
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

/**
 * Функция показывает сообщение об успешной отправке формы
 */
const showSuccessMessage = () => {
  body.appendChild(successMessage);
  resetForm();
  document.addEventListener('keydown', successMessageEscKeydownHandler);
}

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evtEsc} event
 */
const successMessageEscKeydownHandler = (evtEsc) => {
  if (isEscEvent(evtEsc)) {
    evtEsc.preventDefault();
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

/**
 * Функция слушатель события клик для закрытия сообщения об успехе отправки формы на сервер
 */
const successMessageClickHandler = () => {
  closeSuccessMessage();
}

successMessage.addEventListener('click', successMessageClickHandler);

/**
 * Функция показывает сообщение об ошибке отправки формы
 */
const showErrorMessage = () => {
  body.appendChild(errorMessage);
  document.addEventListener('keydown', errorMessageEscKeydownHandler);
  resetForm();
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
 * @param {evt} event
 */
const errorMessageEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

/**
 * Функция слушатель события клик для закрытия сообщения об ошибки отправки формы на сервер
 */
const errorMessageClickHandler = () => {
  closeErrorMessage();
}

errorMessage.addEventListener('click', errorMessageClickHandler);

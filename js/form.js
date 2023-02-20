import { resetMap } from './map.js';
import { clearImages } from './file-uploader.js';
import { sendData } from './api.js';
import { showSuccessMessage,
  showErrorMessage } from './state-messages.js';

const ROOMS = {'1': {'1': 'для 1 гостя'}, '2': {'1': 'для 1 гостя', '2': 'для 2 гостей'}, '3': {'1': 'для 1 гостя', '2': 'для 2 гостей', '3': 'для 3 гостей'}, '100': {'0': 'не для гостей'}};

const ROOMS_LIST = {'1': 'для 1 гостя', '2': 'для 2 гостей', '3': 'для 3 гостей', '0': 'не для гостей' };

const ROOMS_VALIDATION = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const CAPACITY_VALIDATION = {
  '0': [100],
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
};

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

const adForm = document.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeElement = adForm.querySelector('.ad-form__element--time');
const timeInSelect = timeElement.querySelector('#timein');
const timeOutSelect = timeElement.querySelector('#timeout');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

/**
 * Функция проверяет валидное ли значение гостей исходя из поля кол-во комнат
 * @returns {boolean}
 */
const isValidCapacity = () => {
  const currentRoomNumber = roomNumberSelect.value;
  const currentGuest = capacitySelect.value;
  return ROOMS_VALIDATION[currentRoomNumber].includes(currentGuest);
};
// console.dir(capacitySelect.options[0].hidden = true);
/**
 * Функция скрывает не валидные поля если не синхронизрованы поля кол-во комнат и кол-во гостей
 * @returns {void}
 */
const hideOptionsCapacity = () => {
  const currentRoomNumber = roomNumberSelect.value;
  [...capacitySelect.options].forEach((option) => {
    ROOMS_VALIDATION[currentRoomNumber].includes(option) ?
      option.hidden = true :
      option.hidden = false;
      console.dir(option);
  })
};
hideOptionsCapacity();
/**
 * Функция проверяет валидное ли значение комнат исходя из поля кол-во гостей
 * @returns {boolean}
 */
// const isValidRooms = () => {
//   const currentRoomNumber = roomNumberSelect.value;
//   const currentGuest = capacitySelect.value;
//   return CAPACITY_VALIDATION[currentGuest].includes(currentRoomNumber)
// };

/**
 * Функция синхронизирует по полю количество мест поле количество комнат
 * @param {evt} evt
 * @return {void}
 */
const guestChangeHandler = (evt) => {
  roomNumberSelect.value = GUESTS[(evt.target.value + '')];
}

capacitySelect.addEventListener('change', guestChangeHandler );

/** Функция создает список select с кол-ом гостей в соответствие с кол-ом комнат
 * @return {void}
 */
const selectRoomsChangeHandler = () => {
  // убираем слушатель события change c capacitySelect
  capacitySelect.removeEventListener('change', guestChangeHandler );
  // Отчищаем от опций capacitySelect - готовим пустой для наполнения.
  capacitySelect.innerHTML = '';
  // получаем значение выбранной опции пользователем из списка кол-ва комнат
  const roomCount = roomNumberSelect.options[roomNumberSelect.selectedIndex].value;
  // Выбираем нужный объект из созданной структуры с данными кол-ва гостей (вот тут момент зависимости от верстки)
  const room = ROOMS[roomCount];
  // создаем объект ключей из выбранной структуры с данными кол-ва гостей
  const keys = Object.keys(room);
  // Бежим по значениям и создаем option для каждой (вот тут момент зависимости от верстки)
  keys.forEach((value, i)=>{
    // Получаем нужный текст для заполнения option
    const valueString = room[keys[i]];
    console.log('valueString: ' + valueString);
    console.log('value: ' + value);
    // Создаем новый элемент option (valueString - текст, value - код attribute, false - defaultSelected, false - selected)
    const option = new Option(valueString, value, false, false);
    // добавляем каждую созданную опцию к элементу capacitySelect
    capacitySelect.add(option);
  });
};

roomNumberSelect.addEventListener('change', selectRoomsChangeHandler);

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

export {resetForm, hideOptionsCapacity}

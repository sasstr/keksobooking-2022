const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const type = form.querySelector('#type');
const time = form.querySelector('.ad-form__element--time');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 100000;

const ROOMS_OPTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator (
  title,
  validateTitle,
  'От 30 до 100 символов', 2, true,
);

const validatePrice = (value) => value >= MIN_PRICE[type.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () => `Цена от ${MIN_PRICE[type.value]} до ${MAX_PRICE} ₽/ночь`;

pristine.addValidator (
  price,
  validatePrice,
  getPriceErrorMessage,
);

const onTypeChange = () => {
  price.placeholder = MIN_PRICE[type.value];
  price.min = MIN_PRICE[type.value];
  pristine.validate(price);
};

type.addEventListener('change', () => {
  onTypeChange();
});

const onTimeChange = (evt) => {
  checkIn.value = evt.target.value;
  checkOut.value = evt.target.value;
};

time.addEventListener('change', (evt) => {
  onTimeChange(evt);
});

const validateRoomsGuests = () => ROOMS_OPTIONS[rooms.value].includes(guests.value);

const getRoomsGuestsErrorMessage = () => {
  switch (rooms.value) {
    case '1':
      return 'Не больше одного гостя';
    case '2':
      return 'Не больше двух гостей';
    case '3':
      return 'Не больше трёх гостей';
    case '100':
      return 'Не для гостей';
  }
};

rooms.addEventListener('change', () => {
  pristine.validate(guests);
});

pristine.addValidator (
  guests,
  validateRoomsGuests,
  getRoomsGuestsErrorMessage,
);

const getMinPrice = () => MIN_PRICE;
const getMaxPrice = () => MAX_PRICE;
const getPristinConfig = () => pristine;

export {getPristinConfig, price, type, getMinPrice, getMaxPrice};

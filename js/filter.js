const OPTION_ANY = 'any';
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
const PriceLevel = {
  CHEAP: 10000,
  EXPENSIVE: 50000,
};
const Levels = {
  'low': (ad)=> { return PriceLevel.CHEAP > ad.offer.price;},
  'middle': (ad)=> { return PriceLevel.CHEAP <= ad.offer.price && ad.offer.price < PriceLevel.EXPENSIVE;},
  'high': (ad)=> { return PriceLevel.EXPENSIVE <= ad.offer.price;},
};

/**
 * Функция проверяет какой интервал цен выбран в housingFeatures.
 * @param {object} ad объект с данными одного объявления.
 * @returns {boolean}
 */
const comparePrice = (ad) => housingPrice.value !== 'any' ? Levels[housingPrice.value](ad) : true;

/**
 * Функция проверяет какая option выбрана в select housingType.
 * @param {object} ad объект с данными одного объявления.
 * @returns {boolean}
 */
const compareType = (ad) => (housingType.value === OPTION_ANY) || housingType.value === ad.offer.type;

/**
 * Функция проверяет какая option выбрана в select housingRooms.
 * @param {object} ad объект с данными одного объявления.
 * @returns {boolean}
 */
const compareRooms = (ad) => (housingRooms.value === OPTION_ANY) || parseInt(housingRooms.value, 10) === ad.offer.rooms;

/**
 * Функция проверяет какая option выбрана в select housingGuests.
 * @param {object} ad объект с данными одного объявления.
 * @returns {boolean}
 */
const compareGuests = (ad) => (housingGuests.value === OPTION_ANY) || parseInt(housingGuests.value, 10) === ad.offer.guests;

/**
 * Функция проверяет какие checkbox-ы чекнуты в housingPrice.
 * @param {object} ad
 * @returns {boolean}
 */
const compareFeatures = (ad) => {
  const featureValues = [...housingFeatures.querySelectorAll('.map__checkbox:checked')].map((element) => element.value);

  return ad.offer.features ? featureValues.every((feature) => ad.offer.features.includes(feature)) : featureValues.length === 0;
};

/**
 * Фильтрует объявления согласно выбранным фильтрам
 * @param {array} data объект с объявлениями
 * @returns {boolean}
 */
const filterData = (data) => data.filter((ad) => compareType(ad)
  && comparePrice(ad)
  && compareRooms(ad)
  && compareGuests(ad)
  && compareFeatures(ad),
);

export {filterData};

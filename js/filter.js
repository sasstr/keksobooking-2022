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

const PriceTypes = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

/**
 * Функция проверяет какой интервал цен выбран в housingFeatures.
 * @param {object} ad объект с данными одного объявления.
 * @returns {boolean}
 */
const comparePrice = (ad) => {
  if(housingPrice.value === PriceTypes.LOW){
    return PriceLevel.CHEAP > ad.offer.price
  }
  if(housingPrice.value === PriceTypes.MIDDLE) {
    return PriceLevel.CHEAP <= ad.offer.price && ad.offer.price < PriceLevel.EXPENSIVE
  }
  if(housingPrice.value === PriceTypes.HIGH) {
    return PriceLevel.EXPENSIVE <= ad.offer.price
  }
  return true;
}

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
 * Фильтрует объявления согласно выбранным фильтрам
 * @param {array} data объект с объявлениями
 * @returns {boolean}
*/
const filterData = (data) => {
  const checkedFeature = [...housingFeatures.querySelectorAll('.map__checkbox:checked')];
  /**
 * Функция проверяет какие checkbox-ы чекнуты в housingPrice.
 * @param {object} ad
 * @returns {boolean}
 */
  const compareFeatures = (ad) => {
    return ad.offer.features ?
      checkedFeature.every((feature) => ad.offer.features.includes(feature.value)) :
      false;
  };

  return data.filter( (ad) => {
    return compareType(ad)
    && comparePrice(ad)
    && compareRooms(ad)
    && compareGuests(ad)
    && compareFeatures(ad);
    }
  );
}
export {filterData};

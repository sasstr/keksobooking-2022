import {
  getRandomInt,
  getRandomFloat,
  shuffle,
  getRendomItemOfArray,
  getRandomLengthArray
} from './util.js';

const NUMBER_OF_ADS = 10;
const TIMES_OF_REGISTRATION = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const TYPES_OF_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
const  OFFER_TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
const AD_DESCRIPTIONS = ['Отель для ценителей истории. Почуствуй себя героем из прошлого.',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Комната прям рядом с рестораном, который обязательно стоит посетить!'];
const Coordinate = {
  MIN_X: 35.65,
  MIN_Y: 139.7,
  MAX_X: 35.7,
  MAX_Y: 139.8,
};
const NUMBER_OF_ZEROS = 5;
const Price = {
  MIN: 1000,
  MAX: 1000000,
};
const RoomAmount = {
  MIN: 1,
  MAX: 5,
};
const Guest = {
  MIN: 1,
  MAX: 5,
};

/**
 * Функция создает объект с данными одного случайного объявления
 * @param {number} index номер объявления
 * @returns {object} объект с данными одного случайного объявления
 */
const createAd = (index) => {
  const location = {
    'x': getRandomFloat(Coordinate.MIN_X, Coordinate.MAX_X, NUMBER_OF_ZEROS),
    'y': getRandomFloat(Coordinate.MIN_Y, Coordinate.MAX_Y, NUMBER_OF_ZEROS),
  };

  return {
    'author': {
      'avatar': `img/avatars/user${(index + '').padStart(2, '0')}.png`,
    },
    'offer': {
      'title': getRendomItemOfArray(OFFER_TITLES),
      'address': `${location.x}, ${location.y}`,
      'price': getRandomInt(Price.MIN, Price.MAX),
      'type': getRendomItemOfArray(TYPES_OF_RESIDENCE),
      'rooms': getRandomInt(RoomAmount.MIN, RoomAmount.MAX),
      'guests': getRandomInt(Guest.MIN, Guest.MAX),
      'checkin': getRendomItemOfArray(TIMES_OF_REGISTRATION),
      'checkout': getRendomItemOfArray(TIMES_OF_REGISTRATION),
      'features': getRandomLengthArray(shuffle(OFFER_FEATURES)),
      'description': getRendomItemOfArray(AD_DESCRIPTIONS),
      'photos': getRandomLengthArray(OFFER_PHOTOS),
    },
    'location': {
      'x': location.x,
      'y': location.y,
    },
  };
};

/**
 * Функция создает массив объявлений, каждое объявление это объект
 * @param {numder} numderOfAds количество объявлений которое надо создать
 * @returns {array} массив объявлений
 */
const createAds = (numderOfAds = NUMBER_OF_ADS) =>
  Array.from({length: numderOfAds}, (_, index) => createAd(index + 1));

export {createAds}

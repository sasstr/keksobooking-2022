'use strict'
// ------------------------------------- util.js
/**
 * Функция получает два числа min и max и возвращает случайное целое число в указанном диапазоне.
 * @param {number} min начальное значение диапазона (большее нуля).
 * @param {number} max конечное значение диапазона (большее нуля).
 * @returns {number|Nan} случайное число целое в указанном диопазоне включая переданные значения или Nan в случае ошибки.
 */
const getRandomInt = (min, max) => {
  if (min < 0 || max < 0 || min > max || min === max) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min +1)) + min;
};

/**
 * Функция получает кол-во знаков после запятой, два числа min и max и возвращает случайное число в указанном диапазоне с указанным кол-вом знаков после запятой.
 * @param {number} min начальное значение диапазона (большее нуля).
 * @param {number} max  конечное значение диапазона (большее нуля и больше min).
 * @param {number} numberSimbolsAfterComma число знаков после запятой от 0 до 20.
 * @returns {number|Nan} случайное число в указанном диопазоне включая переданные значения с указанным кол-вом знаков после запятой или Nan в случае ошибки.
 */
const getRandomFloat = (min, max, numberSimbolsAfterComma = 5) => {
  if (min < 0 || max < 0 || min > max || min === max || numberSimbolsAfterComma < 0 || numberSimbolsAfterComma > 20) {
    return NaN;
  }

  return +((Math.random() * (max - min)) + min).toFixed(Math.trunc(numberSimbolsAfterComma));
};

/**
 * Функция перемешивает элементы массива
 * @param {array} array
 * @returns {array} Возвращает новый массив с перемешанными элементами массива
 */
  const shuffle = (array) => {
  const cloneArray = array.slice();
  let j;
  let temp;
  for (let i = 0; i < cloneArray.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = cloneArray[j];
    cloneArray[j] = cloneArray[i];
    cloneArray[i] = temp;
  }
  return cloneArray;
};

/**
 * Функция возращает случайный элемент массива
 * @param {array} Массив
 * @returns {*} случайный элемент массива
 */
const getRendomItemOfArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

//  Функция возращает случайной длины массив от исходного массива
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandomInt(1, array.length));
};

//------------------------------------------------------------------- data.js
// 3 module
const NUMBER_OF_ADS = 10;
const TIMES_OF_REGISTRATION = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TYPES_OF_RESIDENCE = {'palace': 'Дворец',
                            'flat': 'Квартира',
                            'house': 'Дом',
                            'bungalo': 'Бунгало'};
const TYPES_OF_RESIDENCE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
const  OFFER_TITLES = ['Большая уютная квартира',
                        'Маленькая неуютная квартира',
                        'Огромный прекрасный дворец', 'Маленький ужасный дворец',
                        'Красивый гостевой домик',
                        'Некрасивый негостеприимный домик',
                        'Уютное бунгало далеко от моря',
                        'Неуютное бунгало по колено в воде'];
const descriptionAd = ['Отель для ценителей истории. Почуствуй себя героем из прошлого.',
                        'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
                        'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
                        'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
                        'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
                        'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
                        'Комната прям рядом с рестораном, который обязательно стоит посетить!'];
const COORDINATE = {
  MIN_X: 35.65,
  MIN_Y: 139.7,
  MAX_X: 35.7,
  MAX_Y: 139.8,
};
const NUMBER_OF_ZEROS = 5;
const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;
const MAX_ROOMS = 5;
const MIN_ROOMS = 1;
const MAX_GUESTS = 5;
const MIN_GUESTS = 1;

/**
 * Функция создает объект с данными одного случайного объявления
 * @param {number} index номер объявления
 * @returns {object} объект с данными одного случайного объявления
 */
const createAd = (index) => {
  index = index ?? 0;

  const location = {
    'x': getRandomFloat(COORDINATE.MIN_X, COORDINATE.MAX_X, NUMBER_OF_ZEROS),
    'y': getRandomFloat(COORDINATE.MIN_Y, COORDINATE.MAX_Y, NUMBER_OF_ZEROS),
  }

  return {
    'author': {
      'avatar': `img/avatars/user${(index + '').padStart(2, "0")}.png`,
    },
    'offer': {
      'title': getRendomItemOfArray(OFFER_TITLES),
      'address': `${location.x}, ${location.y}`,
      'price': getRandomInt(MIN_PRICE, MAX_PRICE),
      'type': getRendomItemOfArray(TYPES_OF_RESIDENCE_ARRAY),
      'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
      'checkin': getRendomItemOfArray(TIMES_OF_REGISTRATION),
      'checkout': getRendomItemOfArray(TIMES_OF_REGISTRATION),
      'features': getRandomLengthArray(shuffle(OFFER_FEATURES)),
      'description': getRendomItemOfArray(descriptionAd),
      'photos': getRandomLengthArray(OFFER_PHOTOS),
    },
    'location': {
      'x': location.x,
      'y': location.y,
    },
  }
};

/**
 * Функция создает массив объявлений, каждое объявление это объект
 * @param {numder} numderOfAds количество объявлений которое надо создать
 * @returns {array} массив объявлений
 */
const createArrayOfAds = (numderOfAds = NUMBER_OF_ADS) =>
  Array.from({length: numderOfAds}, (_, index) => createAd(index + 1));

  let ads = createArrayOfAds();
  console.log(ads);

  /* const ArrayOfAds = [];
    for (let i = 1; i < numderOfAds + 1; i++) {
    ArrayOfAds.push(createAd(i));
  }
  return ArrayOfAds; */
//---------------------------------------------------------------------------- 5 module-1
//  card.js
//
const RUBLE_CURRENCY = '\u20BD';
const ROOM_WORDS = ['комнат', 'комната', 'комнаты'];
const GUEST_WORDS = ['гостей', 'гостя', 'гостей'];

/**
 * Функция вставляет верное написание слова из массива
 * @param {number} items порядковый номер
 * @param {array} words массив с вариантами слов
 * @returns {string} верное написание слова из массива
 */
const getCorrectWord = (items, words) => {
  if (items % 100 > 4 && items % 100 < 21) {
    return words[0];
  } else if (items % 10 === 1) {
    return words[1];
  } else if (items % 10 > 1 && items % 10 < 5) {
    return words[2];
  }
  return words[0];
};

/**
 * Функция создает массив с HTML элементами features готовыми для вставки в разметку
 * @param {array} features массив с features
 * @returns {HTMLElement} HTML элемент с features
 */
const createFeaturesList = (features) => {
  const popupFeatures = document.createElement('ul');
  popupFeatures.classList.add('popup__features');

  features.forEach((feature) =>{
    const popupFeature = document.createElement('li');
    const classFeature = 'popup__feature--' + feature;
    popupFeature.classList.add('popup__feature');
    popupFeatures.appendChild(popupFeature).classList.add(classFeature);
  })
  return popupFeatures;
};

/**
 * Функция создает HTML элемент с photos готовыми для вставки в разметку.
 * @param {array} ad массив с адресами фото
 * @returns {HTMLElement} HTML элемент с photos
 */
const createPopupPhotos = (ad) => {
  const popupPhotoDiv = document.createElement('div');
  popupPhotoDiv.classList.add('popup__photos');

  ad.offer.photos.forEach((photo)=>{
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.width = 45;
    popupPhoto.height = 40;
    popupPhoto.alt = 'Фотография жилья';
    popupPhoto.src = photo;
    popupPhotoDiv.appendChild(popupPhoto);
  });

  return popupPhotoDiv;
};

/**
 * Функция создает HTML элемент с попапом карточки объявления
 * @param {object} ad данные объявления
 * @returns {HTMLElement} HTML элемент с попапом карточки объявления
 */
const createAdPopup = (ad) => {
  //removeCard(); ???? надо ли удалить предыдущие?
    const cardTemplate = document.querySelector('#card');
    const card = cardTemplate.content.querySelector('.popup').cloneNode(true);

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = (`${ad.offer.price} ${RUBLE_CURRENCY}/ночь`.trim());
    card.querySelector('.popup__type').textContent = TYPES_OF_RESIDENCE[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = (`${ad.offer.rooms} ${getCorrectWord(ad.offer.rooms, ROOM_WORDS)} для ${ad.offer.guests} ${getCorrectWord(ad.offer.guests, GUEST_WORDS)}`.trim());
    card.querySelector('.popup__text--time').textContent = (`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`.trim());
    card.replaceChild(createFeaturesList(ad.offer.features), card.querySelector('.popup__features'));
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.replaceChild(createPopupPhotos(ad), card.querySelector('.popup__photos'));
    card.childNodes.forEach((item, i) => {
      if ((item.textContent === '' && item.childNodes.length === 0 && item.src === undefined) || item.src === '') {
        card.childNodes[i].classList.add('hidden');
      }
    });
    return card;
};

const showCard = (ad) => document.querySelector('#map-canvas').appendChild(createAdPopup(ad));

//ads.forEach(showCard);
showCard(ads[0]);
//-------------------------------------------------------- 5 module-2
// form.js




/*
Заведите модуль, который будет отвечать за работу с формой.

Опишите в нём код, который реализует логику обработки пользовательского ввода для полей:

«Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»;
«Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого.
Подключите модуль в проект.

«Тип жилья»
Обязательное поле;
Числовое поле;
Максимальное значение — 1 000 000.

Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
«Бунгало» — минимальная цена за ночь 0;
«Квартира» — минимальная цена за ночь 1 000;
«Отель» — минимальная цена за ночь 3 000;
«Дом» — минимальная цена 5 000;
«Дворец» — минимальная цена 10 000.

Обратите внимание: вместе с минимальным значением цены нужно изменять и плейсхолдер.
Обратите внимание: ограничение минимальной цены заключается именно в изменении минимального значения, которое можно ввести в поле с ценой, изменять само значение поля не нужно, это приведёт к плохому UX (опыту взаимодействия). Даже если текущее значение не попадает под новые ограничения, не стоит без ведома пользователя изменять значение поля.

Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля во втором выделяется соответствующее ему значение. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
*/

/*
Заведите модуль, который будет отвечать за генерацию разметки похожих элементов.

На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

Выведите заголовок объявления offer.title в заголовок .popup__title.
Выведите адрес offer.address в блок .popup__text--address.
Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
Квартира для flat
Бунгало для bungalow
Дом для house
Дворец для palace
Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
В список .popup__features выведите все доступные удобства в объявлении.
В блок .popup__description выведите описание объекта недвижимости offer.description.
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.

Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.

Подключите модуль в проект.
*/

//--------------------------------------------------- 3 module
/* Следующая домашка:
В файле main.js на основе написанных в прошлом задании утилитарных функций напишите необходимые функции для создания массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.

Структура каждого объекта должна быть следующей:

author, объект — описывает автора. Содержит одно поле:

avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.


offer, объект — содержит информацию об объявлении. Состоит из полей:

title, строка — заголовок предложения. Придумайте самостоятельно.

address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.

price, число — стоимость. Случайное целое положительное число.

type, строка — одно из четырёх фиксированных значений: palace, flat, house или bungalow.

rooms, число — количество комнат. Случайное целое положительное число.

guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.

checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.

description, строка — описание помещения. Придумайте самостоятельно.

photos, массив строк — массив случайной длины из значений: http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg.



location, объект — местоположение в виде географических координат. Состоит из двух полей:

x, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000

y, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000

*/

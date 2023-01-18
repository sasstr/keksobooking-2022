
const RUBLE_CURRENCY = '\u20BD';
const ROOM_WORDS = ['комнат', 'комната', 'комнаты'];
const GUEST_WORDS = ['гостей', 'гостя', 'гостей'];
const TYPES_OF_RESIDENCE = {'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};

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
  const cardTemplate = document.querySelector('#card');
  const card = cardTemplate.content.querySelector('.popup').cloneNode(true);

  card.querySelector('.popup__avatar').src = ad.author.avatar;
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = (`${ad.offer.price} ${RUBLE_CURRENCY}/ночь`.trim());
  card.querySelector('.popup__type').textContent = TYPES_OF_RESIDENCE[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = (`${ad.offer.rooms} ${getCorrectWord(ad.offer.rooms, ROOM_WORDS)} для ${ad.offer.guests} ${getCorrectWord(ad.offer.guests, GUEST_WORDS)}`.trim());
  card.querySelector('.popup__text--time').textContent = (`Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`.trim());
  ad.offer.features ? card.replaceChild(createFeaturesList(ad.offer.features), card.querySelector('.popup__features')) :
    card.querySelector('.popup__features').remove();
  card.querySelector('.popup__description').textContent = ad.offer.description;
  ad.offer.photos ? card.replaceChild((createPopupPhotos(ad)), card.querySelector('.popup__photos')) :
    card.querySelector('.popup__photos').remove();
  card.childNodes.forEach((item, i) => {
    if ((item.textContent === '' && item.childNodes.length === 0 && item.src === undefined) || item.src === '') {
      card.childNodes[i].classList.add('hidden');
    }
  });
  return card;
};

/**
 * Функция добавляет в разметку одно объявление
 * @param {object} ad данные объявления
 * @returns {void} добавляет в разметку одно объявление
 */
const showCard = (ad) => document.querySelector('#map-canvas').appendChild(createAdPopup(ad));

export {showCard, createAdPopup}

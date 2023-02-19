import {addErrorMessage, createErrorMessageElement} from './state-messages.js';

const Urls = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data/',
  POST: 'https://23.javascript.pages.academy/keksobooking/',
}

/**
 *  Функция получения данных с сервера
 * @param {Function} onSuccess функция колбэк в случае удачного получения данных
 * @returns {Array} данные с объявлениями
 */
const getData = (onSuccess) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => addErrorMessage(createErrorMessageElement('Данные не загрузились, попробуйте обновить страницу')));
};

/**
 *
 * @param {Function} onSuccess функция колбэк в случае удачной отправки объявления на сервер
 * @param {Function} onFail
 * @param {HTMLElement} body
 * @returns {void}
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(
    Urls.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData,sendData};

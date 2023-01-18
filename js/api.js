import {showErrorMessage} from './state-messages.js';

const Urls = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data/',
  POST: 'https://23.javascript.pages.academy/keksobooking/',
}

const getData = (onSuccess) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => showErrorMessage('Данные не загрузились, попробуйте обновить страницу'));
};

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

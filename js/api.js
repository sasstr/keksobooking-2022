
const URL_DATA = 'https://27.javascript.pages.academy/kekstagram/data';

const showError = () => {};

const getData = (onSuccess) => {
  fetch(URL_DATA)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => showError('Данные не загрузились, попробуйте обновить страницу'));
};

export {getData};

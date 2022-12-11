const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

/**
 * Функция устанавливает начальное состояение страницы приложения
 * @returns {void} сбрасывает форму в начальное сосотяние и блокирует к ней доступ
 */
const setInitialPageState = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.reset();
  [...adForm].forEach((element)=> {
    element.disabled = true;
  });

  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersForm.reset();
  [...mapFiltersForm].forEach((filter)=> {
    filter.disabled = true;
  });
};


/** Функция переводит страницу приложения в активное состояние
 * @returns {void}
 */
const setActivePageState = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.reset();
  [...adForm].forEach((element)=> {
    element.disabled = false;
  });

  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersForm.reset();
  [...mapFiltersForm].forEach((filter)=> {
    filter.disabled = false;
  });
};

export {setInitialPageState, setActivePageState}

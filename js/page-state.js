const adtForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

/**
 * Функция устанавливает неактивное состояние страницы приложения
 * @returns {void} сбрасывает форму в начальное состояние и блокирует к ней доступ
 */
const setInitialPageState = () => {
  adtForm.classList.add('ad-form--disabled');
  adtForm.reset();
  [...adtForm].forEach((element)=> {
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
  adtForm.classList.remove('ad-form--disabled');
  adtForm.reset();
  [...adtForm].forEach((element)=> {
    element.disabled = false;
  });

  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersForm.reset();
  [...mapFiltersForm].forEach((filter)=> {
    filter.disabled = false;
  });
};

export {setInitialPageState, setActivePageState}

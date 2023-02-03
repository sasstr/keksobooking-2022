/**
 * Функция проверяет нажатие клавиши Esc
 * @param {evt} evt
 * @returns {boolean}
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

/**
 * Функция задержки отработки интерфейса на определенное время
 * @param {function} callback функция, которая отработает после задержки
 * @param {number} timeoutDelay время задержки
 * @returns {function}
 */
const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { debounce, isEscEvent };

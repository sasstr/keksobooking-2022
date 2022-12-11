
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

/**
 * Функция возращает случайной длины массив от исходного массива
 * @param {array} array
 * @returns {array} возращает случайной длины массив от исходного массива
 */
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandomInt(1, array.length));
};

export {
  getRandomInt,
  getRandomFloat,
  shuffle,
  getRendomItemOfArray,
  getRandomLengthArray,
};

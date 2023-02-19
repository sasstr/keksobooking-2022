import { isEscEvent } from './util.js';
import { resetForm } from './form.js';

const body = document.querySelector('body');
const successTemplate = body.querySelector('#success').content;
const newMessage = successTemplate.querySelector('.success');
const successMessage = newMessage.cloneNode(true);

const errorTemplate = body.querySelector('#error').content;
const newError = errorTemplate.querySelector('.error');
const errorMessage = newError.cloneNode(true);


/**
 * Функция создает сообщение об ошибки
 * @param {string} errorMessage
 * @returns {HTMLElement}
 */
const createErrorMessageElement = (errorMessage) => {
  const messageElement = document.createElement('div');

  messageElement.style.zIndex = 1000;
  messageElement.style.position = 'absolute';
  messageElement.style.top = '252px';
  messageElement.style.right = '50%';
  messageElement.style.transform = 'translateX(50%)';
  messageElement.style.width = '700px';
  messageElement.style.padding = '18px';
  messageElement.style.textAlign = 'center';
  messageElement.style.fontSize = '18px';
  messageElement.style.color = '#ffffff';
  messageElement.style.textTransform = 'uppercase';
  messageElement.style.borderRadius = '8px';
  messageElement.style.backgroundColor = '#ff5533';

  messageElement.textContent = errorMessage;

  return messageElement;
}

/**
 * Функция добавляет его в дом
 * @param {string} errorMessage
 * @returns {void}
 */
const addErrorMessage = (messageElement) => {
  body.append(messageElement);
};

/**
 * Функция показывает сообщение об успешной отправке формы
 * @returns {void}
 */
const showSuccessMessage = () => {
  body.appendChild(successMessage);
  resetForm();
  document.addEventListener('keydown', successMessageEscKeydownHandler);
}

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evtEsc} event
 * @returns {void}
 */
const successMessageEscKeydownHandler = (evtEsc) => {
  if (isEscEvent(evtEsc)) {
    evtEsc.preventDefault();
    closeSuccessMessage();
  }
};

/**
 * Функция удаляет сообщение об успешной отправке формы
 * @returns {void}
 */
const closeSuccessMessage = () => {
  body.removeChild(successMessage);
  document.removeEventListener('keydown', successMessageEscKeydownHandler);
}

/**
 * Функция слушатель события клик для закрытия сообщения об успехе отправки формы на сервер
 * @returns {void}
 */
const successMessageClickHandler = () => {
  closeSuccessMessage();
}

successMessage.addEventListener('click', successMessageClickHandler);

/**
 * Функция показывает сообщение об ошибке отправки формы
 * @returns {void}
 */
const showErrorMessage = () => {
  body.appendChild(errorMessage);
  document.addEventListener('keydown', errorMessageEscKeydownHandler);
}

/**
 * Функция закрывает сообщение об ошибке по нажатию кнопки Esc
 * @returns {void}
 */
const closeErrorMessage = () => {
  body.removeChild(errorMessage);
  document.removeEventListener('keydown', errorMessageEscKeydownHandler);
}

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evt} event
 * @returns {void}
 */
const errorMessageEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

/**
 * Функция слушатель события клик для закрытия сообщения об ошибки отправки формы на сервер
 * @returns {void}
 */
const errorMessageClickHandler = () => {
  closeErrorMessage();
}

errorMessage.addEventListener('click', errorMessageClickHandler);

export {addErrorMessage,
  createErrorMessageElement,
  showSuccessMessage,
  showErrorMessage
}

const body = document.querySelector('body');
import {isEscEvent} from '../util.js';

const ErrorMessages = {
  notTemplate: 'Такого шаблона не существует',
}

let modalRequest = null;
let close = null;

function closeWindowRequestClickHandler() {
  closeWindowRequest();
}

function closeWindowRequestKeyDownHandler(evt) {
  if (isEscEvent(evt)) {
    closeWindowRequest();
  }
}

function closeWindowRequest() {
  modalRequest.remove();

  window.removeEventListener('click', closeWindowRequestClickHandler);
  document.removeEventListener('keydown', closeWindowRequestKeyDownHandler);
}

function drawWindowRequest(templateName) {
  const template = body.querySelector(`#${templateName}`);

  if (!template) {
    throw Error(ErrorMessages.notTemplate);
  }

  const content = template.content;
  let blockMessage = content.querySelector(`.${templateName}`);

  let windowElement = blockMessage.cloneNode(true);
  windowElement.style.zIndex = '5';

  body.querySelector('main').appendChild(windowElement);

  return windowElement;
}

function showWindowRequest(templateName) {
  modalRequest = drawWindowRequest(templateName);
  close = modalRequest.querySelector(`.${templateName}__button`);

  close.addEventListener('click', closeWindowRequestClickHandler);
  window.addEventListener('click', closeWindowRequestClickHandler);
  document.addEventListener('keydown', closeWindowRequestKeyDownHandler);

}

export {showWindowRequest};


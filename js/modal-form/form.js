import {saveData, createError} from '../ajax.js';
import {actionModal} from '../modal.js';
import {validateTagsHandler, validateCommentHandler, setStyleFieldInvalid} from './form-validate.js';
import {clearEffect, hideSlider, switchFirstButton} from './slider.js';
import {setDataZoom} from './scale-photo.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const fileForm = form.querySelector('#upload-file');
const overlayForm = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');

function hideWindowRequest(template) {
  return function () {
    template.remove();
  }
}

function showWindowRequest(templateName) {
  let template = body.querySelector(`#${templateName}`).content;
  if (!template) {
    throw Error('Такого шаблона не существует');
  } else {
    let blockMessage = template.querySelector(`.${templateName}`);

    let windowElement = blockMessage.cloneNode(true)
    windowElement.setAttribute('style', 'z-index: 5');
    let close = windowElement.querySelector(`.${templateName}__button`);
    body.querySelector('main').appendChild(windowElement);

    actionModal('close', ['click', 'keydown', 'window'], close, hideWindowRequest(windowElement));
  }
}

function openForm() {
  overlayForm.classList.remove('hidden');
  body.classList.add('modal-open');

  validateTagsHandler();
  validateCommentHandler();

  form.addEventListener('submit', submitForm);

  actionModal('close', ['click', 'keydown'], close, closeForm);
}

function closeForm() {
  clearEffect();
  setDataZoom();
  hideSlider();
  switchFirstButton();

  validateTagsHandler('remove');
  validateCommentHandler('remove');

  form.removeEventListener('submit', submitForm);

  form.reset();
  overlayForm.classList.add('hidden');
  body.classList.remove('modal-open');

}

function submitForm(evt) {
  evt.preventDefault();

  //Вот это нифига не работает
  setStyleFieldInvalid();

  saveData(
    new FormData(evt.target),
    () => {
      closeForm();
      try {
        showWindowRequest('success');
      } catch (err) {
        createError(err.message);
      }
    },
    () => {
      closeForm();
      try {
        showWindowRequest('error');
      } catch (err) {
        createError(err.message);
      }
    },
  );
}

actionModal('open', ['change', 'keydown'], fileForm, openForm);





import {saveData, createError} from '../ajax.js';
import {actionModal} from '../modal.js';
import {validateTagsHandler, validateCommentHandler, setStyleFieldInvalid} from './form-validate.js';
import {clearEffect, hideSlider, switchFirstButton} from './slider.js';
import {setDataZoom} from './scale-photo.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const fileForm = form.querySelector('#upload-file');
const overlayForm = form.querySelector('.img-upload__overlay');
const image = overlayForm.querySelector('img');
const close = form.querySelector('#upload-cancel');
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

function uploadPhoto() {
  const file = fileForm.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (!matches) {
    throw Error(`Допустимый формат изображений ${FILE_TYPES.join(', ')} `);
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    togglePhoto(reader.result);
  });

  reader.readAsDataURL(file);

}

function togglePhoto(result, action = 'add') {
  const previewEffects = form.querySelectorAll('.effects__preview');

  if (action === 'delete') {
    image.setAttribute('src', DEFAULT_IMAGE);
  } else {
    image.setAttribute('src', result);
  }

  previewEffects.forEach((element) => {
    if (action === 'delete') {
      element.removeAttribute('style');
    } else {
      element.setAttribute('style', `background-image: url(${result})`);
    }
  });
}

function openForm() {
  overlayForm.classList.remove('hidden');
  body.classList.add('modal-open');

  try {
    uploadPhoto();
  } catch (err) {
    createError(err.message);
    closeForm();
  }

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

  togglePhoto(null, 'delete');

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





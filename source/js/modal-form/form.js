import {saveData, createError} from '../ajax.js';
import {actionModal} from '../modal.js';
import {validateTags, validateComment, buttonClickHandler} from './form-validate.js';
import {clearEffect, hideSlider, switchFirstButton} from './slider.js';
import {setDataZoom} from './scale-photo.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const ErrorMessages = {
  notTemplate: 'Такого шаблона не существует',
  imageFormat: `Допустимый формат изображений ${FILE_TYPES.join(', ')}`,
};

const ACTION_ADD = 'add';
const ACTION_DELETE = 'delete';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const fileForm = form.querySelector('#upload-file');
const overlayForm = form.querySelector('.img-upload__overlay');
const image = overlayForm.querySelector('img');
const close = form.querySelector('#upload-cancel');
const button = form.querySelector('#upload-submit');
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

function hideWindowRequest(template) {
  return function () {
    template.remove();
  }
}

function showWindowRequest(templateName) {
  const template = body.querySelector(`#${templateName}`);

  if (!template) {
    throw Error(ErrorMessages.notTemplate);
  }

  const content = template.content;
  let blockMessage = content.querySelector(`.${templateName}`);

  let windowElement = blockMessage.cloneNode(true);
  windowElement.style.zIndex = '5';
  let close = windowElement.querySelector(`.${templateName}__button`);
  body.querySelector('main').appendChild(windowElement);

  actionModal('close', ['click', 'keydown', 'window'], close, hideWindowRequest(windowElement));

}

function uploadPhoto() {
  const file = fileForm.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (!matches) {
    throw Error(ErrorMessages.imageFormat);
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    togglePhoto(reader.result);
  });

  reader.readAsDataURL(file);

}

function togglePhoto(result, action = ACTION_ADD) {
  const previewEffects = form.querySelectorAll('.effects__preview');

  if (action === ACTION_DELETE) {
    image.src = DEFAULT_IMAGE;
  } else {
    image.src = result;
  }

  previewEffects.forEach((element) => {
    if (action === ACTION_DELETE) {
      element.removeAttribute('style');
    } else {
      element.style.backgroundImage = `url(${result})`;
    }
  });
}

function openForm() {
  overlayForm.classList.remove('hidden');
  body.classList.add('modal-open');

  try {
    uploadPhoto();

    validateTags();
    validateComment();

    button.addEventListener('click', buttonClickHandler);
    form.addEventListener('submit', formSumbitHandler);

    actionModal('close', ['click', 'keydown'], close, closeForm);

  } catch (err) {
    createError(err.message);
    closeForm();
  }

}

function closeForm() {
  clearEffect();
  setDataZoom();
  hideSlider();
  switchFirstButton();

  togglePhoto(null, ACTION_DELETE);

  validateTags(ACTION_DELETE);
  validateComment(ACTION_DELETE);

  form.removeEventListener('submit', formSumbitHandler);

  form.reset();
  overlayForm.classList.add('hidden');
  body.classList.remove('modal-open');

}

function formSumbitHandler(evt) {
  evt.preventDefault();

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





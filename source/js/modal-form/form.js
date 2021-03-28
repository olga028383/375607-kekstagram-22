import {saveData, createError} from '../ajax.js';
import {isEscEvent, setStyleOpenModal, setStyleCloseModal} from '../util.js';
import {validateTags, validateComment, buttonClickHandler, addHandlerFieldsInFocus} from './form-validate.js';
import {clearEffect, hideSlider, switchFirstButton} from './slider.js';
import {setDataZoom} from './scale-photo.js';
import {showWindowRequest} from './window-request.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const ErrorMessages = {
  imageFormat: `Допустимый формат изображений ${FILE_TYPES.join(', ')}`,
};

const ACTION_ADD = 'add';
const ACTION_DELETE = 'delete';

const form = document.querySelector('.img-upload__form');
const fileFieldForm = form.querySelector('#upload-file');
const overlayForm = form.querySelector('.img-upload__overlay');
const imageForm = overlayForm.querySelector('img');
const closeButtonForm = form.querySelector('#upload-cancel');
const buttonForm = form.querySelector('#upload-submit');
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

function uploadPhoto() {
  const file = fileFieldForm.files[0];

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
    imageForm.src = DEFAULT_IMAGE;
  } else {
    imageForm.src = result;
  }

  previewEffects.forEach((element) => {
    if (action === ACTION_DELETE) {
      element.style = '';
    } else {
      element.style.backgroundImage = `url(${result})`;
    }
  });
}

function closeButtonEscKeydownHandler(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function openForm() {

  try {
    uploadPhoto();

    setStyleOpenModal(overlayForm);

    setDataZoom();
    validateTags();
    validateComment();

    buttonForm.addEventListener('click', buttonClickHandler);
    form.addEventListener('submit', formSumbitHandler);

    closeButtonForm.addEventListener('click', () => {
      closeForm();
    });

    document.addEventListener('keydown', closeButtonEscKeydownHandler);
    addHandlerFieldsInFocus(closeButtonEscKeydownHandler);

  } catch (err) {
    createError(err.message);
  }

}

function closeForm() {
  clearEffect();
  hideSlider();
  switchFirstButton();

  togglePhoto(null, ACTION_DELETE);

  validateTags(ACTION_DELETE);
  validateComment(ACTION_DELETE);

  form.reset();
  setStyleCloseModal(overlayForm);

  document.removeEventListener('keydown', closeButtonEscKeydownHandler);
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

fileFieldForm.addEventListener('change', () => {
  openForm();
});






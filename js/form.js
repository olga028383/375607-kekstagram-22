import {closeModalHandler, openModalHandler} from './modal.js';
import {clearEffect, hideSlider, switchFirstButton} from './slider.js';
import {setDataZoom} from './scale_photo.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const fileForm = form.querySelector('#upload-file');
const overlayForm = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');

function openForm() {
  overlayForm.classList.remove('hidden');
  body.classList.remove('modal-open');

  closeModalHandler(close, closeForm);
}

function closeForm() {
  clearEffect();
  setDataZoom();
  hideSlider();
  switchFirstButton();

  overlayForm.classList.add('hidden');
  body.classList.add('modal-open');
  form.reset();
}

openModalHandler(fileForm, 'change', openForm);





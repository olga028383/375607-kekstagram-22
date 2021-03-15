import {actionModal} from '../modal.js';
import {validateTagsHandler, validateCommentHandler} from './form-validate.js';
import {clearEffect, hideSlider, switchFirstButton} from './slider.js';
import {setDataZoom} from './scale-photo.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const fileForm = form.querySelector('#upload-file');
const overlayForm = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');

function openForm() {
  overlayForm.classList.remove('hidden');
  body.classList.add('modal-open');

  validateTagsHandler();
  validateCommentHandler();

  actionModal('close', ['click', 'keydown'], close, closeForm);
}

function closeForm() {
  clearEffect();
  setDataZoom();
  hideSlider();
  switchFirstButton();

  validateTagsHandler('remove');
  validateCommentHandler('remove');

  form.reset();
  overlayForm.classList.add('hidden');
  body.classList.remove('modal-open');

}

actionModal('open', ['change', 'keydown'], fileForm, openForm);





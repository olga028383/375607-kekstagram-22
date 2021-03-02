import {closeModalHandler, openModalHandler} from './modal.js';

const body = document.querySelector('body');
const file = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');

function openForm(){
  form.classList.remove('hidden');
  body.classList.remove('modal-open');

  closeModalHandler(close, closeForm);
}

function closeForm(){
  form.classList.add('hidden');
  body.classList.add('modal-open');
  file.value = '';
}

openModalHandler(file, 'change', openForm);





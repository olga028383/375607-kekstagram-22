import {isKey} from './util.js';

const KEY_ENTER = 13;
const KEY_ESC = 27;

function openModalHandler(button, event, callback, params = {}) {
  button.addEventListener(event, function (evt) {
    evt.preventDefault();
    callback(params);
  });

  if (event === 'click') {
    openModalPressHandler(button, callback, params);
  }
}

function openModalPressHandler(button, callback, params = {}) {
  button.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (isKey(evt.keyCode, KEY_ENTER)) {
      callback(params);
    }
  });
}

function closeModalHandler(button, callback) {

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    callback();
  });

  button.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (isKey(evt.keyCode, KEY_ESC)) {
      callback();
    }
  });
}

export {closeModalHandler, openModalHandler};

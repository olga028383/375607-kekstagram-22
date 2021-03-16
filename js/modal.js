import {isKey} from './util.js';

const KEY_ENTER = 13;
const KEY_ESC = 27;
const ACTION_WINDOW_OPEN = 'open';
const ACTION_WINDOW_CLOSE = 'close';

function actionModal(nameAction, eventsName, button, callback) {

  eventsName.forEach((eventName) => {
    switch (eventName) {
      case 'click':
      case 'change':
        getMouseHandler(eventName, button, callback);
        break;
      case 'keydown':
        if (nameAction === ACTION_WINDOW_OPEN) {
          getKeydownHandler(eventsName, button, callback, KEY_ENTER);
        }
        else if (nameAction === ACTION_WINDOW_CLOSE) {
          getKeydownHandler(eventsName, button, callback, KEY_ESC);
        }
        break;
      case 'window':
        closeModalClickWindowHandler(button, callback);
    }
  });

}

function getMouseHandler(eventName, button, callback) {
  button.addEventListener(eventName, function (evt) {
    evt.preventDefault();
    callback();
  });
}

function getKeydownHandler(eventName, button, callback, code) {
  button.addEventListener(eventName, function (evt) {
    evt.preventDefault();
    if (isKey(evt.keyCode, code)) {
      callback();
    }
  });
}

function closeModalClickWindowHandler(element, callback) {
  document.addEventListener('click', (evt) => {
    if (evt.target !== element) {
      callback();
    }
  });
}

export {actionModal};

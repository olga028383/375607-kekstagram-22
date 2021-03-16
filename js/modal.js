import {isKey} from './util.js';

const KEY_ENTER = 13;
const KEY_ESC = 27;
const ACTION_WINDOW_OPEN = 'open';
const ACTION_WINDOW_CLOSE = 'close';

function actionModal(nameAction, eventsName, button, callback) {
  switch (nameAction) {
    case  ACTION_WINDOW_OPEN:
      getMouseHandlers(eventsName, button, callback);
      getKeydownHandlers(eventsName, button, callback, KEY_ENTER);
      break;
    case  ACTION_WINDOW_CLOSE:
      getMouseHandlers(eventsName, button, callback);
      getKeydownHandlers(eventsName, button, callback, KEY_ESC);
      break;
  }
}

function getMouseHandlers(eventsName, button, callback) {
  eventsName.forEach((eventName) => {
    button.addEventListener(eventName, function (evt) {
      evt.preventDefault();
      callback();
    });
  });
}

function getKeydownHandlers(eventsName, button, callback, code) {
  eventsName.forEach((eventName) => {
    button.addEventListener(eventName, function (evt) {
      evt.preventDefault();
      if (isKey(evt.keyCode, code)) {
        callback();
      }
    });
  });
}


export {actionModal};

const ALERT_SHOW_TIME = 5000;

function createError(errorMessage) {
  let errorBox;
  errorBox = document.createElement('div');
  errorBox.classList.add('error');
  errorBox.setAttribute('style', 'z-index: 100;position: absolute; height: 100px;left: 0; right: 0; top: 0; text-align: center; background-color: red; color: #ffffff');
  errorBox.textContent = errorMessage;

  document.body.insertAdjacentElement('afterbegin', errorBox);

  setTimeout(() => {
    errorBox.remove();
  }, ALERT_SHOW_TIME);
}

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

function loadData(loadHandler) {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      loadHandler(json)
    })
    .catch((error) => {
      createError(error)
    });
}

function saveData(data, loadHandler, failHandler) {
  fetch('https://22.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: data})
    .then(checkStatus)
    .then((json) => {
      loadHandler(json)
    })
    .catch((error) => {
      failHandler(error)
    });
}

export {loadData, saveData, createError};

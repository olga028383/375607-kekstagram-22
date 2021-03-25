const ALERT_SHOW_TIME = 2000;
const URL_GET = 'https://22.javascript.pages.academy/kekstagram/data';
const URL_POST = 'https://22.javascript.pages.academy/kekstagram';

function createError(errorMessage) {
  let errorBox;
  errorBox = document.createElement('div');
  errorBox.classList.add('error');
  errorBox.style.zIndex = 100;
  errorBox.style.position = 'absolute';
  errorBox.style.left = '0';
  errorBox.style.right = '0';
  errorBox.style.top = '0';
  errorBox.style.textAlign = 'center';
  errorBox.style.backgroundColor = 'rgb(255, 0, 0)';
  errorBox.style.color = 'rgb(255, 255, 255)';
  errorBox.style.height = '50px';
  errorBox.textContent = errorMessage;

  document.body.insertAdjacentElement('afterbegin', errorBox);

  setTimeout(() => {
    errorBox.remove();
  }, ALERT_SHOW_TIME);
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

function loadData(loadHandler) {
  fetch(URL_GET)
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
  fetch(URL_POST, {
    method: 'POST',
    body: data,
  })
    .then(checkStatus)
    .then((json) => {
      loadHandler(json)
    })
    .catch((error) => {
      failHandler(error)
    });
}

export {loadData, saveData, createError};

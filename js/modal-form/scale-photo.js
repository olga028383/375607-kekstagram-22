const biggerControl = document.querySelector('.scale__control--bigger');
const smallerControl = document.querySelector('.scale__control--smaller');
const fieldZoom = document.querySelector('.scale__control--value');
const imageZoom = document.querySelector('.img-upload__preview img');

const STEP = 25;
const MIN_VALUE = STEP;
const MAX_VALUE = 100;
const MAX_PERCENT = 100;

setDataZoom();

function zoomInHandler() {
  let value = clearFiledZoom();
  value = (value === MAX_VALUE) ? MAX_VALUE : value += STEP;
  setDataZoom(value);
}

function zoomOutHandler() {
  let value = clearFiledZoom();
  value = (value === MIN_VALUE) ? MIN_VALUE : value -= STEP;
  setDataZoom(value);
}

function setDataZoom(value = MAX_VALUE) {
  let scale = value / MAX_PERCENT;
  fieldZoom.setAttribute('value', `${value}%`);
  imageZoom.setAttribute('style', `transform: scale(${scale})`);
}

function clearFiledZoom() {
  return Number(fieldZoom.getAttribute('value').slice(0, -1));
}

biggerControl.addEventListener('click', zoomInHandler);
smallerControl.addEventListener('click', zoomOutHandler);

export {setDataZoom, clearFiledZoom, MAX_PERCENT};
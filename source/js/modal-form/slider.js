/* global noUiSlider:readonly */
import {setDataZoom, clearFiledZoom, MAX_PERCENT} from './scale-photo.js';

const EffectLists = {
  chrome: setEffectChrome,
  sepia: setEffectSepia,
  marvin: setEffectMarvin,
  phobos: setEffectPhobos,
  heat: setEffectHeat,
};
const slider = document.querySelector('.effect-level__slider');
const fieldEffect = document.querySelector('.effect-level__value');
const effectButton = document.querySelectorAll('.effects__radio');
const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer.querySelector('img');

function setEffect(button) {
  const effectName = button.getAttribute('value');
  setDataZoom();
  showSlider();

  if (Object.keys(EffectLists).includes(effectName)) {
    EffectLists.effectName();
  } else {
    hideSlider();
    clearEffect();
  }

}

function setEffectHandler(button) {
  button.addEventListener('change', setEffect.bind(null, button));
}

function setEffectChrome() {
  clearEffect();
  image.classList.add('effects__preview--chrome');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  });

  updateSlider('grayscale');
}

function setEffectSepia() {
  clearEffect();
  image.classList.add('effects__preview--sepia');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  });

  updateSlider('sepia');
}

function setEffectMarvin() {
  clearEffect();
  image.classList.add('effects__preview--marvin');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  });

  updateSlider('invert', '%');
}

function setEffectPhobos() {
  clearEffect();
  image.classList.add('effects__preview--phobos');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  });

  updateSlider('blur', 'px');
}

function setEffectHeat() {
  clearEffect();
  image.classList.add('effects__preview--heat');

  slider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  });

  updateSlider('brightness');
}

function clearEffect() {
  image.removeAttribute('class');
  image.removeAttribute('style');
}

function showSlider() {
  slider.removeAttribute('style');
}

function hideSlider() {
  slider.setAttribute('style', 'display: none');
}

function updateSlider(filterName, postfix = '') {
  slider.noUiSlider.on('update', (_, handle, unencoded) => {
    let zoom = clearFiledZoom();
    image.setAttribute('style', `filter: ${filterName}(${unencoded[handle]}${postfix}); transform: scale(${zoom / MAX_PERCENT})`);
    fieldEffect.setAttribute('value', unencoded[handle]);
  });
}

function switchFirstButton() {
  const effectButtonNone = document.querySelector('#effect-none');
  effectButtonNone.click();
}

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
});

hideSlider();

effectButton.forEach((button) => {
  setEffectHandler(button);
});

export {clearEffect, hideSlider, switchFirstButton};

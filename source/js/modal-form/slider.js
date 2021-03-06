/* global noUiSlider:readonly */
import {clearFiledZoom, MAX_PERCENT} from './scale-photo.js';

const EffectLists = {
  chrome: setEffectChrome,
  sepia: setEffectSepia,
  marvin: setEffectMarvin,
  phobos: setEffectPhobos,
  heat: setEffectHeat,
};
const wraperSlider = document.querySelector('.effect-level');
const slider = wraperSlider.querySelector('.effect-level__slider');
const fieldEffect = document.querySelector('.effect-level__value');
const effectButton = document.querySelectorAll('.effects__radio');
const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer.querySelector('img');

function buttonChangeHandler(button) {
  const effectName = button.value;
  showSlider();

  if (Object.keys(EffectLists).includes(effectName)) {
    EffectLists[effectName]();
  } else {
    hideSlider();
    clearEffect();
  }

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
  const currentEffect = image.className;
  if (currentEffect) {
    image.classList.remove(currentEffect);
  }
  image.style = '';
}

function showSlider() {
  wraperSlider.style = '';
}

function hideSlider() {
  wraperSlider.style.display = 'none';
}

function updateSlider(filterName, postfix = '') {
  slider.noUiSlider.on('update', (_, handle, unencoded) => {
    let zoom = clearFiledZoom();
    image.style.filter = `${filterName}(${unencoded[handle]}${postfix})`;
    image.style.transform = `scale(${zoom / MAX_PERCENT})`;
    fieldEffect.value = unencoded[handle];
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
  button.addEventListener('change', buttonChangeHandler.bind(null, button));
});

export {clearEffect, hideSlider, switchFirstButton};

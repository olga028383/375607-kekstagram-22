import {generateNumbers} from './util.js';

const MAX_RANDOM = 10;
const MIN_RANDOM = 0;
const filter = document.querySelector('.img-filters');
const buttonDefault = filter.querySelector('#filter-default');
const buttonRandom = filter.querySelector('#filter-random');
const buttonPopular = filter.querySelector('#filter-discussed');

filter.classList.remove('img-filters--inactive');

function setRandomDefault(photos, callback) {
  buttonDefault.addEventListener('click', function () {
    callback(photos);
  });
}

function setRandomPhotos(photos, callback) {
  buttonRandom.addEventListener('click', function (evt) {
    toggleClass(evt);
    let numberRandom = generateNumbers(MIN_RANDOM, MAX_RANDOM);
    let photosRandom = [];

    for (let i = 0; i < MAX_RANDOM; i++) {
      photosRandom.push(photos[numberRandom()]);
    }
    callback(photosRandom);
  });
}

function setPopularPhotos(photos, callback) {

  buttonPopular.addEventListener('click', function (evt) {
    toggleClass(evt);
    let photosPopular = photos
      .slice()
      .sort((a, b) => {
        return b.comments.length - a.comments.length;
      });

    callback(photosPopular);

  });
}

function toggleClass(evt) {
  const filterActive = filter.querySelector('.img-filters__button--active');
  filterActive.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
}

export {setRandomPhotos, setPopularPhotos, setRandomDefault};

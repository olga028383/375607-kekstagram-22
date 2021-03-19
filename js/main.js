import {drawPhoto} from './photos/draw-photo.js';
import './modal-form/form.js';
import './modal-form/slider.js';
import {loadData} from './ajax.js';
import {setRandomPhotos, setPopularPhotos, setRandomDefault} from './filter.js';

const RENDER_DELAY = 500;

loadData(function (photos) {

  drawPhoto(photos);

  let callback = _.debounce(drawPhoto, RENDER_DELAY);
  setRandomDefault(photos, callback);
  setRandomPhotos(photos, callback);
  setPopularPhotos(photos, callback);

});

import {photos} from './photos/data.js';
import {drawPhoto} from './photos/draw-photo.js';
import {openWindowHandler} from './photos/window-big-photo.js';
import './modal-form/form.js';
import './modal-form/slider.js';

drawPhoto(photos);

const collectionPhotos = document.querySelectorAll('.picture');
for (let i = 0; i < collectionPhotos.length; i++) {
  openWindowHandler(collectionPhotos[i], photos[i]);
}

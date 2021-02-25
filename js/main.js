import {photos} from './data.js';
import {drawPhoto} from './draw_photo.js';
import {openWindowHandler} from './window_big_photo.js';

drawPhoto(photos);

const collectionPhotos = document.querySelectorAll('.picture');
for (let i = 0; i < collectionPhotos.length; i++) {
  openWindowHandler(collectionPhotos[i], photos[i]);
}

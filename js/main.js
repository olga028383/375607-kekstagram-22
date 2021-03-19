import {drawPhoto} from './photos/draw-photo.js';
import './modal-form/form.js';
import './modal-form/slider.js';
import {loadData} from './ajax.js';
import {setRandomPhotos, setPopularPhotos, setRandomDefault} from './filter.js';

loadData(function(photos){

  //drawPhoto(photos);
  setRandomDefault(photos, drawPhoto);
  setRandomPhotos(photos, drawPhoto);
  setPopularPhotos(photos, drawPhoto);

});





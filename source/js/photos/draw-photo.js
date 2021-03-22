import {openWindowHandler} from './window-big-photo.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoListFragment = document.createDocumentFragment();

function clearPhotoList() {
  const photos = photoList.querySelectorAll('.picture');
  if (photos) {
    photos.forEach((photo) => {
      photo.remove();
    });
  }
}

function drawPhoto(photos) {
  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.setAttribute('href', photo.url);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoListFragment.appendChild(photoElement);

    openWindowHandler(photoElement, photo);
  });

  clearPhotoList();
  photoList.appendChild(photoListFragment);
}

export {drawPhoto};

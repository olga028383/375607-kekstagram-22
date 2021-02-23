function drawPhoto(photos) {
  const photoList = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photoListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.setAttribute('href', photo.url);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoListFragment.appendChild(photoElement);
  });

  photoList.appendChild(photoListFragment);
}

export {drawPhoto};

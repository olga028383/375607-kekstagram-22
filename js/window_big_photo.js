import {closeModalHandler, openModalHandler} from './modal.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const closePhoto = bigPhoto.querySelector('.big-picture__cancel');
const image = bigPhoto.querySelector('.big-picture__img img');
const description = bigPhoto.querySelector('.social__caption');
const likesCount = bigPhoto.querySelector('.likes-count');
const commentsCount = bigPhoto.querySelector('.comments-count');
const commentsSocialCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');
const commentsList = bigPhoto.querySelector('.social__comments');

function setWindowInfo(photoInfo) {
  image.src = photoInfo.url;
  likesCount.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;
  commentsList.replaceWith(drawComments(photoInfo.comments));
  description.textContent = photoInfo.description;
}

function drawComments(comments) {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {

    let commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    let commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;

    let commentMessage = document.createElement('p');
    commentMessage.classList.add('social__text');
    commentMessage.textContent = comment.message;

    commentItem.appendChild(commentImage);
    commentItem.appendChild(commentMessage);

    commentListFragment.appendChild(commentItem);
  });

  return commentListFragment;
}

function openWindow(photoInfo) {
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  commentsSocialCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  setWindowInfo(photoInfo);
  closeModalHandler(closePhoto, closeWindow);
}

function closeWindow() {
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
}

function openWindowHandler(photo, photoInfo) {
  openModalHandler(photo, 'click', openWindow, photoInfo);
}

export {openWindowHandler};

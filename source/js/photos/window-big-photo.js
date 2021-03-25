import {actionModal} from '../modal.js';

const COUNT_COMMENTS = 5;
const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const closePhoto = bigPhoto.querySelector('.big-picture__cancel');
const image = bigPhoto.querySelector('.big-picture__img img');
const description = bigPhoto.querySelector('.social__caption');
const likesCount = bigPhoto.querySelector('.likes-count');
const commentsSocialCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');
const commentsList = bigPhoto.querySelector('.social__comments');

let photoInfo = null;
let showedComments = COUNT_COMMENTS;


function setWindowInfo() {
  image.src = photoInfo.url;
  likesCount.textContent = photoInfo.likes;
  commentsSocialCount.innerHTML = addMessageAboutCountComments();
  description.textContent = photoInfo.description;

  loadComments();
}

function addMessageAboutCountComments() {
  const length = photoInfo.comments.length;
  return `${(length > showedComments) ? showedComments : length} из <span class="comments-count">${length}</span> комментариев`;
}

function clearCommentsList() {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
}

function loadComments() {
  const displayedComments = photoInfo.comments.slice(0, COUNT_COMMENTS);

  clearCommentsList();
  commentsList.appendChild(drawComments(displayedComments));

  if (displayedComments.length < photoInfo.comments.length) {
    commentsLoader.classList.remove('hidden');
  }

  commentsLoader.addEventListener('click', loadCommentsHandler);
}

function loadCommentsHandler() {
  const lastCountComments = showedComments;
  const loadedComments = photoInfo.comments.slice(lastCountComments, lastCountComments + COUNT_COMMENTS);

  commentsList.appendChild(drawComments(loadedComments));
  showedComments = showedComments + loadedComments.length;
  commentsSocialCount.innerHTML = addMessageAboutCountComments();

  if (photoInfo.comments.length - showedComments === 0) {
    commentsLoader.classList.add('hidden');
  }
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

function openWindow(info) {

  return function () {
    photoInfo = info;

    body.classList.add('modal-open');
    bigPhoto.classList.remove('hidden');
    commentsLoader.classList.add('hidden');

    setWindowInfo();
    actionModal('close', ['click', 'keydown'], closePhoto, closeWindow);
  }
}

function closeWindow() {
  clearCommentsList();
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  showedComments = COUNT_COMMENTS;
  commentsLoader.removeEventListener('click', loadCommentsHandler);
}

function openWindowHandler(photo, info) {
  actionModal('open', ['click', 'keydown'], photo, openWindow(info));
}

export {openWindowHandler};

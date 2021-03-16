const tagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const MAX_COUNT_TAGS = 5;
const MAX_LENGTH_COMMENT = 140;

function isCheckFilling(tagValue) {
  const REGULAR = /^(#[\wa-яА-Я]{1,20}\s?)+$/;
  return REGULAR.test(tagValue);
}

function isCountTags(tagValue) {
  let tagLists = tagValue.split(' ');
  return tagLists.length > MAX_COUNT_TAGS;
}

function isFindDublicateValues(tagValue) {
  let tagLists = tagValue.split(' ');
  return tagLists.some((element, index, lists) => {
    return lists.lastIndexOf(element) !== index;
  });
}

function validateTags() {
  const tagValue = tagField.value.toLowerCase().trim().replace(/\s+/g, ' ');
  if (!isCheckFilling(tagValue)) {
    tagField.setCustomValidity('Хеш тег начинается с решетки, состоит только из чисел и цифр, между собой разделяется пробелом');
  } else if (isCountTags(tagValue)) {
    tagField.setCustomValidity(`Вы можете добавить не более ${MAX_COUNT_TAGS} тегов`);
  } else if (isFindDublicateValues(tagValue)) {
    tagField.setCustomValidity('Теги не должны повторяться');
  } else {
    tagField.setCustomValidity('');
  }
  tagField.reportValidity();
}

function validateComment() {
  if (commentField.value.length >= MAX_LENGTH_COMMENT) {
    commentField.setCustomValidity(`Комментарий не должен превышать ${MAX_LENGTH_COMMENT}`);
  } else {
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
}

function validateTagsHandler(action = 'add') {
  if (action === 'add') {
    tagField.addEventListener('input', validateTags);
  } else if (action === 'remove') {
    tagField.removeEventListener('input', validateTags);
  }
}

function validateCommentHandler(action = 'add') {
  if (action === 'add') {
    commentField.addEventListener('input', validateComment);
  } else if (action === 'remove') {
    commentField.removeEventListener('input', validateComment);
  }
}

function setStyleFieldInvalid() {
  toggleStyleField(tagField, !tagField.validity.valid);
  toggleStyleField(commentField, !commentField.validity.valid);
}

function toggleStyleField(field, error) {
  if (error) {
    field.setAttribute('style', 'border: 1px solid red');
  } else {
    field.removeAttribute('style');
  }
}

export {validateTagsHandler, validateCommentHandler, setStyleFieldInvalid};


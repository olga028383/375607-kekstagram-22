const MAX_COUNT_TAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const ACTION_ADD = 'add';
const ACTION_DELETE = 'delete';
const ERROR_CLASS = 'filed-error';

const ErrorMessages = {
  fillingTags: 'Хеш тег начинается с решетки, состоит только из чисел и цифр, между собой разделяется пробелом',
  numberOfTags: `Вы можете добавить не более ${MAX_COUNT_TAGS} тегов`,
  repeatTags: 'Теги не должны повторяться',
  numberOfCharacters: `Комментарий не должен превышать ${MAX_LENGTH_COMMENT}`,
};

const tagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

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

function tagFieldInputHandler() {
  const tagValue = tagField.value.toLowerCase().trim().replace(/\s+/g, ' ');
  if (!isCheckFilling(tagValue)) {
    tagField.setCustomValidity(ErrorMessages.fillingTags);
  } else if (isCountTags(tagValue)) {
    tagField.setCustomValidity(ErrorMessages.numberOfTags);
  } else if (isFindDublicateValues(tagValue)) {
    tagField.setCustomValidity(ErrorMessages.repeatTags);
  } else {
    tagField.setCustomValidity('');
  }
  tagField.reportValidity();
}

function commentFieldInputHandler() {
  if (commentField.value.length >= MAX_LENGTH_COMMENT) {
    commentField.setCustomValidity(ErrorMessages.numberOfCharacters);
  } else {
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
}

function validateTags(action = ACTION_ADD) {
  if (action === ACTION_ADD) {
    tagField.addEventListener('input', tagFieldInputHandler);
  } else if (action === ACTION_DELETE) {
    tagField.removeEventListener('input', tagFieldInputHandler);
  }
}

function validateComment(action = ACTION_ADD) {
  if (action === ACTION_ADD) {
    commentField.addEventListener('input', commentFieldInputHandler);
  } else if (action === ACTION_DELETE) {
    commentField.removeEventListener('input', commentFieldInputHandler);
  }
}

function setStyleFieldInvalid() {
  toggleStyleField(tagField, !tagField.validity.valid);
  toggleStyleField(commentField, !commentField.validity.valid);
}

function toggleStyleField(field, error) {
  if (error) {
    field.classList.add(ERROR_CLASS);
  } else {
    field.classList.remove(ERROR_CLASS);
  }
}


export {validateTags, validateComment, setStyleFieldInvalid};


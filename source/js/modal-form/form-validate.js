const MAX_COUNT_TAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const ACTION_ADD = 'add';
const ACTION_DELETE = 'delete';
const ERROR_CLASS = 'filed-error';

const ErrorMessages = {
  fillingTags: 'Хеш тег начинается с решетки и не может состоять только из одной решетки, состоит только из чисел и цифр, между собой разделяется пробелом',
  numberOfTags: `Вы можете добавить не более ${MAX_COUNT_TAGS} тегов`,
  repeatTags: 'Теги не должны повторяться',
  numberOfCharacters: `Комментарий не должен превышать ${MAX_LENGTH_COMMENT}`,
};

const tagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

function isCheckFilling(tagValues) {
  const REGULAR = /^#[\wa-яА-Я]{1,19}$/;
  return tagValues.every((item) => REGULAR.test(item));
}

function isCountTags(tagValues) {
  return tagValues.length > MAX_COUNT_TAGS;
}

function tagFieldInputHandler() {
  const clearedField = tagField.value.toLowerCase().trim();
  const tagValues = clearedField.split(/\s+/);
  const uniqHastags = [...new Set(tagValues)];

  tagField.classList.remove(ERROR_CLASS);
  tagField.setCustomValidity('');

  if (!isCheckFilling(tagValues) && clearedField) {
    tagField.setCustomValidity(ErrorMessages.fillingTags);
    tagField.classList.add(ERROR_CLASS);
  }

  if (isCountTags(tagValues)) {
    tagField.setCustomValidity(ErrorMessages.numberOfTags);
    tagField.classList.add(ERROR_CLASS);
  }

  if (uniqHastags.length !== tagValues.length) {
    tagField.setCustomValidity(ErrorMessages.repeatTags);
    tagField.classList.add(ERROR_CLASS);
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

function buttonClickHandler() {
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

function addHandlerFieldInFocus(field, callback) {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', callback);
  });

  field.addEventListener('blur', () => {
    document.addEventListener('keydown', callback);
  });
}

function addHandlerFieldsInFocus(callback) {
  addHandlerFieldInFocus(tagField, callback);
  addHandlerFieldInFocus(commentField, callback);
}

export {validateTags, validateComment, buttonClickHandler, addHandlerFieldsInFocus};


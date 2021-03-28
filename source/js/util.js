const body = document.querySelector('body');

function getRandom(min, max) {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));
  return (min >= max) ? 0 : Math.floor(Math.random() * (max - min)) + min;
}

function generateNumbers(min, max) {
  let randomNumbers = [];

  return () => {
    let id = getRandom(min, max);

    while (randomNumbers.includes(id)) {
      id = getRandom(min, max);
    }

    randomNumbers.push(id);

    return id;
  };
}

function isEscEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function isEnterEvent(evt) {
  return evt.key === 'Enter';
}

function setStyleOpenModal(element){
  body.classList.add('modal-open');
  element.classList.remove('hidden');
}

function setStyleCloseModal(element){
  body.classList.remove('modal-open');
  element.classList.add('hidden');
}
export {getRandom, generateNumbers, isEscEvent, isEnterEvent, setStyleOpenModal, setStyleCloseModal};

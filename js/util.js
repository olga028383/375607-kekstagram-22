function getRandom(min, max) {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if (min >= max) {
    return 0;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

function generateNumbers(min, max) {
  let randomNumbers = [];

  return function () {
    let id = getRandom(min, max);

    while (randomNumbers.includes(id)) {
      id = getRandom(min, max);
    }

    randomNumbers.push(id);

    return id;
  };
}

export {getRandom, generateNumbers};
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

function isKey(targetKey, key) {
  return (targetKey === key );
}

export {getRandom, generateNumbers, isKey};

function getRandom ( min, max ) {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if(min >= max ) {
    return 0;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

function checkLength (string, maxLength){
  return string.length === maxLength ? true : false;
}

getRandom (3,9);
checkLength('Какая-то строка', 7);

const NAMES = ['Артем', 'Иван', 'Елена', 'Евгений', 'Ольга', 'Игорь', 'Александра', 'Анна', 'Валерия'];
const QUANTITY_PHOTOS = 25;
const TEXT = 'Всё отлично!\n' +
  '  В целом всё неплохо. Но не всё.\n' +
  '  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.\n' +
  '  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.\n' +
  '  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.\n' +
  '  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

let ids = [];

function getRandom(min, max) {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if (min >= max) {
    return 0;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

function checkLength(string, maxLength) {
  return string.length === maxLength ? true : false;
}

function getId (quantity, ids) {

  let id = getRandom(1, quantity);

  while(ids.indexOf(id) !== -1){
    ids.push(id);
  }

  return id;
}


function createPhoto(ids) {
  let phrases = TEXT.split(/\n/);

  return {
    id: getId (QUANTITY_PHOTOS, ids),
    avatar: 'img/avatar-' + getRandom(1, 7) + '.svg',
    message: phrases[getRandom(0, phrases.length)],
    name: NAMES[getRandom(0, NAMES.length)],
  }
}

new Array(QUANTITY_PHOTOS).fill(null).map(() => createPhoto(ids));
checkLength('В целом всё неплохо', 10);

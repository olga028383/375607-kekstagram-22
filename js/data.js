import {getRandom, generateNumbers} from './util.js';

const QUANTITY_PHOTOS = 25;
const IDS_MIN = 1;
const DESCRIPTION_PHOTO = 'Передо мной фотография, сделанная в музее палеонтологии. В центре изображен мальчик в белом свитере и темных джинсах, стоящий перед витриной с экспонатами. Он внимательно читает табличку с описанием экспозиции. В верхней части витрины находится реконструированная картина — макет природы палеогенового и мелового периода. Животные и растения выглядят очень реалистично. Слева — в воде расположилась черепаха, справа — между высокими деревьями находятся массивные фигуры динозавров. В нижней части витрины размещены окаменелые раковины — ископаемые останки морских обитателей.';
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 100;
const COMMENTS_ID_MIN = 1;
const COMMENTS_ID_MAX = 10;
const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 7;
const MESSAGE_KEY_MIN = 0;
const AUTHORS_KEY_MIN = 0;
const MASSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const AUTHORS = ['Артем', 'Иван', 'Елена', 'Евгений', 'Ольга', 'Игорь', 'Александра', 'Анна', 'Валерия'];

function createPhoto(id) {
  return {
    id: id,
    url: `photos/${id + 1}.jpg`,
    description: DESCRIPTION_PHOTO,
    likes: getRandom(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    comments: getComments(getRandom(COMMENTS_ID_MIN, COMMENTS_ID_MAX)),
  }
}

function getComments(maxCount) {
  let comments = [];
  let id = generateNumbers(IDS_MIN, maxCount + 1);

  for (let i = 0; i < maxCount; i++) {
    comments.push(createComment(id()));
  }

  return comments;
}

function createComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandom(AVATAR_ID_MIN, AVATAR_ID_MAX)}'.svg`,
    message: MASSAGES[getRandom(MESSAGE_KEY_MIN, MASSAGES.length)],
    name: AUTHORS[getRandom(AUTHORS_KEY_MIN, AUTHORS.length)],
  }
}

let photos = new Array(QUANTITY_PHOTOS).fill(null).map((value, idx) => createPhoto(idx));

export {photos};


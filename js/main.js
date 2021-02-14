const QUANTITY_PHOTOS = 25;
const IDS_MIN = 1;
const IDS_MAX = 25 * 25;
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

let photos = new Array(QUANTITY_PHOTOS).fill(null);

function getRandom(min, max) {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));

  if (min >= max) {
    return 0;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

function generateNumbers(quantity) {
  let randomNumbers = [];

  while (randomNumbers.length < quantity) {
    let id = getRandom(IDS_MIN, IDS_MAX);

    if (!randomNumbers.includes(id)) {
      randomNumbers.push(id);
    }
  }

  return randomNumbers;
}

function createPhoto(id) {
  return {
    id: id,
    url: 'photos/' + id + '.svg',
    description: DESCRIPTION_PHOTO,
    likes: getRandom(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    comments: getComments(getRandom(COMMENTS_ID_MIN, COMMENTS_ID_MAX)),
  }
}

function getComments(maxCount) {
  let comments = [];
  let ids = generateNumbers(maxCount);
  let i = 0;

  for (i; i < maxCount; i++) {
    comments.push(createComment(ids[i]));
  }

  return comments;
}

function createComment(id) {
  return {
    id: id,
    avatar: 'img/avatar-' + getRandom(AVATAR_ID_MIN, AVATAR_ID_MAX) + '.svg',
    message: MASSAGES[getRandom(MESSAGE_KEY_MIN, MASSAGES.length)],
    name: AUTHORS[getRandom(AUTHORS_KEY_MIN, AUTHORS.length)],
  }
}

photos.map((value, idx) => createPhoto(idx));

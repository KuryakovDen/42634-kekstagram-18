'use strict';

var countOfPhotos = 25;

var startLikesRange = 1;
var endLikesRange = 25;

var comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var authorNames = ['Маша', 'Паша', 'Таня', 'Вася', 'Денис', 'Вова', 'Алёна', 'Игорь', 'Сергей', 'Дима', 'Миша', 'Саша', 'Никита'];

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getRandomNumberLikes = function (minValue, maxValue) {
  var minNumber = Math.ceil(minValue);
  var maxNumber = Math.ceil(maxValue);

  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

var getRandomNumber = function () {
  //return Number.parseInt((new Date().valueOf() + Math.random()).toString().replace(".", ""));
  return Math.floor(new Date().valueOf() * Math.random() / 1000);
}

var getArrayRandomRange = function (rangeLength) {
  var uniqueNumbers = [];
  for (var i = 0; i<=rangeLength; i++) {
    uniqueNumbers.push(getRandomNumber());
  }

  return uniqueNumbers;
}

var imageNumbers = getArrayRandomRange(endLikesRange);
console.log(imageNumbers);

var getRandomUniqueNumberImage = function (uniqueNumbers) {
  return uniqueNumbers.shift();
}

var imageNumber = getRandomUniqueNumberImage(imageNumbers);
console.log(imageNumber);
//var randomLikes = getRandomUniqueNumberImage(startLikesRange, endLikesRange);
//console.log(randomLikes);

var getPhotoDescription = function (photosCount, imageNumbers) {
  var randomPhotos = [];

  for (var i = 0; i < photosCount; i++) {
    randomPhotos.push({
      url: getRandomUniqueNumberImage(imageNumbers) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumberLikes(15, 200),
      comment: {
        avatar: 'avatar',
        message: getRandomElement(comments),
        author: getRandomElement(authorNames)
      }
    });
  }

  return randomPhotos;
};

var post = getPhotoDescription(countOfPhotos, imageNumbers);
console.log(post);

/* var randomComment = getRandomElement(comments);
console.log(randomComment);*/


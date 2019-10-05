'use strict';

var countOfPhotos = 25;
var minLikes = 15;
var maxLikes = 200;

var comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var avatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg',
  'img/htmla-logo.svg', 'img/icon-arrow.png', 'img/icon-cross.svg', 'img/icon-warning.svg', 'img/logo-background-1.jpg', 'img/logo-background-2.jpg',
  'img/logo-background-3.jpg', 'img/logo-mask.jpg', 'img/spinner.svg', 'img/spinner-blue.svg', 'img/sprite.png', 'img/upload-button.svg',
  'img/upload-button-bg.png', 'img/upload-default-image.jpg'];

var authorNames = ['Маша', 'Паша', 'Таня', 'Вася', 'Денис', 'Вова', 'Алёна', 'Игорь', 'Сергей', 'Дима', 'Миша', 'Саша', 'Никита'];

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getRandomNumberLikes = function (minRangeLikes, maxRangeLikes) {
  var minLikesNumber = Math.ceil(minRangeLikes);
  var maxLikesNumber = Math.ceil(maxRangeLikes);

  return Math.floor(Math.random() * (maxLikesNumber - minLikesNumber + 1)) + minLikesNumber;
};

var getPhotoDescription = function (photosCount) {
  var randomPhotos = [];

  for (var i = 1; i <= photosCount; i++) {
    randomPhotos.push({
      url: i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumberLikes(minLikes, maxLikes),
      comment: {
        avatar: getRandomElement(avatars),
        message: getRandomElement(comments),
        author: getRandomElement(authorNames)
      }
    });
  }

  return randomPhotos;
};

console.log(getPhotoDescription(countOfPhotos));

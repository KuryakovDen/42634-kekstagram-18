'use strict';

var examplePhoto = 1;
var countOfPhotos = 25;
var minLikes = 15;
var maxLikes = 200;

var comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var avatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];

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
      url: 'photos/' + i + '.jpg',
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

var photoCollection = getPhotoDescription(countOfPhotos);
var firstPhotoFull = getPhotoDescription(examplePhoto);

var createRandomPhoto = function (photos) {

  var photoTemplate = function () {
    return document.querySelector('#picture').content.querySelector('.picture');
  };

  var currentPicture = function () {
    return document.querySelector('.pictures');
  };

  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplate().cloneNode(true);

    var getPictureAddress = function () {
      return photoElement.querySelector('.picture__img');
    };

    var getPictureLikes = function () {
      return photoElement.querySelector('.picture__likes');
    };

    var getPictureComments = function () {
      return photoElement.querySelector('.picture__comments');
    };

    getPictureAddress().src = photos[i].url;
    getPictureLikes().textContent = photos[i].likes;
    getPictureComments().textContent = photos[i].comment.message;

    currentPicture().appendChild(photoElement);
  }

  return photos;
};

createRandomPhoto(photoCollection);

var openFullPhoto = function () {
  var bigPicture = document.querySelector('.big-picture');

  var getFirstSocialComment = function () {
    return document.querySelector('.social__comment');
  };

  var getSocialCommentsList = function () {
    return document.querySelector('.social__comments');
  };

  var getShowBigPicture = function () {
    return bigPicture.classList.remove('hidden');
  };

  var getCommentCount = function () {
    return document.querySelector('.social__comment-count') //.classList.add('visually-hidden');
  };

  var getCommentsLoader = function () {
    return document.querySelector('.comments-loader') //.classList.add('visually-hidden');
  };

  var getBigPictureAddress = function () {
    return bigPicture.querySelector('.big-picture__img img');
  };

  var getBigPictureCountLikes = function () {
    return bigPicture.querySelector('.likes-count');
  };

  var getBigPictureCountComments = function () {
    return bigPicture.querySelector('.comments-count');
  };

  var getBigPictureDescription = function () {
    return bigPicture.querySelector('.social__caption');
  };

  getShowBigPicture();

  getBigPictureAddress().src = firstPhotoFull[0].url;
  getBigPictureCountLikes().textContent = firstPhotoFull[0].likes;
  //getSocialComment().textContent = firstPhotoFull[0].comment.message;
  getBigPictureDescription().textContent = firstPhotoFull[0].description;

  var getNewSocialComment = function () {
    var newSocialComment = getFirstSocialComment().cloneNode(true);
    newSocialComment.classList.add('social__comment--generated');

    var getSocialPicture = function () {
      return newSocialComment.querySelector('.social__picture');
    };

    getSocialPicture().src = 'img/avatar-' + getRandomNumberLikes(1, 6) + '.svg';
    getSocialPicture().alt = firstPhotoFull[0].author;

    var getSocialCommentText = function () {
      return newSocialComment.querySelector('.social__text');
    };

    getSocialCommentText().textContent = firstPhotoFull[0].comment.message;

    console.log(newSocialComment);
    getSocialCommentsList().appendChild(newSocialComment);
  };

  getNewSocialComment();
};

openFullPhoto();


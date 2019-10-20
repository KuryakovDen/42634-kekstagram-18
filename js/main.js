'use strict';

var NUMBER_SYSTEM = 10;

var examplePhoto = 1;
var countOfPhotos = 25;
var minLikes = 15;
var maxLikes = 200;
var controllerStep = 25;
var SCALE = 100;

/* var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;*/

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
var firstPhotoFull = getPhotoDescription(examplePhoto)[0];

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

  var getAllSocialComments = function () {
    return document.querySelectorAll('.social__comment');
  };

  var getSocialCommentsList = function () {
    return document.querySelector('.social__comments');
  };

  var showBigPicture = function () {
    return bigPicture.classList.remove('hidden');
  };

  var getBigPictureCountComments = function () {
    return bigPicture.querySelector('.comments-count');
  };

  var hideCommentCount = function () {
    return document.querySelector('.social__comment-count').classList.add('visually-hidden');
  };

  var hideCommentsLoader = function () {
    return document.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  var getBigPictureAddress = function () {
    return bigPicture.querySelector('.big-picture__img img');
  };

  var getBigPictureCountLikes = function () {
    return bigPicture.querySelector('.likes-count');
  };

  var getBigPictureDescription = function () {
    return bigPicture.querySelector('.social__caption');
  };

  showBigPicture();

  getBigPictureAddress().src = firstPhotoFull.url;
  getBigPictureCountLikes().textContent = firstPhotoFull.likes;
  getBigPictureDescription().textContent = firstPhotoFull.description;

  var getNewSocialComment = function () {
    var newSocialComment = getFirstSocialComment().cloneNode(true);

    var getSocialPicture = function () {
      return newSocialComment.querySelector('.social__picture');
    };

    var socialPicture = getSocialPicture();

    var getSocialCommentText = function () {
      return newSocialComment.querySelector('.social__text');
    };

    getSocialCommentsList().appendChild(newSocialComment);

    socialPicture.src = firstPhotoFull.comment.avatar;
    socialPicture.alt = firstPhotoFull.comment.author;
    getBigPictureCountComments().textContent = getAllSocialComments().length;
    getSocialCommentText().textContent = firstPhotoFull.comment.message;
  };

  getNewSocialComment();
  hideCommentsLoader();
  hideCommentCount();

  var getBigPictureCancel = function () {
    return document.querySelector('.big-picture__cancel');
  };

  var clickPopupCancelHandler = function () {
    bigPicture.classList.add('visually-hidden');
  };

  getBigPictureCancel().addEventListener('click', clickPopupCancelHandler);
};

/* var closePicturePopup = function () {
  return bigPicture.classList.add('hidden');
};

var popupEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicturePopup();
  }
};

var openPicturePopup = function () {
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', popupEscHandler);
};*/

var getNewUploadPhoto = function () {
  return document.querySelector('#upload-file');
};


var getFormEditPicture = function () {
  return document.querySelector('.img-upload__overlay');
};

var getEditPictureCancel = function () {
  return getFormEditPicture().querySelector('.img-upload__cancel');
};

getEditPictureCancel().addEventListener('click', function () {
  getFormEditPicture().classList.add('hidden');
});

var changeUploadFileHandler = function (evt) {
  evt.preventDefault();
  getFormEditPicture().classList.remove('hidden');
};

getNewUploadPhoto().addEventListener('change', changeUploadFileHandler);

// Ползунок слайдера

var getSliderPin = function () {
  return document.querySelector('.effect-level__pin');
};

var dragSaturationLevelHandler = function () {

};

getSliderPin().addEventListener('mouseup', dragSaturationLevelHandler);

// Изменение масштаба картинки

var getSmallController = function () {
  return getFormEditPicture().querySelector('.scale__control--smaller');
};

var getBigController = function () {
  return getFormEditPicture().querySelector('.scale__control--bigger');
};

var getUploadPreview = function () {
  return getFormEditPicture().querySelector('.img-upload__preview');
};

var getControllerValue = function () {
  return getFormEditPicture().querySelector('.scale__control--value');
};

var renderScale = function (newScale) {
  var scaleControl = getControllerValue();
  scaleControl.value = newScale + '%';
};

var init = function () {
  renderScale(SCALE);
  getSmallController().addEventListener('click', clickSmallerControlHandler);
  getBigController().addEventListener('click', clickBiggerControlHandler);
};

var updateScale = function (newScale) {
  scale = newScale;
  renderScale(newScale);
};

var clickSmallerControlHandler = function () {
  if (SCALE === 25) {
    return;
  }
  SCALE = SCALE - controllerStep;
  renderScale(SCALE);
  getUploadPreview().style.transform = 'scale(' + SCALE/100 + ')';
};

var clickBiggerControlHandler = function () {
  if (SCALE < 25 || SCALE >= 100) {
    return;
  }
  SCALE = SCALE + controllerStep;
  renderScale(SCALE);
  getUploadPreview().style.transform = 'scale(' + SCALE/100 + ')';
};

// Наложение эффекта на изображение

var getAllPhotoEfects = function () {
  return getFormEditPicture().querySelector('.effects__radio:checked');
};

var tooglePhotoEffectHandler = function () {

};

getAllPhotoEfects().addEventListener('click', tooglePhotoEffectHandler);

// Полуение строки хэштегов

var getHashtagsPicture = function () {
  return getFormEditPicture().querySelector('.text__hashtags');
};


var enterHashtagsHandler = function () {
  var hashtags = getHashtagsPicture().value.split(' ');
  var message = '';

  if (hashtags.length > 5) {
    message = 'Много хэштегов';
  }

  if (message !== '') {
    return getHashtagsPicture().setCustomValidity(message);
  } else {
    return getHashtagsPicture().setCustomValidity(message);
  }
};

getHashtagsPicture().addEventListener('input', enterHashtagsHandler);
init();

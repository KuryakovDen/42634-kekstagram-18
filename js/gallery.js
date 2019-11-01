'use strict';

(function () {
  var onReceiveSuccess = function (photos) {

    var photoTemplate = function () {
      return document.querySelector('#picture').content.querySelector('.picture');
    };

    var picturesList = function () {
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
      getPictureComments().textContent = photos[i].comments.message;

      picturesList().appendChild(photoElement);
    }

    return photos;
  };

  var onReceiveError = function () {
    var errorTemplate = function () {
      return document.querySelector('#error').content.querySelector('.error');
    };

    var mainPage = function () {
      return document.querySelector('main');
    };

    var errorElement = function () {
      return errorTemplate().cloneNode(true);
    };

    mainPage().appendChild(errorElement());
  };

  window.receive('https://js.dump.academy/kekstagram/data', onReceiveSuccess, onReceiveError);
}());

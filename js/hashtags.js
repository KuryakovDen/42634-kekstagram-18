'use strict';

(function () {
  window.hashtags = {
    getPictureHashtags: function () {
      return window.scale.getFormEditPicture().querySelector('.text__hashtags');
    },

    getPictureDescription: function () {
      return window.scale.getFormEditPicture().querySelector('.text__description');
    }
  };

  var hashtagField = window.hashtags.getPictureHashtags();

  var onEnterHashtags = function () {
    var hashtags = hashtagField.value.split(' ');

    var message = '';

    hashtags.forEach(function (currentHashtag, index) {
      var hashtag = currentHashtag;

      if (!hashtag.startsWith('#')) {
        message = 'Введите хэштег, начиная с решётки!';
      } else if (hashtag.length > 20) {
        message = 'Ваш хэштег слишком большой длины!';
      } else if (hashtags.indexOf(hashtag.toLowerCase()) !== index) {
        message = 'Такой хэштег уже существует!';
      } else if (hashtags.length > 5) {
        message = 'Слишком много хэштегов!';
      } else {
        message = '';
      }
    });

    if (message !== '') {
      return hashtagField.setCustomValidity(message);
    } else {
      return hashtagField.setCustomValidity(message);
    }
  };

  hashtagField.addEventListener('change', onEnterHashtags);
}());

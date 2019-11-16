'use strict';

(function () {
  var lengthBorder = 20;
  var hashtagsCountBorder = 5;

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
      } else if (hashtag.length > lengthBorder) {
        message = 'Ваш хэштег слишком большой длины!';
      } else if (hashtags.indexOf(hashtag.toLowerCase()) !== index) {
        message = 'Такой хэштег уже существует!';
      } else if (hashtags.length > hashtagsCountBorder) {
        message = 'Слишком много хэштегов!';
      } else if (hashtag.slice(1).indexOf('#') !== -1) {
        message = 'Ваши хэштеги не разделены пробелами!';
      } else {
        message = '';
      }
    });

    hashtagField.setCustomValidity(message);

    hashtagField.reportValidity();
  };

  hashtagField.addEventListener('change', onEnterHashtags);
}());

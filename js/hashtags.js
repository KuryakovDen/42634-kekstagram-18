'use strict';

(function () {
  window.hashtags = {
    getPictureHashtags: function () {
      return window.post.getFormEditPicture().querySelector('.text__hashtags');
    }
  };

  var hashtagField = window.hashtags.getPictureHashtags();

  var onEnterHashtags = function () {
    var hashtags = hashtagField.value.split(' ');

    var message = '';

    for (var j = 0; j < hashtags.length; j++) {
      var hashtag = hashtags[j];

      if (!hashtags[j].startsWith('#')) {
        message = 'Введите хэштег, начиная с решётки!';
      } else if (hashtags[j].length > 20) {
        message = 'Ваш хэштег слишком большой длины!';
      } else if (hashtags.indexOf(hashtag.toLowerCase()) !== j) {
        message = 'Такой хэштег уже существует!';
      } else if (hashtags.length > 5) {
        message = 'Слишком много хэштегов!';
      } else {
        message = '';
      }
    }

    if (message !== '') {
      return hashtagField.setCustomValidity(message);
    } else {
      return hashtagField.setCustomValidity(message);
    }
  };

  hashtagField.addEventListener('change', onEnterHashtags);
}());

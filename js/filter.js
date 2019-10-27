'use strict';

(function () {
  window.filter = {
    getEffectFilterSlider: function () {
      return window.post.getFormEditPicture().querySelector('.effect-level');
    }
  };

  var filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var getFilterComment = function () {
    return window.post.getFormEditPicture().querySelector('.text__description');
  };

  var getUploadPreviewImage = function () {
    return window.post.getFormEditPicture().querySelector('.img-upload__preview img');
  };

  /* var getEffectsFieldset = function () {
    return document.querySelector('.effects');
  };

   var getCurrentPhotoEffect = function () {
    return getEffectsFieldset().querySelector('input:checked');
  };

   getEffectsFieldset().addEventListener('change', function () {
    console.log(getCurrentPhotoEffect());

    if (getCurrentPhotoEffect().value === 'chrome') {
      getUploadPreviewImage().classList.add('effects__preview--chrome');
    } else if (getCurrentPhotoEffect().value === 'sepia') {
      getUploadPreviewImage().classList.add('effects__preview--sepia');
    }
  });*/

  var setPhotoFilter = function (effect) {
    if (effect !== 'none') {
      window.filter.getEffectFilterSlider().classList.remove('visually-hidden');
    }

    var getPhotoEffect = function () {
      return window.post.getFormEditPicture().querySelector('#effect-' + effect + '');
    };

    var onClickFilterEffect = function () {
      getUploadPreviewImage().classList.add('effects__preview--' + effect + '');

      if (effect === 'none') {
        window.filter.getEffectFilterSlider().classList.add('visually-hidden');
      } else {
        window.filter.getEffectFilterSlider().classList.remove('visually-hidden');
      }
    };

    return getPhotoEffect().addEventListener('click', onClickFilterEffect);
  };

  for (var i = 0; i < filters.length; i++) {
    setPhotoFilter(filters[i]);
  }

  var getNewUploadPhoto = function () {
    return document.querySelector('#upload-file');
  };

  var getEditPictureCancel = function () {
    return window.post.getFormEditPicture().querySelector('.img-upload__cancel');
  };

  var onClickUploadFile = function () {
    window.post.getFormEditPicture().classList.remove('hidden');
  };

  getNewUploadPhoto().addEventListener('change', onClickUploadFile);

  var closePopupFilter = function () {
    window.post.getFormEditPicture().classList.add('hidden');
  };

  getEditPictureCancel().addEventListener('click', function () {
    closePopupFilter();
  });

  document.addEventListener('keydown', function (evt) {
    if (!getFilterComment().matches(':focus') && !window.hashtags.getPictureHashtags().matches(':focus')) {
      window.util.escEvent(evt, closePopupFilter);
    }
  });
}());

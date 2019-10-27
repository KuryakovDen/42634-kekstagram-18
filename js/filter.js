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
  var getPhotoUploadEffects = function () {
    return document.querySelector('.img-upload__effects');
  };

  var getEffectLevelPhotoValue = function () {
    return document.querySelector('.effect-level__value');
  };

  var getSliderPin = function () {
    return document.querySelector('.effect-level__pin');
  };

  var getCurrentPhotoFilter = function () {
    return getPhotoUploadEffects().querySelector('input:checked');
  };

  var onMouseUpPin = function () {
    getEffectLevelPhotoValue().value = 20;

    if (getCurrentPhotoFilter().value === 'chrome') {
      window.scale.getUploadPreview().style.filter = 'grayscale(' + getEffectLevelPhotoValue().value / 100 + ')';
    }

    if (getCurrentPhotoFilter().value === 'sepia') {
      window.scale.getUploadPreview().style.filter = 'sepia(' + getEffectLevelPhotoValue().value / 100 + ')';
    }

    if (getCurrentPhotoFilter().value === 'marvin') {
      window.scale.getUploadPreview().style.filter = 'invert(' + getEffectLevelPhotoValue().value + '%)';
    }

    if (getCurrentPhotoFilter().value === 'phobos') {
      if (getEffectLevelPhotoValue().value === 0) {
        window.scale.getUploadPreview().style.filter = 'blur(0)';
      } else if (getEffectLevelPhotoValue().value > 0 && getEffectLevelPhotoValue().value <= 0.33) {
        window.scale.getUploadPreview().style.filter = 'blur(1px)';
      } else if (getEffectLevelPhotoValue().value > 0.33 && getEffectLevelPhotoValue().value <= 0.66) {
        window.scale.getUploadPreview().style.filter = 'blur(2px)';
      } else {
        window.scale.getUploadPreview().style.filter = 'blur(3px)';
      }
    }

    if (getCurrentPhotoFilter().value === 'heat') {
      if (getEffectLevelPhotoValue().value === 0) {
        window.scale.getUploadPreview().style.filter = 'brightness(1)';
      } else if (getEffectLevelPhotoValue().value <= 50) {
        window.scale.getUploadPreview().style.filter = 'brightness(2)';
      } else {
        window.scale.getUploadPreview().style.filter = 'brightness(3)';
      }
    }
  };

  getSliderPin().addEventListener('mouseup', onMouseUpPin);

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

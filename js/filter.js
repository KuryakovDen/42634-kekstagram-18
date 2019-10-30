'use strict';

(function () {
  window.filter = {
    getEffectFilterSlider: function () {
      return window.post.getFormEditPicture().querySelector('.effect-level');
    }
  };

  var sliderLevel = window.filter.getEffectFilterSlider();
  var filterPopup = window.post.getFormEditPicture();

  var filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var getFilterComment = function () {
    return filterPopup.querySelector('.text__description');
  };

  var getUploadPreviewImage = function () {
    return filterPopup.querySelector('.img-upload__preview img');
  };

  var setPhotoFilter = function (effect) {
    if (effect !== 'none') {
      sliderLevel.classList.remove('visually-hidden');
    }

    var getPhotoEffect = function () {
      return filterPopup.querySelector('#effect-' + effect + '');
    };

    var onClickFilterEffect = function () {
      getUploadPreviewImage().className = '';
      getUploadPreviewImage().classList.add('effects__preview--' + effect + '');

      if (effect !== 'none') {
        sliderLevel.classList.remove('visually-hidden');
      } else {
        sliderLevel.classList.add('visually-hidden');
      }

      window.sliderDrag.resetSlider();
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
    return filterPopup.querySelector('.img-upload__cancel');
  };

  var onClickUploadFile = function () {
    filterPopup.classList.remove('hidden');
  };

  getNewUploadPhoto().addEventListener('change', onClickUploadFile);

  var closePopupFilter = function () {
    filterPopup.classList.add('hidden');
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

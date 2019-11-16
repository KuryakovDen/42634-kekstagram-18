'use strict';

(function () {
  var filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  window.filter = {
    getEffectFilterSlider: function () {
      return window.scale.getFormEditPicture().querySelector('.effect-level');
    },

    getNewUploadPhoto: function () {
      return document.querySelector('#upload-file');
    },

    setPhotoFilter: function (effect) {
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

        window.drag.resetSlider();
      };

      return getPhotoEffect().addEventListener('click', onClickFilterEffect);
    }
  };

  var sliderLevel = window.filter.getEffectFilterSlider();
  var filterPopup = window.scale.getFormEditPicture();
  var uploadedPhoto = window.filter.getNewUploadPhoto();

  var getFilterComment = function () {
    return filterPopup.querySelector('.text__description');
  };

  var getUploadPreviewImage = function () {
    return filterPopup.querySelector('.img-upload__preview img');
  };

  filters.forEach(function (filter) {
    window.filter.setPhotoFilter(filter);
  });

  var getEditPictureCancel = function () {
    return filterPopup.querySelector('.img-upload__cancel');
  };

  var onClickUploadFile = function () {
    filterPopup.classList.remove('hidden');
    window.filter.getEffectFilterSlider().classList.add('visually-hidden');
  };

  uploadedPhoto.addEventListener('change', onClickUploadFile);

  var closePopupFilter = function () {
    uploadedPhoto.value = null;
    filterPopup.classList.add('hidden');
  };

  getEditPictureCancel().addEventListener('click', function () {
    closePopupFilter();
  });

  document.addEventListener('keydown', function (evt) {
    if (!getFilterComment().matches(':focus') && !window.hashtags.getPictureHashtags().matches(':focus')) {
      window.util.keyEvent(evt, closePopupFilter, window.util.ESC_KEYCODE);
    }
  });
}());

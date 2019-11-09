'use strict';

(function () {
  window.filterPopup = {
    getFilterOverlay: function () {
      return document.querySelector('.img-upload__overlay');
    }
  };

  var filterOverlay = window.filterPopup.getFilterOverlay();

  var getFilterForm = function () {
    return document.querySelector('.img-upload__form');
  };

  var successTemplate = function () {
    return document.querySelector('#success').content.querySelector('.success');
  };

  var onSendSuccess = function () {
    filterOverlay.classList.add('hidden');

    var resetData = function () {
      var uploadedPhoto = window.filter.getNewUploadPhoto();
      uploadedPhoto.value = null;

      window.sliderDrag.resetSlider();

      var resetScale = function () {
        var fullsizeFilter = 100;
        var filterImage = window.scale.getUploadPreview();

        filterImage.style.transform = 'scale(' + 1 + ')';
        window.scale.renderScale(fullsizeFilter);
      };

      var resetCurrentFilter = function () {
        var getUploadPreview = function () {
          return document.querySelector('.img-upload__preview');
        };

        var getUploadPreviewImage = function () {
          return document.querySelector('.img-upload__preview img');
        };

        getUploadPreview().style = null;
        getUploadPreviewImage().className = 'effects__preview--none';
      };

      var resetText = function () {
        var hashtagsText = window.hashtags.getPictureHashtags();
        var hashtagsDescription = window.hashtags.getPictureDescription();

        hashtagsText.value = null;
        hashtagsDescription.value = null;
      };

      resetScale();
      resetCurrentFilter();
      resetText();
    };

    resetData();

    var mainPage = function () {
      return document.querySelector('main');
    };

    var getSuccessPopup = function () {
      return successTemplate().cloneNode(true);
    };

    var getSuccessElement = mainPage().appendChild(getSuccessPopup());

    var getSuccessMessage = function () {
      return getSuccessElement.querySelector('.success__inner');
    };

    var getSuccessTitle = function () {
      return getSuccessElement.querySelector('.success__title');
    };

    document.addEventListener('click', function (evt) {
      if (evt.target !== getSuccessMessage() && evt.target !== getSuccessTitle()) {
        closeSuccessPopup();
      }
    });

    var getSuccessButton = function () {
      return getSuccessElement.querySelector('.success__button');
    };

    var closeSuccessPopup = function () {
      getSuccessElement.classList.add('visually-hidden');
    };

    getSuccessButton().addEventListener('click', function () {
      closeSuccessPopup();
    });

    document.addEventListener('keydown', function (evt) {
      window.util.escEvent(evt, closeSuccessPopup);
    });
  };

  var onSendError = function () {
    filterOverlay.classList.add('hidden');

    var mainPage = function () {
      return document.querySelector('main');
    };

    var errorTemplate = function () {
      return document.querySelector('#error').content.querySelector('.error');
    };

    var getErrorPopup = function () {
      return errorTemplate().cloneNode(true);
    };

    var getErrorElement = mainPage().appendChild(getErrorPopup());

    var getErrorMessage = function () {
      return getErrorElement.querySelector('.error__inner');
    };

    var getErrorTitle = function () {
      return getErrorElement.querySelector('.error__title');
    };

    document.addEventListener('click', function (evt) {
      if (evt.target !== getErrorMessage() && evt.target !== getErrorTitle()) {
        closeErrorPopup();
      }
    });

    var getErrorButton = function () {
      return getErrorElement.querySelector('.error__button');
    };

    var closeErrorPopup = function () {
      getErrorElement.classList.add('visually-hidden');
    };

    getErrorButton().addEventListener('click', function () {
      closeErrorPopup();
    });

    document.addEventListener('keydown', function (evt) {
      window.util.escEvent(evt, closeErrorPopup);
    });
  };

  getFilterForm().addEventListener('submit', function (evt) {
    window.send('https://js.dump.academy/kekstagram', new FormData(getFilterForm()), onSendSuccess, onSendError);
    evt.preventDefault();
  });
}());

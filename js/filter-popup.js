'use strict';

(function () {
  var getFilterForm = function () {
    return document.querySelector('.img-upload__form');
  };

  var getFilterOverlay = function () {
    return getFilterForm().querySelector('.img-upload__overlay');
  };

  var successTemplate = function () {
    return document.querySelector('#success').content.querySelector('.success');
  };

  var onSendSuccess = function () {
    getFilterOverlay().classList.add('hidden');

    var mainPage = function () {
      return document.querySelector('main');
    };

    var getSuccessPopup = function () {
      return successTemplate().cloneNode(true);
    };

    var getSuccessPopup = mainPage().appendChild(getSuccessPopup());

    var getSuccessButton = function () {
      return getSuccessPopup.querySelector('.success__button');
    };

    var closeSuccessPopup = function () {
      getSuccessPopup.classList.add('visually-hidden');
    };

    getSuccessButton().addEventListener('click', function () {
      closeSuccessPopup();
    });

    document.addEventListener('keydown', function (evt) {
      window.util.escEvent(evt, closeSuccessPopup);
    });
  };

  var onSendError = function () {
    getFilterOverlay().classList.add('hidden');

    var mainPage = function () {
      return document.querySelector('main');
    };

    var errorTemplate = function () {
      return document.querySelector('#error').content.querySelector('.error');
    };

    var getErrorPopup = function () {
      return errorTemplate().cloneNode(true);
    };

    var getErrorPopup = mainPage().appendChild(getErrorPopup());

    var getErrorButton = function () {
      return getErrorPopup.querySelector('.error__button');
    };

    var closeErrorPopup = function () {
      getErrorPopup.classList.add('visually-hidden');
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

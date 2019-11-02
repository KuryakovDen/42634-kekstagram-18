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

    var successElement = function () {
      return successTemplate().cloneNode(true);
    };

    mainPage().appendChild(successElement());
  };

  var onSendError = function () {
    getFilterOverlay().classList.add('hidden');

    var mainPage = function () {
      return document.querySelector('main');
    };

    var errorTemplate = function () {
      return document.querySelector('#error').content.querySelector('.error');
    };

    var errorElement = function () {
      return errorTemplate().cloneNode(true);
    };

    mainPage().appendChild(errorElement());
  };

  /* var getErrorButtons = function () {
    return document.querySelectorAll('.error__button');
  };

  var closeErrorPopup = function () {
    errorTemplate().classList.add('hidden');
  };

  getErrorButtons().addEventListener('click', function () {
    closeErrorPopup();
  });

  document.addEventListener('keydown', function () {
    window.escEvent(evt, closeErrorPopup);
  });*/

  getFilterForm().addEventListener('submit', function (evt) {
    window.send('https://js.dump.academy/kekstagram', new FormData(getFilterForm()), onSendSuccess, onSendError);
    evt.preventDefault();
  });

  var getSuccessButton = function () {
    return document.querySelector('.success__button');
  };

  var closeSuccessPopup = function () {
    successTemplate().classList.add('hidden');
  };

  getSuccessButton().addEventListener('click', function () {
    closeSuccessPopup();
  });

  document.addEventListener('keydown', function (evt) {
    window.escEvent(evt, closeSuccessPopup);
  });
}());

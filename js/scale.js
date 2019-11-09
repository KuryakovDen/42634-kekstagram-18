'use strict';

(function () {
  window.scale = {
    getUploadPreview: function () {
      return window.post.getFormEditPicture().querySelector('.img-upload__preview');
    },

    getControllerValue: function () {
      return filterOverlay.querySelector('.scale__control--value');
    },

    renderScale: function (newScale) {
      var scaleControl = window.scale.getControllerValue();
      scaleControl.value = newScale + '%';
    }
  };

  var filterOverlay = window.post.getFormEditPicture();
  var filterImage = window.scale.getUploadPreview();

  var controllerStep = 25;
  var SCALE = 100;

  var getSmallController = function () {
    return filterOverlay.querySelector('.scale__control--smaller');
  };

  var getBigController = function () {
    return filterOverlay.querySelector('.scale__control--bigger');
  };

  var renderScale = function (newScale) {
    var scaleControl = window.scale.getControllerValue();
    scaleControl.value = newScale + '%';
  };

  var init = function () {
    renderScale(SCALE);
    getSmallController().addEventListener('click', onClickMinusControl);
    getBigController().addEventListener('click', onClickPlusControl);
  };

  /* var updateScale = function (newScale) {
    SCALE = newScale;
    renderScale(newScale);
  };*/

  var onClickMinusControl = function () {
    if (SCALE === 25) {
      return;
    }
    SCALE = SCALE - controllerStep;
    renderScale(SCALE);
    filterImage.style.transform = 'scale(' + SCALE / 100 + ')';
  };

  var onClickPlusControl = function () {
    if (SCALE < 25 || SCALE >= 100) {
      return;
    }

    SCALE = SCALE + controllerStep;
    renderScale(SCALE);
    filterImage.style.transform = 'scale(' + SCALE / 100 + ')';
  };

  init();
}());

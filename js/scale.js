'use strict';

(function () {
  window.scale = {
    getUploadPreview: function () {
      return window.post.getFormEditPicture().querySelector('.img-upload__preview');
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

  var getControllerValue = function () {
    return filterOverlay.querySelector('.scale__control--value');
  };

  var renderScale = function (newScale) {
    var scaleControl = getControllerValue();
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

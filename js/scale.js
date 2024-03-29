'use strict';

(function () {
  var STEP = 25;
  var Scale = 100;

  window.scale = {
    getFormEditPicture: function () {
      return document.querySelector('.img-upload__overlay');
    },

    getUploadPreview: function () {
      return window.scale.getFormEditPicture().querySelector('.img-upload__preview img');
    },

    getControllerValue: function () {
      return filterOverlay.querySelector('.scale__control--value');
    },

    renderScale: function (newScale) {
      var scaleControl = window.scale.getControllerValue();
      scaleControl.value = newScale + '%';
    },

    updateScale: function (newScale) {
      Scale = newScale;
      renderScale(newScale);
    },

    init: function () {
      renderScale(Scale);
      getSmallController().addEventListener('click', onClickMinusControl);
      getBigController().addEventListener('click', onClickPlusControl);
    }
  };

  var filterOverlay = window.scale.getFormEditPicture();
  var filterImage = window.scale.getUploadPreview();

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

  var onClickMinusControl = function () {
    if (Scale === 25) {
      return;
    }

    window.scale.updateScale(Scale - STEP);
    filterImage.style.transform = 'scale(' + Scale / 100 + ')';
  };

  var onClickPlusControl = function () {
    if (Scale < 25 || Scale >= 100) {
      return;
    }

    window.scale.updateScale(Scale + STEP);
    filterImage.style.transform = 'scale(' + Scale / 100 + ')';
  };

  window.scale.init();
}());

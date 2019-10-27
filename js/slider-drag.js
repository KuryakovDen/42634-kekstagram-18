'use strict';

(function () {
  var getPhotoUploadEffects = function () {
    return document.querySelector('.img-upload__effects');
  };

  var getEffectLevelPhotoValue = function () {
    return document.querySelector('.effect-level__value');
  };

  var getCurrentPhotoFilter = function () {
    return getPhotoUploadEffects().querySelector('input:checked');
  };

  var getSliderPin = function () {
    return document.querySelector('.effect-level__pin');
  };

  getSliderPin().addEventListener('mousedown', function (evtDown) {
    evtDown.preventDefault();

    var startCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMouseMovePin = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: startCoords.y
      };

      getSliderPin().style.left = (getSliderPin().offsetLeft - shift.x) + 'px';
    };

    getSliderPin().addEventListener('mousemove', onMouseMovePin);
    getSliderPin().addEventListener('mouseup', onMouseUpPin);
  });

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
}());

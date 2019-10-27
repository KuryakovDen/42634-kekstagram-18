'use strict';

(function () {
  window.sliderDrag = {
    resetSlider: function () {
      getSliderPin().style.left = startSliderPin;
      getSliderDepth().style.width = startSliderDepth;
    }
  };

  var startSliderPin = 7 + 'px';
  var startSliderDepth = 1 + 'px';

  var LEFT_BORDER_PIN = 725;
  var RIGHT_BORDER_PIN = 1170;

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

  var getSliderDepth = function () {
    return document.querySelector('.effect-level__depth');
  };

  getSliderPin().addEventListener('mousedown', function (evtDown) {
    evtDown.preventDefault();

    var startCoords = {
      x: evtDown.clientX,
    };

    var dragged = false;

    // console.log(startCoords.x);

    var onMouseMovePin = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      if (startCoords.x > LEFT_BORDER_PIN && startCoords.x <= RIGHT_BORDER_PIN) {
        getSliderPin().style.left = (getSliderPin().offsetLeft - shift.x) + 'px';
        getSliderDepth().style.width = (getSliderPin().offsetLeft - shift.x) + 'px';
      }
    };

    // console.log(startCoords.x);

    var onMouseUpPin = function (evtUp) {
      evtUp.preventDefault();

      getSliderPin().removeEventListener('mousemove', onMouseMovePin);
      getSliderPin().removeEventListener('mouseup', onMouseUpPin);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          getSliderPin().removeEventListener('click', onClickPreventDefault);
        };
      } else {
        getSliderPin().addEventListener('click', onClickPreventDefault);
      }

      getEffectLevelPhotoValue().value = startCoords.x / 15; // 20

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

    document.addEventListener('mousemove', onMouseMovePin);
    document.addEventListener('mouseup', onMouseUpPin);
  });
}());

'use strict';

(function () {
  var FILTER_PROPORTION = 100;
  var PHOBOS_COEFFICIENT = 3;
  var HEAT_COEFFICIENT = 3;
  var HEAT_PROPORTION = 0.33;

  var getPhotoUploadEffects = function () {
    return document.querySelector('.img-upload__effects');
  };

  var getEffectLevelPhotoValue = function () {
    return document.querySelector('.effect-level__value');
  };

  var getCurrentPhotoFilter = function () {
    return getPhotoUploadEffects().querySelector('input:checked');
  };

  var onRangeChange = function () {
    if (getCurrentPhotoFilter().value === 'chrome') {
      window.scale.getUploadPreview().style.filter = 'grayscale' + '(' + getEffectLevelPhotoValue().value / FILTER_PROPORTION + ')';
    }

    if (getCurrentPhotoFilter().value === 'sepia') {
      window.scale.getUploadPreview().style.filter = 'sepia' + '(' + getEffectLevelPhotoValue().value / FILTER_PROPORTION + ')';
    }

    if (getCurrentPhotoFilter().value === 'marvin') {
      window.scale.getUploadPreview().style.filter = 'invert' + '(' + getEffectLevelPhotoValue().value + '%)';
    }

    if (getCurrentPhotoFilter().value === 'chrome') {
      window.scale.getUploadPreview().style.filter = 'grayscale' + '(' + getEffectLevelPhotoValue().value / FILTER_PROPORTION + ')';
    }

    if (getCurrentPhotoFilter().value === 'sepia') {
      window.scale.getUploadPreview().style.filter = 'sepia' + '(' + getEffectLevelPhotoValue().value / FILTER_PROPORTION + ')';
    }

    if (getCurrentPhotoFilter().value === 'marvin') {
      window.scale.getUploadPreview().style.filter = 'invert' + '(' + getEffectLevelPhotoValue().value + '%)';
    }

    if (getCurrentPhotoFilter().value === 'phobos') {
      window.scale.getUploadPreview().style.filter = 'blur' + '(' + (getEffectLevelPhotoValue().value / FILTER_PROPORTION) * PHOBOS_COEFFICIENT + 'px)';
    }

    if (getCurrentPhotoFilter().value === 'heat') {
      window.scale.getUploadPreview().style.filter = 'brightness' + '(' + (((getEffectLevelPhotoValue().value) / FILTER_PROPORTION) + HEAT_PROPORTION) * HEAT_COEFFICIENT + ')';
    }
  };

  document.querySelector('input[type="range"]').addEventListener('input', onRangeChange);
}());

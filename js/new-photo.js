'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var getCurrentFilterImage = function () {
    return document.querySelector('.img-upload__preview img');
  };

  var getFileChooser = function () {
    return document.querySelector('#upload-file');
  };

  var onChangeFileChooser = function () {
    var file = getFileChooser().files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        var onLoadReader = function () {
          getCurrentFilterImage().src = reader.result;
        };

        reader.addEventListener('load', onLoadReader);

        reader.readAsDataURL(file);
      }
    }
  };

  getFileChooser().addEventListener('change', onChangeFileChooser);
}());

'use strict';

(function () {
  var getPictures = function () {
    return document.querySelectorAll('.picture__img');
  };

  window.another = {
    getImgFilters: function () {
      return document.querySelector('.img-filters');
    },

    renderCurrentGallery: function (name, callback) {
      var currentButton = function () {
        return document.querySelector('#filter-' + name + '');
      };

      var onClickCurrentButton = function () {
        callback();
      };

      currentButton().addEventListener('click', onClickCurrentButton);
    },

    removePictures: function () {
      getPictures().forEach(function (element) {
        element.parentNode.removeChild(element);
      });
    },

    toogleActiveButton: function (className) {
      var getActivePhotosButton = function () {
        return document.querySelector('.img-filters__button--active');
      };

      var getRandomPhotosButton = function () {
        return document.querySelector('#' + className + '');
      };

      getActivePhotosButton().classList.remove('img-filters__button--active');

      getRandomPhotosButton().classList.add('img-filters__button--active');
    },

    onClickPopularGallery: function () {
      window.another.removePictures();

      window.another.toogleActiveButton('filter-popular');

      window.setTimeout(function () {
        window.gallery.buildGallery(window.gallery.photos);
      }, 500);
    },

    onClickRandomGallery: function () {
      window.another.removePictures();

      window.another.toogleActiveButton('filter-random');

      var photoCopy = window.gallery.photos.slice();

      photoCopy.sort(function () {
        return 0.5 - Math.random();
      });

      photoCopy.splice(10);

      window.setTimeout(function () {
        window.gallery.buildGallery(photoCopy);
      }, 500);
    },

    onClickDiscussedGallery: function () {
      window.another.removePictures();

      window.another.toogleActiveButton('filter-discussed');

      var photoCopy = window.gallery.photos.slice();

      photoCopy.sort(function (firstArray, secondArray) {
        if (firstArray.comments.length < secondArray.comments.length) {
          return 1;
        } else if (firstArray.comments.length > secondArray.comments.length) {
          return -1;
        }

        return 0;
      });

      window.setTimeout(function () {
        window.gallery.buildGallery(photoCopy);
      }, 500);
    }
  };
}());
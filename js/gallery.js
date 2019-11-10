'use strict';

(function () {
  window.gallery = {
    buildGallery: function (photos) {
      var getPhotoTemplate = function () {
        return document.querySelector('#picture').content.querySelector('.picture');
      };

      var getBigPicture = function () {
        return document.querySelector('.big-picture');
      };

      var getPhoto = function (element) {
        return element.url === this.attributes.src.value; // eslint-disable-line
      };

      for (var i = 0; i < photos.length; i++) {
        var photoElement = getPhotoTemplate().cloneNode(true);

        var renderGalleryPhotos = function () {

          var getPicturesList = function () {
            return document.querySelector('.pictures');
          };

          var getPictureAddress = function () {
            return photoElement.querySelector('.picture__img');
          };

          var getPictureLikes = function () {
            return photoElement.querySelector('.picture__likes');
          };

          var getPictureComments = function () {
            return photoElement.querySelector('.picture__comments');
          };

          var photo = photos[i];

          getPictureAddress().src = photo.url;
          getPictureLikes().textContent = photo.likes;
          getPictureComments().textContent = photo.comments.message;

          getPicturesList().appendChild(photoElement);
        };

        renderGalleryPhotos();

        var onClickShowFullPhoto = function (evt) {
          var target = evt.target;

          var currentPhoto = window.gallery.photos.find(getPhoto, target);

          var renderFullPhoto = function () {
            var getBigPictureAddress = function () {
              return getBigPicture().querySelector('.big-picture__img img');
            };

            var getBigPictureCountLikes = function () {
              return getBigPicture().querySelector('.likes-count');
            };

            var getBigPictureDescription = function () {
              return getBigPicture().querySelector('.social__caption');
            };

            getBigPictureAddress().src = currentPhoto.url;
            getBigPictureCountLikes().textContent = currentPhoto.likes;
            getBigPictureDescription().textContent = currentPhoto.description;
          };

          renderFullPhoto();

          var renderComments = function () {
            var getSocialComment = function () {
              return document.querySelector('.social__comment');
            };

            var getAllSocialComments = function () {
              return document.querySelectorAll('.social__comment');
            };

            var getSocialCommentsList = function () {
              return document.querySelector('.social__comments');
            };

            var getBigPictureCountComments = function () {
              return document.querySelector('.comments-count');
            };

            currentPhoto.comments.forEach(function (comment) {
              var newSocialComment = getSocialComment().cloneNode(true);

              var getSocialPicture = function () {
                return newSocialComment.querySelector('.social__picture');
              };

              var getSocialCommentText = function () {
                return newSocialComment.querySelector('.social__text');
              };

              getSocialCommentsList().appendChild(newSocialComment);

              getSocialPicture().src = comment.avatar;
              getSocialPicture().alt = comment.author;
              getBigPictureCountComments().textContent = getAllSocialComments().length;
              getSocialCommentText().textContent = comment.message;
            });
          };

          renderComments();

          var getBigPictureCancel = function () {
            return document.querySelector('.big-picture__cancel');
          };

          var closePostPopup = function () {
            getBigPicture().classList.add('hidden');
          };

          var onEscCloseFullPhoto = function (evtEsc) {
            window.util.escEvent(evtEsc, closePostPopup);
          };

          getBigPictureCancel().addEventListener('click', closePostPopup);

          var showFullPhoto = function () {
            return getBigPicture().classList.remove('hidden');
          };

          showFullPhoto();

          document.addEventListener('keydown', onEscCloseFullPhoto);
        };

        photoElement.addEventListener('click', onClickShowFullPhoto);
      }

      return photos;
    }
  };

  var onReceiveSuccess = function (photos) {
    window.gallery.photos = photos;
    window.gallery.buildGallery(photos);

    var getImgFilters = function () {
      return document.querySelector('.img-filters');
    };

    getImgFilters().classList.remove('img-filters--inactive');

    var renderCurrentGallery = function (name, callback) {
      var currentButton = function () {
        return document.querySelector('#filter-' + name + '');
      };

      var onClickCurrentButton = function () {
        callback();
      };

      currentButton().addEventListener('click', onClickCurrentButton);
    };

    var getPictures = function () {
      return document.querySelectorAll('.pictures a');
    };

    var removePictures = function () {
      getPictures().forEach(function (element) {
        element.parentNode.removeChild(element);
      });
    };

    var toogleActiveButton = function (className) {
      var getActivePhotosButton = function () {
        return document.querySelector('.img-filters__button--active');
      };

      var getRandomPhotosButton = function () {
        return document.querySelector('#' + className + '');
      };

      getActivePhotosButton().classList.remove('img-filters__button--active');

      getRandomPhotosButton().classList.add('img-filters__button--active');
    };

    renderCurrentGallery('popular', function () {
      removePictures();

      toogleActiveButton('filter-popular');

      window.gallery.photos = photos;
      window.setTimeout(function () {
        window.gallery.buildGallery(photos);
      }, 500);
    });

    renderCurrentGallery('random', function () {
      removePictures();

      toogleActiveButton('filter-random');

      var photoCopy = photos.slice();

      photoCopy.sort(function () {
        return 0.5 - Math.random();
      });

      photoCopy.splice(10);

      window.setTimeout(function () {
        window.gallery.buildGallery(photoCopy);
      }, 500);
    });

    renderCurrentGallery('discussed', function () {
      removePictures();

      toogleActiveButton('filter-discussed');

      var photoCopy = photos.slice();

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
    });
  };

  var onReceiveError = function () {
    var getErrorTemplate = function () {
      return document.querySelector('#error').content.querySelector('.error');
    };

    var getMainPage = function () {
      return document.querySelector('main');
    };

    var errorElement = function () {
      return getErrorTemplate().cloneNode(true);
    };

    getMainPage().appendChild(errorElement());
  };

  window.receive('https://js.dump.academy/kekstagram/data', onReceiveSuccess, onReceiveError);
}());

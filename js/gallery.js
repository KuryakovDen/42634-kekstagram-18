'use strict';

(function () {
  window.gallery = {
    buildGallery: function (photos) {
      var getPhotoTemplate = function () {
        return document.querySelector('#picture').content.querySelector('.picture');
      };

      var bigPicture = function () {
        return document.querySelector('.big-picture');
      };

      var getPhoto = function (element) {
        return element.url === this.attributes.src.value;
      };

      for (var i = 0; i < photos.length; i++) {

        var renderGalleryPhotos = function () {
          var photoElement = getPhotoTemplate().cloneNode(true);

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

          photoElement.addEventListener('click', onClickShowFullPhoto);
        };

        renderGalleryPhotos();

        var onClickShowFullPhoto = function (evt) {
          var target = evt.target;

          var currentPhoto = window.gallery.photos.find(getPhoto, target);

          var renderFullPhoto = function () {
            var getBigPictureAddress = function () {
              return bigPicture().querySelector('.big-picture__img img');
            };

            var getBigPictureCountLikes = function () {
              return bigPicture().querySelector('.likes-count');
            };

            var getBigPictureDescription = function () {
              return bigPicture().querySelector('.social__caption');
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

            /* var hideCommentCount = function () {
              return document.querySelector('.social__comment-count').classList.add('visually-hidden');
            };

            var hideCommentsLoader = function () {
              return document.querySelector('.comments-loader').classList.add('visually-hidden');
            };*/

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

          // hideCommentsLoader();
          // hideCommentCount();

          var getBigPictureCancel = function () {
            return document.querySelector('.big-picture__cancel');
          };

          var closePostPopup = function () {
            bigPicture().classList.add('visually-hidden');
          };

          var onEscCloseFullPhoto = function (evt) {
            window.util.escEvent(evt, closePostPopup);
          };

          getBigPictureCancel().addEventListener('click', closePostPopup);

          var showFullPhoto = function () {
            return bigPicture().classList.remove('hidden');
          };

          showFullPhoto();

          document.addEventListener('keydown', onEscCloseFullPhoto);
        };
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

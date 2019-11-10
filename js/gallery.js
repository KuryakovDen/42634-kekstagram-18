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

      var getBigPictureAddress = function () {
        return getBigPicture().querySelector('.big-picture__img img');
      };

      var getBigPictureCountLikes = function () {
        return getBigPicture().querySelector('.likes-count');
      };

      var getBigPictureDescription = function () {
        return getBigPicture().querySelector('.social__caption');
      };

      var onClosePostPopup = function () {
        getBigPicture().classList.add('hidden');
      };

      var onEscCloseFullPhoto = function (evtEsc) {
        window.util.escEvent(evtEsc, onClosePostPopup);
      };

      var showFullPhoto = function () {
        return getBigPicture().classList.remove('hidden');
      };

      var getBigPictureCancel = function () {
        return document.querySelector('.big-picture__cancel');
      };

      for (var i = 0; i < photos.length; i++) {
        var photoElement = getPhotoTemplate().cloneNode(true);

        var renderGalleryPhotos = function () {
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
            getBigPictureAddress().src = currentPhoto.url;
            getBigPictureCountLikes().textContent = currentPhoto.likes;
            getBigPictureDescription().textContent = currentPhoto.description;
          };

          renderFullPhoto();

          var renderComments = function () {
            currentPhoto.comments.forEach(function (comment) {
              var newSocialComment = getSocialComment().cloneNode(true);

              newSocialComment.classList.remove('visually-hidden');

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
          showFullPhoto();

          getBigPictureCancel().addEventListener('click', onClosePostPopup);
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
    var gallery = window.another;

    gallery.getImgFilters().classList.remove('img-filters--inactive');

    gallery.renderCurrentGallery('popular', window.another.onClickPopularGallery);
    gallery.renderCurrentGallery('random', window.another.onClickRandomGallery);
    gallery.renderCurrentGallery('discussed', window.another.onClickDiscussedGallery);
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

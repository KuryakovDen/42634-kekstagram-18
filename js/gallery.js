'use strict';

(function () {
  var getBigPicture = function () {
    return document.querySelector('.big-picture');
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

  var getPhotoTemplate = function () {
    return document.querySelector('#picture').content.querySelector('.picture');
  };

  var getPicturesList = function () {
    return document.querySelector('.pictures');
  };

  var getSocialComments = function () {
    return document.querySelector('.social__comments');
  };

  var getSocialComment = function () {
    return document.querySelector('.social__comment');
  };

  var getCountAllComments = function () {
    return document.querySelector('.comments-count');
  };

  var getCountSomeComments = function () {
    return document.querySelector('.comments-count--current');
  };

  var getCommentsLoader = function () {
    return document.querySelector('.social__comments-loader');
  };

  var getBigPictureCancel = function () {
    return document.querySelector('.big-picture__cancel');
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

  var onClickShowFullPhoto = function (evt) {
    window.hashtags.getPictureHashtags().setCustomValidity('');
    var target = evt.target;
    var currentPhoto = window.gallery.photos.find(function (element) {
      return element.url === target.attributes.src.value;
    });

    var renderFullPhoto = function () {
      getBigPictureAddress().src = currentPhoto.url;
      getBigPictureCountLikes().textContent = currentPhoto.likes;
      getBigPictureDescription().textContent = currentPhoto.description;
    };

    renderFullPhoto();

    var renderComments = function (highBorder) {
      var fragment = document.createDocumentFragment();
      var socialComments = getSocialComments();

      currentPhoto.comments
      .slice(0, highBorder)
      .forEach(function (comment) {
        var newSocialComment = getSocialComment().cloneNode(true);

        newSocialComment.classList.remove('visually-hidden');

        var getSocialPicture = function () {
          return newSocialComment.querySelector('.social__picture');
        };

        var getSocialCommentText = function () {
          return newSocialComment.querySelector('.social__text');
        };

        fragment.appendChild(newSocialComment);

        getSocialPicture().src = comment.avatar;
        getSocialPicture().alt = comment.author;
        getCountAllComments().textContent = getSocialComments().length;
        getSocialCommentText().textContent = comment.message;
      });

      socialComments.innerHTML = '';
      socialComments.appendChild(fragment);

      if (parseInt(window.gallery.defaultComments, 10) >= parseInt(currentPhoto.comments.length, 10)) {
        window.gallery.defaultComments = currentPhoto.comments.length;
        getCommentsLoader().classList.add('hidden');
      }

      getCountAllComments().textContent = parseInt(currentPhoto.comments.length, 10);
      getCountSomeComments().textContent = parseInt(window.gallery.defaultComments, 10);
    };

    renderComments(window.gallery.showedComments);

    getCommentsLoader().addEventListener('click', function () {
      window.gallery.showedComments += 5;
      window.gallery.defaultComments += 5;

      renderComments(window.gallery.showedComments);
    });
    showFullPhoto();

    getBigPictureCancel().addEventListener('click', onClosePostPopup);
    document.addEventListener('keydown', onEscCloseFullPhoto);
  };

  window.gallery = {
    showedComments: 5,
    defaultComments: 5,

    buildGallery: function (photos) {

      var fragment = document.createDocumentFragment();

      var renderGalleryPhotos = function (photo) {
        var photoElement = document.createRange().createContextualFragment(getPhotoTemplate().innerHTML);
        var image = photoElement.querySelector('img');

        var comments = photoElement.querySelector('.picture__comments');
        var likes = photoElement.querySelector('.picture__likes');

        image.src = photo.url;
        likes.textContent = photo.likes;
        comments.textContent = photo.comments.message;

        fragment.appendChild(photoElement);
      };

      photos.forEach(renderGalleryPhotos);

      getPicturesList().appendChild(fragment);

      document.querySelectorAll('.picture__img').forEach(function (image) {
        image.addEventListener('click', onClickShowFullPhoto);
      });

      return photos;
    }
  };

  var onReceiveSuccess = function (photos) {
    window.gallery.photos = photos;
    window.gallery.buildGallery(photos);
    var gallery = window.another;

    gallery.getImgFilters().classList.remove('img-filters--inactive');

    gallery.renderCurrentGallery('popular', gallery.onClickPopularGallery);
    gallery.renderCurrentGallery('random', gallery.onClickRandomGallery);
    gallery.renderCurrentGallery('discussed', gallery.onClickDiscussedGallery);
  };

  var onReceiveError = function () {
    var fragment = document.createDocumentFragment();
    var getErrorTemplate = function () {
      return document.querySelector('#error').content.querySelector('.error');
    };

    var getMainPage = function () {
      return document.querySelector('main');
    };

    var errorElement = function () {
      return getErrorTemplate().cloneNode(true);
    };

    fragment.appendChild(errorElement());

    getMainPage().appendChild(fragment);
  };

  window.receive('https://js.dump.academy/kekstagram/data', onReceiveSuccess, onReceiveError);
}());

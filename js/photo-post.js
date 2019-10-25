'use strict';

(function () {
  var examplePhoto = 1;

  var showFullPost = function () {
    return document.querySelector('.picture');
  };

  var onClickShowFullPhoto = function () {
    var bigPicture = document.querySelector('.big-picture');

    var getFirstSocialComment = function () {
      return document.querySelector('.social__comment');
    };

    var getAllSocialComments = function () {
      return document.querySelectorAll('.social__comment');
    };

    var getSocialCommentsList = function () {
      return document.querySelector('.social__comments');
    };

    var showBigPicture = function () {
      return bigPicture.classList.remove('hidden');
    };

    var getBigPictureCountComments = function () {
      return bigPicture.querySelector('.comments-count');
    };

    var hideCommentCount = function () {
      return document.querySelector('.social__comment-count').classList.add('visually-hidden');
    };

    var hideCommentsLoader = function () {
      return document.querySelector('.comments-loader').classList.add('visually-hidden');
    };

    var getBigPictureAddress = function () {
      return bigPicture.querySelector('.big-picture__img img');
    };

    var getBigPictureCountLikes = function () {
      return bigPicture.querySelector('.likes-count');
    };

    var getBigPictureDescription = function () {
      return bigPicture.querySelector('.social__caption');
    };

    showBigPicture();

    var firstPhotoFull = window.gallery.getPhotoDescription(examplePhoto)[0];


    getBigPictureAddress().src = firstPhotoFull.url;
    getBigPictureCountLikes().textContent = firstPhotoFull.likes;
    getBigPictureDescription().textContent = firstPhotoFull.description;

    var getNewSocialComment = function () {
      var newSocialComment = getFirstSocialComment().cloneNode(true);

      var getSocialPicture = function () {
        return newSocialComment.querySelector('.social__picture');
      };

      var socialPicture = getSocialPicture();

      var getSocialCommentText = function () {
        return newSocialComment.querySelector('.social__text');
      };

      getSocialCommentsList().appendChild(newSocialComment);

      socialPicture.src = firstPhotoFull.comment.avatar;
      socialPicture.alt = firstPhotoFull.comment.author;
      getBigPictureCountComments().textContent = getAllSocialComments().length;
      getSocialCommentText().textContent = firstPhotoFull.comment.message;
    };

    getNewSocialComment();
    hideCommentsLoader();
    hideCommentCount();

    var getBigPictureCancel = function () {
      return document.querySelector('.big-picture__cancel');
    };

    var onClickPopupCancel = function () {
      bigPicture.classList.add('visually-hidden');
    };

    getBigPictureCancel().addEventListener('click', onClickPopupCancel);
  };

  showFullPost().addEventListener('click', onClickShowFullPhoto);


  /* var closePicturePopup = function () {
    return bigPicture.classList.add('hidden');
  };
  var onPressEscPopup = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePicturePopup();
    }
  };
  var openPicturePopup = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPressEscPopup);
  };*/

  var getNewUploadPhoto = function () {
    return document.querySelector('#upload-file');
  };

  window.post = {
    getFormEditPicture: function () {
      return document.querySelector('.img-upload__overlay');
    }
  };

  var getEditPictureCancel = function () {
    return window.post.getFormEditPicture().querySelector('.img-upload__cancel');
  };

  getEditPictureCancel().addEventListener('click', function () {
    window.post.getFormEditPicture().classList.add('hidden');
  });

  var onClickUploadFile = function (evt) {
    evt.preventDefault();
    window.post.getFormEditPicture().classList.remove('hidden');
  };

  getNewUploadPhoto().addEventListener('change', onClickUploadFile);
}());

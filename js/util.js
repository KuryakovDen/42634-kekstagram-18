'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    keyEvent: function (evt, action, key) {
      if (evt.keyCode === key) {
        action();
      }
    },

    getRandomElement: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
  };
}());

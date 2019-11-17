'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var SEND_METHOD = 'POST';
  var RECEIVE_METHOD = 'GET';

  window.receive = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open(RECEIVE_METHOD, url);
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout + ' мс');
    });

    xhr.send();
  };

  window.send = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.open(SEND_METHOD, url);

    xhr.responseType = 'json';
    xhr.send(data);
  };
}());

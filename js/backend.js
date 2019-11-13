'use strict';

(function () {
  var successCode = 200;
  var sendMethod = 'POST';
  var receiveMethod = 'GET';

  window.receive = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open(receiveMethod, url);
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === successCode) {
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
      if (xhr.status === successCode) {
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

    xhr.open(sendMethod, url);

    xhr.responseType = 'json';
    xhr.send(data);
  };
}());

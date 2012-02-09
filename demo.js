/*global window:false, document:false, iScroll:false */
(function (window, document, Scroller) {
  'use strict';
  function ready() {
    var start = new Date().getTime(),
      scrollElem = document.getElementById('scroll'),
      logElem = document.getElementById('log'),
      scroller = new Scroller(scrollElem, {
        onBeforeScrollStart: function (e) {
          var targetTag = e.target.tagName.toLowerCase();
          if (targetTag !== 'input' && targetTag !== 'select' && targetTag !== 'textarea') {
            e.preventDefault();
          }
        }
      });

    document.addEventListener('mousewheel', (function(e) {
      return e.preventDefault();
    }), false);

    function tag(prefix) {
      return prefix + ' ' + (new Date().getTime() - start) + 'ms';
    }

    function appendOutput(tag, message) {
      logElem.appendChild(document.createTextNode(tag + ': ' + message));
      logElem.appendChild(document.createElement('br'));
      scroller.refresh();
    }

    window.addEventListener('viewportchanged', function () {
      appendOutput(tag('viewportchanged'), JSON.stringify(window.viewport));
      scroller.refresh();
    });
  }

  document.addEventListener('DOMContentLoaded', ready, false);
}(document.defaultView, document, iScroll));
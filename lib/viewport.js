(function (window, document, navigator) {
  'use strict';
  var documentElement = document.documentElement,
    width = documentElement.clientWidth,
    height = documentElement.clientHeight,
    viewport = {width: width, height: height},
    userAgent = navigator.userAgent,
    mobile_iOS = (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPod') !== -1) && !navigator.standalone,
    mobile_Android = userAgent.indexOf('Android') !== -1 && userAgent.indexOf('Mobile') !== -1,
    previousOrientation = window.orientation,
    top = 0,
    check,
    interval,
    iterations;

  window.viewport = viewport;

  document.body.style.height = height + 'px';

  function update(width, height) {
    var event;
    if (viewport.height !== height || viewport.width !== width) {
      document.body.style.height = height + 'px';
      viewport.height = height;
      viewport.width = width;
      event = document.createEvent('Event');
      event.initEvent('viewportchanged', false, false);
      window.dispatchEvent(event);
    }
  }

  if (mobile_iOS) {
    check = function (newHeight) {
      // done as soon as we have a new height
      return newHeight !== viewport.height;
    };
  } else if (mobile_Android) {
    top = 1;
    check = function () {
      // Android updates the height as it is animating
      // to pageYOffset 1, so we need to wait until it
      // isn't zero
      return window.pageYOffset > 0;
    };
  } else {
    window.addEventListener('resize', function () {
      update(documentElement.clientWidth, documentElement.clientHeight);
    }, false);
    // nothing else todo
    return;
  }

  function iteration() {
    viewport.count++;

    window.scrollTo(0, top);

    if (check(window.innerHeight) || --iterations < 0) {
      documentElement.style.minHeight = window.innerHeight + 'px';

      window.clearInterval(interval);
      interval = null;

      update(window.innerWidth, window.innerHeight);
    }
  }

  function start() {
    // maximize the document element's height to be able to scroll away the url bar
    viewport.count = 0;

    documentElement.style.minHeight = '5000px';

    if (interval) {
      window.clearInterval(interval);
    }

    window.scrollTo(0, top); // Android needs to scroll by at least 1px

    iterations = 20;
    interval = window.setInterval(iteration, 10);
  }

  window.addEventListener("orientationchange", function () {
    if (previousOrientation !== window.orientation) {
      previousOrientation = window.orientation;
      start();
    }
  }, false);

  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", start, false);
  } else {
    start();
  }
}(document.defaultView || window, document, navigator));

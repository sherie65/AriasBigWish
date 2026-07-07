(function () {
  "use strict";

  // Mobile scroll shake — fires when image enters the viewport on touch devices
  // Only runs on devices that don't support hover (i.e. mobile/touch)
  var isTouchDevice = !window.matchMedia("(hover: hover)").matches;

  if (!isTouchDevice) return;
  if (!("IntersectionObserver" in window)) return;

  var shaken = new WeakSet();

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var img = entry.target;
      if (entry.isIntersecting && !shaken.has(img)) {
        shaken.add(img);
        img.classList.add("shake-scroll");
        img.addEventListener("animationend", function () {
          img.classList.remove("shake-scroll");
        }, { once: true });
      }
    });
  }, {
    threshold: 0.6
  });

  document.querySelectorAll(".review-img").forEach(function (img) {
    observer.observe(img);
  });

})();

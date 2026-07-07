(function () {
  "use strict";

  // Don't show on the quiz page itself
  if (window.location.pathname.indexOf("quiz.html") !== -1) return;

  // Only show once per session
  if (sessionStorage.getItem("exit-popup-seen")) return;

  var popup = null;
  var triggered = false;
  var scrollThreshold = 300; // px scrolled before mobile trigger is armed
  var scrollBackAmount = 100; // px scrolled back up to trigger on mobile
  var lastScrollY = window.scrollY;
  var maxScrollY = 0;

  function buildPopup() {
    var el = document.createElement("div");
    el.id = "exit-popup-overlay";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "exit-popup-title");
    el.innerHTML = [
      '<div id="exit-popup">',
        '<button id="exit-popup-close" aria-label="Close">&times;</button>',
        '<img src="assets/img/luggage-tag.webp" alt="Free personalized mermaid luggage tag" id="exit-popup-tag">',
        '<h2 id="exit-popup-title">Before you go&hellip; 🌊</h2>',
        '<p>Every great mermaid story deserves a real-life sequel. Take our 2-minute quiz and find the cruise adventure that fits you best.</p>',
        '<a href="quiz.html" id="exit-popup-cta">Find My Adventure Match &rarr;</a>',
        '<button id="exit-popup-dismiss">No thanks, I\'ll skip the adventure</button>',
      '</div>'
    ].join("");
    document.body.appendChild(el);

    document.getElementById("exit-popup-close").addEventListener("click", closePopup);
    document.getElementById("exit-popup-dismiss").addEventListener("click", closePopup);
    el.addEventListener("click", function (e) {
      if (e.target === el) closePopup();
    });

    // Trap focus inside popup
    el.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePopup();
    });

    return el;
  }

  function showPopup() {
    if (triggered) return;
    triggered = true;
    sessionStorage.setItem("exit-popup-seen", "1");

    popup = buildPopup();

    // Slight delay so it feels intentional, not instant
    setTimeout(function () {
      popup.classList.add("visible");
      var cta = document.getElementById("exit-popup-cta");
      if (cta) cta.focus();
    }, 80);
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove("visible");
    setTimeout(function () {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    }, 300);
  }

  // ---- Desktop: mouse exits toward top of window ----
  var isTouch = !window.matchMedia("(hover: hover)").matches;
  if (!isTouch) {
    document.addEventListener("mouseleave", function (e) {
      if (e.clientY <= 10) showPopup();
    });
  }

  // ---- Mobile: user scrolls back up after reading ----
  if (isTouch) {
    window.addEventListener("scroll", function () {
      var currentY = window.scrollY;
      maxScrollY = Math.max(maxScrollY, currentY);

      if (maxScrollY > scrollThreshold && (maxScrollY - currentY) > scrollBackAmount) {
        showPopup();
      }
      lastScrollY = currentY;
    }, { passive: true });
  }

})();

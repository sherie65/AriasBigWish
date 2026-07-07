(function () {
  "use strict";

  var KIT_API_KEY = "u4al61I-Wdrdg_i5oFLGaw";
  var KIT_FORM_ID = "ced453e4bc";

  var EMAILS = {
    book:   "mermaidariabooks@gmail.com",
    travel: "shellotravels@gmail.com"
  };

  // ---- Contact form ----
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var topic   = document.getElementById("contact-topic").value;
      var name    = document.getElementById("contact-name").value.trim();
      var email   = document.getElementById("contact-email").value.trim();
      var message = document.getElementById("contact-message").value.trim();

      // Simple validation
      var valid = true;
      [document.getElementById("contact-topic"),
       document.getElementById("contact-name"),
       document.getElementById("contact-email"),
       document.getElementById("contact-message")].forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        } else {
          field.classList.remove("error");
        }
      });
      if (!valid) return;

      var dest = EMAILS[topic] || EMAILS.book;
      var subject = encodeURIComponent("Message from " + name + " via mermaidaria.com");
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Topic: " + topic + "\n\n" +
        message
      );

      window.location.href = "mailto:" + dest + "?subject=" + subject + "&body=" + body;

      // NOTE: To upgrade to Formspree, replace the mailto above with:
      // fetch("https://formspree.io/f/YOUR_FORM_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, topic, message })
      // }).then(function() { showConfirmation(); });
    });
  }

  // ---- Newsletter form — submits silently to Kit ----
  var newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameInput  = newsletterForm.querySelector("input[name='first_name']");
      var emailInput = newsletterForm.querySelector("input[name='email']");
      var name  = nameInput.value.trim();
      var email = emailInput.value.trim();

      if (!name || !email) {
        if (!name) nameInput.style.borderColor = "var(--pink)";
        if (!email) emailInput.style.borderColor = "var(--pink)";
        return;
      }

      var btn = newsletterForm.querySelector("button");
      btn.textContent = "Signing you up...";
      btn.disabled = true;

      fetch("https://api.convertkit.com/v3/forms/" + KIT_FORM_ID + "/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          first_name: name,
          email: email,
          tags: ["newsletter-signup"]
        })
      })
      .then(function () {
        btn.textContent = "You're in! 🐚";
        nameInput.value = "";
        emailInput.value = "";
      })
      .catch(function () {
        btn.textContent = "Sign Me Up";
        btn.disabled = false;
      });
    });
  }

})();

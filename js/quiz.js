(function () {
  "use strict";

  // Kit V3 API credentials
  var KIT_API_KEY = "u4al61I-Wdrdg_i5oFLGaw";
  var KIT_FORM_ID = "ced453e4bc";

  // Tag names — Kit will create them automatically if they don't exist yet
  var TAGS = {
    "step-result-family":        "match-disney-wish",
    "step-result-adult":         "match-virgin-voyages",
    "step-result-budget-family": "match-budget-family",
    "step-result-budget-adult":  "match-budget-adult"
  };

  var steps = Array.prototype.slice.call(document.querySelectorAll(".quiz-step"));
  var questionSteps = steps.filter(function (s) { return s.dataset.step === "question"; });
  var score = { family: 0, adult: 0, budget: 0 };
  var currentIndex = -1;

  function showStep(step) {
    steps.forEach(function (s) { s.hidden = true; });
    step.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startQuiz() {
    currentIndex = 0;
    showStep(questionSteps[currentIndex]);
  }

  function answerQuestion(btn) {
    score.family += parseInt(btn.dataset.family || 0);
    score.adult  += parseInt(btn.dataset.adult  || 0);
    score.budget += parseInt(btn.dataset.budget || 0);
    currentIndex += 1;
    if (currentIndex < questionSteps.length) {
      showStep(questionSteps[currentIndex]);
    } else {
      showStep(document.getElementById("step-email"));
    }
  }

  function getResultId() {
    if (score.budget >= 1) {
      return score.family >= score.adult
        ? "step-result-budget-family"
        : "step-result-budget-adult";
    }
    return score.family >= score.adult
      ? "step-result-family"
      : "step-result-adult";
  }

  function subscribeToKit(name, email, tag) {
    // Subscribe to the form — this adds them to the list and triggers any
    // welcome automations you set up in Kit later
    var formUrl = "https://api.convertkit.com/v3/forms/" + KIT_FORM_ID + "/subscribe";
    fetch(formUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        first_name: name,
        email: email,
        tags: [tag]
      })
    })
    .then(function (res) {
      if (!res.ok) {
        console.warn("Kit subscription failed:", res.status);
      }
    })
    .catch(function (err) {
      // Silent fail — don't block the user from seeing their result
      console.warn("Kit error:", err);
    });
  }

  function revealResult(name, email) {
    var resultId = getResultId();
    var resultStep = document.getElementById(resultId);
    var tag = TAGS[resultId];

    // Fire the Kit subscription silently in the background
    subscribeToKit(name, email, tag);

    // Show the result immediately — don't wait for Kit to respond
    showStep(resultStep);
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-action='start']")) {
      startQuiz();
      return;
    }
    var optionBtn = e.target.closest(".quiz-option");
    if (optionBtn) {
      answerQuestion(optionBtn);
    }
  });

  document.getElementById("quiz-email-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name  = document.getElementById("quiz-name").value.trim();
    var email = document.getElementById("quiz-email").value.trim();
    revealResult(name, email);
  });
})();

(function () {
  "use strict";

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

  function revealResult(name, email) {
    var resultId = getResultId();
    var resultStep = document.getElementById(resultId);

    var resultNames = {
      "step-result-family":        "Disney Wish (family)",
      "step-result-adult":         "Virgin Voyages (adults-only)",
      "step-result-budget-family": "Value Cruise — family",
      "step-result-budget-adult":  "Value Getaway — adults"
    };

    var mailLink = resultStep.querySelector("a.result-cta");
    var subject = encodeURIComponent("Adventure quiz match: " + resultNames[resultId]);
    var body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Match: " + resultNames[resultId]
    );
    mailLink.href = "mailto:shellotravels@gmail.com?subject=" + subject + "&body=" + body;

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

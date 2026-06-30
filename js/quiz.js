(function () {
  "use strict";

  var steps = Array.prototype.slice.call(document.querySelectorAll(".quiz-step"));
  var questionSteps = steps.filter(function (s) { return s.dataset.step === "question"; });
  var score = { family: 0, adult: 0 };
  var currentIndex = -1; // -1 = intro

  function showStep(step) {
    steps.forEach(function (s) { s.hidden = true; });
    step.hidden = false;
    window.scrollTo({ top: step.offsetTop - 40, behavior: "smooth" });
  }

  function startQuiz() {
    currentIndex = 0;
    showStep(questionSteps[currentIndex]);
  }

  function answerQuestion(value) {
    if (value === "family" || value === "adult") {
      score[value] += 1;
    }
    currentIndex += 1;
    if (currentIndex < questionSteps.length) {
      showStep(questionSteps[currentIndex]);
    } else {
      showStep(document.getElementById("step-email"));
    }
  }

  function revealResult(name, email) {
    var resultId = score.family >= score.adult ? "step-result-family" : "step-result-adult";
    var resultStep = document.getElementById(resultId);

    // Personalize the result copy and the follow-up mailto link with the
    // quiz-taker's name/email/answers, since there's no email-list tool
    // wired up yet — this is a stand-in until one is connected.
    var mailLink = resultStep.querySelector("a.btn");
    var subject = encodeURIComponent("Cruise quiz match: " + (resultId === "step-result-family" ? "Disney Wish" : "Virgin Voyages"));
    var body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Match: " + (resultId === "step-result-family" ? "Disney Wish (family)" : "Virgin Voyages (adults-only)")
    );
    mailLink.href = "mailto:shellotravels@gmail.com?subject=" + subject + "&body=" + body;

    showStep(resultStep);
  }

  document.addEventListener("click", function (e) {
    var startBtn = e.target.closest("[data-action='start']");
    if (startBtn) {
      startQuiz();
      return;
    }
    var optionBtn = e.target.closest(".quiz-option");
    if (optionBtn) {
      answerQuestion(optionBtn.dataset.value);
    }
  });

  var emailForm = document.getElementById("quiz-email-form");
  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("quiz-name").value.trim();
    var email = document.getElementById("quiz-email").value.trim();
    revealResult(name, email);
  });
})();

(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const surveyForm = document.getElementById("surveyForm");
  const formMessage = document.getElementById("formMessage");

  document.getElementById("year").textContent = new Date().getFullYear();

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Toggle navigation");
      menuToggle.textContent = "☰";
    });
  });

  surveyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!surveyForm.reportValidity()) return;

    const formData = new FormData(surveyForm);
    const response = {
      role: formData.get("role"),
      activity: formData.get("activity"),
      smartphone: formData.get("smartphone"),
      support: formData.get("support") || "Not specified"
    };

    // Demo-only behavior: save this response in the current browser.
    // Connect a secure backend or Google Forms endpoint for real collection.
    try {
      const storedResponses = JSON.parse(localStorage.getItem("digitalSaathiSurveyResponses") || "[]");
      storedResponses.push({ ...response, submittedAt: new Date().toISOString() });
      localStorage.setItem("digitalSaathiSurveyResponses", JSON.stringify(storedResponses));
      formMessage.textContent = "Thank you! Your demo response was saved in this browser only.";
      surveyForm.reset();
    } catch (error) {
      formMessage.textContent = "Your browser could not save this demo response. Please try again.";
    }
  });
})();
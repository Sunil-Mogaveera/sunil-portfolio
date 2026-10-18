const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async event => {
  event.preventDefault();
  status.classList.remove("error");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2) {
    showError("Please enter your name (at least 2 characters).");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("Please enter a valid email address.");
  } else if (subject.length < 3) {
    showError("Please enter a subject with at least 3 characters.");
  } else if (message.length < 10) {
    showError("Please enter a message with at least 10 characters.");
  } else {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "Sending your message...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/sm6244@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _replyto: email,
          _subject: subject,
          message: message
        })
      });
      const result = await response.json();
      if (response.ok && result.success === "true") {
        status.textContent = "Thank you! Your message has been sent successfully.";
        form.reset();
      } else {
        showError("The message could not be sent. Please email sm6244@gmail.com directly.");
      }
    } catch (error) {
      showError("Unable to send right now. Please email sm6244@gmail.com directly.");
    } finally {
      button.disabled = false;
      button.textContent = "Send Message ↗";
    }
  }
});

function showError(message) {
  status.textContent = message;
  status.classList.add("error");
}

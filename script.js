const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const typedTarget = document.getElementById("typed-line");
const phrases = [
  "build something useful.",
  "learn the next skill.",
  "turn theory into practice.",
  "keep improving."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typedTarget.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    typedTarget.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 62);
}

typeLoop();

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // IMPORTANT: replace this with your real email address.
  const YOUR_EMAIL = "YOUR_EMAIL_HERE";

  const data = new FormData(contactForm);
  const name = data.get("name");
  const email = data.get("email");
  const service = data.get("service");
  const message = data.get("message");

  const subject = encodeURIComponent(`AJDigital inquiry — ${service}`);
  const body = encodeURIComponent(
`Hi John,

My name is ${name}.
My email is ${email}.

I'm interested in: ${service}

${message}`
  );

  if (YOUR_EMAIL === "YOUR_EMAIL_HERE") {
    alert("Before using the contact form, replace YOUR_EMAIL_HERE in script.js with your real email address.");
    return;
  }

  window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
});

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const topics = [
  {
    name: "Digital Transformation",
    title: "Future-ready growth for ambitious teams.",
    summary:
      "We help businesses modernize operations, sharpen customer experience, and unlock smarter decision-making through strategic digital systems.",
    tag: "Growth Focus",
    value: "+38%",
    accent:
      "Strategy, design, and execution for the next phase of your growth.",
  },
  {
    name: "Wellness Consulting",
    title: "Healthier routines, stronger teams, better outcomes.",
    summary:
      "We build purpose-driven wellness programs that improve engagement, support sustainable habits, and elevate performance in everyday operations.",
    tag: "Performance Lift",
    value: "+26%",
    accent:
      "Well-designed experiences that help people feel their best while doing their best work.",
  },
  {
    name: "Sustainable Business",
    title: "Smarter choices. Better impact. Long-term value.",
    summary:
      "We guide teams through practical sustainability initiatives that reduce friction, strengthen brand trust, and create measurable operational gains.",
    tag: "Impact Index",
    value: "+44%",
    accent:
      "A more resilient future starts with aligned strategy and thoughtful execution.",
  },
  {
    name: "Travel Experiences",
    title: "Memorable journeys shaped with intention and ease.",
    summary:
      "We create immersive travel brands and customer experiences that balance inspiration, clarity, and seamless planning from discovery to return.",
    tag: "Booking Growth",
    value: "+52%",
    accent: "Curated journeys that turn wanderlust into confidence and action.",
  },
];

let selectedTopic = topics[Math.floor(Math.random() * topics.length)];

try {
  const savedTopicName = localStorage.getItem("selectedTopic");
  selectedTopic =
    topics.find((topic) => topic.name === savedTopicName) || selectedTopic;
} catch {
  // The page can still work when browser storage is unavailable.
}

const heroTitle = document.getElementById("hero-title");
const heroSummary = document.getElementById("hero-summary");
const topicSummary = document.getElementById("topic-summary");
const miniTag = document.getElementById("mini-tag");
const miniValue = document.getElementById("mini-value");
const pageBadge = document.getElementById("page-badge");
const bannerCopy = document.getElementById("banner-copy");
const pageTitle = document.getElementById("page-title");
const pageLead = document.getElementById("page-lead");
const currentYear = document.getElementById("year");

if (currentYear) currentYear.textContent = new Date().getFullYear();

function updateTopicContent() {
  if (heroTitle) heroTitle.textContent = selectedTopic.title;
  if (heroSummary) heroSummary.textContent = selectedTopic.summary;
  if (topicSummary) topicSummary.textContent = selectedTopic.summary;
  if (miniTag) miniTag.textContent = selectedTopic.tag;
  if (miniValue) miniValue.textContent = selectedTopic.value;
  if (pageBadge) pageBadge.textContent = selectedTopic.name;
  if (bannerCopy) bannerCopy.textContent = selectedTopic.accent;
  if (pageTitle) pageTitle.textContent = selectedTopic.name;
  if (pageLead) pageLead.textContent = selectedTopic.summary;

  const secondaryMiniTag = document.getElementById("mini-tag-secondary");
  const secondaryMiniValue = document.getElementById("mini-value-secondary");
  if (secondaryMiniTag) secondaryMiniTag.textContent = selectedTopic.tag;
  if (secondaryMiniValue) secondaryMiniValue.textContent = selectedTopic.value;

  document.title = `${selectedTopic.name} | Northstar Studio`;
}

function chooseRandomTopic() {
  const alternatives = topics.filter((topic) => topic !== selectedTopic);
  selectedTopic = alternatives[Math.floor(Math.random() * alternatives.length)];

  try {
    localStorage.setItem("selectedTopic", selectedTopic.name);
  } catch {
    // Keep the new topic for this page even when storage is unavailable.
  }

  updateTopicContent();
}

try {
  localStorage.setItem("selectedTopic", selectedTopic.name);
} catch {
  // Storage is optional; the default topic remains available in memory.
}

updateTopicContent();

document.querySelectorAll("[data-change-topic]").forEach((button) => {
  button.addEventListener("click", chooseRandomTopic);
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    }
  });
}

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "Thanks for reaching out. Your message is ready to be sent.";
    contactForm.reset();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

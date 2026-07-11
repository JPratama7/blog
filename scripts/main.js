function initSidebar() {
  const sidebar = document.querySelector(".post-sidebar");
  const toggle = document.querySelector(".sidebar-toggle");

  if (!sidebar || !toggle) {
    return;
  }

  const toggleText = toggle.querySelector(".toggle-text");
  const toggleIcon = toggle.querySelector(".toggle-icon");

  function updateToggleState() {
    const isHidden = sidebar.classList.contains("is-hidden");
    toggle.setAttribute("aria-expanded", String(!isHidden));
    if (toggleText) {
      toggleText.textContent = isHidden ? "Show" : "Hide";
    }
    if (toggleIcon) {
      toggleIcon.textContent = isHidden ? "→" : "←";
    }
  }

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("is-hidden");
    updateToggleState();
  });

  updateToggleState();
}

function initActiveNav() {
  const links = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  for (const link of links) {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, "") || "/";
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
      break;
    }
  }
}

function init() {
  initSidebar();
  initActiveNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export function navigate(path) {
  window.location.assign(path);
}

export function bindNavLinks() {
  const links = document.querySelectorAll("[data-nav]");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const path = link.getAttribute("href");
      if (!path) {
        return;
      }
      navigate(path);
    });
  });
}

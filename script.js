(async () => {
  const $html = document.querySelector("html");
  $html.classList.toggle("dark-mode");
  const $toggle = document.querySelector(".toggle__input");
  $toggle.addEventListener("change", () => {
    $html.classList.toggle("dark-mode");
  });
})();

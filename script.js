(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute("href");
    if (!id || id === "#") return;

    var target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    if (history.replaceState) {
      history.replaceState(null, "", id);
    }

    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus({ preventScroll: true });
  });
})();

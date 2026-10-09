// Shared header and footer. Every page loads this script (without defer) in <head>
// and puts <site-header></site-header> and <site-footer></site-footer> in <body>.
(function () {
  // Links are resolved against this script's location, so the same markup works
  // from the home page and from subpages like support/.
  var base = new URL(".", document.currentScript.src);
  function url(path) {
    return new URL(path, base).href;
  }
  function current(path) {
    return new URL(path, base).pathname === location.pathname
      ? ' aria-current="page"'
      : "";
  }

  // alt is empty because the "POV" text next to the icon already names the link.
  var ICON = '<img src="' + url("assets/app-icon.svg") + '" alt="" />';

  customElements.define(
    "site-header",
    class extends HTMLElement {
      connectedCallback() {
        this.innerHTML =
          '<header class="site-header">' +
          '<div class="wrap">' +
          '<a class="brand" href="' +
          url("./") +
          '" aria-label="POV home">' +
          ICON +
          "POV</a>" +
          '<nav class="site-nav" aria-label="Main">' +
          '<a class="nav-support" href="' +
          url("support/") +
          '"' +
          current("support/") +
          ">Support</a>" +
          '<a class="button button--small" href="' +
          url("./#download") +
          '">Download</a>' +
          "</nav>" +
          "</div>" +
          "</header>";

        var header = this.firstElementChild;
        function onScroll() {
          header.toggleAttribute("data-scrolled", window.scrollY > 4);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      }
    },
  );

  customElements.define(
    "site-footer",
    class extends HTMLElement {
      connectedCallback() {
        this.innerHTML =
          '<footer class="site-footer">' +
          '<div class="wrap">' +
          '<p class="footer-legal">© 2026 POV</p>' +
          '<nav class="footer-nav" aria-label="Footer">' +
          '<a href="' +
          url("./#download") +
          '">Download</a>' +
          '<a href="' +
          url("support/") +
          '"' +
          current("support/") +
          ">Support</a>" +
          '<a href="' +
          url("privacy-policy/") +
          '"' +
          current("privacy-policy/") +
          ">Privacy Policy</a>" +
          "</nav>" +
          "</div>" +
          "</footer>";
      }
    },
  );
})();

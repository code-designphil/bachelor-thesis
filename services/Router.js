const Router = {
  init: function () {
    document.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        let route = link.getAttribute("href");
        Router.go(route);
      });
    });
    // Event handler for URL changes
    window.addEventListener("popstate", function (event) {
      Router.go(event.state.route, false);
    });

    // Check the initial URL
    Router.go(location.pathname);
  },
  go: function (route, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;

    switch (route) {
      case "/":
        pageElement = document.createElement("home-page");
        break;
      case "/kontakt":
        pageElement = document.createElement("contact-page");
        break;
      case "/kontakt-sendungen":
        pageElement = document.createElement("contact-programs-page");
        break;
      case "/wetter":
        pageElement = document.createElement("weather-page");
        break;
      default:
        break;
    }

    if (pageElement) {
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = "";
      mainElement.appendChild(pageElement);
      window.scrollTo(0, 0);
      this.resetFocus();
    }
  },
  resetFocus() {
    if (document.activeElement != document.body) {
      const firstFocusable = document.querySelector(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  },
};

export default Router;

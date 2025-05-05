import Router from "./services/Router.js";

import FooterAccordion from "./components/FooterAccordion.js";
import ContactPage from "./components/ContactPage.js";
import ContactProgramsPage from "./components/ContactProgramsPage.js";
import HomerPage from "./components/HomePage.js";

window.app = {};
app.router = Router;

// It's better to wait for this event because the elements might not be loaded yet even though
// app.js has the defer attribute
window.addEventListener("DOMContentLoaded", function () {
  app.router.init();
});

window.addEventListener("appcartchange", function (event) {
  const badge = document.getElementById("badge");

  badge.textContent = quantity;
  badge.hidden = quantity == 0;
});

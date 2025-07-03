import Router from "./services/Router.js";

import FooterAccordion from "./components/FooterAccordion.js";
import ContactPage from "./components/ContactPage.js";
import ContactProgramsPage from "./components/ContactProgramsPage.js";
import HomerPage from "./components/HomePage.js";
import SideNavigation from "./components/SideNavigation.js";
import SideNavigationChild from "./components/SideNavigationChild.js";
import OpenSubLinkMenuButton from "./components/openSubLinkMenuButton.js";
import BurgerMenu from "./components/BurgerMenu.js";
import ContactFormTeaser from "./components/ContactFormTeaser.js";
import WeatherPage from "./components/WeatherPage.js";
import WeatherGermanyPage from "./components/WeatherGermanyPage.js";
import EconomyPage from "./components/EconomyPage.js";
import BigArticleTeaser from "./components/BigArticleTeaser.js";
import SmallArticleTeaser from "./components/SmallArticleTeaser.js";
import FourOFour from "./components/404.js";
import Toggle from "./components/Toggle.js";
import FootballTicker from "./components/footballTicker.js";
import MindestlohnPage from "./components/MindestlohnPage.js";
import MehrMindestlohnPage from "./components/MehrMindestlohnPage.js";
import ECarPage from "./components/ECarPage.js";

window.app = {};
app.router = Router;

// It's better to wait for this event because the elements might not be loaded yet even though
// app.js has the defer attribute
window.addEventListener("DOMContentLoaded", function () {
  app.router.init();
});

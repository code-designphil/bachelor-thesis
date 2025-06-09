export default class BurgerMenu extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  closeSidenavigation(sideNavigation, navigationWrapper, button) {
    sideNavigation.style.display = "none";
    navigationWrapper.classList.toggle("side-navigation-wrapper-moved");
    button.ariaExpanded = "false";
  }

  getButtonInnerHtml(isExpanded) {
    return `
        <img
            src="resources/svg/${!isExpanded ? "cross" : "burger"}.svg"
            width="${!isExpanded ? "30" : "36"}"
            alt=""
            aria-hidden="true"
        />
      `;
  }

  async connectedCallback() {
    const styles = document.createElement("style");
    const request = await fetch("/components/BurgerMenu.css");
    styles.textContent = await request.text();

    const button = document.createElement("button");
    button.ariaLabel = "Open menu";
    button.ariaExpanded = "false";
    button.ariaHasPopup = "true";

    button.onclick = (event) => {
      const button = event.currentTarget;
      const sideNavigation = document.getElementById("side-navigation");
      const navigationWrapper = sideNavigation.shadowRoot.querySelector(
        ".side-navigation-wrapper"
      );
      const isExpanded = button.ariaExpanded == "true";

      const BurgerMenu = this;
      document.addEventListener("keydown", function handleESC(e) {
        if (e.key === "Escape" && button.ariaExpanded == "true") {
          button.innerHTML = BurgerMenu.getButtonInnerHtml(true);
          BurgerMenu.closeSidenavigation(
            sideNavigation,
            navigationWrapper,
            button
          );
          button.focus();
        }
      });

      if (isExpanded) {
        this.closeSidenavigation(sideNavigation, navigationWrapper, button);
      } else {
        sideNavigation.style.display = "block";
        setTimeout(
          () =>
            navigationWrapper.classList.toggle("side-navigation-wrapper-moved"),
          10
        );
        button.ariaExpanded = "true";
      }

      button.innerHTML = this.getButtonInnerHtml(isExpanded);
    };

    button.innerHTML = `
        <img
            src="resources/svg/burger.svg"
            width="36"
            alt=""
            aria-hidden="true"
        />
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(button);
  }
}

customElements.define("burger-menu-button", BurgerMenu);

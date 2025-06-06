export default class BurgerMenu extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const styles = document.createElement("style");
    const request = await fetch("/components/BurgerMenu.css");
    styles.textContent = await request.text();

    const button = document.createElement("button");
    button.ariaLabel = "Open menu";
    button.ariaExpanded = "false";
    button.ariaHasPopup = "true";

    button.onclick = function handleBurgerMenuClick(event) {
      const button = event.currentTarget;
      const sideNavigation = document.getElementById("side-navigation");
      const navigationWrapper = sideNavigation.shadowRoot.querySelector(
        ".side-navigation-wrapper"
      );
      const isExpanded = button.ariaExpanded == "true";

      if (isExpanded) {
        sideNavigation.style.display = "none";
        navigationWrapper.classList.toggle("side-navigation-wrapper-moved");
        button.ariaExpanded = "false";
      } else {
        sideNavigation.style.display = "block";
        setTimeout(
          () =>
            navigationWrapper.classList.toggle("side-navigation-wrapper-moved"),
          10
        );
        button.ariaExpanded = "true";
      }

      button.innerHTML = `
        <img
            src="resources/svg/${!isExpanded ? "cross" : "burger"}.svg"
            width="${!isExpanded ? "30" : "36"}"
            alt=""
            aria-hidden="true"
        />
      `;
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

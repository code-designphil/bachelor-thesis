export default class OpenSubLinkMenuButton extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const title = this.getAttribute("title");
    const rootElementId = this.getAttribute("root-element-id");
    const hiddenContentId = this.getAttribute("hidden-content-id");

    const styles = document.createElement("style");
    const request = await fetch("/components/OpenSubLinkMenuButton.css");
    styles.textContent = await request.text();

    const container = document.createElement("button");
    container.ariaLabel = `Open ${title} menu`;
    container.ariaExpanded = "false";
    container.ariaHasPopup = "true";

    container.onclick = function handleOpenSubMenu(event) {
      const rootElement = document.getElementById(rootElementId);
      const shadow = rootElement.shadowRoot;
      const hiddenContent = shadow.getElementById(hiddenContentId);
      const button = event.target;
      const isExpanded = button.ariaExpanded == "true";

      if (isExpanded) {
        hiddenContent.style.display = "none";
        button.ariaExpanded = "false";
      } else {
        hiddenContent.style.display = "block";
        button.ariaExpanded = "true";
      }
    };

    container.innerHTML = `
        <img
            src="resources/svg/arrow-down.svg"
            width="36"
            style="transform: rotate(270deg)"
            alt=""
            aria-hidden="true"
        />
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("open-sub-link-menu-button", OpenSubLinkMenuButton);

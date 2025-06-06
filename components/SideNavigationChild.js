export default class SideNavigationChild extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const rootElementId = this.getAttribute("id");
    const title = this.getAttribute("title");
    const mainLink = this.getAttribute("main-link");
    const subLinks = this.getAttribute("sub-links");

    const styles = document.createElement("style");
    const request = await fetch("/components/SideNavigationChild.css");
    styles.textContent = await request.text();

    const container = document.createElement("li");
    container.innerHTML = `
      <div class="main-link-wrapper">
        <a href="${mainLink}">${title}</a>
        <open-sub-link-menu-button
          title="${title}"
          root-element-id="${rootElementId}"
          sub-links='${subLinks}'
        ></open-sub-link-menu-button>
      </div>
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("side-navigation-child", SideNavigationChild);

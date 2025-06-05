export default class SideNavigation extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const styles = document.createElement("style");
    const request = await fetch("/components/SideNavigation.css");
    styles.textContent = await request.text();

    const container = document.createElement("nav");
    container.innerHTML = `
      <div class="side-navigation-overlay"></div>
      <div class="side-navigation-wrapper">
        <ul style="padding: 0 40px 0 40px">
          <slot></slot>
        </ul>
      </div>
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("side-navigation", SideNavigation);

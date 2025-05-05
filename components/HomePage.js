export default class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("home-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/HomePage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {}
}

customElements.define("home-page", HomePage);

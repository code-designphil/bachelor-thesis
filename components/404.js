export default class FourOFour extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("four-o-four-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const globalStyles = await fetch(
        `/${
          localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
        }styles.css`,
      );
      styles.textContent = await globalStyles.text();
    }

    loadCSS();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    const breadcrumbs = document.getElementById("sub-navigation");
    breadcrumbs.removeChild(breadcrumbs.lastChild);
  }

  render() {}
}

customElements.define("four-o-four-page", FourOFour);

export default class MehrMindestlohnPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("mehr-mindestlohn-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const mindestlohnPageStyles = await fetch(
        "/components/MehrMindestlohnPage.css"
      );
      const globalStyles = await fetch("/styles.css");
      styles.textContent = await mindestlohnPageStyles.text();
      styles.textContent = styles.textContent.concat(await globalStyles.text());
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

  render() {
    const breadcrumbs = document.getElementById("sub-navigation");
    const breadcrumbWrapper = document.createElement("li");
    const breadcrumb = document.createElement("a");
    breadcrumb.href = "/wirtschaft";
    breadcrumb.classList.add("bredcrumb-tag");
    breadcrumb.innerHTML = "Wirtschaft";
    breadcrumbWrapper.append(breadcrumb);
    breadcrumbs.appendChild(breadcrumbWrapper);
  }
}

customElements.define("mehr-mindestlohn-page", MehrMindestlohnPage);

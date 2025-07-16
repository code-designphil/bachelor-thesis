export default class ContactPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("contact-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const contactPageStyles = await fetch("/components/ContactPage.css");
      const globalStyles = await fetch(
        `/${
          localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
        }styles.css`
      );
      styles.textContent = await contactPageStyles.text();
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
    breadcrumb.href = "/kontakt";
    breadcrumb.classList.add("bredcrumb-tag");
    breadcrumb.innerHTML = "Kontakt";
    breadcrumbWrapper.append(breadcrumb);
    breadcrumbs.appendChild(breadcrumbWrapper);
  }
}

customElements.define("contact-page", ContactPage);

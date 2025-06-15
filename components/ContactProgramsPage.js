export default class ContactProgramsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("contact-programs-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const contactPageStyles = await fetch(
        "/components/ContactProgramsPage.css"
      );
      const globalStyles = await fetch("/styles.css");
      styles.textContent = await contactPageStyles.text();
      styles.textContent = styles.textContent.concat(await globalStyles.text());
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("contact-programs-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });

    this.render();
  }

  disconnectedCallback() {
    const breadcrumbs = document.getElementById("sub-navigation");
    for (let i = 0; i < 2; i++) {
      breadcrumbs.removeChild(breadcrumbs.lastChild);
    }
  }
  render() {
    const section = this.root.querySelector("section.wrapper");
    section.innerHTML = `<slot></slot>`;

    const breadcrumbs = document.getElementById("sub-navigation");
    const firstBreadcrumb = document.createElement("a");
    firstBreadcrumb.href = "/kontakt";
    firstBreadcrumb.classList.add("bredcrumb-tag");
    firstBreadcrumb.innerHTML = "Kontakt";
    breadcrumbs.appendChild(firstBreadcrumb);
    const secondBreadcrumb = firstBreadcrumb.cloneNode(true);
    secondBreadcrumb.removeAttribute("href");
    secondBreadcrumb.innerHTML = "Kontakt: Sendungen";
    breadcrumbs.appendChild(secondBreadcrumb);
  }
}

customElements.define("contact-programs-page", ContactProgramsPage);

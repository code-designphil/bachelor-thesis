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
    this.render();
  }

  disconnectedCallback() {
    const breadcrumbs = document.getElementById("sub-navigation");
    for (let i = 0; i < 2; i++) {
      breadcrumbs.removeChild(breadcrumbs.lastChild);
    }
  }
  render() {
    const breadcrumbs = document.getElementById("sub-navigation");
    const firstBreadcrumbWrapper = document.createElement("li");
    const firstBreadcrumb = document.createElement("a");
    firstBreadcrumb.href = "/kontakt";
    firstBreadcrumb.classList.add("bredcrumb-tag");
    firstBreadcrumb.innerHTML = "Kontakt";
    firstBreadcrumbWrapper.appendChild(firstBreadcrumb);
    breadcrumbs.appendChild(firstBreadcrumbWrapper);
    const secondBreadcrumbWrapper = document.createElement("li");
    const secondBreadcrumb = firstBreadcrumb.cloneNode(true);
    secondBreadcrumb.removeAttribute("href");
    secondBreadcrumb.innerHTML = "Kontakt: Sendungen";
    secondBreadcrumbWrapper.appendChild(secondBreadcrumb);
    breadcrumbs.appendChild(secondBreadcrumbWrapper);

    const formElement = this.root.querySelector("form");
    console.log(formElement);
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      formElement.outerHTML =
        "Liebe Zuschauerin, lieber Zuschauer,</br>liebe Userin, lieber User,</br></br>vielen Dank für Ihre Nachricht an tagesschau, tagesthemen, tagesschau24 oder tagesschau.de. Wir freuen uns sehr über Ihr Interesse an unseren Nachrichtenangeboten und sind dankbar für Ihr Feedback, Ihre Hinweise, Anregungen, Meinungen oder Themenvorschläge.";
    });
  }
}

customElements.define("contact-programs-page", ContactProgramsPage);

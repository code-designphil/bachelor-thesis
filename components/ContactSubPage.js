export default class ContactSubPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const pageStyles = await fetch("/components/ContactSubPage.css");
      const globalStyles = await fetch(
        `/${
          localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
        }styles.css`,
      );
      styles.textContent = await pageStyles.text();
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
    let template;
    if (this.getAttribute("subType") == "program") {
      template = document.getElementById("contact-programs-page-template");
    } else if (this.getAttribute("subType") == "content-and-language") {
      template = document.getElementById(
        "contact-content-and-language-page-template",
      );
    }

    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const breadcrumbs = document.getElementById("sub-navigation");
    const firstBreadcrumbWrapper = document.createElement("li");
    const firstBreadcrumb = document.createElement("a");
    firstBreadcrumb.href = "/kontakt";
    firstBreadcrumb.classList.add("bredcrumb-tag");
    firstBreadcrumb.innerHTML = "Kontakt";
    firstBreadcrumbWrapper.appendChild(firstBreadcrumb);
    breadcrumbs.appendChild(firstBreadcrumbWrapper);

    const formElement = this.root.querySelector("form");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      formElement.outerHTML =
        "Liebe Zuschauerin, lieber Zuschauer,<br />liebe Userin, lieber User,<br /><br />vielen Dank für Ihre Nachricht an tagesschau, tagesthemen, tagesschau24 oder tagesschau.de. Wir freuen uns sehr über Ihr Interesse an unseren Nachrichtenangeboten und sind dankbar für Ihr Feedback, Ihre Hinweise, Anregungen, Meinungen oder Themenvorschläge.";
    });

    const fields = this.root.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
      const label = field.parentElement.querySelector("label");
      ["input", "blur", "submit"].forEach((eventType) => {
        field.addEventListener(eventType, () =>
          handleFormFieldInteraction(field, label),
        );
      });
    });

    function handleFormFieldInteraction(field, label) {
      if (!field.checkValidity()) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }

      if (field.value != "") {
        label.classList.add("static-for-dynamic");
      } else {
        label.classList.remove("static-for-dynamic");
      }
    }

    if (isAccessible) {
      const elementsWithTabindex = this.root.querySelectorAll("[tabindex]");
      elementsWithTabindex.forEach(function (el) {
        el.removeAttribute("tabindex");
      });
    }
  }
}

customElements.define("contact-sub-page", ContactSubPage);

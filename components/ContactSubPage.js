import validateTask from "../services/validateTask.js";

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
        }styles.css`
      );
      styles.textContent = await pageStyles.text();
      styles.textContent = styles.textContent.concat(await globalStyles.text());

      if (isAccessible) {
        styles.textContent = styles.textContent.concat(`
          input:focus + label:not(.data-security),
          textarea:focus + label,
          label.static,
          label.static-for-dynamic {
              font-size: 0.8rem;
              top: 8px;
          }
        `);
      } else {
        styles.textContent = styles.textContent.concat(`
          label.static,
          label.static-for-dynamic {
            font-size: 0.8rem;
            top: 8px;
          }
          input:focus + label:not(.data-security),
          textarea:focus + label {
            display: none;
          }
        `);
      }
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
    const subType = this.getAttribute("subType");
    if (subType == "program") {
      template = document.getElementById("contact-programs-page-template");
    } else if (subType == "content-and-language") {
      template = document.getElementById(
        "contact-content-and-language-page-template"
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
    const requiredFields = formElement.querySelectorAll("[required]");
    const errorBox = this.root.getElementById("errorSummary");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!isAccessible) {
        let allFilled = true;
        let errors = [];

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            allFilled = false;
            errors.push(
              field.placeholder || field.id || "Ein erfordertes Feld"
            );
          }
        });

        if (!allFilled) {
          console.log(errorBox);
          errorBox.innerText = "Erforderte Felder fehlen: " + errors.join(", ");
          return;
        }
      }

      const valid = validateTask(2, subType == "program" ? 1 : 2);

      formElement.setAttribute("aria-busy", "true");
      formElement.outerHTML = valid
        ? `Trage den Wert <strong>${
            isAccessible ? "352" : "637"
          }</strong> in das Eingabefeld der Studie ein, um die Aufgabe zu lösen. Du kannst dieses Fenster jetzt schließen`
        : "❌ Das war leider nicht die Aufgbabe, die du lösen solltest. Bitte versuche es vielleicht noch einmal mit einem anderen Kontaktformular.";
      formElement.removeAttribute("aria-busy");
    });

    const fields = this.root.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
      const label = field.parentElement.querySelector("label");
      ["input", "blur", "submit"].forEach((eventType) => {
        field.addEventListener(eventType, () =>
          handleFormFieldInteraction(field, label)
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

      formElement.removeAttribute("novalidate");
    }
  }
}

customElements.define("contact-sub-page", ContactSubPage);

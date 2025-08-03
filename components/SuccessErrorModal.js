export default class SuccessErrorModal extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const valid = this.getAttribute("valid") == "true";
    const errorMessage = this.getAttribute("error-message") || "";
    const accessibleCode = this.getAttribute("accessible-code");
    const inaccessibleCode = this.getAttribute("inaccessible-code");

    const styles = document.createElement("style");
    const globalStyles = await fetch(
      `/${
        localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
      }styles.css`
    );
    const elementStyles = await fetch("/components/SuccessErrorModal.css");
    styles.textContent = await globalStyles.text();
    styles.textContent += await elementStyles.text();

    const modal = document.createElement("div");
    modal.role = "alertdialog";
    if (valid) {
      modal.innerHTML = `Trage den Wert <strong>${
        isAccessible ? accessibleCode : inaccessibleCode
      }</strong> in das Eingabefeld der Studie ein, um die Aufgabe zu lösen. Du kannst dieses Fenster jetzt schließen`;
    } else {
      modal.textContent = `❌ ${errorMessage}`;
    }

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(modal);
  }
}

customElements.define("success-error-modal", SuccessErrorModal);

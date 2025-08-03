import validateTask from "../services/validateTask.js";
import SuccessErrorModal from "./SuccessErrorModal.js";

export default class WhatsAppButton extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const ressort = this.getAttribute("ressort");

    const styles = document.createElement("style");
    const globalStyles = await fetch(
      `/${
        localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
      }styles.css`
    );
    styles.textContent = await globalStyles.text();

    const container = document.createElement("a");
    container.ariaLabel = "WhatsApp";
    container.tabIndex = 0;
    container.style.cursor = "pointer";

    const valid = validateTask(3, ressort == "wirtschaft" ? 1 : 2);
    console.log("valid", valid);

    function onClick(event) {
      event.preventDefault();

      const modal = new SuccessErrorModal();
      modal.setAttribute(
        "error-message",
        "Das war leider nicht die Aufgabe, die du lösen solltest. Bitte versuche es vielleicht noch einmal mit einem anderen Ressort."
      );
      modal.setAttribute("accessible-code", "908");
      modal.setAttribute("inaccessible-code", "850");
      modal.setAttribute("valid", valid);
      document.body.appendChild(modal);

      function hideModal(event) {
        if (event.target !== modal) {
          document.body.removeChild(modal);
          document.removeEventListener("click", hideModal);
          document.removeEventListener("keydown", onEscape);
        }
      }

      function onEscape(event) {
        if (event.key === "Escape") {
          hideModal(event);
        }
      }

      setTimeout(() => {
        document.addEventListener("click", hideModal);
      }, 0);
      document.addEventListener("keydown", onEscape);
    }

    container.onclick = (event) => {
      onClick(event);
    };
    container.onkeydown = (event) => {
      if (event.key === "Enter") {
        onClick(event);
      }
    };

    container.innerHTML = `
        <span class="socialbuttons-icon">
          <svg
            role="img"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Whatsapp</title>
            <path
              d="M24 13.59c-5.73 0-10.41 4.67-10.41 10.41 0 1.82.49 3.63 1.41 5.22l.55.95-.28 1.05-.58 2.09 2.09-.58 1.05-.28.95.55c1.59.93 3.39 1.41 5.22 1.41 5.73 0 10.41-4.67 10.41-10.41S29.74 13.59 24 13.59Zm6.75 14.86c-.29.74-1.66 1.42-2.33 1.52-1.46.19-4.14-.81-4.12-.78-3.46-1.39-5.71-4.61-5.89-4.82-.18-.21-1.41-1.73-1.41-3.31s.89-2.35 1.2-2.67c.31-.32.69-.4.92-.4h.66c.21.02.49-.07.77.55.29.64.98 2.2 1.07 2.37.08.16.15.35.03.56-.66 1.22-1.37 1.18-1.01 1.74 1.34 2.13 2.66 2.86 4.69 3.8.33.16.54.14.74-.08.21-.22.87-.94 1.1-1.26.23-.33.46-.27.77-.16.32.11 2.02.87 2.36 1.03.34.15.57.23.66.38.08.14.08.77-.2 1.52l-.01.01Z"
              fill="#00D856"
            ></path>
            <path
              d="M41.8 7.9C37.41 3.05 31.06 0 24 0 10.75 0 0 10.75 0 24c0 6.06 2.25 11.6 5.96 15.82C10.36 44.83 16.81 48 24 48c13.25 0 24-10.75 24-24 0-6.2-2.35-11.84-6.2-16.1ZM24 37c-2.38 0-4.6-.64-6.52-1.77L11 37l1.77-6.48A12.986 12.986 0 0 1 11 24c0-7.18 5.82-13 13-13s13 5.82 13 13-5.82 13-13 13Z"
              fill="#00D856"
            ></path>
            <path
              d="M24 11c-7.18 0-13 5.82-13 13 0 2.38.65 4.6 1.77 6.52L11 37l6.48-1.77C19.4 36.35 21.62 37 24 37c7.18 0 13-5.82 13-13s-5.82-13-13-13Zm0 23.41c-1.82 0-3.63-.49-5.22-1.41l-.95-.55-1.05.28-2.09.58.58-2.09.28-1.05-.55-.95c-.93-1.59-1.41-3.39-1.41-5.22 0-5.73 4.67-10.41 10.41-10.41S34.41 18.26 34.41 24 29.74 34.41 24 34.41Z"
              fill="#fff"
            ></path>
            <path
              d="M30.29 26.56c-.34-.16-2.04-.93-2.36-1.03-.31-.11-.54-.16-.77.16-.23.32-.89 1.03-1.1 1.26-.2.21-.41.24-.74.08-2.03-.94-3.35-1.67-4.69-3.8-.36-.56.35-.52 1.01-1.74.11-.21.05-.4-.03-.56-.08-.16-.77-1.73-1.07-2.37-.28-.62-.56-.53-.77-.55h-.66c-.23 0-.61.08-.92.4-.31.32-1.2 1.09-1.2 2.67 0 1.58 1.23 3.09 1.41 3.31.18.21 2.43 3.43 5.89 4.82-.01-.03 2.67.98 4.12.78.67-.1 2.04-.77 2.33-1.52.28-.74.28-1.38.2-1.52-.08-.15-.31-.22-.66-.38l.01-.01Z"
              fill="#fff"
            ></path>
          </svg>
        </span>
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("whatsapp-button", WhatsAppButton);

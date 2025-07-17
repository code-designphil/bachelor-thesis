export default class Toggle extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const text = this.getAttribute("text") || "";
    const globalVariable =
      this.getAttribute("globalVariable") || "defaultToggleVariable";

    const styles = document.createElement("style");
    const thisPageStyles = await fetch("/components/Toggle.css");
    const globalStyles = await fetch(
      `/${
        localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
      }styles.css`,
    );
    styles.textContent = await thisPageStyles.text();
    styles.textContent = styles.textContent.concat(await globalStyles.text());

    const isAccessible = localStorage.getItem("accessible") == "true";
    if (isAccessible) {
      styles.textContent = styles.textContent.concat(`
        input:focus-visible + .slider {
            outline: 2px solid #4c9aff;
            outline-offset: 4px;
        }
      `);
    }

    const container = document.createElement("div");
    container.innerHTML = `
        <label class="switch">
          <input name="${text} anschalten" type="checkbox" class="${isAccessible ? "" : "inaccessible"}">
          <span class="slider"></span>
        </label>
        ${text}
    `;

    const toggleSwitch = container.querySelector("input");
    toggleSwitch.addEventListener("change", function () {
      document.dispatchEvent(new CustomEvent(`${globalVariable}-changed`));
      localStorage.setItem(`${globalVariable}-state`, this.checked);
    });

    const savedState = localStorage.getItem(`${globalVariable}-state`);
    if (savedState !== null) {
      toggleSwitch.checked = savedState === "true";
    }

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("settings-toggle", Toggle);

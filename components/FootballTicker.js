export default class FootballTicker extends HTMLElement {
  #root;
  #isFootballTickerActivated;
  #defaultInnerHTML = `
      <button class="header-button" style="justify-self: center">
        <span style="padding-right: 6px">Sendung verpasst?</span>
        <span style="color: white">
          <img
            src="resources/svg/play.svg"
            width="38"
            alt=""
            aria-hidden="true"
          />
        </span>
      </button>
    `;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
    this.#isFootballTickerActivated = false;
    this.#defaultInnerHTML = `
      <button class="header-button" style="justify-self: center">
        <span style="padding-right: 6px">Sendung verpasst?</span>
        <span style="color: white">
          <img
            src="resources/svg/play.svg"
            width="38"
            alt=""
            aria-hidden="true"
          />
        </span>
      </button>
    `;
  }

  async connectedCallback() {
    const styles = document.createElement("style");
    const thisPageStyles = await fetch("/components/FootballTicker.css");
    const globalStyles = await fetch("/styles.css");
    styles.textContent = await thisPageStyles.text();
    styles.textContent = styles.textContent.concat(await globalStyles.text());

    const savedState = localStorage.getItem(`footballTicker-state`);
    if (savedState !== null) {
      this.#isFootballTickerActivated = savedState === "true";
    }

    const container = document.createElement("div");
    container.innerHTML = this.getInnerHTML();

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);

    document.addEventListener("footballTicker-changed", () => {
      this.#isFootballTickerActivated = !this.#isFootballTickerActivated;
      container.innerHTML = this.getInnerHTML();
    });
  }

  getInnerHTML() {
    if (this.#isFootballTickerActivated) {
      return "Fußballticker";
    } else {
      return this.#defaultInnerHTML;
    }
  }
}

customElements.define("football-ticker", FootballTicker);

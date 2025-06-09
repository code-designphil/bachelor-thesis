export default class FooterAccordion extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const title = this.getAttribute("title") || "Details";
    const links = JSON.parse(this.getAttribute("links") || "[]");
    const isLast = this.getAttribute("isLast") == "true";

    const styles = document.createElement("style");
    const request = await fetch("/components/FooterAccordion.css");
    styles.textContent = await request.text();

    const container = document.createElement("div");
    container.innerHTML = `
      <details${
        isLast ? ' style="border-bottom: 1px solid var(--clr-hover-dark)"' : ""
      }>
        <summary>
          <span>${title}</span>
          <img src="/resources/svg/arrow-down.svg" width="32" alt="" aria-hidden="true" />
        </summary>
        <ul>
          ${links
            .map(
              (link) =>
                `<li>
                  <a href="${link.href}">${link.text}</a>
                </li>`
            )
            .join("")}
        </ul>
      </details>
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("footer-accordion", FooterAccordion);

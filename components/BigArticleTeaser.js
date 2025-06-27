export default class BigArticleTeaser extends HTMLElement {
  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const rooftitle = this.getAttribute("rooftitle") || "";
    const title = this.getAttribute("title") || "";
    const copy = this.getAttribute("copy") || "";
    const href = this.getAttribute("href") || "";

    const styles = document.createElement("style");
    const thisPageStyles = await fetch("/components/BigArticleTeaser.css");
    const globalStyles = await fetch("/styles.css");
    styles.textContent = await thisPageStyles.text();
    styles.textContent = styles.textContent.concat(await globalStyles.text());

    const container = document.createElement("div");
    container.innerHTML = `
        <a href="${href}">
          <slot></slot>
          <div class="ressort-teaser-text-wrapper">
            <h2 class="h1">
              <span class="rooftitle">${rooftitle}</span>
              <span>${title}</span>
            </h2>
            <p>
              ${copy}
              <strong>| mehr</strong>
            </p>
          </div>
        </a>
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("big-article-teaser", BigArticleTeaser);

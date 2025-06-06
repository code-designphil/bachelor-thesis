export default class OpenSubLinkMenuButton extends HTMLElement {
  #root;

  #isExpanded;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
    this.#isExpanded = false;
  }

  setExpanded(value) {
    this.#isExpanded = true;
  }

  async connectedCallback() {
    const title = this.getAttribute("title");
    const subLinks = JSON.parse(this.getAttribute("sub-links") || "[]");

    if (!subLinks) return null;

    const hiddenContent = `
      ${subLinks
        .map(
          (link) =>
            `<side-navigation-child
                id="first"
                title="${link.text}"
                main-link="${link.href}"
             >
             </side-navigation-child>`
        )
        .join("")}
    `;

    const styles = document.createElement("style");
    const request = await fetch("/components/OpenSubLinkMenuButton.css");
    styles.textContent = await request.text();

    const container = document.createElement("button");
    container.ariaLabel = `Open ${title} menu`;
    container.ariaExpanded = "false";
    container.ariaHasPopup = "true";

    container.onclick = (event) => {
      const sideNavigationWrapper = document
        .querySelector("side-navigation")
        .shadowRoot.querySelector(".side-navigation-wrapper");
      const button = event.currentTarget;

      if (this.#isExpanded) {
        const contentBefore = document.createElement("ul");
        contentBefore.innerHTML = `<slot></slot>`;
        sideNavigationWrapper.replaceChildren(contentBefore);
      } else {
        sideNavigationWrapper.replaceChildren();
        button.ariaExpanded = "true";
        const backButton = document.createElement("li");
        const clone = this.cloneNode(true);
        clone.setExpanded(true);
        backButton.appendChild(clone);
        const hiddenContentElement = document.createElement("ul");
        hiddenContentElement.innerHTML = hiddenContent;
        sideNavigationWrapper.appendChild(hiddenContentElement);
        const ul = sideNavigationWrapper.querySelector("ul");
        ul.insertBefore(backButton, ul.firstChild);
      }
    };

    container.innerHTML = `
        <img
            src="resources/svg/arrow-down.svg"
            width="36"
            style="transform: ${
              this.#isExpanded ? "rotate(90deg)" : "rotate(270deg)"
            }"
            alt=""
            aria-hidden="true"
        />
    `;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("open-sub-link-menu-button", OpenSubLinkMenuButton);

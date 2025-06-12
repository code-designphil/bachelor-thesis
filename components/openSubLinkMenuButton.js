export default class OpenSubLinkMenuButton extends HTMLElement {
  #root;

  #isExpanded;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
    this.#isExpanded = false;
  }

  setExpanded() {
    this.#isExpanded = !this.#isExpanded;
  }

  focusBackButton() {
    setTimeout(() => this.shadowRoot.querySelector("button").focus(), 50);
  }

  closeSubMenu(sideNavigationWrapper) {
    const contentBefore = document.createElement("ul");
    contentBefore.innerHTML = `<slot></slot>`;
    sideNavigationWrapper.replaceChildren(contentBefore);
  }

  createBackLink(title, sideNavigationWrapper) {
    const backLink = document.createElement("a");
    backLink.innerHTML = title;
    backLink.style =
      "flex-grow: 1; display: flex; align-items: center; cursor: pointer";
    backLink.onclick = () => this.closeSubMenu(sideNavigationWrapper);
    return backLink;
  }

  async connectedCallback() {
    const title = this.getAttribute("title");
    const subLinks = JSON.parse(this.getAttribute("sub-links") || "[]");
    const isFulllWidth = this.getAttribute("is-full-width") == "false";

    if (!subLinks.length && title != "Einstellungen") return null;

    const hiddenContent = `
      ${subLinks
        .map(
          (link) =>
            `<side-navigation-child
                title="${link.text}"
                main-link="${link.href ?? `/${link.text.toLowerCase()}`}"
             >
             </side-navigation-child>`
        )
        .join("")}
    `;

    const styles = document.createElement("style");
    const request = await fetch("/components/OpenSubLinkMenuButton.css");
    styles.textContent = await request.text();

    const container = document.createElement("button");
    container.ariaLabel = `${
      this.#isExpanded ? "Close " : "Open "
    }${title} menu`;
    container.ariaExpanded = "false";
    container.ariaHasPopup = "true";

    container.onclick = (event) => {
      const sideNavigationWrapper = document
        .querySelector("side-navigation")
        .shadowRoot.querySelector(".side-navigation-wrapper");
      const button = event.currentTarget;

      if (this.#isExpanded) {
        this.closeSubMenu(sideNavigationWrapper);
      } else {
        const backButton = document.createElement("li");
        backButton.style =
          "display: flex; justify-content: space-between; align-items: stretch; background-color: var(--clr-hover-light);";
        const clone = this.cloneNode(true);
        clone.setExpanded();
        clone.focusBackButton();
        backButton.appendChild(clone);
        const backLink = this.createBackLink(title, sideNavigationWrapper);
        backButton.appendChild(backLink);
        sideNavigationWrapper.replaceChildren();
        button.ariaExpanded = "true";
        const hiddenContentElement = document.createElement("ul");
        hiddenContentElement.innerHTML = hiddenContent;
        sideNavigationWrapper.appendChild(hiddenContentElement);
        const ul = sideNavigationWrapper.querySelector("ul");
        ul.insertBefore(backButton, ul.firstChild);
      }
    };

    const icon = `<img
                      src="resources/svg/arrow-down.svg"
                      width="36"
                      style="transform: ${
                        this.#isExpanded ? "rotate(90deg)" : "rotate(270deg)"
                      }"
                      alt=""
                      aria-hidden="true"
                  />`;

    if (isFulllWidth && !this.#isExpanded) {
      container.classList.add("full-width");
      this.style = "width: 100%";
    } else {
      container.classList.remove("full-width");
      this.style = "";
    }

    container.innerHTML =
      isFulllWidth && !this.#isExpanded
        ? `<p class="main-button">${title}</p>${icon}`
        : icon;

    this.#root.innerHTML = "";
    this.#root.appendChild(styles);
    this.#root.appendChild(container);
  }
}

customElements.define("open-sub-link-menu-button", OpenSubLinkMenuButton);

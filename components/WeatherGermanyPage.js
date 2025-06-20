export default class WeatherGermanyPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("weather-germany-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const weatherGermanyPageStyles = await fetch(
        "/components/WeatherGermanyPage.css"
      );
      const globalStyles = await fetch("/styles.css");
      styles.textContent = await weatherGermanyPageStyles.text();
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
    const breadcrumbs = document.getElementById("sub-navigation");

    const firstBreadcrumbWrapper = document.createElement("li");
    const firstBreadcrumb = document.createElement("a");
    firstBreadcrumb.href = "/wetter";
    firstBreadcrumb.classList.add("bredcrumb-tag");
    firstBreadcrumb.innerHTML = "Wetter";
    firstBreadcrumbWrapper.appendChild(firstBreadcrumb);
    breadcrumbs.appendChild(firstBreadcrumbWrapper);

    const secondBreadcrumbWrapper = document.createElement("li");
    const secondBreadcrumb = firstBreadcrumb.cloneNode(true);
    secondBreadcrumb.href = "/wettervorhersage-deutschland";
    secondBreadcrumb.innerHTML = "Deutschland";
    secondBreadcrumbWrapper.appendChild(secondBreadcrumb);
    breadcrumbs.appendChild(secondBreadcrumbWrapper);
  }
}

customElements.define("weather-germany-page", WeatherGermanyPage);

export default class ZivilcouragePage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({mode: "open"});

        const template = document.getElementById("zivilcourage-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const pageStyles = await fetch("/components/ZivilcouragePage.css");
            const globalStyles = await fetch("/styles.css");
            styles.textContent = await pageStyles.text();
            styles.textContent = styles.textContent.concat(await globalStyles.text());
        }

        loadCSS();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        const breadcrumbs = document.getElementById("sub-navigation");
        breadcrumbs.removeChild(breadcrumbs.lastChild);
    }

    render() {
        const breadcrumbs = document.getElementById("sub-navigation");
        const breadcrumbWrapper = document.createElement("li");
        const breadcrumb = document.createElement("a");
        breadcrumb.href = "/inland";
        breadcrumb.classList.add("bredcrumb-tag");
        breadcrumb.innerHTML = "Inland";
        breadcrumbWrapper.append(breadcrumb);
        breadcrumbs.appendChild(breadcrumbWrapper);
    }
}

customElements.define("zivilcourage-page", ZivilcouragePage);

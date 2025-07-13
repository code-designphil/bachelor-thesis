export default class GrillenPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({mode: "open"});

        const template = document.getElementById("grillen-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const globalStyles = await fetch("/styles.css");
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
        breadcrumb.href = "/wissen";
        breadcrumb.classList.add("bredcrumb-tag");
        breadcrumb.innerHTML = "Wissen";
        breadcrumbWrapper.append(breadcrumb);
        breadcrumbs.appendChild(breadcrumbWrapper);
    }
}

customElements.define("grillen-page", GrillenPage);

export default class MerzPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("merz-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const globalStyles = await fetch(
        `/${
          localStorage.getItem("accessible") == "true" ? "" : "inaccessible-"
        }styles.css`,
      );
      styles.textContent = await globalStyles.text();
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

    const section = document.createElement("section");
    section.classList.add("wrapper", "bg-signature");
    section.innerHTML = `
        <video-article-section
            src="merz.mp4"
            captionsSrc="merz.vtt"
            rooftitle="Erste Regierungserklärung von Merz"
            title='Unterstützung für Ukraine - aber keine "Kriegspartei"'
            date="Stand: 14.05.2025 15:17 Uhr"
            description="In seiner ersten Regierungserklärung hat Kanzler Merz klar gemacht: Deutschland bleibt an der
                  Seite der Ukraine. Und: Die Bundeswehr wird massiv gestärkt. In der Migrationspolitik werde man
                  für mehr Ordnung sorgen."
        >    
        </video-article-section>`;
    this.root.appendChild(section);
  }
}

customElements.define("merz-page", MerzPage);

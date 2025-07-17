export default class ZivilcouragePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("zivilcourage-page-template");
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
            src="hacker.mp4"
            captionsSrc="hacker.vtt"
            rooftitle="IT-Sicherheitslücken"
            title="Unerwünschte Zivilcourage bei Hackern?"
            date="Stand: 18.05.2025 11:56 Uhr"
            description="In einer digitalen Welt ist die IT-Sicherheit zentral. Trotzdem droht Strafe, wenn Hacker solche
                        Lücken ehrenamtlich finden und meldet."
        >    
        </video-article-section>`;
    this.root.appendChild(section);
  }
}

customElements.define("zivilcourage-page", ZivilcouragePage);

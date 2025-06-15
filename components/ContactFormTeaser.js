export default class ContactFormTeaser extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const href = this.getAttribute("href") || "";
    const title = this.getAttribute("title") || "";
    const imageId = this.getAttribute("image-id") || "";
    const description = this.getAttribute("description") || "";
    const styles = document.createElement("style");
    const request = await fetch("/components/ContactFormTeaser.css");
    styles.textContent = await request.text();

    const container = document.createElement("a");
    container.classList.add("contact-form-teaser-wrapper");
    container.href = href;
    container.innerHTML = `
      <div>
        <picture>
            <source
              type="image/webp"
              media="(max-width: 440px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.webp
                          "
            />
            <source
              type="image/webp"
              media="(max-width: 767px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.webp
                          "
            />
            <source
              type="image/webp"
              media="(max-width: 900px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.webp
                          "
            />
            <source
              type="image/webp"
              media="(min-width: 901px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.webp
                          "
            />
            <source
              type="image/jpeg"
              media="(max-width: 440px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.jpg
                          "
            />
            <source
              type="image/jpeg"
              media="(max-width: 767px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.jpg
                          "
            />
            <source
              type="image/jpeg"
              media="(max-width: 900px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.jpg
                          "
            />
            <source
              type="image/jpeg"
              media="(min-width: 901px)"
              srcset="
                            https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.jpg
                          "
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://images.tagesschau.de/image/${imageId}/1x1-256/tagesschau-regie-100.jpg"
              alt=""
              title="Regieraum ARD-aktuell | picture alliance/dpa"
            />
          </picture>
      </div>
      <div style= "padding-top: 20px">
        <p class="metatextline small">25.04.2024</p>
        <h3>
            <span class="rooftitle">Kontakt</span>
            <span>${title}</span>
        </h3>
        <p class="small">
            ${description}
            <strong>| mehr</strong>
        </p>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(styles);
    this.appendChild(container);
  }
}

customElements.define("contact-form-teaser", ContactFormTeaser);

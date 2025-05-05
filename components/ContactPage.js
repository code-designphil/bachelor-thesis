export default class ContactPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("contact-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const contactPageStyles = await fetch("/components/ContactPage.css");
      const globalStyles = await fetch("/styles.css");
      styles.textContent = await contactPageStyles.text();
      styles.textContent = styles.textContent.concat(await globalStyles.text());
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("contact-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });

    this.render();
  }

  render() {
    const section = this.root.querySelector("section.wrapper");
    section.innerHTML = `
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
        <br />
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define("contact-page", ContactPage);

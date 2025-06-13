export default class ContactProgramsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("contact-programs-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/ContactProgramsPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    // const section = this.root.querySelector("section.wrapper");
    // section.innerHTML = `
    //   <form>
    //     <label for="name">Name:</label>
    //     <input type="text" id="name" name="name" />
    //     <br />
    //     <label for="email">Email:</label>
    //     <input type="email" id="email" name="email" />
    //     <br />
    //     <button type="submit">Submit</button>
    //   </form>
    // `;
  }
}

customElements.define("contact-programs-page", ContactProgramsPage);

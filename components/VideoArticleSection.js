export default class VideoArticleSection extends HTMLElement {
  connectedCallback() {
    let isAccessible = localStorage.getItem("accessible") == "true";

    const src = this.getAttribute("src");
    const captionsSrc = this.getAttribute("captionsSrc");
    const rooftitle = this.getAttribute("rooftitle");
    const title = this.getAttribute("title");
    const date = this.getAttribute("date");
    const description = this.getAttribute("description");

    this.innerHTML = `
      <article>
          <video controls="" autoplay="" name="media" width="100%">
              <source src="/resources/videos/${src}" type="video/mp4">
              ${isAccessible ? `<track src="/resources/videos/${captionsSrc}" kind="subtitles" srcLang="de" label="German" default/>` : ""}
              Your browser does not support the video tag.
          </video>
          <div style="width: 66%; margin: 1rem auto">
              <h1 style="margin-top: 16px">
                  <span class="rooftitle">${rooftitle}</span>
                  <span>${title}</span>
              </h1>
              <p class="metatextline">${date}</p>
              <br/>
              <p>
                  <strong>${description}</strong>
              </p>
          </div>
      </article>
    `;
  }
}

customElements.define("video-article-section", VideoArticleSection);

  /**
  * GalleryImage
  *
  *
  */
export class GalleryImage{
  constructor(parentElement, position, source='', description = ''){
    this.imgSource = source;
    this.imgDescription = description;
    this.position = position;
    this.template = `

      <div class="gi-item gi-img-wrap ">

        <span class="gi-close gi-hidden">&times;</span>
        <a href="#" class="mfp-iframe popup-it">
          <img src="${this.imgSource}" class="gi-thumbnail img-responsive" alt="${this.imgDescription}">
        </a>
        <div class="gi-img-text"><h4>${this.imgDescription}<h4></div>
      </div>
    `;

    parentElement.innerHTML += this.template;

  }
}

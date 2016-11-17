  /**
  * GalleryImage, creates html for each image in the gallery
  *
  * @param {DOM} parentElement, DOM where the images will be put.
  * @param {string} source, url of the image.
  * @param {string} description, of the image.
  */
export function  galleryImage(parentElement, source='', description = ''){
    const template = `
      <div class="gi-item gi-img-wrap ">

        <span class="gi-close gi-hidden">&times;</span>
        <a href="#" class="mfp-iframe popup-it">
          <img src="${source}" class="gi-thumbnail img-responsive" alt="${description}">
        </a>
        <div class="gi-img-text"><h4>${description}<h4></div>
      </div>
    `;
    parentElement.innerHTML += template;

}

import { GalleryImage } from './gallery-image';

export class Gallery{
  constructor(element, arrayOfImages = []){
    this.galleryImageArray = [];
    this.element = element;
    this.galleryImageArray = arrayOfImages.map((imageObject,index) => {
      return new GalleryImage(
        this.element,
        index,
        imageObject.source,
        imageObject.descrption
      );
    });

    console.log(this.galleryImageArray);

  }

  initialize(){
    this.galleryImageArray.forEach((galleryImage,index) => {

      const element = document.querySelector(`.gallery-image-${index}`);


      element.children[0].addEventListener( "click", (event) => {
        element.children[0].classList.add("hidden");
        element.children[1].classList.add("thumbnail");
        element.children[1].classList.remove("fullsize");
        event.stopPropagation();
      });

      element.children[1].addEventListener( "click", (event) => {
        element.children[0].classList.remove("hidden");
        element.children[1].classList.remove("thumbnail");
        element.children[1].classList.add("fullsize");
        event.stopPropagation();
      });

    });
  }


}

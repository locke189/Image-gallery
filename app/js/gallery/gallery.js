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
      element.addEventListener( "click", galleryImage.fullsizeImage.bind(galleryImage) ) ;
    });
  }


}

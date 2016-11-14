import { GalleryImage } from './gallery-image';
import { chunker, imagePreloader } from '../helper-functions';

export class Gallery{
  constructor(parentElement, arrayOfImages = []){
    this.totalImages = arrayOfImages.length;
    this.galleryImageArray = chunker(arrayOfImages,6);
    this.activeArray = {
      images: this.galleryImageArray[0],
      page: 0,
    };

    this.template = `
     <section class="gi-container"></section>
     <section class="gi-buttons-container">
       <span class="gi-pager"> 1 / N </span>
       <button class="gi-button">Next Project</button>
     </section>
    `;

    imagePreloader( this.activeArray.images.map(
      imageObject  => { return imageObject.source; },
      this.renderHtml(parentElement) )
    );
  }

  renderHtml(element){
    element.innerHTML = this.template;
    this.galleryImageArray2 = this.activeArray.images.map((imageObject,index) => {
      return new GalleryImage(
        document.querySelector(".gi-container"),
        index,
        imageObject.source,
        imageObject.descrption
      );
    });
  }

  updateHTML(){
    document.querySelector(".gi-container").innerHTML = '';
    this.galleryImageArray2 = this.activeArray.images.map((imageObject,index) => {
      return new GalleryImage(
        document.querySelector(".gi-container"),
        index,
        imageObject.source,
        imageObject.descrption
      );
    });
  }



  nextSet(){
    if (this.activeArray.page < this.galleryImageArray.length - 1){
      this.activeArray.page += 1;
    } else {
      this.activeArray.page = 0;
    }
    this.activeArray.images = this.galleryImageArray[this.activeArray.page];
    console.log(this.activeArray);
    imagePreloader( this.activeArray.images.map( imageObject  => { return imageObject.source; } ) );

    this.updateHTML();
  }

  setEventListeners(){
    //Set up listeners
    document.querySelector(".gi-button").onclick = this.nextSet.bind(this) ;
  }


}

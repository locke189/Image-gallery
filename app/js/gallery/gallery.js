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
       <span class="gi-pager"> ${ this.activeArray.page + 1 } / ${this.galleryImageArray.length } </span>
       <button class="gi-button">Next Project</button>
     </section>
    `;

    imagePreloader( this.activeArray.images.map(
      imageObject  => { return imageObject.source; },
      this.renderHtml(parentElement) )
    );
  }

  initialize(){

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
    this.animateLoading();
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
    this.animateLoading();
    document.querySelector(".gi-pager").innerHTML = `${ this.activeArray.page + 1 } / ${this.galleryImageArray.length }`;
  }

  animateLoading(){
    let imageContainers = document.querySelectorAll(".gi-item");
    const images = document.querySelectorAll(".gi-thumbnail");
    console.log('Animating...');
    let t1 = new TimelineLite();
    t1.staggerFrom(imageContainers,1,{opacity:0, x:"-1000", ease: Power0.easeNone}, -0.3, "stagger");

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
    this.setEventListeners();
  }

  setAnimationTo(element,time,CSSObject){
    return () => {
      console.log(element);
      let t1 = new TimelineLite();
      t1.to(element,time,CSSObject);
    };
  }

  setEventListeners(){
    //Set up listeners   this.nextSet.bind(this)
    let giButton = document.querySelector(".gi-button");
    giButton.onclick = this.setAnimationTo(document.querySelectorAll(".gi-item"),0.2,{opacity:0, ease: Power0.easeNone, onComplete: this.nextSet.bind(this)});

    document.querySelectorAll(".gi-img-text").forEach(  (element) => {
      console.log('this is working');
      element.onmouseenter = this.setAnimationTo(element,0.2,{opacity:0.8, ease: Power0.easeNone});
      element.onmouseleave = this.setAnimationTo(element,0.2,{opacity:0, ease: Power0.easeNone});
    });

  }


}

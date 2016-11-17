import { positionPopup, popUpOn, popUpClose } from './gallery-popup';
import { galleryImage } from './gallery-image';
import { chunker, imagePreloader } from '../helper-functions';

/**
* Gallery - creates a gallery of images
*
* @param {DOM} parentElement, the DOM where the gallery will be placed
* @param {array} arrayOfImages, the array of images that will be loaded into the
*  gallery. array = [{source: 'http...', decription: 'image desc.'}, {...}]
* @param {number} parts, indicates how many images will be loaded simultenously in
*  the gallery.
*/

export class Gallery{
  constructor(parentElement, arrayOfImages = [],parts=6){
    this.totalImages = arrayOfImages.length;
    this.galleryImageArray = chunker(arrayOfImages,parts);
    //this object holds the images that will be displayed into the gallery
    this.activeArray = {
      images: this.galleryImageArray[0],
      page: 0,
    };
    //lazy load of active images
    imagePreloader( this.activeArray.images.map(
      imageObject  => { return imageObject.source; },
      this.renderHtml(parentElement) )
    );
  }

  renderHtml(element){
    //Initial HTML template
    this.template = `
    <div id="gi-popup" class="gi-overlay">
        <a href="#" class="gi-closebutton" >&times;</a>
        <div class="gi-overlay-content">
          <img src="" class="gi-fullsize" alt="">
        </div>
    </div>
     <section class="gi-container"></section>
     <section class="gi-buttons-container">
       <span class="gi-pager"> ${ this.activeArray.page + 1 } / ${this.galleryImageArray.length } </span>
       <button class="gi-button">Next Project</button>
     </section>
    `;
    element.innerHTML = this.template;
    //creates DOM for images in the activeArray object
    this.activeArray.images.forEach((imageObject) => {
        galleryImage(
        document.querySelector(".gi-container"),
        imageObject.source,
        imageObject.descrption
      );
    });
    //EventListeners need to be updated everytime as HTML is cleared everytime
    this.setEventListeners();
    //images intro animation
    this.introAnimation();
  }

  updateHTML(){
    document.querySelector(".gi-container").innerHTML = '';
    this.activeArray.images.forEach((imageObject) => {
        galleryImage(
        document.querySelector(".gi-container"),
        imageObject.source,
        imageObject.descrption
      );
    });
    this.introAnimation();
    document.querySelector(".gi-pager").innerHTML = `${ this.activeArray.page + 1 } / ${this.galleryImageArray.length }`;
  }

  nextSet(){
    // loads the next of images after outro animation
    if (this.activeArray.page < this.galleryImageArray.length - 1){
      this.activeArray.page += 1;
    } else {
      this.activeArray.page = 0;
    }
    this.activeArray.images = this.galleryImageArray[this.activeArray.page];

    //lazy loading of images
    imagePreloader( this.activeArray.images.map( imageObject  => { return imageObject.source; } ) );
    this.updateHTML();
    this.setEventListeners();
  }

  introAnimation(){
    //animation has to be split into translation and 3d rotation. animations cannot be overlapped so
    //are split and applied to images and their respective div containers
    const imageContainers = document.querySelectorAll(".gi-item");
    const images = document.querySelectorAll(".gi-thumbnail");
    const t1 = new TimelineLite();
    t1.staggerFrom(imageContainers,1,{opacity:0, x:"-1000", ease: Power0.easeNone}, -0.3, "stagger").
       staggerFrom(images,1,{opacity:0, rotationX:180, rotationZ:180, ease: Power0.easeNone}, -0.3, "stagger");
  }

  setAnimationTo(element,time,CSSObject){
    //this function will construct other functions for all different components that need mass instantiation
    //ej. onmouseenter animations for each image
    return () => {
      const t1 = new TimelineLite();
      t1.to(element,time,CSSObject);
    };
  }

  setEventListeners(){
    //Set up listeners
    const giButton = document.querySelector(".gi-button");
    const giButtonClose = document.querySelector(".gi-closebutton");

    //next project button
    giButton.onclick = this.setAnimationTo(document.querySelectorAll(".gi-item"),0.2,{opacity:0, ease: Power0.easeNone, onComplete: this.nextSet.bind(this)});
    //text descriptions over images
    document.querySelectorAll(".gi-img-text").forEach(  (element) => {
      element.onmouseenter = this.setAnimationTo(element,0.2,{opacity:0.8, ease: Power0.easeNone});
      element.onmouseleave = this.setAnimationTo(element,0.2,{opacity:0, ease: Power0.easeNone});
    });
    //image popups
    document.querySelectorAll(".gi-item").forEach(  (element) => {
       element.onclick = popUpOn(element);
    });
    //close popups
    giButtonClose.onclick = popUpClose;
  }
}

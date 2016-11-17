import { positionPopup, popUpOn, popUpClose } from './gallery-popup';
import { galleryImage } from './gallery-image';
import { chunker, imagePreloader } from '../helper-functions';

export class Gallery{
  constructor(parentElement, arrayOfImages = [],parts){
    this.totalImages = arrayOfImages.length;
    this.galleryImageArray = chunker(arrayOfImages,parts);
    this.activeArray = {
      images: this.galleryImageArray[0],
      page: 0,
    };

    this.template = `

      <div id="gi-mask"  class="gi-popup"style="display:none"></div>
      <div id="gi-popUpDiv" class="gi-popup gi-img-wrap" style="display:none">
        <span class="gi-close">&times;</span>
        <img src="http://placehold.it/350x250/ff0000?text=Image1" class="gi-fullsize" alt="">
      </div>

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

  renderHtml(element){
    element.innerHTML = this.template;
    this.activeArray.images.forEach((imageObject,index) => {
        galleryImage(
        document.querySelector(".gi-container"),
        imageObject.source,
        imageObject.descrption
      );
    });
    this.animateLoading();
    this.setEventListeners();
  }

  updateHTML(){
    document.querySelector(".gi-container").innerHTML = '';
    this.activeArray.images.forEach((imageObject,index) => {
        galleryImage(
        document.querySelector(".gi-container"),
        imageObject.source,
        imageObject.descrption
      );
    });
    this.animateLoading();
    document.querySelector(".gi-pager").innerHTML = `${ this.activeArray.page + 1 } / ${this.galleryImageArray.length }`;
  }

  animateLoading(){
    const imageContainers = document.querySelectorAll(".gi-item");
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

    imagePreloader( this.activeArray.images.map( imageObject  => { return imageObject.source; } ) );
    this.updateHTML();
    this.setEventListeners();
  }

  setAnimationTo(element,time,CSSObject){
    return () => {
      let t1 = new TimelineLite();
      t1.to(element,time,CSSObject);
    };
  }

  setEventListeners(){
    //Set up listeners
    let giButton = document.querySelector(".gi-button");
    giButton.onclick = this.setAnimationTo(document.querySelectorAll(".gi-item"),0.2,{opacity:0, ease: Power0.easeNone, onComplete: this.nextSet.bind(this)});

    document.querySelectorAll(".gi-img-text").forEach(  (element) => {
      element.onmouseenter = this.setAnimationTo(element,0.2,{opacity:0.8, ease: Power0.easeNone});
      element.onmouseleave = this.setAnimationTo(element,0.2,{opacity:0, ease: Power0.easeNone});
    });

    document.querySelectorAll(".gi-item").forEach(  (element) => {
       element.onclick = popUpOn(element);
    });

    let giButtonClose = document.querySelector(".gi-close");
    giButtonClose.onclick = popUpClose;

    window.onresize = positionPopup;

  }



}

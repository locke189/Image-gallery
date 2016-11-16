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
    this.galleryImageArray2 = this.activeArray.images.map((imageObject,index) => {
      return new GalleryImage(
        document.querySelector(".gi-container"),
        index,
        imageObject.source,
        imageObject.descrption
      );
    });
    this.animateLoading();
    this.setEventListeners();
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
    const imageContainers = document.querySelectorAll(".gi-item");

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

    document.querySelectorAll(".gi-item").forEach(  (element) => {
          console.log('this is working');
      //element.onclick = this.setAnimationTo(document.getElementById("gi-mask"),0.2,{opacity:0.65, ease: Power0.easeNone});
      element.onclick = this.popUpOn(element);
    });


    let giButtonClose = document.querySelector(".gi-close");
    giButtonClose.onclick = this.togglePopUp;


    window.onresize = this.positionPopup;

  }

  positionPopup(){
      const popup = document.getElementById("gi-popUpDiv");
      const imgWidth = document.querySelector(".gi-fullsize").width;
      const imgHeight = document.querySelector(".gi-fullsize").height;
      console.log(`X = ${imgWidth} clientWidth = ${document.body.parentNode.clientWidth}`);
      console.log(`Y = ${imgHeight} clientHeight = ${document.documentElement.clientHeight}`);
      popup.style.top =  ((document.documentElement.clientHeight-imgHeight)/2) + 'px';
      popup.style.left = ((document.body.parentNode.clientWidth-imgWidth)/2) + 'px';
  }


  togglePopUp(){
    let mask = document.getElementById("gi-mask");
    let popup = document.getElementById("gi-popUpDiv");
    let t1 = new TimelineLite();
    const imgWidth = document.querySelector(".gi-fullsize").width;
    const imgHeigth = document.querySelector(".gi-fullsize").heigth;
    console.log(mask);

    if ( mask.style.display === 'none' ) {
      mask.style.display = 'block';
      popup.style.display = 'block';
      popup.style.top =  ((document.documentElement.clientHeight-imgHeigth)/2) + 'px';
      popup.style.left = ((document.body.parentNode.clientWidth-imgWidth)/2) + 'px';
      t1.to(mask,0.2,{opacity:0.8, ease: Power0.easeNone}).
        to(popup,0.2,{opacity:1, ease: Power0.easeNone});
    }else {

      t1.to(mask,0.2,{opacity:0, ease: Power0.easeNone, onComplete: () => {
        mask.style.display = 'none';
        popup.style.display = 'none';
      }}).to(popup,0.2,{opacity:0, ease: Power0.easeNone});

    }

  }

  popUpOn(element){
    return () => {
      let mask = document.getElementById("gi-mask");
      let popup = document.getElementById("gi-popUpDiv");
      let t1 = new TimelineLite();

      document.querySelector(".gi-fullsize").src = element.children[1].children[0].src;

      const imgWidth = document.querySelector(".gi-fullsize").width;
      const imgHeight = document.querySelector(".gi-fullsize").height;
      mask.style.display = 'block';
      popup.style.display = 'block';
      console.log(`X = ${imgWidth} clientWidth = ${document.body.parentNode.clientWidth}`);
      console.log(`Y = ${imgHeight} clientHeight = ${document.documentElement.clientHeight}`);
      popup.style.top =  ((document.documentElement.clientHeight-imgHeight)/2) + 'px';
      popup.style.left = ((document.body.parentNode.clientWidth-imgWidth)/2) + 'px';
      t1.to(mask,0.2,{opacity:0.8, ease: Power0.easeNone}).
      to(popup,0.2,{opacity:1, ease: Power0.easeNone});
    };

  }

  popUpAnimationOn(){

    this.togglePopUp();


  }

}

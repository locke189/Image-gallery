  /**
  * GalleryImage class.
  *
  *
  */
export class GalleryImage{
  constructor(parentElement, position, source='', description = ''){
    this.imgSource = source;
    this.imgDescription = description;
    this.position = position;
    this.template = `

      <div id="courtain" style="display:none"></div>
      <div id="popUpDiv" style="display:none">
        <a href="#" onclick="popup('popUpDiv')" >Click to Close CSS Pop Up</a>
      </div>

      <div class="gi-item gi-img-wrap gallery-image-${this.position}">
        <span class="gi-close gi-hidden">&times;</span>
        <a href="${this.imgSource}" class="mfp-iframe popup-it">
          <img src="${this.imgSource}" class="gi-thumbnail img-responsive" alt="${this.imgDescription}">
        </a>
      </div>
    `;
    this.renderAnimation = new TimelineLite();
    this.fadeAnimation = new TimelineLite();
    this.enlargeAnimation = new TimelineLite();
//        <img class="gi-thumbnail" name="${this.imgDescription}" src="${this.imgSource}">
    parentElement.innerHTML += this.template;

  }

  changeImage(source='', description = ''){
    this.element.classList.remove("gi-hidden");
    this.imgDescription = description ;
    this.element.children[1].src = source ;
    this.element.children[1].name = description ;
    console.log(this);
    this.restartAnimation();
  }

  renderImage(position = {x: 0, y: 0} ){
    console.log(`Hello i'm .gallery-image-${this.position}`);
    this.element.classList.remove("gi-hidden");
    this.renderAnimation.from(this.element,1,{ opacity:20, x:"-2000px", ease: Power0.easeNone  })
      .from(this.element.children[1], 1,{ ease: Power0.easeNone, transform: "rotateX(90deg)", transformOrigin: "left top", transformPerspective:2 },'0');
  }

  fadeImage(){
    console.log(`Hasta la Vista .gallery-image-${this.position}`);
    this.fadeAnimation.to(this.element,0.2,{opacity:0, onComplete: this.hideImage.bind(this)});
  }

  hideImage(){
    console.log(`I'm outta here...`);
    this.element.classList.add("gi-hidden");

  }

  restartAnimation(){
    this.renderAnimation.restart();  }
}

  export function positionPopup(){
      const popup = document.getElementById("gi-popUpDiv");
      const imgWidth = document.querySelector(".gi-fullsize").width;
      const imgHeight = document.querySelector(".gi-fullsize").height;
      popup.style.top =  ((document.documentElement.clientHeight-imgHeight)/2) + 'px';
      popup.style.left = ((document.body.parentNode.clientWidth-imgWidth)/2) + 'px';
  }



  export function popUpOn(element){
    return () => {
      let mask = document.getElementById("gi-mask");
      let popup = document.getElementById("gi-popUpDiv");
      let t1 = new TimelineLite();

      document.querySelector(".gi-fullsize").src = element.children[1].children[0].src;
      const imgWidth = document.querySelector(".gi-fullsize").width;
      const imgHeight = document.querySelector(".gi-fullsize").height;

      mask.style.display = 'block';
      popup.style.display = 'block';

      popup.style.top =  ((document.documentElement.clientHeight-imgHeight)/2) + 'px';
      popup.style.left = ((document.body.parentNode.clientWidth-imgWidth)/2) + 'px';
      t1.to(mask,0.2,{opacity:0.8, ease: Power0.easeNone}).
      to(popup,0.2,{opacity:1, ease: Power0.easeNone});
    };

  }


  export function popUpClose(){

    let mask = document.getElementById("gi-mask");
    let popup = document.getElementById("gi-popUpDiv");
    let t1 = new TimelineLite();
    t1.to(mask,0.2,{opacity:0, ease: Power0.easeNone, onComplete: () => {
      mask.style.display = 'none';
      popup.style.display = 'none';
      }}).to(popup,0.2,{opacity:0, ease: Power0.easeNone});


  }

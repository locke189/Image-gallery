

  export function popUpOn(element){
    return () => {
      console.log('popup on');
      document.getElementById("gi-popup").style.height = "100%";
      document.querySelector(".gi-fullsize").src = element.children[1].children[0].src;
    };

  }


  export function popUpClose(){
    console.log('popup off');
    document.getElementById("gi-popup").style.height = "0%";
  }



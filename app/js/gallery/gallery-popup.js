export function popUpOn(element){
  return () => {
    document.getElementById("gi-popup").style.height = "100%";
    document.querySelector(".gi-fullsize").src = element.children[1].children[0].src;
  };
}

export function popUpClose(){
  document.getElementById("gi-popup").style.height = "0%";
}



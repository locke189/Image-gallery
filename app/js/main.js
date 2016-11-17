import { loadJSON } from './helper-functions';
import { Gallery } from './gallery/gallery';




  //get JSON
  const file = loadJSON('./model/images.json');


  //Set Gallery
  const element  = document.getElementById("widget");
  const gallery = new Gallery(element, file.images,6);



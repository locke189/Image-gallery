import { loadJSON, imagePreloader } from './helper-functions';
import { GalleryImage } from './gallery/gallery-image';
import { Gallery } from './gallery/gallery';




  //get JSON
  const file = loadJSON('./model/images.json');

  //Preloading
  const imageSourceArray = file.images.map((element) => {
      return element.source;
  });

  imagePreloader(
    imageSourceArray,
    () => document.body.innerHTML = `
    <section id="container"></section>
    <button id="myButton" >Next Project</button>
    `
  );
  //preloading test

  //image test
  const element  = document.getElementById("container");
  const myButton  = document.getElementById("myButton");

  //Gallery test
  const gallery = new Gallery(element, file.images);


  window.onload = function(event){
    console.log("window.onload");
    gallery.initialize();
  };

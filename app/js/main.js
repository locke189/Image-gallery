import { loadJSON, imagePreloader, chunker } from './helper-functions';
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
    <section id="widget">Loading...</section>
    `
  );


  //image test
  const element  = document.getElementById("widget");
  const myButton  = document.getElementById("myButton");

  //Gallery test
  const gallery = new Gallery(element, file.images);


  window.onload = function(event){
    console.log("window.onload");
    gallery.initialize();
    gallery.setEventListeners();
  };

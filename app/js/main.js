import { loadJSON, imagePreloader } from './helper-functions';
import { GalleryImage } from './gallery/gallery-image';

( function(){

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
  const galleryImage = new GalleryImage(
    element,
    1,
    'http://placehold.it/1024x768/ffff00?text=Image6',
    "Description of Image #1"
  );


  //Main

  galleryImage.renderImage(container, {x: 100, y:100} );
  console.log(galleryImage);



  //change image test
  function buttonClick(){
    galleryImage.changeImage(
      'http://placehold.it/1024x768/ff00ff?text=Image24',
      "Description of Image #24"
    );
  }

  myButton.onclick = buttonClick;

})();

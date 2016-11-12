import { loadJSON, imagePreloader } from './helper-functions';


//dummy text
document.body.innerHTML = 'Hello world! Javascript is working just fine :D';

//get JSON
const file = loadJSON('./model/images.json');

//Preloading
const imageSourceArray = file.images.map((element) => {
    return element.source;
});


imagePreloader(
  imageSourceArray,
  () => document.body.innerHTML='Images Loaded'
);

//preloading test

console.log(imageSourceArray);


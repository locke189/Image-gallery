import { loadJSON } from './helper-functions';


document.body.innerHTML = 'Hello world! Javascript is working just fine :D';

let images = loadJSON('./model/images.json');

console.log(images);


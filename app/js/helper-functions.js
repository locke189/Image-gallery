  /**
  * Loads JSON file into object.
  *
  * @return {data}, returns object
  */
export function loadJSON(url){
  const request = new XMLHttpRequest();
  let data;

  request.overrideMimeType("application/json");
  request.open("GET", url, false);
  request.send(null);
  data = JSON.parse(request.responseText);
  return data;
}

  /**
  * Image Preloading
  *
  *
  */
export function imagePreloader(array, callback){
  const images = new Image();

  if(callback)
    images.onLoad = callback();

  images.src = array;
}

  /**
  * array chunker, creates an array of arrays
  *
  *
  */
export function chunker(originalArray, size){
  let array = [];
  let chunkArray = [];

  console.log('Chunkin...');

  originalArray.forEach( (element) => {
     array.push(element);
     console.log(array.length);
     if( array.length === size ){
       chunkArray.push(array);
       array = [];
     };
  });

  if(array) chunkArray.push(array);

  return chunkArray;
}


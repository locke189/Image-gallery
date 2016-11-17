  /**
  * Loads JSON file into object.
  *
  * @param {string} url, JSON URL.
  * @return {object} data, returns json parsed into an object.
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
  * @param {array} array, array of image urls.
  * @param {function} callback, function that will be called when the
  * images are loaded.
  */
export function imagePreloader(array, callback){
  const images = new Image();
  if(callback)
    images.onLoad = callback();
  images.src = array;
}

  /**
  * array chunker, creates an array of arrays of chunks of lenght 'size'
  *
  * @param {array} originalArray, generic array.
  * @param {number} size, length of the smaller arrays
  */
export function chunker(originalArray, size){
  let array = [];
  let chunkArray = [];
  originalArray.forEach( (element) => {
     array.push(element);
     if( array.length === size ){
       chunkArray.push(array);
       array = [];
     };
  });
  if(array) chunkArray.push(array);
  return chunkArray;
}


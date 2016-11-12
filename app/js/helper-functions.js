  /**
  * loads json file into object
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
  console.log(data);
  return data;
}



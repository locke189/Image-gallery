/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _helperFunctions = __webpack_require__(1);
	
	var _gallery = __webpack_require__(3);
	
	//get JSON
	var file = (0, _helperFunctions.loadJSON)('./model/images.json');
	//Set Gallery
	var element = document.getElementById("widget");
	var gallery = new _gallery.Gallery(element, file.images, 6);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadJSON = loadJSON;
	exports.imagePreloader = imagePreloader;
	exports.chunker = chunker;
	/**
	* Loads JSON file into object.
	*
	* @param {string} url, JSON URL.
	* @return {object} data, returns json parsed into an object.
	*/
	function loadJSON(url) {
	  var request = new XMLHttpRequest();
	  var data = void 0;
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
	function imagePreloader(array, callback) {
	  var images = new Image();
	  if (callback) images.onLoad = callback();
	  images.src = array;
	}
	
	/**
	* array chunker, creates an array of arrays of chunks of lenght 'size'
	*
	* @param {array} originalArray, generic array.
	* @param {number} size, length of the smaller arrays
	*/
	function chunker(originalArray, size) {
	  var array = [];
	  var chunkArray = [];
	  originalArray.forEach(function (element) {
	    array.push(element);
	    if (array.length === size) {
	      chunkArray.push(array);
	      array = [];
	    };
	  });
	  if (array) chunkArray.push(array);
	  return chunkArray;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.galleryImage = galleryImage;
	/**
	* GalleryImage, creates html for each image in the gallery
	*
	* @param {DOM} parentElement, DOM where the images will be put.
	* @param {string} source, url of the image.
	* @param {string} description, of the image.
	*/
	function galleryImage(parentElement) {
	  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	
	  var template = '\n      <div class="gi-item gi-img-wrap ">\n\n        <span class="gi-close gi-hidden">&times;</span>\n        <a href="#" class="mfp-iframe popup-it">\n          <img src="' + source + '" class="gi-thumbnail img-responsive" alt="' + description + '">\n        </a>\n        <div class="gi-img-text"><h4>' + description + '<h4></div>\n      </div>\n    ';
	  parentElement.innerHTML += template;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Gallery = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _galleryPopup = __webpack_require__(4);
	
	var _galleryImage = __webpack_require__(2);
	
	var _helperFunctions = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* Gallery - creates a gallery of images
	*
	* @param {DOM} parentElement, the DOM where the gallery will be placed
	* @param {array} arrayOfImages, the array of images that will be loaded into the
	*  gallery. array = [{source: 'http...', decription: 'image desc.'}, {...}]
	* @param {number} parts, indicates how many images will be loaded simultenously in
	*  the gallery.
	*/
	
	var Gallery = exports.Gallery = function () {
	  function Gallery(parentElement) {
	    var arrayOfImages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var parts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
	
	    _classCallCheck(this, Gallery);
	
	    this.totalImages = arrayOfImages.length;
	    this.galleryImageArray = (0, _helperFunctions.chunker)(arrayOfImages, parts);
	    //this object holds the images that will be displayed into the gallery
	    this.activeArray = {
	      images: this.galleryImageArray[0],
	      page: 0
	    };
	    //lazy load of active images
	    (0, _helperFunctions.imagePreloader)(this.activeArray.images.map(function (imageObject) {
	      return imageObject.source;
	    }, this.renderHtml(parentElement)));
	  }
	
	  _createClass(Gallery, [{
	    key: 'renderHtml',
	    value: function renderHtml(element) {
	      //Initial HTML template
	      this.template = '\n    <div id="gi-popup" class="gi-overlay">\n        <a href="#" class="gi-closebutton" >&times;</a>\n        <div class="gi-overlay-content">\n          <img src="" class="gi-fullsize" alt="">\n        </div>\n    </div>\n     <section class="gi-container"></section>\n     <section class="gi-buttons-container">\n       <span class="gi-pager"> ' + (this.activeArray.page + 1) + ' / ' + this.galleryImageArray.length + ' </span>\n       <button class="gi-button">Next Project</button>\n     </section>\n    ';
	      element.innerHTML = this.template;
	      //creates DOM for images in the activeArray object
	      this.activeArray.images.forEach(function (imageObject) {
	        (0, _galleryImage.galleryImage)(document.querySelector(".gi-container"), imageObject.source, imageObject.descrption);
	      });
	      //EventListeners need to be updated everytime as HTML is cleared everytime
	      this.setEventListeners();
	      //images intro animation
	      this.introAnimation();
	    }
	  }, {
	    key: 'updateHTML',
	    value: function updateHTML() {
	      document.querySelector(".gi-container").innerHTML = '';
	      this.activeArray.images.forEach(function (imageObject) {
	        (0, _galleryImage.galleryImage)(document.querySelector(".gi-container"), imageObject.source, imageObject.descrption);
	      });
	      this.introAnimation();
	      document.querySelector(".gi-pager").innerHTML = this.activeArray.page + 1 + ' / ' + this.galleryImageArray.length;
	    }
	  }, {
	    key: 'nextSet',
	    value: function nextSet() {
	      // loads the next of images after outro animation
	      if (this.activeArray.page < this.galleryImageArray.length - 1) {
	        this.activeArray.page += 1;
	      } else {
	        this.activeArray.page = 0;
	      }
	      this.activeArray.images = this.galleryImageArray[this.activeArray.page];
	
	      //lazy loading of images
	      (0, _helperFunctions.imagePreloader)(this.activeArray.images.map(function (imageObject) {
	        return imageObject.source;
	      }));
	      this.updateHTML();
	      this.setEventListeners();
	    }
	  }, {
	    key: 'introAnimation',
	    value: function introAnimation() {
	      //animation has to be split into translation and 3d rotation. animations cannot be overlapped so
	      //are split and applied to images and their respective div containers
	      var imageContainers = document.querySelectorAll(".gi-item");
	      var images = document.querySelectorAll(".gi-thumbnail");
	      var t1 = new TimelineLite();
	      t1.staggerFrom(imageContainers, 1, { opacity: 0, x: "-1000", ease: Power0.easeNone }, -0.3, "stagger").staggerFrom(images, 1, { opacity: 0, rotationX: 180, rotationZ: 180, ease: Power0.easeNone }, -0.3, "stagger");
	    }
	  }, {
	    key: 'setAnimationTo',
	    value: function setAnimationTo(element, time, CSSObject) {
	      //this function will construct other functions for all different components that need mass instantiation
	      //ej. onmouseenter animations for each image
	      return function () {
	        var t1 = new TimelineLite();
	        t1.to(element, time, CSSObject);
	      };
	    }
	  }, {
	    key: 'setEventListeners',
	    value: function setEventListeners() {
	      var _this = this;
	
	      //Set up listeners
	      var giButton = document.querySelector(".gi-button");
	      var giButtonClose = document.querySelector(".gi-closebutton");
	
	      //next project button
	      giButton.onclick = this.setAnimationTo(document.querySelectorAll(".gi-item"), 0.2, { opacity: 0, ease: Power0.easeNone, onComplete: this.nextSet.bind(this) });
	      //text descriptions over images
	      document.querySelectorAll(".gi-img-text").forEach(function (element) {
	        element.onmouseenter = _this.setAnimationTo(element, 0.2, { opacity: 0.8, ease: Power0.easeNone });
	        element.onmouseleave = _this.setAnimationTo(element, 0.2, { opacity: 0, ease: Power0.easeNone });
	      });
	      //image popups
	      document.querySelectorAll(".gi-item").forEach(function (element) {
	        element.onclick = (0, _galleryPopup.popUpOn)(element);
	      });
	      //close popups
	      giButtonClose.onclick = _galleryPopup.popUpClose;
	    }
	  }]);

	  return Gallery;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.popUpOn = popUpOn;
	exports.popUpClose = popUpClose;
	function popUpOn(element) {
	  return function () {
	    document.getElementById("gi-popup").style.height = "100%";
	    document.querySelector(".gi-fullsize").src = element.children[1].children[0].src;
	  };
	}
	
	function popUpClose() {
	  document.getElementById("gi-popup").style.height = "0%";
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
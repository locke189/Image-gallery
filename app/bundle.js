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
	
	var _galleryImage = __webpack_require__(2);
	
	var _gallery = __webpack_require__(3);
	
	//get JSON
	var file = (0, _helperFunctions.loadJSON)('./model/images.json');
	
	//Preloading
	var imageSourceArray = file.images.map(function (element) {
	  return element.source;
	});
	
	(0, _helperFunctions.imagePreloader)(imageSourceArray, function () {
	  return document.body.innerHTML = '\n    <section id="widget">Loading...</section>\n    ';
	});
	
	//image test
	var element = document.getElementById("widget");
	var myButton = document.getElementById("myButton");
	
	//Gallery test
	var gallery = new _gallery.Gallery(element, file.images);
	
	window.onload = function (event) {
	  console.log("window.onload");
	  gallery.setEventListeners();
	};

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
	* @return {data}, returns object
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
	*
	*/
	function imagePreloader(array, callback) {
	  var images = new Image();
	  images.src = array;
	  if (callback) images.onLoad = callback();
	}
	
	/**
	* array chunker, creates an array of arrays
	*
	*
	*/
	function chunker(originalArray, size) {
	  var array = [];
	  var chunkArray = [];
	
	  console.log('Chunkin...');
	
	  originalArray.forEach(function (element) {
	    array.push(element);
	    console.log(array.length);
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* GalleryImage class.
	*
	*
	*/
	var GalleryImage = exports.GalleryImage = function () {
	  function GalleryImage(parentElement, position) {
	    var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	
	    _classCallCheck(this, GalleryImage);
	
	    this.imgSource = source;
	    this.imgDescription = description;
	    this.position = position;
	    this.template = '\n\n      <div id="courtain" style="display:none"></div>\n      <div id="popUpDiv" style="display:none">\n        <a href="#" onclick="popup(\'popUpDiv\')" >Click to Close CSS Pop Up</a>\n      </div>\n\n      <div class="gi-item gi-img-wrap gallery-image-' + this.position + '">\n        <span class="gi-close gi-hidden">&times;</span>\n        <a href="' + this.imgSource + '" class="mfp-iframe popup-it">\n          <img src="' + this.imgSource + '" class="gi-thumbnail img-responsive" alt="' + this.imgDescription + '">\n        </a>\n      </div>\n    ';
	    this.renderAnimation = new TimelineLite();
	    this.fadeAnimation = new TimelineLite();
	    this.enlargeAnimation = new TimelineLite();
	    //        <img class="gi-thumbnail" name="${this.imgDescription}" src="${this.imgSource}">
	    parentElement.innerHTML += this.template;
	  }
	
	  _createClass(GalleryImage, [{
	    key: 'changeImage',
	    value: function changeImage() {
	      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	      this.element.classList.remove("gi-hidden");
	      this.imgDescription = description;
	      this.element.children[1].src = source;
	      this.element.children[1].name = description;
	      console.log(this);
	      this.restartAnimation();
	    }
	  }, {
	    key: 'renderImage',
	    value: function renderImage() {
	      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
	
	      console.log('Hello i\'m .gallery-image-' + this.position);
	      this.element.classList.remove("gi-hidden");
	      this.renderAnimation.from(this.element, 1, { opacity: 20, x: "-2000px", ease: Power0.easeNone }).from(this.element.children[1], 1, { ease: Power0.easeNone, transform: "rotateX(90deg)", transformOrigin: "left top", transformPerspective: 2 }, '0');
	    }
	  }, {
	    key: 'fadeImage',
	    value: function fadeImage() {
	      console.log('Hasta la Vista .gallery-image-' + this.position);
	      this.fadeAnimation.to(this.element, 0.2, { opacity: 0, onComplete: this.hideImage.bind(this) });
	    }
	  }, {
	    key: 'hideImage',
	    value: function hideImage() {
	      console.log('I\'m outta here...');
	      this.element.classList.add("gi-hidden");
	    }
	  }, {
	    key: 'restartAnimation',
	    value: function restartAnimation() {
	      this.renderAnimation.restart();
	    }
	  }]);

	  return GalleryImage;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Gallery = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _galleryImage = __webpack_require__(2);
	
	var _helperFunctions = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gallery = exports.Gallery = function () {
	  function Gallery(parentElement) {
	    var arrayOfImages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	    _classCallCheck(this, Gallery);
	
	    this.totalImages = arrayOfImages.length;
	    this.galleryImageArray = (0, _helperFunctions.chunker)(arrayOfImages, 6);
	    this.activeArray = {
	      images: this.galleryImageArray[0],
	      page: 0
	    };
	
	    this.template = '\n     <section class="gi-container"></section>\n     <section class="gi-buttons-container">\n       <span class="gi-pager"> 1 / N </span>\n       <button class="gi-button">Next Project</button>\n     </section>\n    ';
	
	    (0, _helperFunctions.imagePreloader)(this.activeArray.images.map(function (imageObject) {
	      return imageObject.source;
	    }, this.renderHtml(parentElement)));
	  }
	
	  _createClass(Gallery, [{
	    key: 'renderHtml',
	    value: function renderHtml(element) {
	      element.innerHTML = this.template;
	      this.galleryImageArray2 = this.activeArray.images.map(function (imageObject, index) {
	        return new _galleryImage.GalleryImage(document.querySelector(".gi-container"), index, imageObject.source, imageObject.descrption);
	      });
	    }
	  }, {
	    key: 'updateHTML',
	    value: function updateHTML() {
	      document.querySelector(".gi-container").innerHTML = '';
	      this.galleryImageArray2 = this.activeArray.images.map(function (imageObject, index) {
	        return new _galleryImage.GalleryImage(document.querySelector(".gi-container"), index, imageObject.source, imageObject.descrption);
	      });
	    }
	  }, {
	    key: 'nextSet',
	    value: function nextSet() {
	      if (this.activeArray.page < this.galleryImageArray.length - 1) {
	        this.activeArray.page += 1;
	      } else {
	        this.activeArray.page = 0;
	      }
	      this.activeArray.images = this.galleryImageArray[this.activeArray.page];
	      console.log(this.activeArray);
	      (0, _helperFunctions.imagePreloader)(this.activeArray.images.map(function (imageObject) {
	        return imageObject.source;
	      }));
	
	      this.updateHTML();
	    }
	  }, {
	    key: 'setEventListeners',
	    value: function setEventListeners() {
	      //Set up listeners
	      document.querySelector(".gi-button").onclick = this.nextSet.bind(this);
	    }
	  }]);

	  return Gallery;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
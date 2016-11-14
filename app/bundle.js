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
	  return document.body.innerHTML = '\n    <section id="container"></section>\n    <button id="myButton" >Next Project</button>\n    ';
	});
	//preloading test
	
	//image test
	var element = document.getElementById("container");
	var myButton = document.getElementById("myButton");
	
	//Gallery test
	var gallery = new _gallery.Gallery(element, file.images);
	
	window.onload = function (event) {
	  console.log("window.onload");
	  gallery.initialize();
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
	    this.template = '\n      <div class="img-wrap gallery-image">\n        <span class="close hidden">&times;</span>\n        <img class="thumbnail" name="' + this.imgDescription + '" src="' + this.imgSource + '">\n      </div>\n    ';
	    this.renderAnimation = new TimelineLite();
	    this.fadeAnimation = new TimelineLite();
	    this.enlargeAnimation = new TimelineLite();
	
	    parentElement.innerHTML += this.template;
	  }
	
	  _createClass(GalleryImage, [{
	    key: 'changeImage',
	    value: function changeImage() {
	      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	      this.element.classList.remove("hidden");
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
	      this.element.classList.remove("hidden");
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
	      this.element.classList.add("hidden");
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Gallery = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _galleryImage = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gallery = exports.Gallery = function () {
	  function Gallery(element) {
	    var _this = this;
	
	    var arrayOfImages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	    _classCallCheck(this, Gallery);
	
	    this.galleryImageArray = [];
	    this.element = element;
	    this.galleryImageArray = arrayOfImages.map(function (imageObject, index) {
	      return new _galleryImage.GalleryImage(_this.element, index, imageObject.source, imageObject.descrption);
	    });
	
	    console.log(this.galleryImageArray);
	  }
	
	  _createClass(Gallery, [{
	    key: "initialize",
	    value: function initialize() {
	      this.galleryImageArray.forEach(function (galleryImage, index) {
	        var element = document.querySelector(".gallery-image-" + index);
	
	        element.children[0].addEventListener("click", function (event) {
	          element.children[0].classList.add("hidden");
	          element.children[1].classList.add("thumbnail");
	          element.children[1].classList.remove("fullsize");
	          event.stopPropagation();
	        });
	
	        element.children[1].addEventListener("click", function (event) {
	          element.children[0].classList.remove("hidden");
	          element.children[1].classList.remove("thumbnail");
	          element.children[1].classList.add("fullsize");
	          event.stopPropagation();
	        });
	
	        galleryImage.renderImage().bind(galleryImage);
	      });
	    }
	  }]);

	  return Gallery;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
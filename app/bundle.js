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
	
	(function () {
	
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
	  var galleryImage = new _galleryImage.GalleryImage(element, 1, 'http://placehold.it/1024x768/ffff00?text=Image6', "Description of Image #1");
	
	  //Main
	
	  galleryImage.renderImage(container, { x: 100, y: 100 });
	  console.log(galleryImage);
	
	  //change image test
	  function buttonClick() {
	    galleryImage.changeImage('http://placehold.it/1024x768/ff00ff?text=Image24', "Description of Image #24");
	  }
	
	  myButton.onclick = buttonClick;
	})();

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
	  function GalleryImage(element, position) {
	    var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	
	    _classCallCheck(this, GalleryImage);
	
	    this.imgSource = source;
	    this.imgDescription = description;
	    this.position = position;
	    this.template = '\n      <div  class="img-wrap gallery-image-' + this.position + '">\n        <span class="close hidden">&times;</span>\n        <img class="thumbnail" name="' + this.imgDescription + '" src="' + this.imgSource + '">\n      </div>\n    ';
	    this.renderAnimation = new TimelineLite();
	    this.fadeAnimation = new TimelineLite();
	    this.enlargeAnimation = new TimelineLite();
	
	    element.innerHTML += this.template;
	    this.element = document.querySelector('.gallery-image-' + this.position);
	    this.element.onclick = this.fullsizeImage.bind(this);
	    this.element.children[0].onclick = this.thumbnailImage.bind(this);
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
	  }, {
	    key: 'fullsizeImage',
	    value: function fullsizeImage(event) {
	      console.log('I\'m getting big...');
	      this.element.children[0].classList.remove("hidden");
	      this.element.children[1].classList.remove("thumbnail");
	      this.element.children[1].classList.add("fullsize");
	      event.stopPropagation();
	    }
	  }, {
	    key: 'thumbnailImage',
	    value: function thumbnailImage(event) {
	      console.log('I\'m getting small...');
	      this.element.children[0].classList.add("hidden");
	      this.element.children[1].classList.add("thumbnail");
	      this.element.children[1].classList.remove("fullsize");
	      event.stopPropagation();
	    }
	  }]);

	  return GalleryImage;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
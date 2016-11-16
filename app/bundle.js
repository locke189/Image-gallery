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
	
	  if (callback) images.onLoad = callback();
	
	  images.src = array;
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* GalleryImage
	*
	*
	*/
	var GalleryImage = exports.GalleryImage = function GalleryImage(parentElement, position) {
	  var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	
	  _classCallCheck(this, GalleryImage);
	
	  this.imgSource = source;
	  this.imgDescription = description;
	  this.position = position;
	  this.template = '\n\n      <div class="gi-item gi-img-wrap ">\n\n        <span class="gi-close gi-hidden">&times;</span>\n        <a href="#" class="mfp-iframe popup-it">\n          <img src="' + this.imgSource + '" class="gi-thumbnail img-responsive" alt="' + this.imgDescription + '">\n        </a>\n        <div class="gi-img-text"><h4>' + this.imgDescription + '<h4></div>\n      </div>\n    ';
	
	  parentElement.innerHTML += this.template;
	};

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
	
	    this.template = '\n\n      <div id="gi-mask"  class="gi-popup"style="display:none"></div>\n      <div id="gi-popUpDiv" class="gi-popup gi-img-wrap" style="display:none">\n        <span class="gi-close">&times;</span>\n        <img src="http://placehold.it/350x250/ff0000?text=Image1" class="gi-fullsize" alt="">\n      </div>\n\n     <section class="gi-container"></section>\n     <section class="gi-buttons-container">\n       <span class="gi-pager"> ' + (this.activeArray.page + 1) + ' / ' + this.galleryImageArray.length + ' </span>\n       <button class="gi-button">Next Project</button>\n     </section>\n    ';
	
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
	      this.animateLoading();
	      this.setEventListeners();
	    }
	  }, {
	    key: 'updateHTML',
	    value: function updateHTML() {
	      document.querySelector(".gi-container").innerHTML = '';
	      this.galleryImageArray2 = this.activeArray.images.map(function (imageObject, index) {
	        return new _galleryImage.GalleryImage(document.querySelector(".gi-container"), index, imageObject.source, imageObject.descrption);
	      });
	      this.animateLoading();
	      document.querySelector(".gi-pager").innerHTML = this.activeArray.page + 1 + ' / ' + this.galleryImageArray.length;
	    }
	  }, {
	    key: 'animateLoading',
	    value: function animateLoading() {
	      var imageContainers = document.querySelectorAll(".gi-item");
	
	      console.log('Animating...');
	      var t1 = new TimelineLite();
	      t1.staggerFrom(imageContainers, 1, { opacity: 0, x: "-1000", ease: Power0.easeNone }, -0.3, "stagger");
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
	      this.setEventListeners();
	    }
	  }, {
	    key: 'setAnimationTo',
	    value: function setAnimationTo(element, time, CSSObject) {
	      return function () {
	        var t1 = new TimelineLite();
	        t1.to(element, time, CSSObject);
	      };
	    }
	  }, {
	    key: 'setEventListeners',
	    value: function setEventListeners() {
	      var _this = this;
	
	      //Set up listeners   this.nextSet.bind(this)
	      var giButton = document.querySelector(".gi-button");
	      giButton.onclick = this.setAnimationTo(document.querySelectorAll(".gi-item"), 0.2, { opacity: 0, ease: Power0.easeNone, onComplete: this.nextSet.bind(this) });
	
	      document.querySelectorAll(".gi-img-text").forEach(function (element) {
	        console.log('this is working');
	        element.onmouseenter = _this.setAnimationTo(element, 0.2, { opacity: 0.8, ease: Power0.easeNone });
	        element.onmouseleave = _this.setAnimationTo(element, 0.2, { opacity: 0, ease: Power0.easeNone });
	      });
	
	      document.querySelectorAll(".gi-item").forEach(function (element) {
	        console.log('this is working');
	        //element.onclick = this.setAnimationTo(document.getElementById("gi-mask"),0.2,{opacity:0.65, ease: Power0.easeNone});
	        element.onclick = _this.popUpOn(element);
	      });
	
	      var giButtonClose = document.querySelector(".gi-close");
	      giButtonClose.onclick = this.togglePopUp;
	
	      window.onresize = this.positionPopup;
	    }
	  }, {
	    key: 'positionPopup',
	    value: function positionPopup() {
	      var popup = document.getElementById("gi-popUpDiv");
	      var imgWidth = document.querySelector(".gi-fullsize").width;
	      var imgHeight = document.querySelector(".gi-fullsize").height;
	      console.log('X = ' + imgWidth + ' clientWidth = ' + document.body.parentNode.clientWidth);
	      console.log('Y = ' + imgHeight + ' clientHeight = ' + document.documentElement.clientHeight);
	      popup.style.top = (document.documentElement.clientHeight - imgHeight) / 2 + 'px';
	      popup.style.left = (document.body.parentNode.clientWidth - imgWidth) / 2 + 'px';
	    }
	  }, {
	    key: 'togglePopUp',
	    value: function togglePopUp() {
	      var mask = document.getElementById("gi-mask");
	      var popup = document.getElementById("gi-popUpDiv");
	      var t1 = new TimelineLite();
	      var imgWidth = document.querySelector(".gi-fullsize").width;
	      var imgHeigth = document.querySelector(".gi-fullsize").heigth;
	      console.log(mask);
	
	      if (mask.style.display === 'none') {
	        mask.style.display = 'block';
	        popup.style.display = 'block';
	        popup.style.top = (document.documentElement.clientHeight - imgHeigth) / 2 + 'px';
	        popup.style.left = (document.body.parentNode.clientWidth - imgWidth) / 2 + 'px';
	        t1.to(mask, 0.2, { opacity: 0.8, ease: Power0.easeNone }).to(popup, 0.2, { opacity: 1, ease: Power0.easeNone });
	      } else {
	
	        t1.to(mask, 0.2, { opacity: 0, ease: Power0.easeNone, onComplete: function onComplete() {
	            mask.style.display = 'none';
	            popup.style.display = 'none';
	          } }).to(popup, 0.2, { opacity: 0, ease: Power0.easeNone });
	      }
	    }
	  }, {
	    key: 'popUpOn',
	    value: function popUpOn(element) {
	      return function () {
	        var mask = document.getElementById("gi-mask");
	        var popup = document.getElementById("gi-popUpDiv");
	        var t1 = new TimelineLite();
	
	        document.querySelector(".gi-fullsize").src = element.children[1].children[0].src;
	
	        var imgWidth = document.querySelector(".gi-fullsize").width;
	        var imgHeight = document.querySelector(".gi-fullsize").height;
	        mask.style.display = 'block';
	        popup.style.display = 'block';
	        console.log('X = ' + imgWidth + ' clientWidth = ' + document.body.parentNode.clientWidth);
	        console.log('Y = ' + imgHeight + ' clientHeight = ' + document.documentElement.clientHeight);
	        popup.style.top = (document.documentElement.clientHeight - imgHeight) / 2 + 'px';
	        popup.style.left = (document.body.parentNode.clientWidth - imgWidth) / 2 + 'px';
	        t1.to(mask, 0.2, { opacity: 0.8, ease: Power0.easeNone }).to(popup, 0.2, { opacity: 1, ease: Power0.easeNone });
	      };
	    }
	  }, {
	    key: 'popUpAnimationOn',
	    value: function popUpAnimationOn() {
	
	      this.togglePopUp();
	    }
	  }]);

	  return Gallery;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
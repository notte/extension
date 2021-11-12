/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/demo.ts":
/*!*********************!*\
  !*** ./src/demo.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nconst demo = __webpack_require__(/*! ./demo.scss */ \"./src/demo.scss\");\n\nlet subCache = {};\nprocessSubData.bind(undefined);\n\nfunction getSubs(language) {\n  return __awaiter(this, void 0, void 0, function* () {\n    if (!language) {\n      return;\n    }\n\n    const videoId = getVideoId(); // console.log(language, videoId, 1);\n    // console.log(subCache, videoId, language )\n\n    let urlObject = new URL(subCache[videoId][language]);\n    console.log(urlObject, 2); // urlObject.searchParams.set('fmt', 'vtt')\n    // const subUri: string = urlObject.href\n    // const resp = await fetch(subUri)\n    // const text = await resp.text()\n    // const res = parse(text);\n    // return parse(text)\n  });\n}\n\nfunction getVideoId() {\n  const regExpression = /^.*(youtu\\.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/;\n  const match = window.location.href.match(regExpression);\n\n  if (match && match[2].length === 11) {\n    return match[2];\n  }\n\n  console.error(\"Can't get youtube video id\");\n  return '';\n}\n\ngetSubs('en');\nsetTimeout(() => {\n  const video = document.querySelector(\"video\");\n\n  if (video) {// console.log(video.currentTime);\n    // console.log(video.dataset);\n  } // const subs = useStore(subsStore);\n\n}, 3000); // var p = document.createElement(\"h1\");\n// p.textContent = \"This paragraph was added by a page script.\";\n// p.setAttribute(\"id\", \"page-script-para\");\n// document.body.appendChild(p);\n\nfunction processSubData(event) {\n  console.log(event);\n  const urlObject = new URL(event.detail);\n  const lang = urlObject.searchParams.get('tlang') || urlObject.searchParams.get('lang') || '';\n  const videoId = urlObject.searchParams.get('v') || '';\n  subCache[videoId] = {};\n  subCache[videoId][lang] = urlObject.href;\n}\n\n\n\n//# sourceURL=webpack://extension/./src/demo.ts?");

/***/ }),

/***/ "./src/demo.scss":
/*!***********************!*\
  !*** ./src/demo.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://extension/./src/demo.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/demo.ts");
/******/ 	
/******/ })()
;
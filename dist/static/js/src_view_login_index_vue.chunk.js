"use strict";
(self["webpackChunkelm_webpack"] = self["webpackChunkelm_webpack"] || []).push([["src_view_login_index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/login/index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/login/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/getData */ "./src/service/getData.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted() {
    this.getCode();
  },
  methods: {
    async getCode() {
      const result = await (0,_service_getData__WEBPACK_IMPORTED_MODULE_0__.code)();
      console.log(result);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/login/index.vue?vue&type=template&id=a3ccadca&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/login/index.vue?vue&type=template&id=a3ccadca& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h1", [_vm._v("hello login")]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./src/config/fetch.js":
/*!*****************************!*\
  !*** ./src/config/fetch.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });
    if (dataStr !== '') {
      dataStr = dataStr.slice(0, dataStr.length - 1);
      url = url + '?' + dataStr;
    }
  }
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "force-cache"
    };
    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      });
    }
    try {
      console.log(url, requestConfig);
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  }
});

/***/ }),

/***/ "./src/service/getData.js":
/*!********************************!*\
  !*** ./src/service/getData.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cityGuess: function() { return /* binding */ cityGuess; },
/* harmony export */   code: function() { return /* binding */ code; },
/* harmony export */   currentcity: function() { return /* binding */ currentcity; },
/* harmony export */   groupcity: function() { return /* binding */ groupcity; },
/* harmony export */   hotcity: function() { return /* binding */ hotcity; }
/* harmony export */ });
/* harmony import */ var _config_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/fetch */ "./src/config/fetch.js");

/**
 * 获取首页默认地址
 */

const cityGuess = () => (0,_config_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/v1/cities', {
  type: 'guess'
});

/**
 * 获取首页热门城市
 */

const hotcity = () => (0,_config_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/v1/cities', {
  type: 'hot'
});

/**
 * 获取首页所有城市
 */

const groupcity = () => (0,_config_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/v1/cities', {
  type: 'group'
});

/**
 * 获取当前所在城市
 */

const currentcity = number => (0,_config_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/v1/cities/' + number);

// 密码登录的验证码
const code = () => (0,_config_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/v1/captchas', {}, 'POST');

/***/ }),

/***/ "./src/view/login/index.vue":
/*!**********************************!*\
  !*** ./src/view/login/index.vue ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_a3ccadca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=a3ccadca& */ "./src/view/login/index.vue?vue&type=template&id=a3ccadca&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/view/login/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_a3ccadca___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_a3ccadca___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/view/login/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/view/login/index.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/view/login/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/login/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/view/login/index.vue?vue&type=template&id=a3ccadca&":
/*!*****************************************************************!*\
  !*** ./src/view/login/index.vue?vue&type=template&id=a3ccadca& ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_a3ccadca___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_a3ccadca___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_a3ccadca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=a3ccadca& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/login/index.vue?vue&type=template&id=a3ccadca&");


/***/ })

}]);
//# sourceMappingURL=src_view_login_index_vue.chunk.js.map
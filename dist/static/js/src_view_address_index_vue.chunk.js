"use strict";
(self["webpackChunkelm_webpack"] = self["webpackChunkelm_webpack"] || []).push([["src_view_address_index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/address/index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/address/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var D_elm_webpack_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var D_elm_webpack_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _service_getData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/getData */ "./src/service/getData.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      localCity: {},
      hotcity: [],
      groupcity: []
    };
  },
  mounted: function mounted() {
    this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;
      return (0,D_elm_webpack_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/(0,D_elm_webpack_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        return (0,D_elm_webpack_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0,_service_getData__WEBPACK_IMPORTED_MODULE_2__.cityGuess)();
            case 2:
              _this.localCity = _context.sent;
              _context.next = 5;
              return (0,_service_getData__WEBPACK_IMPORTED_MODULE_2__.hotcity)();
            case 5:
              _this.hotcity = _context.sent;
              _context.next = 8;
              return (0,_service_getData__WEBPACK_IMPORTED_MODULE_2__.groupcity)();
            case 8:
              _this.groupcity = _context.sent;
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/address/index.vue?vue&type=template&id=6c884a26&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/address/index.vue?vue&type=template&id=6c884a26& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h1", [_vm._v("hello address")]);
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

/***/ "./src/view/address/index.vue":
/*!************************************!*\
  !*** ./src/view/address/index.vue ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_6c884a26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=6c884a26& */ "./src/view/address/index.vue?vue&type=template&id=6c884a26&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/view/address/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_6c884a26___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_6c884a26___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/view/address/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/view/address/index.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/view/address/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/address/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/view/address/index.vue?vue&type=template&id=6c884a26&":
/*!*******************************************************************!*\
  !*** ./src/view/address/index.vue?vue&type=template&id=6c884a26& ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_6c884a26___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_6c884a26___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_6_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_6c884a26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=6c884a26& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-6!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/view/address/index.vue?vue&type=template&id=6c884a26&");


/***/ })

}]);
//# sourceMappingURL=src_view_address_index_vue.chunk.js.map
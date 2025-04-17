"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[5592],{"./packages/select-with-tags/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},select_with_tags:function(){return select_with_tags},select_with_tags_desktop:function(){return select_with_tags_desktop},select_with_tags_mobile:function(){return select_with_tags_mobile}});var _select_with_tags$par,_select_with_tags$par2,_select_with_tags$par3,_select_with_tags_des,_select_with_tags_des2,_select_with_tags_des3,_select_with_tags_mob,_select_with_tags_mob2,_select_with_tags_mob3,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_utils__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@alfalab/utils/dist/esm/pluralize/util.js"),_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/screenshot-utils/screenshots-story/utils.ts"),_alfalab_core_components_select_with_tags__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/select-with-tags/modern/index.js"),_alfalab_core_components_select_with_tags_desktop__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./dist/select-with-tags/modern/desktop/index.js"),_alfalab_core_components_select_with_tags_mobile__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./dist/select-with-tags/modern/mobile/index.js"),_alfalab_core_components_select_shared__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./dist/select/modern/shared/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/SelectWithTags",component:_alfalab_core_components_select_with_tags__WEBPACK_IMPORTED_MODULE_3__.SelectWithTags,id:"SelectWithTags"},options=[{key:"1",content:"H",value:"H"},{key:"2",content:"Li",value:"Li"},{key:"3",content:"Na",value:"Na"},{key:"4",content:"Curium",value:"Curium"},{key:"5",content:"Berkelium",value:"Berkelium"},{key:"6",content:"Californium",value:"Californium"},{key:"7",content:"Einsteinium",value:"Einsteinium"},{key:"8",content:"Fermium",value:"Fermium"},{key:"9",content:"Mendelevium",value:"Mendelevium"},{key:"10",content:"Nobelium",value:"Nobelium"},{key:"11",content:"Lawrencium",value:"Lawrencium"},{key:"12",content:"Rutherfordium",value:"Rutherfordium"},{key:"13",content:"Dubnium",value:"Dubnium"},{key:"14",content:"Seaborgium",value:"Seaborgium"},{key:"15",content:"Bohrium",value:"Bohrium"}],renderComponent=function(){var component=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_alfalab_core_components_select_with_tags__WEBPACK_IMPORTED_MODULE_3__.SelectWithTags,previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_2__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_2__.Ph)("wrapperStyles")),isPreview=Object.keys(previewStyles).length>0,Component=isPreview?_alfalab_core_components_select_with_tags_desktop__WEBPACK_IMPORTED_MODULE_4__.SelectWithTagsDesktop:component,_React$useState=react__WEBPACK_IMPORTED_MODULE_0__.useState(""),_React$useState2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__.Z)(_React$useState,2),value=_React$useState2[0],setValue=_React$useState2[1],_React$useState3=react__WEBPACK_IMPORTED_MODULE_0__.useState(isPreview?options.slice(3,8):[]),_React$useState4=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__.Z)(_React$useState3,2),selected=_React$useState4[0],setSelected=_React$useState4[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{style:previewStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{style:{width:isPreview?256:400},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Component,{collapseTagList:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("collapseTagList",!0),moveInputToNewLine:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("moveInputToNewLine",!0),options:options,block:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("block",!0),size:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("size",[48,56,64,72],72),disabled:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("disabled",!1),error:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("error",""),hint:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("hint",""),Arrow:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("Arrow",!1)?_alfalab_core_components_select_shared__WEBPACK_IMPORTED_MODULE_6__.Arrow:void 0,circularNavigation:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("circularNavigation",!1),placeholder:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("placeholder","Элемент"),label:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("label",""),autocomplete:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("autocomplete",!0),onInput:function(event){setValue(event.target.value)},transformCollapsedTagText:function(count){return"+".concat(count," ").concat((0,_alfalab_utils__WEBPACK_IMPORTED_MODULE_9__._)(count,"элемент","элемента","элементов"))},value:value,onChange:function(_ref){setSelected(_ref.selectedMultiple)},selected:selected})})})},select_with_tags={name:"SelectWithTags",render:function render(){return renderComponent()}},select_with_tags_desktop={name:"SelectWithTagsDesktop",render:function render(){return renderComponent(_alfalab_core_components_select_with_tags_desktop__WEBPACK_IMPORTED_MODULE_4__.SelectWithTagsDesktop)}},select_with_tags_mobile={name:"SelectWithTagsMobile",render:function render(){return renderComponent(_alfalab_core_components_select_with_tags_mobile__WEBPACK_IMPORTED_MODULE_5__.SelectWithTagsMobile)}};__webpack_exports__.default=meta,select_with_tags.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},select_with_tags.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},null===(_select_with_tags$par=select_with_tags.parameters)||void 0===_select_with_tags$par?void 0:_select_with_tags$par.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({originalSource:"{\n  name: 'SelectWithTags',\n  render: () => renderComponent()\n}"},null===(_select_with_tags$par2=select_with_tags.parameters)||void 0===_select_with_tags$par2?void 0:null===(_select_with_tags$par3=_select_with_tags$par2.docs)||void 0===_select_with_tags$par3?void 0:_select_with_tags$par3.source)})}),select_with_tags_desktop.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},select_with_tags_desktop.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},null===(_select_with_tags_des=select_with_tags_desktop.parameters)||void 0===_select_with_tags_des?void 0:_select_with_tags_des.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({originalSource:"{\n  name: 'SelectWithTagsDesktop',\n  render: () => renderComponent(SelectWithTagsDesktop)\n}"},null===(_select_with_tags_des2=select_with_tags_desktop.parameters)||void 0===_select_with_tags_des2?void 0:null===(_select_with_tags_des3=_select_with_tags_des2.docs)||void 0===_select_with_tags_des3?void 0:_select_with_tags_des3.source)})}),select_with_tags_mobile.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},select_with_tags_mobile.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},null===(_select_with_tags_mob=select_with_tags_mobile.parameters)||void 0===_select_with_tags_mob?void 0:_select_with_tags_mob.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({originalSource:"{\n  name: 'SelectWithTagsMobile',\n  render: () => renderComponent(SelectWithTagsMobile)\n}"},null===(_select_with_tags_mob2=select_with_tags_mobile.parameters)||void 0===_select_with_tags_mob2?void 0:null===(_select_with_tags_mob3=_select_with_tags_mob2.docs)||void 0===_select_with_tags_mob3?void 0:_select_with_tags_mob3.source)})});let __namedExportsOrder=["select_with_tags","select_with_tags_desktop","select_with_tags_mobile"]},"./packages/screenshot-utils/screenshots-story/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DO:function(){return isJsonObj},FX:function(){return stylesStringToObj},Ph:function(){return getQueryParam},Qh:function(){return parseKnobs}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),queryParams=__webpack_require__("./node_modules/querystring/index.js").parse(document.location.search),getQueryParam=function(param){var parse=arguments.length>1&&void 0!==arguments[1]&&arguments[1],value=queryParams[param];return parse?parseValue(value):value},parseKnobs=function(){return Object.entries(queryParams).reduce(function(acc,_ref){var _ref2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,2),k=_ref2[0],v=_ref2[1];return k.startsWith("knob-")&&(acc[k.replace("knob-","")]=parseValue(v)),acc},{})};function parseValue(value){if(value){if(["true","false"].includes(value))return"true"===value;if(!Number.isNaN(+value)&&!Number.isNaN(parseFloat(value)))return parseFloat(value);try{return JSON.parse(value)}catch(e){return value}}}function stylesStringToObj(){var str=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!str)return{};var properties=str.split(";").map(function(v){return v.trim()}),obj={};return properties.forEach(function(property){var _property$split$map=property.split(":").map(function(v){return v.trim()}),_property$split$map2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_property$split$map,2),name=_property$split$map2[0],val=_property$split$map2[1];obj[name]=val}),obj}function isJsonObj(str){try{var ret=JSON.parse(str);return"object"==typeof ret}catch(e){return!1}}},"./node_modules/querystring/decode.js":function(module){function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?Array.isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj}},"./node_modules/querystring/encode.js":function(module){var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return(sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj)?Object.keys(obj).map(function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return Array.isArray(obj[k])?obj[k].map(function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""}},"./node_modules/querystring/index.js":function(__unused_webpack_module,exports,__webpack_require__){exports.decode=exports.parse=__webpack_require__("./node_modules/querystring/decode.js"),exports.encode=exports.stringify=__webpack_require__("./node_modules/querystring/encode.js")}}]);
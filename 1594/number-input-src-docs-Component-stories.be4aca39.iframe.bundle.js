"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[5430],{"./packages/number-input/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},number_input:function(){return number_input}});var _number_input$paramet,_number_input$paramet2,_number_input$paramet3,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");__webpack_require__("./node_modules/react/index.js");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_icons_glyph_StarMIcon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@alfalab/icons-glyph/StarMIcon.js"),_alfalab_core_components_number_input__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/number-input/modern/index.js"),_alfalab_icons_glyph_DiamondsSIcon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@alfalab/icons-glyph/DiamondsSIcon.js"),_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/screenshot-utils/screenshots-story/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/NumberInput",component:_alfalab_core_components_number_input__WEBPACK_IMPORTED_MODULE_3__.NumberInput,id:"NumberInput"},number_input={name:"NumberInput",render:function render(){var previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_5__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_5__.Ph)("wrapperStyles"));if(Object.keys(previewStyles).length>0)return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{style:previewStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{style:{width:256},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_alfalab_core_components_number_input__WEBPACK_IMPORTED_MODULE_3__.NumberInput,{label:"Число",size:56,value:1234,step:1})})});var colors=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("colors",["default","inverted"],"default"),stepper=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("stepper",!1),size=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("size",[40,48,56,64,72],48),IconComponent=40===size?_alfalab_icons_glyph_DiamondsSIcon__WEBPACK_IMPORTED_MODULE_4__.DiamondsSIcon:_alfalab_icons_glyph_StarMIcon__WEBPACK_IMPORTED_MODULE_2__.StarMIcon;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{style:{backgroundColor:"inverted"===colors?"var(--color-light-base-bg-primary-inverted)":"transparent",padding:"8px",position:"absolute",top:0,left:0,right:0,bottom:0},children:stepper?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_alfalab_core_components_number_input__WEBPACK_IMPORTED_MODULE_3__.NumberInput,{size:size,colors:colors,disabled:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("disabled",!1),step:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("step",1),max:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("max",10),min:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("min",0)}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_alfalab_core_components_number_input__WEBPACK_IMPORTED_MODULE_3__.NumberInput,{separator:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("separator",[",","."],","),fractionLength:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("fractionLength",2),block:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("block",!1),clear:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("clear",!1),size:size,colors:colors,disabled:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("disabled",!1),placeholder:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("placeholder",""),label:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("label",""),labelView:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("labelView",["inner","outer"],"inner"),hint:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("hint",""),error:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("error",""),success:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("success",!1),rightAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("rightAddons",!1)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(IconComponent,{}),leftAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("leftAddons",!1)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(IconComponent,{}),bottomAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("bottomAddons",!1)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{children:"bottom text"}),readOnly:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("readOnly",!1)})})}};__webpack_exports__.default=meta,number_input.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)({},number_input.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)({},null===(_number_input$paramet=number_input.parameters)||void 0===_number_input$paramet?void 0:_number_input$paramet.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)({originalSource:"{\n  name: 'NumberInput',\n  render: () => {\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    const isPreview = Object.keys(previewStyles).length > 0;\n    if (isPreview) {\n      return <div style={previewStyles}>\n                    <div style={{\n          width: 256\n        }}>\n                        <NumberInput label='Число' size={56} value={1234} step={1} />\n                    </div>\n                </div>;\n    }\n    const colors = select('colors', ['default', 'inverted'], 'default');\n    const stepper = boolean('stepper', false);\n    const size = select('size', [40, 48, 56, 64, 72], 48);\n    const IconComponent = size === 40 ? DiamondsSIcon : StarMIcon;\n    return <div style={{\n      backgroundColor: colors === 'inverted' ? 'var(--color-light-base-bg-primary-inverted)' : 'transparent',\n      padding: '8px',\n      position: 'absolute',\n      top: 0,\n      left: 0,\n      right: 0,\n      bottom: 0\n    }}>\n                {stepper ? <NumberInput size={size} colors={colors} disabled={boolean('disabled', false)} step={number('step', 1)} max={number('max', 10)} min={number('min', 0)} /> : <NumberInput separator={select('separator', [',', '.'], ',')} fractionLength={number('fractionLength', 2)} block={boolean('block', false)} clear={boolean('clear', false)} size={size} colors={colors} disabled={boolean('disabled', false)} placeholder={text('placeholder', '')} label={text('label', '')} labelView={select('labelView', ['inner', 'outer'], 'inner')} hint={text('hint', '')} error={text('error', '')} success={boolean('success', false)} rightAddons={boolean('rightAddons', false) && <IconComponent />} leftAddons={boolean('leftAddons', false) && <IconComponent />} bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>} readOnly={boolean('readOnly', false)} />}\n            </div>;\n  }\n}"},null===(_number_input$paramet2=number_input.parameters)||void 0===_number_input$paramet2?void 0:null===(_number_input$paramet3=_number_input$paramet2.docs)||void 0===_number_input$paramet3?void 0:_number_input$paramet3.source)})});let __namedExportsOrder=["number_input"]},"./packages/screenshot-utils/screenshots-story/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DO:function(){return isJsonObj},FX:function(){return stylesStringToObj},Ph:function(){return getQueryParam},Qh:function(){return parseKnobs}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),queryParams=__webpack_require__("./node_modules/querystring/index.js").parse(document.location.search),getQueryParam=function(param){var parse=arguments.length>1&&void 0!==arguments[1]&&arguments[1],value=queryParams[param];return parse?parseValue(value):value},parseKnobs=function(){return Object.entries(queryParams).reduce(function(acc,_ref){var _ref2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,2),k=_ref2[0],v=_ref2[1];return k.startsWith("knob-")&&(acc[k.replace("knob-","")]=parseValue(v)),acc},{})};function parseValue(value){if(value){if(["true","false"].includes(value))return"true"===value;if(!Number.isNaN(+value)&&!Number.isNaN(parseFloat(value)))return parseFloat(value);try{return JSON.parse(value)}catch(e){return value}}}function stylesStringToObj(){var str=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!str)return{};var properties=str.split(";").map(function(v){return v.trim()}),obj={};return properties.forEach(function(property){var _property$split$map=property.split(":").map(function(v){return v.trim()}),_property$split$map2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_property$split$map,2),name=_property$split$map2[0],val=_property$split$map2[1];obj[name]=val}),obj}function isJsonObj(str){try{var ret=JSON.parse(str);return"object"==typeof ret}catch(e){return!1}}},"./node_modules/querystring/decode.js":function(module){function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?Array.isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj}},"./node_modules/querystring/encode.js":function(module){var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return(sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj)?Object.keys(obj).map(function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return Array.isArray(obj[k])?obj[k].map(function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""}},"./node_modules/querystring/index.js":function(__unused_webpack_module,exports,__webpack_require__){exports.decode=exports.parse=__webpack_require__("./node_modules/querystring/decode.js"),exports.encode=exports.stringify=__webpack_require__("./node_modules/querystring/encode.js")}}]);
"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[2238,5513,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");const MDXContext=react.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents:allComponents})}}function useMDXComponents(components){const contextComponents=react.useContext(MDXContext);return react.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components:components,children:children,disableParentContext:disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException:showException}=this.props;showException(err)}render(){let{hasError:hasError}=this.state,{children:children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise(((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then((({MDXProvider:MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components:components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context:context,docsParameter:docsParameter}))),element))).then((()=>resolve()))}))},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=(mod=mdx_react_shim_exports,__copyProps(__defProp({},"__esModule",{value:!0}),mod)),((target,mod,secondTarget)=>{__copyProps(target,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")})(mdx_react_shim_exports,__webpack_require__("./node_modules/@mdx-js/react/index.js"),module.exports)},"./packages/comment/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},comment:function(){return comment}});var _comment$parameters,_comment$parameters2,_comment$parameters2$,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js")),_alfalab_core_components_comment__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./dist/comment/modern/index.js"),_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/screenshot-utils/screenshots-story/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/Comment",component:_alfalab_core_components_comment__WEBPACK_IMPORTED_MODULE_2__.Comment,id:"Comment"},comment={name:"Comment",render:function render(){var children=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("Текст комментария","Comment"),rowLimit=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("Количество строк",["","2","5"],""),previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_3__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_3__.Ph)("wrapperStyles"));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:previewStyles,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("style",{children:".comment{background: var(--color-light-specialbg-secondary-transparent)}  "}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_alfalab_core_components_comment__WEBPACK_IMPORTED_MODULE_2__.Comment,{rowLimit:rowLimit,className:"comment",children:children})]})}};__webpack_exports__.default=meta,comment.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},comment.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},null===(_comment$parameters=comment.parameters)||void 0===_comment$parameters?void 0:_comment$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({originalSource:"{\n  name: 'Comment',\n  render: () => {\n    const children = text('Текст комментария', 'Comment');\n    const rowLimit = select('Количество строк', ['', '2', '5'], '');\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    return <div style={previewStyles}>\n                <style>\n                    {`.comment{background: var(--color-light-specialbg-secondary-transparent)}  `}\n                </style>\n                <Comment rowLimit={rowLimit} className='comment'>\n                    {children}\n                </Comment>\n            </div>;\n  }\n}"},null===(_comment$parameters2=comment.parameters)||void 0===_comment$parameters2||null===(_comment$parameters2$=_comment$parameters2.docs)||void 0===_comment$parameters2$?void 0:_comment$parameters2$.source)})});const __namedExportsOrder=["comment"]},"./packages/comment/src/docs/Component.docs.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Component_docs}});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),Component_stories=__webpack_require__("./packages/comment/src/docs/Component.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"примеры",children:"Примеры"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<div style={{width: 290}} >\n    <Comment>Короткий комментарий</Comment>\n    <Gap size='m'/>\n    <Comment>Длинный комментарий без ограничения по количеству строк</Comment>\n    <Gap size='m'/>\n    <Comment rowLimit={2}>Длинный комментарий с ограничением по количеству строк</Comment>\n</div>\n"})})]})}var description=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},src=__webpack_require__("./packages/comment/src/index.ts");function development_createMdxContent(props){const _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { Comment } from '@alfalab/core-components/comment';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{of:src.Comment})]})}var development=function development_MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)},CHANGELOGraw_namespaceObject="# Change Log\n\n## 2.3.2\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@4.4.0\n\n## 2.3.1\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@4.3.0\n\n## 2.3.0\n\n### Minor Changes\n\n### [#984](https://github.com/core-ds/core-components/pull/984)\n\n-   view у Typography.Text заменен с component на component-primary\n\n### [#992](https://github.com/core-ds/core-components/pull/992)\n\n-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@4.2.1\n\n## 2.2.2\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@4.2.0\n\n## 2.2.1\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@4.1.0\n\n## 2.2.0\n\n### Minor Changes\n\n### [#713](https://github.com/core-ds/core-components/pull/713)\n\n-   Теперь каждый пакет публикуется с исходниками\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@4.0.0\n\n## 2.1.11\n\n### Patch Changes\n\n### [#766](https://github.com/core-ds/core-components/pull/766)\n\n-   Удален скрипт отправки статистики (send-stats)\n\n-   Обновлены зависимости\n    -   typography@3.2.2\n\n## 2.1.10\n\n### Patch Changes\n\n### [#588](https://github.com/core-ds/core-components/pull/588)\n\n-   Добавлен \\_\\_esModule в cjs экспорт\n\n-   Обновлены зависимости\n    -   typography@3.2.1\n\n## 2.1.9\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.2.0\n\n## 2.1.8\n\n### Patch Changes\n\n### [#526](https://github.com/core-ds/core-components/pull/526)\n\n-   В зависимости добавлена библиотека tslib\n\n-   Обновлены зависимости\n    -   typography@3.1.1\n\n## 2.1.7\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.1.0\n\n## 2.1.6\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.0.8\n\n## 2.1.5\n\n### Patch Changes\n\n### [#418](https://github.com/core-ds/core-components/pull/418)\n\n-   Исправлена проблема с default-импортом в cjs форматах\n\n-   Обновлены зависимости\n    -   typography@3.0.7\n\n## 2.1.4\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.0.6\n\n## 2.1.3\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.0.5\n\n## 2.1.2\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.0.4\n\n## 2.1.1\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   typography@3.0.3\n\n## 2.1.0\n\n### Minor Changes\n\n### [#288](https://github.com/core-ds/core-components/pull/288)\n\n-   Добавлен проп rowLimit для управления количеством строк для отображения\n\nAll notable changes to this project will be documented in this file.\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-comment@2.0.1...@alfalab/core-components-comment@2.0.2) (2022-09-01)\n\n**Note:** Version bump only for package @alfalab/core-components-comment\n\n## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-comment@2.0.0...@alfalab/core-components-comment@2.0.1) (2022-08-19)\n\n**Note:** Version bump only for package @alfalab/core-components-comment\n\n# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-comment@1.1.2...@alfalab/core-components-comment@2.0.0) (2022-08-17)\n\n### Features\n\n-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))\n\n### BREAKING CHANGES\n\n-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена\n    директория dist)\n\nCo-authored-by: Vladimir Gevak <VGevak@alfabank.ru>\n\n## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-comment@1.1.1...@alfalab/core-components-comment@1.1.2) (2022-08-17)\n\n### Bug Fixes\n\n-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))\n\n## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-comment@1.1.0...@alfalab/core-components-comment@1.1.1) (2022-08-04)\n\n### Bug Fixes\n\n-   **comment:** add missing types ([95888d8](https://github.com/core-ds/core-components/commit/95888d8f87934140c8c6f113aee413a11579c7b6))\n\n# 1.1.0 (2022-07-22)\n\n### Features\n\n-   **comment-view:** add comment view component ([#134](https://github.com/core-ds/core-components/issues/134)) ([f1e0b69](https://github.com/core-ds/core-components/commit/f1e0b695ad9bd17f6a3503aa3ceed03e09112dbd))\n";function Component_docs_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:Component_stories}),"\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"Comment",children:"Используется для отображаения комментариев."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:CHANGELOGraw_namespaceObject}),development:(0,jsx_runtime.jsx)(development,{})})]})}var Component_docs=function Component_docs_MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(Component_docs_createMdxContent,props)})):Component_docs_createMdxContent()}},"./packages/comment/src/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Comment:function(){return Comment}});__webpack_require__("./node_modules/react/index.js");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),modern=__webpack_require__("./dist/typography/modern/index.js"),index_module={component:"component_oE5Op",rowLimit2:"rowLimit2_P7xjW",rowLimit5:"rowLimit5_YZGHs"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Comment=function Comment(_ref){var className=_ref.className,dataTestId=_ref.dataTestId,children=_ref.children,rowLimit=_ref.rowLimit,textClassName=rowLimit&&index_module["rowLimit".concat(rowLimit)];return(0,jsx_runtime.jsx)("div",{className:classnames_default()(index_module.component,className),"data-test-id":dataTestId,children:(0,jsx_runtime.jsx)(modern.Typography.Text,{tag:"div",view:"component-primary",className:textClassName,color:"primary",children:children})})};try{Comment.displayName="Comment",Comment.__docgenInfo={description:"",displayName:"Comment",props:{rowLimit:{defaultValue:null,description:"Количество строк",name:"rowLimit",required:!1,type:{name:"enum",value:[{value:"2"},{value:"5"}]}},className:{defaultValue:null,description:"Сss класс для стилизации общей обёртки",name:"className",required:!1,type:{name:"string"}},dataTestId:{defaultValue:null,description:"Id компонента для тестов",name:"dataTestId",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Дочерние элементы.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/comment/src/Component.tsx#Comment"]={docgenInfo:Comment.__docgenInfo,name:"Comment",path:"packages/comment/src/Component.tsx#Comment"})}catch(__react_docgen_typescript_loader_error){}},"./packages/screenshot-utils/screenshots-story/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DO:function(){return isJsonObj},FX:function(){return stylesStringToObj},Ph:function(){return getQueryParam},Qh:function(){return parseKnobs}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),queryParams=__webpack_require__("./node_modules/querystring/index.js").parse(document.location.search),getQueryParam=function getQueryParam(param){var parse=arguments.length>1&&void 0!==arguments[1]&&arguments[1],value=queryParams[param];return parse?parseValue(value):value},parseKnobs=function parseKnobs(){return Object.entries(queryParams).reduce((function(acc,_ref){var _ref2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,2),k=_ref2[0],v=_ref2[1];return k.startsWith("knob-")&&(acc[k.replace("knob-","")]=parseValue(v)),acc}),{})};function parseValue(value){if(value){if(function isBoolean(){return["true","false"].includes(value)}())return"true"===value;if(function isNumeric(){return!Number.isNaN(+value)&&!Number.isNaN(parseFloat(value))}())return parseFloat(value);try{return JSON.parse(value)}catch(e){return value}}}function stylesStringToObj(){var str=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!str)return{};var properties=str.split(";").map((function(v){return v.trim()})),obj={};return properties.forEach((function(property){var _property$split$map=property.split(":").map((function(v){return v.trim()})),_property$split$map2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_property$split$map,2),name=_property$split$map2[0],val=_property$split$map2[1];obj[name]=val})),obj}function isJsonObj(str){try{return"object"==typeof JSON.parse(str)}catch(e){return!1}}},"./node_modules/querystring/decode.js":function(module){function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?Array.isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj}},"./node_modules/querystring/encode.js":function(module){var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj?Object.keys(obj).map((function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return Array.isArray(obj[k])?obj[k].map((function(v){return ks+encodeURIComponent(stringifyPrimitive(v))})).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))})).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""}},"./node_modules/querystring/index.js":function(__unused_webpack_module,exports,__webpack_require__){exports.decode=exports.parse=__webpack_require__("./node_modules/querystring/decode.js"),exports.encode=exports.stringify=__webpack_require__("./node_modules/querystring/encode.js")}}]);
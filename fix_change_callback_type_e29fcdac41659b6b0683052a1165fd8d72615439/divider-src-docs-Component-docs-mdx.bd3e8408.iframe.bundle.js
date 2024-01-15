"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[6909,4438,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");const MDXContext=react.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents:allComponents})}}function useMDXComponents(components){const contextComponents=react.useContext(MDXContext);return react.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components:components,children:children,disableParentContext:disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException:showException}=this.props;showException(err)}render(){let{hasError:hasError}=this.state,{children:children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise(((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then((({MDXProvider:MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components:components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context:context,docsParameter:docsParameter}))),element))).then((()=>resolve()))}))},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=(mod=mdx_react_shim_exports,__copyProps(__defProp({},"__esModule",{value:!0}),mod)),((target,mod,secondTarget)=>{__copyProps(target,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")})(mdx_react_shim_exports,__webpack_require__("./node_modules/@mdx-js/react/index.js"),module.exports)},"./packages/divider/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},divider:function(){return divider}});var _divider$parameters,_divider$parameters2,_divider$parameters2$,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_alfalab_core_components_divider__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./dist/divider/modern/index.js")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/Divider",component:_alfalab_core_components_divider__WEBPACK_IMPORTED_MODULE_1__.Divider,id:"Divider"},divider={name:"Divider",render:function render(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{height:24,margin:"8px 0",backgroundColor:"#eeeff1"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_alfalab_core_components_divider__WEBPACK_IMPORTED_MODULE_1__.Divider,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{height:24,margin:"8px 0",backgroundColor:"#eeeff1"}})]})}};__webpack_exports__.default=meta,divider.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},divider.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},null===(_divider$parameters=divider.parameters)||void 0===_divider$parameters?void 0:_divider$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({originalSource:"{\n  name: 'Divider',\n  render: () => {\n    return <div>\n                <div style={{\n        height: 24,\n        margin: '8px 0',\n        backgroundColor: '#eeeff1'\n      }} />\n                <Divider />\n                <div style={{\n        height: 24,\n        margin: '8px 0',\n        backgroundColor: '#eeeff1'\n      }} />\n            </div>;\n  }\n}"},null===(_divider$parameters2=divider.parameters)||void 0===_divider$parameters2||null===(_divider$parameters2$=_divider$parameters2.docs)||void 0===_divider$parameters2$?void 0:_divider$parameters2$.source)})});const __namedExportsOrder=["divider"]},"./packages/divider/src/docs/Component.docs.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Component_docs}});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),Component_stories=__webpack_require__("./packages/divider/src/docs/Component.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"примеры",children:"Примеры"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<div>\n    <div style={{ height: 24, marginBottom: 'var(--gap-xs)', backgroundColor: 'var(--color-light-bg-secondary)' }} />\n\n    <Divider />\n\n    <div style={{ height: 24, marginTop: 'var(--gap-xs)', backgroundColor: 'var(--color-light-bg-secondary)' }} />\n</div>\n"})})]})}var description=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},src=__webpack_require__("./packages/divider/src/index.ts"),index_module="@import '../../themes/src/default.css';\n\n:root {\n    --divider-color: var(--color-light-neutral-400);\n}\n\n.component {\n    border: none;\n    border-bottom: 1px solid var(--divider-color);\n    margin: 0;\n}\n";function development_createMdxContent(props){const _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { Divider } from '@alfalab/core-components/divider';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{of:src.Divider}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"переменные",children:"Переменные"}),"\n",(0,jsx_runtime.jsx)(blocks.ZV,{css:index_module})]})}var development=function development_MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)},CHANGELOGraw_namespaceObject="# Change Log\n\n## 3.2.0\n\n### Minor Changes\n\n### [#992](https://github.com/core-ds/core-components/pull/992)\n\n-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)\n\n## 3.1.0\n\n### Minor Changes\n\n### [#713](https://github.com/core-ds/core-components/pull/713)\n\n-   Теперь каждый пакет публикуется с исходниками\n\n## 3.0.5\n\n### Patch Changes\n\n### [#766](https://github.com/core-ds/core-components/pull/766)\n\n-   Удален скрипт отправки статистики (send-stats)\n\n## 3.0.4\n\n### Patch Changes\n\n### [#588](https://github.com/core-ds/core-components/pull/588)\n\n-   Добавлен \\_\\_esModule в cjs экспорт\n\n## 3.0.3\n\n### Patch Changes\n\n### [#526](https://github.com/core-ds/core-components/pull/526)\n\n-   В зависимости добавлена библиотека tslib\n\n## 3.0.2\n\n### Patch Changes\n\n### [#418](https://github.com/core-ds/core-components/pull/418)\n\n-   Исправлена проблема с default-импортом в cjs форматах\n\nAll notable changes to this project will be documented in this file.\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@3.0.0...@alfalab/core-components-divider@3.0.1) (2022-08-19)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.2.1...@alfalab/core-components-divider@3.0.0) (2022-08-17)\n\n### Features\n\n-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))\n\n### BREAKING CHANGES\n\n-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена\n    директория dist)\n\nCo-authored-by: Vladimir Gevak <VGevak@alfabank.ru>\n\n## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.2.0...@alfalab/core-components-divider@2.2.1) (2022-08-17)\n\n### Bug Fixes\n\n-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))\n\n# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.1.3...@alfalab/core-components-divider@2.2.0) (2022-08-04)\n\n### Features\n\n-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))\n\n## [2.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.1.2...@alfalab/core-components-divider@2.1.3) (2022-07-18)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.1.1...@alfalab/core-components-divider@2.1.2) (2022-07-15)\n\n### Bug Fixes\n\n-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))\n\n## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.1.0...@alfalab/core-components-divider@2.1.1) (2022-07-14)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.0.3...@alfalab/core-components-divider@2.1.0) (2022-06-28)\n\n### Features\n\n-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))\n\n## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@2.0.0...@alfalab/core-components-divider@2.0.1) (2021-07-09)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.13...@alfalab/core-components-divider@2.0.0) (2021-07-08)\n\n### Features\n\n-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))\n\n## [1.3.13](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.12...@alfalab/core-components-divider@1.3.13) (2021-04-26)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n## [1.3.12](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.11...@alfalab/core-components-divider@1.3.12) (2021-04-01)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n## [1.3.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.9...@alfalab/core-components-divider@1.3.11) (2021-03-18)\n\n### Bug Fixes\n\n-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))\n\n## [1.3.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.8...@alfalab/core-components-divider@1.3.9) (2021-03-14)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n## [1.3.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.7...@alfalab/core-components-divider@1.3.8) (2021-03-04)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n\n## [1.3.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-divider@1.3.6...@alfalab/core-components-divider@1.3.7) (2021-03-03)\n\n**Note:** Version bump only for package @alfalab/core-components-divider\n";function Component_docs_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:Component_stories}),"\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"Divider",children:"Используется как разделитель."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:CHANGELOGraw_namespaceObject}),development:(0,jsx_runtime.jsx)(development,{})})]})}var Component_docs=function Component_docs_MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(Component_docs_createMdxContent,props)})):Component_docs_createMdxContent()}},"./packages/divider/src/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Divider:function(){return Divider}});__webpack_require__("./node_modules/react/index.js");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),index_module_component="component_PlKe8",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Divider=function Divider(_ref){var className=_ref.className,dataTestId=_ref.dataTestId;return(0,jsx_runtime.jsx)("hr",{className:classnames_default()(index_module_component,className),"data-test-id":dataTestId})};try{Divider.displayName="Divider",Divider.__docgenInfo={description:"",displayName:"Divider",props:{className:{defaultValue:null,description:"Кастомный класс",name:"className",required:!1,type:{name:"string"}},dataTestId:{defaultValue:null,description:"Id компонента для тестов",name:"dataTestId",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/divider/src/Component.tsx#Divider"]={docgenInfo:Divider.__docgenInfo,name:"Divider",path:"packages/divider/src/Component.tsx#Divider"})}catch(__react_docgen_typescript_loader_error){}}}]);
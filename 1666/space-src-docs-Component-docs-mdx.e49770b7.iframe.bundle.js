"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[9215,9815,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./packages/space/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},space:function(){return space}});var _space$parameters,_space$parameters2,_space$parameters2$do,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");__webpack_require__("./node_modules/react/index.js");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./dist/input/modern/index.js"),_alfalab_core_components_space__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/space/modern/index.js"),_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/screenshot-utils/screenshots-story/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js"),DIRECTIONS=["horizontal","vertical"],ALIGNES=["start","end","center"],SIZES=["s","m","l",8,72],meta={title:"Components/Space",component:_alfalab_core_components_space__WEBPACK_IMPORTED_MODULE_3__.Space,id:"Space"},space={name:"Space",render:function render(){var stylesAddon={width:"80px",height:"80px",borderRadius:"8px",backgroundColor:"var(--color-light-neutral-translucent-200)"},stylesGap={display:"flex",justifyContent:"center",width:"28px",lineHeight:"24px",margin:"0 8px",borderRadius:"4px",backgroundColor:"var(--color-light-status-info)",color:"var(--color-light-text-primary-inverted)"},previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_4__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_4__.Ph)("wrapperStyles"));return Object.keys(previewStyles).length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:previewStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{display:"flex",alignItems:"center"},children:[1,2,3].map(function(item){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:stylesAddon}),3!==item&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:stylesGap,children:"24"})]})})})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_alfalab_core_components_space__WEBPACK_IMPORTED_MODULE_3__.Space,{direction:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("direction",DIRECTIONS,"horizontal"),size:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("size",SIZES,"m"),align:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("align",ALIGNES,"start"),wrap:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("wrap",!1),divider:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("divider",""),fullWidth:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("fullWidth",!1),dataTestId:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("dataTestId","testIdSpace"),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_2__.Input,{placeholder:"Над вишней в цвету"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_2__.Input,{placeholder:"Спряталась за облака"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_2__.Input,{placeholder:"Скромница луна."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_2__.Input,{placeholder:"(с) Мацуо Басе"})]})}};__webpack_exports__.default=meta,space.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},space.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},null===(_space$parameters=space.parameters)||void 0===_space$parameters?void 0:_space$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({originalSource:"{\n  name: 'Space',\n  render: () => {\n    const stylesAddon = {\n      width: '80px',\n      height: '80px',\n      borderRadius: '8px',\n      backgroundColor: 'var(--color-light-neutral-translucent-200)'\n    };\n    const stylesGap = {\n      display: 'flex',\n      justifyContent: 'center',\n      width: '28px',\n      lineHeight: '24px',\n      margin: '0 8px',\n      borderRadius: '4px',\n      backgroundColor: 'var(--color-light-status-info)',\n      color: 'var(--color-light-text-primary-inverted)'\n    };\n    const stylesWrapper = {\n      display: 'flex',\n      alignItems: 'center'\n    };\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    const isPreview = Object.keys(previewStyles).length > 0;\n    return isPreview ? <div style={previewStyles}>\n                <div style={stylesWrapper}>\n                    {[1, 2, 3].map(item => <>\n                            <div style={stylesAddon} />\n                            {item !== 3 && <div style={stylesGap}>24</div>}\n                        </>)}\n                </div>\n            </div> : <Space direction={select('direction', DIRECTIONS, 'horizontal')} size={select('size', SIZES, 'm')} align={select('align', ALIGNES, 'start')} wrap={boolean('wrap', false)} divider={text('divider', '')} fullWidth={boolean('fullWidth', false)} dataTestId={text('dataTestId', 'testIdSpace')}>\n                <Input placeholder='Над вишней в цвету' />\n                <Input placeholder='Спряталась за облака' />\n                <Input placeholder='Скромница луна.' />\n                <Input placeholder='(с) Мацуо Басе' />\n            </Space>;\n  }\n}"},null===(_space$parameters2=space.parameters)||void 0===_space$parameters2?void 0:null===(_space$parameters2$do=_space$parameters2.docs)||void 0===_space$parameters2$do?void 0:_space$parameters2$do.source)})});let __namedExportsOrder=["space"]},"./packages/space/src/docs/Component.docs.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Component_docs}}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),Component_stories=__webpack_require__("./packages/space/src/docs/Component.stories.tsx");function _createMdxContent(props){let _components=Object.assign({h2:"h2",p:"p",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"примеры",children:"Примеры"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Фиксированное расстояние между блоками."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const styleBlock = {\n        width: '64px',\n        height: '64px',\n        borderRadius: '8px',\n        backgroundColor: 'var(--color-light-neutral-translucent-200)',\n    };\n    return (\n        <Space useCssGaps={true} direction='horizontal' align={isMobile() ? 'center' : 'start'}>\n            {new Array(3).fill(null).map((_, idx) => (\n                <div key={idx} style={styleBlock} />\n            ))}\n        </Space>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Использование разделителя между блоками."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const styleBlock = {\n        width: '64px',\n        height: '64px',\n        borderRadius: '8px',\n        backgroundColor: 'var(--color-light-neutral-translucent-200)',\n    };\n    return (\n        <Space useCssGaps={true} divider={<Divider />} align={isMobile() ? 'center' : 'start'}>\n            {new Array(4).fill(null).map((_, idx) => (\n                <div key={idx} style={styleBlock} />\n            ))}\n        </Space>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Автоперенос строки с заданными вертикальными и горизонтальными расстояниями между блоками."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const styleBlock = {\n        width: '64px',\n        height: '64px',\n        borderRadius: '8px',\n        backgroundColor: 'var(--color-light-neutral-translucent-200)',\n    };\n    return (\n        <Space useCssGaps={true} direction='horizontal' size={[16, 20]} wrap>\n            {new Array(20).fill(null).map((_, idx) => (\n                <div key={idx} style={styleBlock} />\n            ))}\n        </Space>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Пример блоков с FullWidth."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const styleBlock = {\n        width: '100%',\n        height: '32px',\n        borderRadius: '8px',\n        backgroundColor: 'var(--color-light-neutral-translucent-200)',\n    };\n    return (\n        <Space useCssGaps={true} direction='horizontal' size={12} fullWidth>\n            {new Array(5).fill(null).map((_, idx) => (\n                <div key={idx} style={styleBlock} />\n            ))}\n        </Space>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Пример блоков с выравниванием."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const styleBlock = {\n        width: '96px',\n        height: '32px',\n        borderRadius: '8px',\n        backgroundColor: 'var(--color-light-neutral-translucent-200)',\n    };\n    return (\n        <div style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Space useCssGaps={true} align='start' size={8}>\n                <div style={styleBlock} />\n                <div style={{ ...styleBlock, width: '144px' }} />\n                <div style={{ ...styleBlock, width: '176px' }} />\n            </Space>\n            <Space useCssGaps={true} align='center' size={8}>\n                <div style={styleBlock} />\n                <div style={{ ...styleBlock, width: '144px' }} />\n                <div style={{ ...styleBlock, width: '176px' }} />\n            </Space>\n            <Space useCssGaps={true} align='end' size={8}>\n                <div style={styleBlock} />\n                <div style={{ ...styleBlock, width: '144px' }} />\n                <div style={{ ...styleBlock, width: '176px' }} />\n            </Space>\n        </div>\n    );\n});\n"})})]})}var description=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},Component=__webpack_require__("./packages/space/src/Component.tsx");function development_createMdxContent(props){let _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { Space } from '@alfalab/core-components/space';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.Ed,{of:Component.T})]})}var development=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)};function Component_docs_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:Component_stories}),"\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"Space",children:"Используется для создания отступов между блоками."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:"# Change Log\n\n## 3.4.2\n\n### Patch Changes\n\n<sup><time>09.01.2025</time></sup>\n\n### [#1461](https://github.com/core-ds/core-components/pull/1461)\n\n-   Обновление зависимостей\n\n## 3.4.1\n\n### Patch Changes\n\n<sup><time>13.12.2024</time></sup>\n\n### [#1478](https://github.com/core-ds/core-components/pull/1478)\n\n-   Вендор classnames обновлён 2.3.1 -> 2.5.1\n\n<sup><time>13.12.2024</time></sup>\n\n### [#1491](https://github.com/core-ds/core-components/pull/1491)\n\n-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.\n\n## 3.4.0\n\n### Minor Changes\n\n<sup><time>24.10.2024</time></sup>\n\n### [#1387](https://github.com/core-ds/core-components/pull/1387)\n\n-   Обновление темы corp\n\n## 3.3.1\n\n### Patch Changes\n\n<sup><time>15.10.2024</time></sup>\n\n### [#1414](https://github.com/core-ds/core-components/pull/1414)\n\n-   Для дочернего компонента-обертки Space -> Item прокидываем key который передали или сгенерировал react\n\n## 3.3.0\n\n### Minor Changes\n\n<sup><time>10.09.2024</time></sup>\n\n### [#1347](https://github.com/core-ds/core-components/pull/1347)\n\n-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)\n\n## 3.2.1\n\n### Patch Changes\n\n<sup><time>14.06.2024</time></sup>\n\n### [#1235](https://github.com/core-ds/core-components/pull/1235)\n\n-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools\n\n## 3.2.0\n\n### Minor Changes\n\n### [#1046](https://github.com/core-ds/core-components/pull/1046)\n\n-   Добавлен новый проп useCssGaps. Не всеми старыми браузерами поддерживается flex gaps, поэтому используйте на свой страх и риск\n\n## 3.1.0\n\n### Minor Changes\n\n### [#713](https://github.com/core-ds/core-components/pull/713)\n\n-   Теперь каждый пакет публикуется с исходниками\n\n## 3.0.5\n\n### Patch Changes\n\n### [#766](https://github.com/core-ds/core-components/pull/766)\n\n-   Удален скрипт отправки статистики (send-stats)\n\n## 3.0.4\n\n### Patch Changes\n\n### [#588](https://github.com/core-ds/core-components/pull/588)\n\n-   Добавлен \\_\\_esModule в cjs экспорт\n\n## 3.0.3\n\n### Patch Changes\n\n### [#526](https://github.com/core-ds/core-components/pull/526)\n\n-   В зависимости добавлена библиотека tslib\n\n## 3.0.2\n\n### Patch Changes\n\n### [#418](https://github.com/core-ds/core-components/pull/418)\n\n-   Исправлена проблема с default-импортом в cjs форматах\n\nAll notable changes to this project will be documented in this file.\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@3.0.0...@alfalab/core-components-space@3.0.1) (2022-08-19)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n\n# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.2.1...@alfalab/core-components-space@3.0.0) (2022-08-17)\n\n### Features\n\n-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))\n\n### BREAKING CHANGES\n\n-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена\n    директория dist)\n\nCo-authored-by: Vladimir Gevak <VGevak@alfabank.ru>\n\n## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.2.0...@alfalab/core-components-space@2.2.1) (2022-08-17)\n\n### Bug Fixes\n\n-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))\n\n# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.1.3...@alfalab/core-components-space@2.2.0) (2022-08-04)\n\n### Features\n\n-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))\n\n## [2.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.1.2...@alfalab/core-components-space@2.1.3) (2022-07-18)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n\n## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.1.1...@alfalab/core-components-space@2.1.2) (2022-07-15)\n\n### Bug Fixes\n\n-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))\n\n## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.1.0...@alfalab/core-components-space@2.1.1) (2022-07-14)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n\n# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.0.3...@alfalab/core-components-space@2.1.0) (2022-06-28)\n\n### Features\n\n-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))\n\n## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@2.0.0...@alfalab/core-components-space@2.0.1) (2021-07-09)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n\n# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.1.1...@alfalab/core-components-space@2.0.0) (2021-07-08)\n\n### Features\n\n-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))\n\n## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.1.0...@alfalab/core-components-space@1.1.1) (2021-06-28)\n\n### Bug Fixes\n\n-   **space:** remove last element margin ([#713](https://github.com/core-ds/core-components/issues/713)) ([bc36cf7](https://github.com/core-ds/core-components/commit/bc36cf7db35cbd7c5d36c178a50bbd27d2f11b0c))\n\n# [1.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.0.7...@alfalab/core-components-space@1.1.0) (2021-04-26)\n\n### Features\n\n-   **space:** fix dataTestId ([#625](https://github.com/core-ds/core-components/issues/625)) ([a33ca6b](https://github.com/core-ds/core-components/commit/a33ca6ba791a43252b09c5a6d81dbd206aaec2d7))\n\n## [1.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.0.5...@alfalab/core-components-space@1.0.7) (2021-03-18)\n\n### Bug Fixes\n\n-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))\n\n## [1.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.0.4...@alfalab/core-components-space@1.0.5) (2021-03-14)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n\n## [1.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.0.3...@alfalab/core-components-space@1.0.4) (2021-03-04)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n\n## [1.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-space@1.0.2...@alfalab/core-components-space@1.0.3) (2021-03-03)\n\n**Note:** Version bump only for package @alfalab/core-components-space\n"}),development:(0,jsx_runtime.jsx)(development,{})})]})}var Component_docs=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(Component_docs_createMdxContent,props)})):Component_docs_createMdxContent(props)}},"./packages/screenshot-utils/screenshots-story/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DO:function(){return isJsonObj},FX:function(){return stylesStringToObj},Ph:function(){return getQueryParam},Qh:function(){return parseKnobs}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),queryParams=__webpack_require__("./node_modules/querystring/index.js").parse(document.location.search),getQueryParam=function(param){var parse=arguments.length>1&&void 0!==arguments[1]&&arguments[1],value=queryParams[param];return parse?parseValue(value):value},parseKnobs=function(){return Object.entries(queryParams).reduce(function(acc,_ref){var _ref2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,2),k=_ref2[0],v=_ref2[1];return k.startsWith("knob-")&&(acc[k.replace("knob-","")]=parseValue(v)),acc},{})};function parseValue(value){if(value){if(["true","false"].includes(value))return"true"===value;if(!Number.isNaN(+value)&&!Number.isNaN(parseFloat(value)))return parseFloat(value);try{return JSON.parse(value)}catch(e){return value}}}function stylesStringToObj(){var str=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!str)return{};var properties=str.split(";").map(function(v){return v.trim()}),obj={};return properties.forEach(function(property){var _property$split$map=property.split(":").map(function(v){return v.trim()}),_property$split$map2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_property$split$map,2),name=_property$split$map2[0],val=_property$split$map2[1];obj[name]=val}),obj}function isJsonObj(str){try{var ret=JSON.parse(str);return"object"==typeof ret}catch(e){return!1}}},"./packages/space/src/Component.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{T:function(){return Space}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Item=function(props){var style,className=props.className,dividerClassName=props.dividerClassName,horizontalSize=props.horizontalSize,verticalSize=props.verticalSize,length=props.length,direction=props.direction,index=props.index,children=props.children,divider=props.divider,wrap=props.wrap;return(!props.useCssGaps&&("vertical"===direction?index<length-1&&(style={marginBottom:horizontalSize/(divider?2:1)}):style=(0,objectSpread2.Z)((0,objectSpread2.Z)({},index<length-1&&{marginRight:horizontalSize/(divider?2:1)}),wrap&&{paddingBottom:verticalSize})),null==children)?null:(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:className,style:style,children:children}),index<length-1&&divider&&(0,jsx_runtime.jsx)("span",{className:dividerClassName,style:style,children:divider})]})};try{Item.displayName="Item",Item.__docgenInfo={description:"",displayName:"Item",props:{className:{defaultValue:null,description:"",name:"className",required:!0,type:{name:"string"}},dividerClassName:{defaultValue:null,description:"",name:"dividerClassName",required:!0,type:{name:"string"}},horizontalSize:{defaultValue:null,description:"",name:"horizontalSize",required:!0,type:{name:"number"}},verticalSize:{defaultValue:null,description:"",name:"verticalSize",required:!0,type:{name:"number"}},length:{defaultValue:null,description:"",name:"length",required:!0,type:{name:"number"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},direction:{defaultValue:null,description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},divider:{defaultValue:null,description:"",name:"divider",required:!1,type:{name:"ReactNode"}},wrap:{defaultValue:null,description:"",name:"wrap",required:!1,type:{name:"boolean"}},useCssGaps:{defaultValue:null,description:"",name:"useCssGaps",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/space/src/Item.tsx#Item"]={docgenInfo:Item.__docgenInfo,name:"Item",path:"packages/space/src/Item.tsx#Item"})}catch(__react_docgen_typescript_loader_error){}var index_module={spaceContainer:"spaceContainer_XHYzE",spaceContainerFullWidth:"spaceContainerFullWidth_hFSJV",vertical:"vertical_xbR1i",center:"center_CNtcx",start:"start_c9BrI",end:"end_VmJ4K",spaceItemFullWidth:"spaceItemFullWidth_CXCeA",spaceItem:"spaceItem_Lpovr",wrap:"wrap_AgUnr",divider:"divider_HWrPY"},SpaceSizes={s:12,m:16,l:20},Space=(0,react.forwardRef)(function(props,ref){var children=props.children,className=props.className,_props$align=props.align,align=void 0===_props$align?"start":_props$align,_props$direction=props.direction,direction=void 0===_props$direction?"vertical":_props$direction,_props$size=props.size,size=void 0===_props$size?"m":_props$size,_props$wrap=props.wrap,wrap=void 0!==_props$wrap&&_props$wrap,_props$divider=props.divider,divider=void 0!==_props$divider&&_props$divider,_props$fullWidth=props.fullWidth,fullWidth=void 0!==_props$fullWidth&&_props$fullWidth,dataTestId=props.dataTestId,_props$useCssGaps=props.useCssGaps,useCssGaps=void 0!==_props$useCssGaps&&_props$useCssGaps,_React$useMemo=react.useMemo(function(){return(Array.isArray(size)?size:[size,size]).map(function(item){return"string"==typeof item?SpaceSizes[item]:item||0})},[size]),_React$useMemo2=(0,slicedToArray.Z)(_React$useMemo,2),horizontalSize=_React$useMemo2[0],verticalSize=_React$useMemo2[1],childNodes=react.Children.toArray(children);if(0===childNodes.length)return null;var directionClassName=index_module[direction],alignClassName=index_module[align],containerClassName=classnames_default()("spaceContainer_XHYzE",directionClassName,(0,defineProperty.Z)((0,defineProperty.Z)({},alignClassName,align),"spaceContainerFullWidth_hFSJV",fullWidth),className),itemClassName=classnames_default()("spaceItem_Lpovr",(0,defineProperty.Z)({},"spaceItemFullWidth_CXCeA",fullWidth)),nodes=childNodes.map(function(child,i){return(0,jsx_runtime.jsx)(Item,{className:itemClassName,dividerClassName:"divider_HWrPY",direction:direction,horizontalSize:horizontalSize,verticalSize:verticalSize,length:childNodes.length,index:i,wrap:wrap,divider:divider,useCssGaps:useCssGaps,children:child},(0,react.isValidElement)(child)?child.key:"".concat(itemClassName,"-").concat(i))});return(0,jsx_runtime.jsx)("div",{"data-test-id":dataTestId,className:classnames_default()(containerClassName,(0,defineProperty.Z)({},"wrap_AgUnr",useCssGaps&&wrap)),style:(0,objectSpread2.Z)((0,objectSpread2.Z)({},useCssGaps&&{columnGap:horizontalSize/(divider?2:1),rowGap:verticalSize/(divider?2:1)}),wrap&&!useCssGaps&&{flexWrap:"wrap",marginBottom:-verticalSize}),ref:ref,children:nodes})});Space.displayName="Space";try{Space.displayName="Space",Space.__docgenInfo={description:"Позаимствовано с благодарностью из Ant Design",displayName:"Space",props:{align:{defaultValue:null,description:"Выравнивание",name:"align",required:!1,type:{name:"enum",value:[{value:'"start"'},{value:'"center"'},{value:'"end"'}]}},direction:{defaultValue:null,description:"Направление",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},size:{defaultValue:null,description:"Размер отступов",name:"size",required:!1,type:{name:"Size | [Size, Size]"}},className:{defaultValue:null,description:"Дополнительный класс",name:"className",required:!1,type:{name:"string"}},children:{defaultValue:null,description:"Дочерние компоненты",name:"children",required:!0,type:{name:"ReactNode"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования",name:"dataTestId",required:!1,type:{name:"string"}},wrap:{defaultValue:null,description:"Автоматический перенос строк, полезно при direction = 'horizontal'",name:"wrap",required:!1,type:{name:"boolean"}},divider:{defaultValue:null,description:"Компонент разделителя",name:"divider",required:!1,type:{name:"ReactNode"}},fullWidth:{defaultValue:null,description:"Растягивать ли компонент на всю ширину",name:"fullWidth",required:!1,type:{name:"boolean"}},useCssGaps:{defaultValue:null,description:"Использовать css gap\n@description Поддержка ограничена. см https://caniuse.com/?search=gap",name:"useCssGaps",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/space/src/Component.tsx#Space"]={docgenInfo:Space.__docgenInfo,name:"Space",path:"packages/space/src/Component.tsx#Space"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/querystring/decode.js":function(module){function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?Array.isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj}},"./node_modules/querystring/encode.js":function(module){var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return(sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj)?Object.keys(obj).map(function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return Array.isArray(obj[k])?obj[k].map(function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""}},"./node_modules/querystring/index.js":function(__unused_webpack_module,exports,__webpack_require__){exports.decode=exports.parse=__webpack_require__("./node_modules/querystring/decode.js"),exports.encode=exports.stringify=__webpack_require__("./node_modules/querystring/encode.js")}}]);
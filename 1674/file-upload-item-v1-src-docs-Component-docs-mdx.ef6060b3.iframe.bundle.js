"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[3366,8528,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./packages/file-upload-item-v1/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},file_upload_item_v1:function(){return file_upload_item_v1}});var _file_upload_item_v1$,_file_upload_item_v1$2,_file_upload_item_v1$3,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");__webpack_require__("./node_modules/react/index.js");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_core_components_file_upload_item_v1__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./dist/file-upload-item-v1/modern/index.js"),_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/screenshot-utils/screenshots-story/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),WRAPPER_STYLES={background:"var(--color-light-modal-bg-primary)"},meta={title:"Deprecated components/FileUploadItemV1",component:_alfalab_core_components_file_upload_item_v1__WEBPACK_IMPORTED_MODULE_2__.FileUploadItemV1,id:"FileUploadItemV1"},file_upload_item_v1={name:"FileUploadItemV1",render:function render(){var previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_3__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_3__.Ph)("wrapperStyles")),isPreview=Object.keys(previewStyles).length>0;return isPreview?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({width:432},previewStyles),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:isPreview?WRAPPER_STYLES:void 0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_alfalab_core_components_file_upload_item_v1__WEBPACK_IMPORTED_MODULE_2__.FileUploadItemV1,{name:"Название файла.pdf",uploadDate:"22.01.2023",size:4096,downloadLink:"link",showDelete:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_alfalab_core_components_file_upload_item_v1__WEBPACK_IMPORTED_MODULE_2__.FileUploadItemV1,{name:"Название файла.docx",uploadDate:"22.01.2023",size:8192,downloadLink:"link",showDelete:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_alfalab_core_components_file_upload_item_v1__WEBPACK_IMPORTED_MODULE_2__.FileUploadItemV1,{name:"Название файла.docx",uploadDate:"22.01.2023",size:9216,downloadLink:"link",showDelete:!0})]})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:500},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_alfalab_core_components_file_upload_item_v1__WEBPACK_IMPORTED_MODULE_2__.FileUploadItemV1,{name:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("name","Довольно длинное название файла.pdf"),uploadDate:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("uploadDate","22.01.2018"),downloadLink:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("downloadLink",""),error:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("error",""),size:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("size",5e8),uploadStatus:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("uploadStatus",["ERROR","SUCCESS","LOADING","UPLOADING"],void 0),uploadPercent:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("uploadPercent",void 0),showDelete:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("showDelete",!1),showRestore:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("showRestore",!1)})})}};__webpack_exports__.default=meta,file_upload_item_v1.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},file_upload_item_v1.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},null===(_file_upload_item_v1$=file_upload_item_v1.parameters)||void 0===_file_upload_item_v1$?void 0:_file_upload_item_v1$.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({originalSource:"{\n  name: 'FileUploadItemV1',\n  render: () => {\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    const isPreview = Object.keys(previewStyles).length > 0;\n    return isPreview ? <div style={{\n      width: 432,\n      ...previewStyles\n    }}>\n                <div style={isPreview ? WRAPPER_STYLES : undefined}>\n                    <FileUploadItemV1 name={'Название файла.pdf'} uploadDate='22.01.2023' size={4096} downloadLink='link' showDelete={true} />\n                    <FileUploadItemV1 name={'Название файла.docx'} uploadDate='22.01.2023' size={8192} downloadLink='link' showDelete={true} />\n                    <FileUploadItemV1 name={'Название файла.docx'} uploadDate='22.01.2023' size={9216} downloadLink='link' showDelete={true} />\n                </div>\n            </div> : <div style={{\n      width: 500\n    }}>\n                <FileUploadItemV1 name={text('name', 'Довольно длинное название файла.pdf')} uploadDate={text('uploadDate', '22.01.2018')} downloadLink={text('downloadLink', '')} error={text('error', '')} size={number('size', 500000000)} uploadStatus={select('uploadStatus', ['ERROR', 'SUCCESS', 'LOADING', 'UPLOADING'], undefined)} uploadPercent={number('uploadPercent', undefined)} showDelete={boolean('showDelete', false)} showRestore={boolean('showRestore', false)} />\n            </div>;\n  }\n}"},null===(_file_upload_item_v1$2=file_upload_item_v1.parameters)||void 0===_file_upload_item_v1$2?void 0:null===(_file_upload_item_v1$3=_file_upload_item_v1$2.docs)||void 0===_file_upload_item_v1$3?void 0:_file_upload_item_v1$3.source)})});let __namedExportsOrder=["file_upload_item_v1"]},"./packages/file-upload-item-v1/src/docs/Component.docs.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Component_docs}}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),Component_stories=__webpack_require__("./packages/file-upload-item-v1/src/docs/Component.stories.tsx");function _createMdxContent(props){let _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"примеры",children:"Примеры"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,mobileHeight:500,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<>\n    <FileUploadItemV1\n        name='Довольно длинное название файла.pdf'\n        uploadDate='22.01.2018'\n        size={500000000}\n        showDelete={false}\n        showRestore={true}\n    />\n    <FileUploadItemV1\n        name='Название файла.pdf'\n        uploadDate='22.01.2018'\n        size={45000}\n        showDelete={true}\n    />\n    <FileUploadItemV1\n        name='С кастомной иконкой.pdf'\n        uploadDate='22.01.2018'\n        size={50000}\n        showDelete={true}\n        icon={DiamondsMIcon}\n    />\n        <FileUploadItemV1\n        name='Название файла.pdf'\n        uploadDate='22.01.2018'\n        uploadPercent={23.5678}\n        uploadStatus='UPLOADING'\n        showDelete={true}\n    />\n    <FileUploadItemV1\n        name='Название файла.txt'\n        uploadDate='22.01.2018'\n        size={157290000}\n        downloadLink='/link'\n        uploadStatus='SUCCESS'\n        showDelete={true}\n    />\n    <FileUploadItemV1\n        name='Название файла.jpg'\n        uploadDate='22.01.2018'\n        size={45000}\n        uploadStatus='ERROR'\n        showDelete={true}\n    />\n    <FileUploadItemV1\n        name='Название файла.png'\n        uploadDate='22.01.2018'\n        size={450000000}\n        uploadStatus='ERROR'\n        error={\n            <>\n                <p style={{ margin: 0, marginBottom: '8px' }}>Размер больше 500 Кб</p>\n                <p style={{ margin: 0 }}>\n                    Недопустимый формат файла. Загрузите файл в одном из этих форматов: .txt, .xml,\n                    .csv\n                </p>\n            </>\n        }\n        showDelete={true}\n    />\n</>\n"})})]})}var description=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},Component=__webpack_require__("./packages/file-upload-item-v1/src/Component.tsx");function development_createMdxContent(props){let _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { FileUploadItemV1 } from '@alfalab/core-components/file-upload-item-v1';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{of:Component.E})]})}var development=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)};function Component_docs_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:Component_stories}),"\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"FileUploadItemV1",children:"Используется для отображения загружаемого файла."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:"# Change Log\n\n## 1.0.9\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   spinner@4.0.6\n    -   icon-button@6.11.10\n\n## 1.0.8\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   icon-button@6.11.9\n\n## 1.0.7\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   spinner@4.0.5\n    -   icon-button@6.11.8\n\n## 1.0.6\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   spinner@4.0.4\n    -   icon-button@6.11.7\n\n## 1.0.5\n\n### Patch Changes\n\n<sup><time>09.01.2025</time></sup>\n\n### [#1461](https://github.com/core-ds/core-components/pull/1461)\n\n-   Обновление зависимостей\n\n-   Обновлены зависимости\n    -   icon-button@6.11.6\n    -   link@5.3.4\n    -   spinner@4.0.3\n\n## 1.0.4\n\n### Patch Changes\n\n<sup><time>26.12.2024</time></sup>\n\n### [#1497](https://github.com/core-ds/core-components/pull/1497)\n\n-   Добавлено sideEffects: false (package.json)\n\n-   Обновлены зависимости\n    -   icon-button@6.11.5\n    -   link@5.3.3\n    -   spinner@4.0.2\n\n## 1.0.3\n\n### Patch Changes\n\n<sup><time>13.12.2024</time></sup>\n\n### [#1478](https://github.com/core-ds/core-components/pull/1478)\n\n-   Вендор classnames обновлён 2.3.1 -> 2.5.1\n\n-   Обновлены зависимости\n    -   icon-button@6.11.4\n    -   link@5.3.2\n    -   spinner@4.0.1\n\n## 1.0.2\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   icon-button@6.11.3\n\n## 1.0.1\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   icon-button@6.11.2\n\n## 1.0.0\n\n### Major Changes\n\n<sup><time>18.11.2024</time></sup>\n\n### [#1379](https://github.com/core-ds/core-components/pull/1379)\n\nДобавлен новый компонент. Старый помечен как `deprecated`.\n\n#### Обновление\n\nДля упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.\n\nДо\n\n```js\nimport { FileUploadItem } from '@alfalab/core-components/file-upload-item';\n```\n\nПосле\n\n```js\nimport { FileUploadItemV1 } from '@alfalab/core-components/file-upload-item-v1';\n```\n\nТаким образом, в вашем приложении продолжат работу старые версии компонентов.\nВ дальнейшем поддержка `v1` версий будет прекращена.\n\n### Patch Changes\n\n-   Обновлены зависимости\n    -   spinner@4.0.0\n    -   icon-button@6.11.1\n"}),development:(0,jsx_runtime.jsx)(development,{})})]})}var Component_docs=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(Component_docs_createMdxContent,props)})):Component_docs_createMdxContent(props)}},"./packages/file-upload-item-v1/src/Component.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:function(){return FileUploadItemV1}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");__webpack_require__("./node_modules/react/index.js");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),modern=__webpack_require__("./dist/icon-button/modern/index.js"),link_modern=__webpack_require__("./dist/link/modern/index.js"),spinner_modern=__webpack_require__("./dist/spinner/modern/index.js"),AlertCircleMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/AlertCircleMIcon.js"),CheckmarkCircleMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/CheckmarkCircleMIcon.js"),ClockMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/ClockMIcon.js"),CrossSIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/CrossSIcon.js"),PointerDownSIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/PointerDownSIcon.js"),DocumentDocMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentDocMIcon.js"),DocumentImageMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentImageMIcon.js"),DocumentPdfMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentPdfMIcon.js"),DocumentTxtMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentTxtMIcon.js"),DocumentUnknownMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentUnknownMIcon.js");function humanFileSize(size){for(var units=["Б","КБ","МБ","ГБ"],humanSize=Number(size),factor=0;humanSize>=1024&&factor<units.length-1;)humanSize/=1024,factor+=1;return humanSize=humanSize.toFixed(2),"".concat(Number(humanSize)," ").concat(units[factor])}function fileIcon(filename){switch(filename.toLowerCase().split(".").pop()){case"png":case"jpg":case"jpeg":case"svg":case"tif":case"tiff":return DocumentImageMIcon.DocumentImageMIcon;case"doc":case"docx":return DocumentDocMIcon.DocumentDocMIcon;case"pdf":return DocumentPdfMIcon.DocumentPdfMIcon;case"txt":return DocumentTxtMIcon.DocumentTxtMIcon;default:return DocumentUnknownMIcon.DocumentUnknownMIcon}}var index_module={component:"component_gzo34",infoSection:"infoSection_iUBEL",info:"info_QPUzx",icon:"icon_lJVt_",errorIcon:"errorIcon_P1Q9p",successIcon:"successIcon_QmvRT",name:"name_ds2VF",rowLimit:"rowLimit_Nh5UB",meta:"meta_VASyv",size:"size_P6gVu",delete:"delete_jYaJV",download:"download_CO_2x",errorWrapper:"errorWrapper_DEwf1",restore:"restore_yUyi1",spinnerWrapper:"spinnerWrapper_faL36",uploadPercent:"uploadPercent_P7Fqa"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),FileUploadItemV1=function(_ref){var className=_ref.className,children=_ref.children,_ref$id=_ref.id,id=void 0===_ref$id?"0":_ref$id,_ref$name=_ref.name,name=void 0===_ref$name?"":_ref$name,size=_ref.size,_ref$icon=_ref.icon,Icon=void 0===_ref$icon?fileIcon(name):_ref$icon,uploadDate=_ref.uploadDate,downloadLink=_ref.downloadLink,download=_ref.download,uploadStatus=_ref.uploadStatus,_ref$uploadPercent=_ref.uploadPercent,error=_ref.error,showDelete=_ref.showDelete,showRestore=_ref.showRestore,onDelete=_ref.onDelete,onDownload=_ref.onDownload,onRestore=_ref.onRestore,disableButtons=_ref.disableButtons,_ref$multiline=_ref.multiline,target=_ref.target,dataTestId=_ref.dataTestId;return(0,jsx_runtime.jsxs)("div",{className:classnames_default()(className,index_module.component,uploadStatus&&index_module[uploadStatus.toLocaleLowerCase()]),"data-test-id":dataTestId,children:[(0,jsx_runtime.jsxs)("div",{className:index_module.info,children:[function(){if(showRestore)return(0,jsx_runtime.jsx)(ClockMIcon.ClockMIcon,{className:index_module.restoreIcon});switch(uploadStatus){case"ERROR":return(0,jsx_runtime.jsx)(AlertCircleMIcon.AlertCircleMIcon,{className:index_module.errorIcon});case"SUCCESS":return(0,jsx_runtime.jsx)(CheckmarkCircleMIcon.CheckmarkCircleMIcon,{className:index_module.successIcon});case"LOADING":case"UPLOADING":return(0,jsx_runtime.jsx)("div",{className:index_module.spinnerWrapper,children:(0,jsx_runtime.jsx)(spinner_modern.Spinner,{visible:!0,className:index_module.spinner,preset:24})});default:return(0,jsx_runtime.jsx)(Icon,{className:index_module.icon})}}(),(0,jsx_runtime.jsxs)("div",{className:index_module.infoSection,children:[(0,jsx_runtime.jsx)("div",{className:classnames_default()(index_module.name,(0,defineProperty.Z)({},index_module.rowLimit,!(void 0!==_ref$multiline&&_ref$multiline))),children:name}),("ERROR"===uploadStatus||!!error)&&(0,jsx_runtime.jsx)("div",{className:index_module.errorWrapper,role:"alert",children:"ERROR"!==uploadStatus||error?error:"Не удалось загрузить файл"})]}),children,"UPLOADING"===uploadStatus&&(0,jsx_runtime.jsx)("span",{className:index_module.uploadPercent,children:"".concat(Math.round(void 0===_ref$uploadPercent?0:_ref$uploadPercent),"%")}),!showRestore&&(!uploadStatus||"SUCCESS"===uploadStatus)&&(0,jsx_runtime.jsxs)("div",{className:index_module.meta,children:[uploadDate&&(0,jsx_runtime.jsx)("span",{children:uploadDate},uploadDate),size&&(0,jsx_runtime.jsx)("span",{className:index_module.size,children:humanFileSize(size)},size)]})]}),showRestore&&(0,jsx_runtime.jsx)(link_modern.Link,{pseudo:!0,className:index_module.restore,onClick:function(){onRestore&&onRestore(id)},children:"Восстановить"}),!!downloadLink&&!showRestore&&(0,jsx_runtime.jsx)(modern.IconButton,{size:"xxs",icon:PointerDownSIcon.PointerDownSIcon,className:index_module.download,"aria-label":"скачать",href:downloadLink,onClick:function(event){onDownload&&(event.preventDefault(),onDownload(id))},disabled:disableButtons,download:download,target:target}),showDelete&&!showRestore&&(0,jsx_runtime.jsx)(modern.IconButton,{size:"xxs",icon:CrossSIcon.CrossSIcon,onClick:function(event){onDelete&&onDelete(id,event)},disabled:disableButtons,className:index_module.delete,"aria-label":"удалить"})]})};try{FileUploadItemV1.displayName="FileUploadItemV1",FileUploadItemV1.__docgenInfo={description:"",displayName:"FileUploadItemV1",props:{className:{defaultValue:null,description:"Дополнительный класс",name:"className",required:!1,type:{name:"string"}},id:{defaultValue:{value:"0"},description:"Идентификатор элемента",name:"id",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"Имя файла с расширением",name:"name",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"Размер файла",name:"size",required:!1,type:{name:"string | number"}},uploadDate:{defaultValue:null,description:"Дата загрузки файла",name:"uploadDate",required:!1,type:{name:"string"}},downloadLink:{defaultValue:null,description:"Ссылка на файл. Если прокидывается этот параметр, то появляется кнопка скачивания",name:"downloadLink",required:!1,type:{name:"string"}},download:{defaultValue:null,description:"Рекомендует браузеру скачивать контент по ссылке.\nВ проп может быть передано рекомендуемое название скачиваемого файла.",name:"download",required:!1,type:{name:"string | true"}},showDelete:{defaultValue:null,description:"Отображение кнопки удаления",name:"showDelete",required:!1,type:{name:"boolean"}},showRestore:{defaultValue:null,description:"Отображение кнопки восстановления",name:"showRestore",required:!1,type:{name:"boolean"}},uploadPercent:{defaultValue:{value:"0"},description:"Процент загрузки файла",name:"uploadPercent",required:!1,type:{name:"number"}},uploadStatus:{defaultValue:null,description:"Статус загрузки файла",name:"uploadStatus",required:!1,type:{name:"enum",value:[{value:'"SUCCESS"'},{value:'"ERROR"'},{value:'"UPLOADING"'},{value:'"LOADING"'}]}},error:{defaultValue:null,description:"Сообщение об ошибке",name:"error",required:!1,type:{name:"ReactNode"}},children:{defaultValue:null,description:"Дочерние элементы",name:"children",required:!1,type:{name:"ReactNode"}},icon:{defaultValue:null,description:"Компонент кастомной иконки",name:"icon",required:!1,type:{name:"ElementType<{ className?: string; }>"}},onDownload:{defaultValue:null,description:"Обработчик загрузки файла",name:"onDownload",required:!1,type:{name:"((id: string) => void)"}},onDelete:{defaultValue:null,description:"Обработчик удаления файла",name:"onDelete",required:!1,type:{name:"((id: string, event?: MouseEvent<HTMLElement, MouseEvent>) => void)"}},onRestore:{defaultValue:null,description:"Обработчик восстановления файла",name:"onRestore",required:!1,type:{name:"((id: string) => void)"}},disableButtons:{defaultValue:null,description:"Управление активностью кнопок",name:"disableButtons",required:!1,type:{name:"boolean"}},multiline:{defaultValue:{value:"false"},description:"Разрешить многострочное название файла",name:"multiline",required:!1,type:{name:"boolean"}},target:{defaultValue:null,description:"Указывает, где открыть скачиваемый документ",name:"target",required:!1,type:{name:"HTMLAttributeAnchorTarget"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования",name:"dataTestId",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/file-upload-item-v1/src/Component.tsx#FileUploadItemV1"]={docgenInfo:FileUploadItemV1.__docgenInfo,name:"FileUploadItemV1",path:"packages/file-upload-item-v1/src/Component.tsx#FileUploadItemV1"})}catch(__react_docgen_typescript_loader_error){}},"./packages/screenshot-utils/screenshots-story/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DO:function(){return isJsonObj},FX:function(){return stylesStringToObj},Ph:function(){return getQueryParam},Qh:function(){return parseKnobs}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),queryParams=__webpack_require__("./node_modules/querystring/index.js").parse(document.location.search),getQueryParam=function(param){var parse=arguments.length>1&&void 0!==arguments[1]&&arguments[1],value=queryParams[param];return parse?parseValue(value):value},parseKnobs=function(){return Object.entries(queryParams).reduce(function(acc,_ref){var _ref2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,2),k=_ref2[0],v=_ref2[1];return k.startsWith("knob-")&&(acc[k.replace("knob-","")]=parseValue(v)),acc},{})};function parseValue(value){if(value){if(["true","false"].includes(value))return"true"===value;if(!Number.isNaN(+value)&&!Number.isNaN(parseFloat(value)))return parseFloat(value);try{return JSON.parse(value)}catch(e){return value}}}function stylesStringToObj(){var str=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!str)return{};var properties=str.split(";").map(function(v){return v.trim()}),obj={};return properties.forEach(function(property){var _property$split$map=property.split(":").map(function(v){return v.trim()}),_property$split$map2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_property$split$map,2),name=_property$split$map2[0],val=_property$split$map2[1];obj[name]=val}),obj}function isJsonObj(str){try{var ret=JSON.parse(str);return"object"==typeof ret}catch(e){return!1}}},"./node_modules/querystring/decode.js":function(module){function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?Array.isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj}},"./node_modules/querystring/encode.js":function(module){var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return(sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj)?Object.keys(obj).map(function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return Array.isArray(obj[k])?obj[k].map(function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""}},"./node_modules/querystring/index.js":function(__unused_webpack_module,exports,__webpack_require__){exports.decode=exports.parse=__webpack_require__("./node_modules/querystring/decode.js"),exports.encode=exports.stringify=__webpack_require__("./node_modules/querystring/encode.js")}}]);
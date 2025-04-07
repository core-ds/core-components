"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[6925],{"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/skeleton/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},skeleton:function(){return skeleton},skeleton_text:function(){return skeleton_text}});var _skeleton$parameters,_skeleton$parameters2,_skeleton$parameters3,_skeleton_text$parame,_skeleton_text$parame2,_skeleton_text$parame3,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_core_components_skeleton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/skeleton/modern/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/Skeleton",component:_alfalab_core_components_skeleton__WEBPACK_IMPORTED_MODULE_3__.Skeleton,id:"Skeleton"},skeleton={name:"Skeleton",render:function render(){var colors=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.select)("colors",["default","inverted"],"default"),borderRadius=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.select)("borderRadius",[0,2,4,6,8,10,12,16,20,24,32,36,64,"pill"],8);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:150,height:150,backgroundColor:"inverted"===colors?"var(--color-light-base-bg-primary-inverted)":"transparent",padding:"var(--gap-40)",position:"absolute",top:0,left:0,right:0,bottom:0},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_alfalab_core_components_skeleton__WEBPACK_IMPORTED_MODULE_3__.Skeleton,{visible:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("visible",!0),className:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.text)("className",""),dataTestId:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.text)("dataTestId",""),animate:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("animate",!0),colors:colors,borderRadius:borderRadius,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img",{width:150,height:150,alt:"Фижер",src:"https://rawgit.com/alfa-laboratory/arui-feather/master/logo.svg"})})})}},skeleton_text={name:"SkeletonText",render:function render(){var rows=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.select)("rows",[void 0,2,4,6,8,10],void 0),width=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.select)("width",[void 0,[100,200,300,400],100,200,300,400],void 0),align=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.select)("align",[void 0,"left","center","right"],void 0),_useSkeleton=(0,_alfalab_core_components_skeleton__WEBPACK_IMPORTED_MODULE_3__.useSkeleton)(!0,{rows:"string"==typeof rows?Number(rows):rows,width:"string"==typeof width&&width.startsWith("[")&&width.endsWith("]")?JSON.parse(width):width,align:align}),renderSkeleton=_useSkeleton.renderSkeleton,textRef=_useSkeleton.textRef;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{ref:textRef,style:{lineHeight:"20px"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),renderSkeleton({})]})}};__webpack_exports__.default=meta,skeleton.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},skeleton.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},null===(_skeleton$parameters=skeleton.parameters)||void 0===_skeleton$parameters?void 0:_skeleton$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({originalSource:"{\n  name: 'Skeleton',\n  render: () => {\n    const colors = select('colors', ['default', 'inverted'], 'default');\n    const borderRadius = select('borderRadius', [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 36, 64, 'pill'], 8);\n    return <div style={{\n      width: 150,\n      height: 150,\n      backgroundColor: colors === 'inverted' ? 'var(--color-light-base-bg-primary-inverted)' : 'transparent',\n      padding: 'var(--gap-40)',\n      position: 'absolute',\n      top: 0,\n      left: 0,\n      right: 0,\n      bottom: 0\n    }}>\n                <Skeleton visible={boolean('visible', true)} className={text('className', '')} dataTestId={text('dataTestId', '')} animate={boolean('animate', true)} colors={colors} borderRadius={borderRadius}>\n                    <img width={150} height={150} alt='Фижер' src='https://rawgit.com/alfa-laboratory/arui-feather/master/logo.svg' />\n                </Skeleton>\n            </div>;\n  }\n}"},null===(_skeleton$parameters2=skeleton.parameters)||void 0===_skeleton$parameters2?void 0:null===(_skeleton$parameters3=_skeleton$parameters2.docs)||void 0===_skeleton$parameters3?void 0:_skeleton$parameters3.source)})}),skeleton_text.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},skeleton_text.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},null===(_skeleton_text$parame=skeleton_text.parameters)||void 0===_skeleton_text$parame?void 0:_skeleton_text$parame.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({originalSource:"{\n  name: 'SkeletonText',\n  render: () => {\n    const rows = select('rows', [undefined, 2, 4, 6, 8, 10], undefined);\n    const width = select('width', [undefined, [100, 200, 300, 400], 100, 200, 300, 400], undefined);\n    const align = select('align', [undefined, 'left', 'center', 'right'], undefined);\n\n    // дополнительные преобразования нужны для скриншот-тестирования, так как все кнобсы в этом случае приходят в виде строки\n    const getWidth = () => {\n      if (typeof width === 'string') {\n        if ((width as string).startsWith('[') && (width as string).endsWith(']')) {\n          return JSON.parse(width);\n        }\n      }\n      return width;\n    };\n\n    // дополнительные преобразования нужны для скриншот-тестирования, так как все кнобсы в этом случае приходят в виде строки\n    const getRows = () => {\n      if (typeof rows === 'string') {\n        return Number(rows);\n      }\n      return rows;\n    };\n    const {\n      renderSkeleton,\n      textRef\n    } = useSkeleton(true, {\n      rows: getRows(),\n      width: getWidth(),\n      align\n    });\n    return <Fragment>\n                <div ref={(textRef as RefObject<HTMLDivElement>)} style={{\n        lineHeight: '20px'\n      }}>\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\n                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\n                    culpa qui officia deserunt mollit anim id est laborum.\n                </div>\n                {renderSkeleton({})}\n            </Fragment>;\n  }\n}"},null===(_skeleton_text$parame2=skeleton_text.parameters)||void 0===_skeleton_text$parame2?void 0:null===(_skeleton_text$parame3=_skeleton_text$parame2.docs)||void 0===_skeleton_text$parame3?void 0:_skeleton_text$parame3.source)})});let __namedExportsOrder=["skeleton","skeleton_text"]}}]);
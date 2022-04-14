"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[532,6547,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./packages/scrollbar/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},scrollbar:function(){return scrollbar}});var _scrollbar$parameters,_scrollbar$parameters2,_scrollbar$parameters3,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");__webpack_require__("./node_modules/react/index.js");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_core_components_scrollbar__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./dist/scrollbar/modern/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/Scrollbar",component:_alfalab_core_components_scrollbar__WEBPACK_IMPORTED_MODULE_2__.Scrollbar,id:"Scrollbar"},scrollbar={name:"Scrollbar",render:function render(){var direction=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("direction",["vertical","horizontal"],"vertical"),colors=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("colors",["default","inverted"],"default"),autoHide=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("autoHide",!1),autoHideTimeout=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.number)("autoHideTimeout",1e3),clickOnTrack=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("clickOnTrack",!0),bgColorMap={default:{background:["--color-light-bg-tertiary","--color-light-bg-secondary"],color:"--color-light-text-tertiary"},inverted:{background:["--color-light-bg-tertiary-inverted","--color-light-bg-secondary-inverted"],color:"--color-light-text-tertiary-inverted"}},getBgColor=function(idx){return idx%2==0?bgColorMap[colors].background[0]:bgColorMap[colors].background[1]},textColor=bgColorMap[colors].color;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{backgroundColor:"inverted"===colors?"var(--color-light-bg-primary-inverted)":"transparent",padding:"8px",position:"absolute",top:0,left:0,right:0,bottom:0},children:"vertical"===direction?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_alfalab_core_components_scrollbar__WEBPACK_IMPORTED_MODULE_2__.Scrollbar,{style:{height:200,width:1e3},autoHide:autoHide,colors:colors,autoHideTimeout:autoHideTimeout,clickOnTrack:clickOnTrack,children:Array(51).fill(null).map(function(_,idx){var bgColor;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:(bgColor=getBgColor(idx),{height:80,textAlign:"center",lineHeight:"80px",fontSize:40,fontWeight:700,color:"var(".concat(textColor,")"),background:"var(".concat(bgColor,")")}),children:idx},idx)})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_alfalab_core_components_scrollbar__WEBPACK_IMPORTED_MODULE_2__.Scrollbar,{style:{height:200,width:1e3,whiteSpace:"nowrap"},autoHide:autoHide,colors:colors,autoHideTimeout:autoHideTimeout,clickOnTrack:clickOnTrack,children:Array(51).fill(null).map(function(_,idx){var bgColor;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:(bgColor=getBgColor(idx),{display:"inline-block",height:200,width:80,textAlign:"center",lineHeight:"80px",fontSize:40,fontWeight:700,color:"var(".concat(textColor,")"),background:"var(".concat(bgColor,")")}),children:idx},idx)})})})}};__webpack_exports__.default=meta,scrollbar.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},scrollbar.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},null===(_scrollbar$parameters=scrollbar.parameters)||void 0===_scrollbar$parameters?void 0:_scrollbar$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({originalSource:"{\n  name: 'Scrollbar',\n  render: () => {\n    const direction = select('direction', ['vertical', 'horizontal'], 'vertical');\n    const colors = select('colors', ['default', 'inverted'], 'default');\n    const autoHide = boolean('autoHide', false);\n    const autoHideTimeout = number('autoHideTimeout', 1000);\n    const clickOnTrack = boolean('clickOnTrack', true);\n    const getChildVerticalStyle = (bgColor, color) => ({\n      height: 80,\n      textAlign: ('center' as const),\n      lineHeight: '80px',\n      fontSize: 40,\n      fontWeight: 700,\n      color: `var(${color})`,\n      background: `var(${bgColor})`\n    });\n    const getChildHorizontalStyle = (bgColor, color) => ({\n      display: 'inline-block',\n      height: 200,\n      width: 80,\n      textAlign: ('center' as const),\n      lineHeight: '80px',\n      fontSize: 40,\n      fontWeight: 700,\n      color: `var(${color})`,\n      background: `var(${bgColor})`\n    });\n    const bgColorMap = {\n      default: {\n        background: ['--color-light-bg-tertiary', '--color-light-bg-secondary'],\n        color: '--color-light-text-tertiary'\n      },\n      inverted: {\n        background: ['--color-light-bg-tertiary-inverted', '--color-light-bg-secondary-inverted'],\n        color: '--color-light-text-tertiary-inverted'\n      }\n    };\n    const getBgColor = idx => idx % 2 === 0 ? bgColorMap[colors].background[0] : bgColorMap[colors].background[1];\n    const textColor = bgColorMap[colors].color;\n    return <div style={{\n      backgroundColor: colors === 'inverted' ? 'var(--color-light-bg-primary-inverted)' : 'transparent',\n      padding: '8px',\n      position: 'absolute',\n      top: 0,\n      left: 0,\n      right: 0,\n      bottom: 0\n    }}>\n                {direction === 'vertical' ? <Scrollbar style={{\n        height: 200,\n        width: 1000\n      }} autoHide={autoHide} colors={colors} autoHideTimeout={autoHideTimeout} clickOnTrack={clickOnTrack}>\n                        {new Array(51).fill(null).map((_, idx) => <div key={idx} style={getChildVerticalStyle(getBgColor(idx), textColor)}>\n                                {idx}\n                            </div>)}\n                    </Scrollbar> : <Scrollbar style={{\n        height: 200,\n        width: 1000,\n        whiteSpace: 'nowrap'\n      }} autoHide={autoHide} colors={colors} autoHideTimeout={autoHideTimeout} clickOnTrack={clickOnTrack}>\n                        {new Array(51).fill(null).map((_, idx) => <div key={idx} style={getChildHorizontalStyle(getBgColor(idx), textColor)}>\n                                {idx}\n                            </div>)}\n                    </Scrollbar>}\n            </div>;\n  }\n}"},null===(_scrollbar$parameters2=scrollbar.parameters)||void 0===_scrollbar$parameters2?void 0:null===(_scrollbar$parameters3=_scrollbar$parameters2.docs)||void 0===_scrollbar$parameters3?void 0:_scrollbar$parameters3.source)})});let __namedExportsOrder=["scrollbar"]},"./packages/scrollbar/src/docs/Component.docs.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Component_docs}}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),Component_stories=__webpack_require__("./packages/scrollbar/src/docs/Component.stories.tsx");function _createMdxContent(props){let _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"примеры",children:"Примеры"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const getChildStyle = (bgColor) => ({\n        height: 80,\n        textAlign: 'center',\n        lineHeight: '80px',\n        fontSize: 40,\n        fontWeight: 700,\n        color: 'var(--color-light-text-tertiary)',\n        background: `var(${bgColor})`,\n    });\n    return (\n        <div style={{ height: 240, margin: 'var(--gap-l-neg)' }}>\n            <Scrollbar style={{ height: '100%' }} autoHide={false}>\n                {new Array(51).fill(null).map((_, idx) => {\n                    const style = getChildStyle(\n                        idx % 2 === 0 ? '--color-light-bg-tertiary' : '--color-light-bg-secondary',\n                    );\n                    return (\n                        <div key={idx} style={style}>\n                            {idx + 1}\n                        </div>\n                    );\n                })}\n            </Scrollbar>\n        </div>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const scrollbarStyle = {\n        whiteSpace: 'nowrap',\n        overflow: 'auto',\n        margin: 'var(--gap-l-neg)',\n    };\n    const getChildStyle = (bgColor) => ({\n        display: 'inline-block',\n        width: 80,\n        height: 240,\n        textAlign: 'center',\n        lineHeight: '200px',\n        fontSize: 40,\n        fontWeight: 700,\n        color: 'var(--color-light-text-tertiary)',\n        background: `var(${bgColor})`,\n    });\n    return (\n        <Scrollbar style={scrollbarStyle} autoHide={false}>\n            {new Array(51).fill(null).map((_, idx) => {\n                const style = getChildStyle(\n                    idx % 2 === 0 ? '--color-light-bg-tertiary' : '--color-light-bg-secondary',\n                );\n                return (\n                    <div key={idx} style={style}>\n                        {idx + 1}\n                    </div>\n                );\n            })}\n        </Scrollbar>\n    );\n});\n"})})]})}var description=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},src=__webpack_require__("./packages/scrollbar/src/index.ts");function development_createMdxContent(props){let _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { Scrollbar } from '@alfalab/core-components/scrollbar';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.Ed,{of:src.Scrollbar}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"переменные",children:"Переменные"}),"\n",(0,jsx_runtime.jsx)(blocks.ZV,{css:`
        @import '../../themes/src/default.css';

:root {
    --scrollbar-rail-size: 12px;
    --scrollbar-thumb-size: 4px;
    --scrollbar-hover-size: 6px;
    --scrollbar-thumb-border-radius: 3px;
    --scrollbar-thumb-side-outer-offset: 4px;
    --scrollbar-thumb-margin: 3px;
}

.component {
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;

    & .wrapper {
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
        max-height: inherit;
    }

    & .heightAutoObserverWrapper {
        box-sizing: inherit;
        height: 100%;
        width: 100%;
        max-width: 1px;
        position: relative;
        float: left;
        max-height: 1px;
        overflow: hidden;
        z-index: -1;
        padding: 0;
        margin: 0;
        pointer-events: none;
        flex-grow: inherit;
        flex-shrink: 0;
        flex-basis: 0;
    }

    & .heightAutoObserver {
        box-sizing: inherit;
        display: block;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 1000%;
        width: 1000%;
        min-height: 1px;
        min-width: 1px;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    & .mask {
        direction: inherit;
        position: absolute;
        overflow: hidden;
        padding: 0;
        margin: 0;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: auto;
        height: auto;
        z-index: 0;
    }

    & .offset {
        direction: inherit;
        box-sizing: inherit;
        resize: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
        -webkit-overflow-scrolling: touch;
    }

    & .contentWrapper {
        direction: inherit;
        box-sizing: border-box;
        position: relative;
        display: block;
        height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
        width: auto;
        max-width: 100%; /* Not required for horizontal scroll to trigger */
        max-height: 100%; /* Needed for vertical scroll to trigger */
        outline: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    & .placeholder {
        max-height: 100%;
        max-width: 100%;
        width: 100%;
        pointer-events: none;
    }

    & :global(.track) {
        z-index: 1;
        position: absolute;
        right: 0;
        bottom: 0;
        pointer-events: auto;
        overflow: hidden;

        &.vertical {
            top: 0;
            width: var(--scrollbar-rail-size);
            transform: rotateY(-180deg);

            &.hover {
                & :global(.scrollbar) {
                    width: var(--scrollbar-hover-size);
                }
            }

            & :global(.scrollbar) {
                width: var(--scrollbar-thumb-size);
                margin-left: var(--scrollbar-thumb-margin);
                transition: width 0.1s linear;

                &:before {
                    right: 0;
                    left: 0;
                    top: var(--scrollbar-thumb-side-outer-offset);
                    bottom: var(--scrollbar-thumb-side-outer-offset);
                    transition: opacity 0.2s linear;
                }
            }
        }

        &.horizontal {
            left: 0;
            height: var(--scrollbar-rail-size);

            &.hover {
                & :global(.scrollbar) {
                    height: var(--scrollbar-hover-size);
                }
            }

            & :global(.scrollbar) {
                right: auto;
                left: 0;
                bottom: var(--scrollbar-thumb-margin);
                height: var(--scrollbar-thumb-size);
                min-height: 0;
                min-width: 40px;
                width: auto;
                transition: height 0.1s linear;
                will-change: height;

                &:before {
                    left: var(--scrollbar-thumb-side-outer-offset);
                    right: var(--scrollbar-thumb-side-outer-offset);
                    top: 0;
                    bottom: 0;
                    transition: opacity 0.2s linear;
                }
            }
        }
    }

    & :global(.scrollbar) {
        position: absolute;
        left: 0;
        right: 0;
        min-height: 40px;

        &:before {
            position: absolute;
            content: '';
            border-radius: var(--scrollbar-thumb-border-radius);
            left: 0;
            right: 0;
            opacity: 0;
        }

        &:global(.visible):before {
            opacity: 1;
        }
    }

    &:global(.dragging) .content {
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
    }

    &:global(.dragging .track) {
        pointer-events: all;

        &.vertical :global(.scrollbar) {
            width: var(--scrollbar-hover-size);
        }

        &.horizontal :global(.scrollbar) {
            height: var(--scrollbar-hover-size);
        }
    }
}

:global(.simplebar-hide-scrollbar) {
    position: fixed;
    left: 0;
    visibility: hidden;
    overflow-y: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
@import '../../themes/src/default.css';

:root {
    --scrollbar-background-color: var(--color-light-neutral-translucent-500);
    --scrollbar-background-color-active: var(--color-light-neutral-translucent-500-press);
}

.component {
    & :global(.scrollbar) {
        &:before {
            background-color: var(--scrollbar-background-color);
        }
    }

    &:global(.dragging .track) {
        & :global(.scrollbar.visible):before {
            background-color: var(--scrollbar-background-color-active);
        }
    }
}
@import '../../themes/src/default.css';

:root {
    --scrollbar-inverted-background-color: var(--color-light-neutral-translucent-500-inverted);
    --scrollbar-inverted-background-color-active: var(
        --color-light-neutral-translucent-500-inverted-press
    );
}

.component {
    & :global(.scrollbar) {
        &:before {
            background-color: var(--scrollbar-inverted-background-color);
        }
    }

    &:global(.dragging .track) {
        & :global(.scrollbar.visible):before {
            background-color: var(--scrollbar-inverted-background-color-active);
        }
    }
}

    `})]})}var development=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)};function Component_docs_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:Component_stories}),"\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"Scrollbar",children:"Используется для управления контентм с помощью полосы прокрутки."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:"# Change Log\n\n## 3.0.0\n\n### Major Changes\n\n### [#979](https://github.com/core-ds/core-components/pull/979)\n\n-   Прекращена поддержка IE\n\n### Minor Changes\n\n### [#992](https://github.com/core-ds/core-components/pull/992)\n\n-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)\n\n## 2.2.0\n\n### Minor Changes\n\n### [#713](https://github.com/core-ds/core-components/pull/713)\n\n-   Теперь каждый пакет публикуется с исходниками\n\n## 2.1.6\n\n### Patch Changes\n\n### [#766](https://github.com/core-ds/core-components/pull/766)\n\n-   Удален скрипт отправки статистики (send-stats)\n\n## 2.1.5\n\n### Patch Changes\n\n### [#588](https://github.com/core-ds/core-components/pull/588)\n\n-   Добавлен \\_\\_esModule в cjs экспорт\n\n## 2.1.4\n\n### Patch Changes\n\n### [#555](https://github.com/core-ds/core-components/pull/555)\n\n-   Убрана фокусная рамка\n\n## 2.1.3\n\n### Patch Changes\n\n### [#526](https://github.com/core-ds/core-components/pull/526)\n\n-   В зависимости добавлена библиотека tslib\n\n## 2.1.2\n\n### Patch Changes\n\n### [#418](https://github.com/core-ds/core-components/pull/418)\n\n-   Исправлена проблема с default-импортом в cjs форматах\n\n## 2.1.1\n\n### Patch Changes\n\n-   [#239](https://github.com/core-ds/core-components/pull/239): Исправлен border-radius при hover-эффекте. Thanks [@Valeri8888](https://github.com/Valeri8888)\n\nAll notable changes to this project will be documented in this file.\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@2.0.1...@alfalab/core-components-scrollbar@2.1.0) (2022-08-29)\n\n### Features\n\n-   **textarea:** custom scrollbar ([#196](https://github.com/core-ds/core-components/issues/196)) ([c0d956c](https://github.com/core-ds/core-components/commit/c0d956cc7bf0a5440a66602ca77de2942a268be2))\n\n## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@2.0.0...@alfalab/core-components-scrollbar@2.0.1) (2022-08-19)\n\n**Note:** Version bump only for package @alfalab/core-components-scrollbar\n\n# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.2.1...@alfalab/core-components-scrollbar@2.0.0) (2022-08-17)\n\n### Features\n\n-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))\n\n### BREAKING CHANGES\n\n-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена\n    директория dist)\n\nCo-authored-by: Vladimir Gevak <VGevak@alfabank.ru>\n\n## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.2.0...@alfalab/core-components-scrollbar@1.2.1) (2022-08-17)\n\n### Bug Fixes\n\n-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))\n\n# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.5...@alfalab/core-components-scrollbar@1.2.0) (2022-08-04)\n\n### Features\n\n-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))\n\n## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.4...@alfalab/core-components-scrollbar@1.1.5) (2022-07-18)\n\n**Note:** Version bump only for package @alfalab/core-components-scrollbar\n\n## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.3...@alfalab/core-components-scrollbar@1.1.4) (2022-07-15)\n\n### Bug Fixes\n\n-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))\n\n## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.2...@alfalab/core-components-scrollbar@1.1.3) (2022-07-14)\n\n**Note:** Version bump only for package @alfalab/core-components-scrollbar\n\n## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.1...@alfalab/core-components-scrollbar@1.1.2) (2022-07-14)\n\n### Bug Fixes\n\n-   **scrollbar:** removed core-js dependency ([#145](https://github.com/core-ds/core-components/issues/145)) ([72da859](https://github.com/core-ds/core-components/commit/72da859555de203e1f4c75a316227738b4b981f2))\n\n## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.0...@alfalab/core-components-scrollbar@1.1.1) (2022-06-28)\n\n**Note:** Version bump only for package @alfalab/core-components-scrollbar\n\n# 1.1.0 (2022-06-08)\n\n### Features\n\n-   **scrollbar:** new component scrollbar ([#48](https://github.com/core-ds/core-components/issues/48)) ([5ea6fa3](https://github.com/core-ds/core-components/commit/5ea6fa352ff943cda8c52e35f9d96da9bea97fa3))\n"}),development:(0,jsx_runtime.jsx)(development,{})})]})}var Component_docs=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(Component_docs_createMdxContent,props)})):Component_docs_createMdxContent(props)}},"./packages/scrollbar/src/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Scrollbar:function(){return Scrollbar}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),react_merge_refs_esm=__webpack_require__("./node_modules/react-merge-refs/dist/react-merge-refs.esm.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),lodash_throttle=__webpack_require__("./node_modules/lodash.throttle/index.js"),lodash_throttle_default=__webpack_require__.n(lodash_throttle),simplebar=__webpack_require__("./node_modules/simplebar/src/simplebar.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["colors","className","children","scrollableNodeProps","contentNodeProps","autoHide","forceVisible","autoHideTimeout","clickOnTrack","horizontalAutoStretch","widthPropName"],colorStylesMap={default:{component:"component_ZJA1w"},inverted:{component:"component__nMyH"}},classNames={wrapper:"wrapper_PzV2i",heightAutoObserverEl:"heightAutoObserver_jWgaw",heightAutoObserverWrapperEl:"heightAutoObserverWrapper_XIsF5",mask:"mask_zPNqL",offset:"offset_aucl5",contentWrapper:"contentWrapper_s9gd2",contentEl:"content_oHLNu",placeholder:"placeholder_qEx8W",vertical:"vertical_hRaze",horizontal:"horizontal_PIC5i",hover:"hover_rhhvl",track:"track",scrollbar:"scrollbar",dragging:"dragging",visible:"visible"},Scrollbar=react.forwardRef(function(_ref,ref){var _ref$colors=_ref.colors,className=_ref.className,children=_ref.children,_ref$scrollableNodePr=_ref.scrollableNodeProps,scrollableNodeProps=void 0===_ref$scrollableNodePr?{ref:null}:_ref$scrollableNodePr,_ref$contentNodeProps=_ref.contentNodeProps,contentNodeProps=void 0===_ref$contentNodeProps?{ref:null}:_ref$contentNodeProps,_ref$autoHide=_ref.autoHide,autoHide=void 0===_ref$autoHide||_ref$autoHide,_ref$forceVisible=_ref.forceVisible,forceVisible=void 0!==_ref$forceVisible&&_ref$forceVisible,_ref$autoHideTimeout=_ref.autoHideTimeout,autoHideTimeout=void 0===_ref$autoHideTimeout?1e3:_ref$autoHideTimeout,_ref$clickOnTrack=_ref.clickOnTrack,clickOnTrack=void 0===_ref$clickOnTrack||_ref$clickOnTrack,_ref$horizontalAutoSt=_ref.horizontalAutoStretch,horizontalAutoStretch=void 0!==_ref$horizontalAutoSt&&_ref$horizontalAutoSt,_ref$widthPropName=_ref.widthPropName,widthPropName=void 0===_ref$widthPropName?"minWidth":_ref$widthPropName,htmlAttributes=(0,objectWithoutProperties.Z)(_ref,_excluded),elRef=(0,react.useRef)(null),scrollableNodeRef=(0,react.useRef)(null),contentNodeRef=(0,react.useRef)(null),maskNodeRef=(0,react.useRef)(null),colorStyles=colorStylesMap[void 0===_ref$colors?"default":_ref$colors];return(0,react.useEffect)(function(){var instance;return elRef.current&&(instance=new simplebar.Z(elRef.current,{autoHide:autoHide,forceVisible:forceVisible,clickOnTrack:clickOnTrack,classNames:classNames,timeout:autoHideTimeout,direction:"ltr",scrollbarMinSize:40,scrollableNode:scrollableNodeRef.current,contentNode:contentNodeRef.current})),function(){instance&&(instance.unMount(),instance=null)}},[]),(0,react.useEffect)(function(){var mutationObserver=null,contentNode=contentNodeRef.current,rootNode=elRef.current,scrollableNode=scrollableNodeRef.current,maskNode=maskNodeRef.current,setMinWidth=lodash_throttle_default()(function(){if(contentNode&&rootNode&&scrollableNode&&maskNode){maskNode.style.minWidth="4000px",contentNode.style.display="inline-block";var contentRect=contentNode.getBoundingClientRect(),newWidth="".concat(Math.ceil(contentRect.width),"px");newWidth!==rootNode.style[widthPropName]&&(rootNode.style[widthPropName]=newWidth),contentNode.style.display="",maskNode.style.minWidth=""}},200);return horizontalAutoStretch&&contentNode&&(setMinWidth(),(mutationObserver=new MutationObserver(setMinWidth)).observe(contentNode,{childList:!0,subtree:!0,characterData:!0})),function(){setMinWidth.cancel(),mutationObserver&&mutationObserver.disconnect()}},[widthPropName,horizontalAutoStretch]),(0,jsx_runtime.jsxs)("div",(0,objectSpread2.Z)((0,objectSpread2.Z)({},htmlAttributes),{},{ref:(0,react_merge_refs_esm.Z)([elRef,ref]),"data-simplebar":!0,className:classnames_default()("component_x_PaQ",colorStyles.component,className),children:[(0,jsx_runtime.jsxs)("div",{className:classNames.wrapper,children:[(0,jsx_runtime.jsx)("div",{className:classNames.heightAutoObserverWrapperEl,children:(0,jsx_runtime.jsx)("div",{className:classNames.heightAutoObserverEl})}),(0,jsx_runtime.jsx)("div",{className:classNames.mask,ref:maskNodeRef,children:(0,jsx_runtime.jsx)("div",{className:classNames.offset,children:(0,jsx_runtime.jsx)("div",(0,objectSpread2.Z)((0,objectSpread2.Z)({},scrollableNodeProps),{},{ref:(0,react_merge_refs_esm.Z)([scrollableNodeRef].concat((0,toConsumableArray.Z)(scrollableNodeProps.ref?[scrollableNodeProps.ref]:[]))),className:classnames_default()(classNames.contentWrapper,null==scrollableNodeProps?void 0:scrollableNodeProps.className),children:(0,jsx_runtime.jsx)("div",(0,objectSpread2.Z)((0,objectSpread2.Z)({},contentNodeProps),{},{ref:(0,react_merge_refs_esm.Z)([contentNodeRef].concat((0,toConsumableArray.Z)(contentNodeProps.ref?[contentNodeProps.ref]:[]))),className:classnames_default()(classNames.contentEl,null==contentNodeProps?void 0:contentNodeProps.className),children:children}))}))})}),(0,jsx_runtime.jsx)("div",{className:classNames.placeholder})]}),(0,jsx_runtime.jsx)("div",{className:classnames_default()(classNames.track,classNames.horizontal),children:(0,jsx_runtime.jsx)("div",{className:classNames.scrollbar})}),(0,jsx_runtime.jsx)("div",{className:classnames_default()(classNames.track,classNames.vertical),children:(0,jsx_runtime.jsx)("div",{className:classNames.scrollbar})})]}))});try{Scrollbar.displayName="Scrollbar",Scrollbar.__docgenInfo={description:"",displayName:"Scrollbar",props:{children:{defaultValue:null,description:"Оборачиваемый элемент.",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Дополнительный класс на корневой элемент.",name:"className",required:!1,type:{name:"string"}},colors:{defaultValue:{value:"default"},description:"Набор цветов для компонента",name:"colors",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"inverted"'}]}},horizontalAutoStretch:{defaultValue:{value:"false"},description:"Растягивать контент по горизонтали по ширине содержимого.",name:"horizontalAutoStretch",required:!1,type:{name:"boolean"}},widthPropName:{defaultValue:{value:"minWidth"},description:"Название css свойства, которое устанавливается на контейнер при horizontalAutoStretch.",name:"widthPropName",required:!1,type:{name:"enum",value:[{value:'"width"'},{value:'"minWidth"'},{value:'"maxWidth"'}]}},autoHide:{defaultValue:{value:"true"},description:"Включает автоскрытие ползунка.",name:"autoHide",required:!1,type:{name:"boolean"}},autoHideTimeout:{defaultValue:{value:"1000"},description:"Время в мс, определяющее задержку до исчезновения полосы прокрутки (при включенной опции autoHide).",name:"autoHideTimeout",required:!1,type:{name:"number"}},forceVisible:{defaultValue:{value:"false"},description:"Принудительное отображение полосы прокрутки.",name:"forceVisible",required:!1,type:{name:'boolean | "x" | "y"'}},clickOnTrack:{defaultValue:{value:"true"},description:"Управление поведением клика по треку.\nЕсли true, то будет выполняться прокрутка к месту клика.",name:"clickOnTrack",required:!1,type:{name:"boolean"}},scrollableNodeProps:{defaultValue:{value:"{ ref: null }"},description:"HTML-aтрибуты на прокручиваемый узел.",name:"scrollableNodeProps",required:!1,type:{name:"DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>"}},contentNodeProps:{defaultValue:{value:"{ ref: null }"},description:"HTML-aтрибуты на узел с контентом.",name:"contentNodeProps",required:!1,type:{name:"DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/scrollbar/src/Component.tsx#Scrollbar"]={docgenInfo:Scrollbar.__docgenInfo,name:"Scrollbar",path:"packages/scrollbar/src/Component.tsx#Scrollbar"})}catch(__react_docgen_typescript_loader_error){}}}]);
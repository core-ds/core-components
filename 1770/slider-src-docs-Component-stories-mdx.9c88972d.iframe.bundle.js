"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2251,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./packages/slider/src/docs/Component.stories.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Component_stories},slider:function(){return slider}});var react=__webpack_require__("./node_modules/react/index.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),addon_knobs_dist=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),modern=__webpack_require__("./dist/slider/modern/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _createMdxContent(props){let _components=Object.assign({h2:"h2",p:"p",pre:"pre",code:"code",h3:"h3",a:"a"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"сегменты-и-шаг-слайдера",children:"Сегменты и шаг слайдера"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Можно настроить количество сегментов и шаг внутри сегмента."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const [value, setValue] = React.useState(0);\n    const [slider, setSlider] = React.useState(1);\n\n    const handleChange = ({ value }) => setValue(value);\n    const handleChangeSlider = ({ value }) => setSlider(value);\n\n    return (\n        <>\n            <div>Value:{value}</div>\n            <br />\n            <Slider\n                size={4}\n                value={value}\n                onChange={handleChange}\n                pips={{\n                    mode: 'values',\n                    values: [0, 10, 100],\n                }}\n                range={{\n                    min: [0],\n                    '50%': [10, 10],\n                    max: [100],\n                }}\n            />\n            <br />\n            <br />\n            <div>Value:{slider}</div>\n            <br />\n            <Slider\n                size={4}\n                value={slider}\n                onChange={handleChangeSlider}\n                min={1}\n                max={8}\n                pips={{\n                    mode: 'steps',\n                }}\n            />\n        </>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Можно настроить слайдер с неравномерными шагами."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const [value, setValue] = React.useState(0);\n\n    const handleChange = ({ value }) => setValue(value);\n\n    return (\n        <>\n            <div>Value:{value}</div>\n            <br />\n            <Slider\n                size={4}\n                value={value}\n                onChange={handleChange}\n                range={{ min: 0, '10%': 1, '40%': 4, '50%': 5, max: 10 }}\n                snap={true}\n                pips={{\n                    mode: 'values',\n                    values: [0, 1, 4, 5, 10],\n                }}\n            />\n        </>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"диапазон",children:"Диапазон"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["С помощью слайдера можно указывать диапазон значений. Чтобы позволить ползункам пересекать друг друга установите ",(0,jsx_runtime.jsx)(_components.code,{children:"behaviour=unconstrained-tap"}),"."]}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const [sliderTap, setSliderTap] = React.useState({\n        value: 4,\n        valueTo: 6,\n    });\n\n    const [slider, setSlider] = React.useState({\n        value: 4,\n        valueTo: 6,\n    });\n\n    const handleChangeSliderTap = (payload) => {\n        setSliderTap(payload);\n    };\n\n    const handleChangeSlider = (payload) => {\n        setSlider(payload);\n    };\n\n    return (\n        <>\n            <div style={{ display: 'flex', justifyContent: 'space-between' }}>\n                <span>min: {sliderTap.value}</span>\n                <span>max: {sliderTap.valueTo}</span>\n            </div>\n            <Gap size='s' />\n            <Slider\n                size={4}\n                value={sliderTap.value}\n                valueTo={sliderTap.valueTo}\n                onChange={handleChangeSliderTap}\n                min={1}\n                max={8}\n                pips={{\n                    mode: 'steps',\n                }}\n            />\n            <Gap size='3xl' />\n            <div style={{ display: 'flex', justifyContent: 'space-between' }}>\n                <span>min: {slider.value}</span>\n                <span>max: {slider.valueTo}</span>\n            </div>\n            <Gap size='s' />\n            <Slider\n                size={4}\n                value={slider.value}\n                valueTo={slider.valueTo}\n                behaviour='unconstrained-tap'\n                onChange={handleChangeSlider}\n                min={1}\n                max={8}\n                pips={{\n                    mode: 'steps',\n                }}\n            />\n        </>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"подписи",children:"Подписи"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Слайдер может использоваться с подписями и без."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const [value, setValue] = React.useState(0);\n    const [slider, setSlider] = React.useState(0);\n\n    const handleChange = ({ value }) => setValue(value);\n    const handleChangeSlider = ({ value }) => setSlider(value);\n\n    return (\n        <>\n            <div>Value: {value}</div>\n            <br />\n            <Slider\n                size={4}\n                value={value}\n                onChange={handleChange}\n                pips={{\n                    mode: 'values',\n                    values: [0, 10, 100],\n                }}\n                range={{\n                    min: [0],\n                    '50%': [10, 10],\n                    max: [100],\n                }}\n            />\n            <br />\n            <br />\n            <div>Value: {slider}</div>\n            <br />\n            <Slider size={4} value={slider} onChange={handleChangeSlider} />\n        </>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"размеры",children:"Размеры"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Доступны M и S размеры компонента."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const [value, setValue] = React.useState(0);\n    const [slider, setSlider] = React.useState(0);\n\n    const handleChange = ({ value }) => setValue(value);\n    const handleChangeSlider = ({ value }) => setSlider(value);\n\n    return (\n        <>\n            <Slider size={4} value={value} onChange={handleChange} />\n            <br />\n            <br />\n            <Slider size={2} value={slider} onChange={handleChangeSlider} />\n        </>\n    );\n});\n//MOBILE\nrender(() => {\n    const [value, setValue] = React.useState(0);\n    const [slider, setSlider] = React.useState(0);\n\n    const handleChange = ({ value }) => setValue(value);\n    const handleChangeSlider = ({ value }) => setSlider(value);\n\n    return (\n        <>\n            <div style={{ marginBottom: 80 }}>\n                <Slider size={4} value={value} onChange={handleChange} />\n            </div>\n            <Slider size={2} value={slider} onChange={handleChangeSlider} />\n        </>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h3,{id:"точки",children:"Точки"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Точки могут использоваться только с с высотой желоба равной 4рх. Точки могут несовпадать с подписями и шагом слайдера."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"render(() => {\n    const [value1, setValue1] = React.useState(2.5);\n    const [value2, setValue2] = React.useState(2.5);\n\n    const handleChange1 = ({ value }) => setValue1(value);\n    const handleChange2 = ({ value }) => setValue2(value);\n\n    return (\n        <>\n            <div>Value: {value1}</div>\n            <br />\n            <Slider\n                min={1}\n                max={10}\n                step={0.5}\n                value={value1}\n                onChange={handleChange1}\n                size={4}\n                dots\n                dotsSlider='step'\n                showNumbers={false}\n                pips={{\n                    mode: 'values',\n                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n                }}\n            />\n            <br />\n            <br />\n            <div>Value: {value2}</div>\n            <br />\n            <Slider\n                min={1}\n                max={7}\n                step={0.5}\n                value={value2}\n                onChange={handleChange2}\n                size={4}\n                dots\n                dotsSlider='custom'\n                showNumbers={true}\n                hideCustomDotsNumbers={true}\n                customDots={[1, 4, 5.5, 7]}\n                pips={{\n                    mode: 'values',\n                    values: [1, 2, 3, 4, 5, 6, 7],\n                }}\n            />\n        </>\n    );\n});\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"связанные-компоненты",children:"Связанные компоненты"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Слайдер используется в ",(0,jsx_runtime.jsx)(_components.a,{href:"?path=/docs/sliderinput--docs",children:"SliderInput"}),"."]})]})}var description=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},Component=__webpack_require__("./packages/slider/src/Component.tsx");function development_createMdxContent(props){let _components=Object.assign({p:"p",a:"a",h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(_components.p,{children:["Внутри себя использует ",(0,jsx_runtime.jsx)(_components.a,{href:"https://refreshless.com/nouislider/pips/",target:"_blank",rel:"nofollow noopener noreferrer",children:"nouislider"}),", подробно изучить его настройки можно в документации."]}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { Slider } from '@alfalab/core-components/slider';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{of:Component.i}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"переменные",children:"Переменные"}),"\n",(0,jsx_runtime.jsx)(blocks.ZV,{css:`
        @import '@alfalab/core-components-vars/src/no-typography-index.css';

:root {
    --slider-progress-color: var(--color-light-accent-primary);
    --slider-progress-hover-color: var(--color-light-accent-primary);
    --slider-thumb-color: var(--color-light-accent-primary);
    --slider-thumb-hover-color: var(--color-light-accent-primary-hover);
    --slider-thumb-active-color: var(--color-light-accent-primary-press);
    --slider-thumb-size: 20px;
    --slider-thumb-half-size: calc(var(--slider-thumb-size) / 2);
    --slider-thumb-border: 2px solid transparent;
    --slider-thumb-box-shadow: none;
    --slider-progress-s-height: 2px;
    --slider-progress-m-height: 4px;
    --slider-progress-s-border-radius: 0;
    --slider-progress-m-border-radius: var(--border-radius-4);
    --slider-progress-background: var(--color-light-neutral-translucent-300);
    --slider-progress-hover-background: var(--color-light-neutral-translucent-300);
    --slider-progress-disabled-background: var(--color-light-neutral-500);
    --slider-progress-disabled-hover-background: var(--color-light-neutral-500);
    --slider-progress-disabled-active-background: var(--color-light-neutral-500);
    --slider-clickable-area-size: 16px;
    --slider-clickable-area-half-size: calc(var(--slider-clickable-area-size) / 2);
    --slider-origin-width: calc(100% - 16px);
    --slider-origin-right: 8px;
    --slider-marker-size: 2px;
    --slider-marker-offset: 4px;
    --slider-marker-border-radius: var(--border-radius-circle);
    --slider-marker-color: var(--color-light-neutral-translucent-700);
    --slider-marker-color-passed: var(--color-light-accent-primary);
    --slider-marker-color-disabled: var(--color-light-neutral-translucent-300);
}
@import '@alfalab/core-components-vars/src/no-typography-index.css';
@import './vars.css';

.component {
    width: 100%;
    padding-top: var(--slider-progress-s-height);
    position: relative;

    & :global(.noUi-base) {
        @mixin hover {
            & :global(.noUi-connects) {
                background: var(--slider-progress-hover-background);
            }

            & :global(.noUi-connect) {
                background: var(--slider-progress-hover-color);
            }
        }
    }

    & :global(.noUi-handle .noUi-touch-area) {
        @mixin hover {
            background: var(--slider-thumb-hover-color);
        }
    }

    & :global(.noUi-handle:active .noUi-touch-area) {
        background: var(--slider-thumb-active-color);
    }

    & :global(.noUi-base) {
        position: absolute;
        width: 100%;
        height: var(--slider-clickable-area-size);
        transform: translateY(-50%);

        cursor: pointer;
    }

    & :global(.noUi-origin) {
        width: var(--slider-origin-width);
        position: absolute;
        top: var(--gap-0);
        right: var(--slider-origin-right);
        height: 0;
    }

    & :global(.noUi-connects) {
        width: 100%;
        height: 100%;
        position: relative;
        background: var(--slider-progress-background);
        transition: background 0.15s;
        z-index: 1;
        overflow: hidden;
    }

    & :global(.noUi-connect) {
        background: var(--slider-progress-color);
        position: absolute;
        z-index: 1;
        top: var(--gap-0);
        right: var(--gap-0);
        width: 100%;
        height: 100%;
        transform-style: flat;
        will-change: transform;
        transform-origin: 0 0;
    }

    & :global(.noUi-handle) {
        position: absolute;
        top: calc((var(--slider-thumb-half-size) - var(--slider-clickable-area-half-size)) * -1);
        right: calc(var(--slider-thumb-half-size) * -1);
        width: var(--slider-thumb-size);
        height: var(--slider-thumb-size);

        box-sizing: border-box;
        border-radius: var(--border-radius-circle);
        box-shadow: var(--slider-thumb-box-shadow);
        border: var(--slider-thumb-border);
        cursor: grab;
        outline: none;
        transition: background 0.15s;
    }

    & :global(.noUi-touch-area) {
        border-radius: var(--border-radius-circle);
        background: var(--slider-thumb-color);
        width: 100%;
        height: 100%;
    }

    & :global(.noUi-pips) {
        @mixin paragraph_component_secondary;
        margin-top: var(--gap-12);
        height: 18px;
        color: var(--color-light-text-secondary);
        position: relative;
        width: 100%;
    }

    & :global(.noUi-marker-large) {
        position: absolute;
        top: calc(-10px - var(--slider-marker-offset) / 2);
        transform: translateY(-50%);

        &:first-child {
            transform: translateX(6px) translateY(-50%);
        }

        &:nth-last-child(2) {
            transform: translateX(calc(-100% - 6px)) translateY(-50%);
        }

        &:global([data-current='true']) {
            opacity: 0;
        }

        &:global([data-passed='true']:not([data-current='true'])) {
            background: white;
        }
    }

    & :global(.noUi-marker-sub) {
        position: absolute;
        top: calc(-10px - var(--slider-marker-offset) / 2);
        transform: translateY(-50%);

        &:global([data-current='true']) {
            opacity: 0;
        }

        &:global([data-passed='true']:not([data-current='true'])) {
            background: white;
        }
    }

    & :global(.noUi-marker-normal) {
        display: none;
    }

    & :global(.noUi-marker) {
        width: var(--slider-marker-size);
        height: var(--slider-marker-size);
        background: var(--slider-marker-color);
        border-radius: var(--border-radius-circle);
        transition:
            opacity 0.15s ease,
            background 0.15s ease;

        &:global([data-current='true']) {
            opacity: 0;
        }

        &:global([data-passed='true']:not([data-current='true'])) {
            background: white;
        }
    }

    & :global(.noUi-value) {
        position: absolute;
        white-space: nowrap;
        text-align: center;
        top: var(--gap-0);
        transform: translateX(-50%);

        &:nth-child(2) {
            transform: translateX(4px);
        }

        &:last-child {
            transform: translateX(calc(-100% - 4px));
        }
    }

    &.disabled {
        & :global(.noUi-base) {
            @mixin hover {
                & :global(.noUi-connect) {
                    background: var(--slider-progress-disabled-hover-background);
                }
            }
        }

        & :global(.noUi-handle .noUi-touch-area) {
            @mixin hover {
                background: var(--slider-progress-disabled-hover-background);
            }
        }

        & :global(.noUi-handle:active .noUi-touch-area) {
            background: var(--slider-progress-disabled-active-background);
        }

        & :global(.noUi-connect) {
            background: var(--slider-progress-disabled-background);
        }

        & :global(.noUi-touch-area) {
            background: var(--slider-progress-disabled-background);
        }
    }
}

.size-2 {
    & :global(.noUi-base) {
        border-radius: var(--slider-progress-s-border-radius);
        top: calc(var(--slider-progress-s-height) / 2);
    }

    & :global(.noUi-connects) {
        top: calc(var(--slider-clickable-area-half-size) - var(--slider-progress-s-height) / 2);
        height: var(--slider-progress-s-height);
        border-radius: var(--slider-progress-s-border-radius);
    }
}

.size-4 {
    & :global(.noUi-base) {
        border-radius: var(--slider-progress-m-border-radius);
        top: calc(var(--slider-progress-m-height) / 2);
    }

    & :global(.noUi-connects) {
        top: calc(var(--slider-clickable-area-half-size) - var(--slider-progress-m-height) / 2);
        height: var(--slider-progress-m-height);
        border-radius: var(--slider-progress-m-border-radius);
    }
}

.dotsDisabled {
    /* Скрываем маркеры и подписи */
    & :global(.noUi-marker) {
        display: none;
    }
}

.numbersDisabled {
    /* Скрываем только числовые значения, оставляя точки */
    & :global(.noUi-value) {
        display: none !important;
    }
}
.hideLargePips {
    /* Скрываем большие точки с числами (тип 1) для значений из pipsValues */
    & :global(.noUi-marker-large.hide-for-pips-value) {
        display: none;
    }
}

    `})]})}var development=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)};function Component_stories_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Components/Slider",component:modern.Slider,id:"Slider"}),"\n","\n",(0,jsx_runtime.jsx)(dist.oG,{name:"Slider",children:react.createElement(()=>{let[value,setValue]=react.useState(50);return(0,jsx_runtime.jsx)(modern.Slider,{value:value,valueTo:(0,addon_knobs_dist.number)("valueTo",0),onChange:({value})=>setValue(value),min:(0,addon_knobs_dist.number)("min",0),max:(0,addon_knobs_dist.number)("max",100),step:(0,addon_knobs_dist.number)("step",1),size:(0,addon_knobs_dist.select)("size",[2,4],2),behaviour:(0,addon_knobs_dist.select)("behaviour",["unconstrained-tap","tap"],"tap"),dots:(0,addon_knobs_dist.boolean)("dots",!0),showNumbers:(0,addon_knobs_dist.boolean)("showNumbers",!0),dotsSlider:(0,addon_knobs_dist.select)("dotsSlider",["step","custom"],"step"),customDots:(0,addon_knobs_dist.object)("customDots",[25,50,75]),hideCustomDotsNumbers:(0,addon_knobs_dist.boolean)("hideCustomDotsNumbers",!1)})})}),"\n","\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"Slider",children:"Компонент используется для указания значения из заданного диапазона."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),development:(0,jsx_runtime.jsx)(development,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:'# @alfalab/core-components-slider\n\n## 5.0.0\n\n### Major Changes\n\n<sup><time>05.08.2025</time></sup>\n\n#### [#1611](https://github.com/core-ds/core-components/pull/1611)\n\nОбновлена сборка.\n\nДобавлены пропущенные зависимости.\n\nСинхронизированы версии зависимостей.\n\n## 4.8.0\n\n### Minor Changes\n\n<sup><time>16.05.2025</time></sup>\n\n### [#1684](https://github.com/core-ds/core-components/pull/1684)\n\n-   Добавлен props snap для точного шага слайдера по range\n\n## 4.7.3\n\n### Patch Changes\n\n<sup><time>09.01.2025</time></sup>\n\n### [#1461](https://github.com/core-ds/core-components/pull/1461)\n\n-   Обновление зависимостей\n\n## 4.7.2\n\n### Patch Changes\n\n<sup><time>13.12.2024</time></sup>\n\n### [#1478](https://github.com/core-ds/core-components/pull/1478)\n\n-   Вендор classnames обновлён 2.3.1 -> 2.5.1\n\n<sup><time>13.12.2024</time></sup>\n\n### [#1491](https://github.com/core-ds/core-components/pull/1491)\n\n-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.\n\n## 4.7.1\n\n### Patch Changes\n\n<sup><time>13.09.2024</time></sup>\n\n### [#1358](https://github.com/core-ds/core-components/pull/1358)\n\n-   Обновлены наименования переменных скругления\n\n<sup><time>13.09.2024</time></sup>\n\n### [#1370](https://github.com/core-ds/core-components/pull/1370)\n\n-   Заменили числовые значения на переменные отступов\n\n<sup><time>13.09.2024</time></sup>\n\n### [#1369](https://github.com/core-ds/core-components/pull/1369)\n\n-   Заменили числовые значения скругления на переменные\n\n## 4.7.0\n\n### Minor Changes\n\n<sup><time>10.09.2024</time></sup>\n\n### [#1347](https://github.com/core-ds/core-components/pull/1347)\n\n-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)\n\n## 4.6.2\n\n### Patch Changes\n\n<sup><time>24.05.2024</time></sup>\n\n### [#1210](https://github.com/core-ds/core-components/pull/1210)\n\n-   Изменены типы принимаемых компонентов\n\n## 4.6.1\n\n### Patch Changes\n\n<sup><time>29.03.2024</time></sup>\n\n### [#1100](https://github.com/core-ds/core-components/pull/1100)\n\n-   fix(slider): Исправлена проблема, что событие onEnd не вызывалось когда перемещался ползунок стрелками на клавиатуре или тапом в слайдере\n\n## 4.6.0\n\n### Minor Changes\n\n<sup><time>12.02.2024</time></sup>\n\n### [#1029](https://github.com/core-ds/core-components/pull/1029)\n\n-   Добавлены новые способы указать размеры - 4 и 2. Буквенные значения размеров m и s теперь deprecated, используйте вместо них 4 и 2 соответственно\n\n## 4.5.0\n\n### Minor Changes\n\n### [#1069](https://github.com/core-ds/core-components/pull/1069)\n\n-   В Slider добавлены колбэки onStart, onEnd.\n-   В SliderInput добавлены колбэки onSliderStart, onSliderEnd\n-   Исправлена ошибка в 18 реакте с инициализацией слайдера ("Slider was already initialized")\n\n## 4.4.0\n\n### Minor Changes\n\n### [#963](https://github.com/core-ds/core-components/pull/963)\n\n-   В компонентах CheckboxGroup, RadioGroup, SegmentedControl, и Slider цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)\n\n## 4.3.1\n\n### Patch Changes\n\n### [#941](https://github.com/core-ds/core-components/pull/941)\n\n-   Исправлен радиус прогресса\n\n## 4.3.0\n\n### Minor Changes\n\n### [#713](https://github.com/core-ds/core-components/pull/713)\n\n-   Теперь каждый пакет публикуется с исходниками\n\n## 4.2.2\n\n### Patch Changes\n\n### [#766](https://github.com/core-ds/core-components/pull/766)\n\n-   Удален скрипт отправки статистики (send-stats)\n\n## 4.2.1\n\n### Patch Changes\n\n### [#654](https://github.com/core-ds/core-components/pull/654)\n\n-   Удалены лишние dependencies, добавлены отсутствующие\n\n## 4.2.0\n\n### Minor Changes\n\n### [#607](https://github.com/core-ds/core-components/pull/607)\n\n-   Добавлены новые пропс valueTo - второе значение диапазона и behaviour - определяет поведение ползунка\n\n## 4.1.6\n\n### Patch Changes\n\n### [#603](https://github.com/core-ds/core-components/pull/603)\n\n-   Исправлена ошибка, из-за которой трек слайдера исчезал при зуме\n\n## 4.1.5\n\n### Patch Changes\n\n### [#586](https://github.com/core-ds/core-components/pull/586)\n\n-   Исправлен порядок обновления pips и value. Раньше при одновременном изменении pips и value слайдер устанавливался на неверную позицию\n\n### [#588](https://github.com/core-ds/core-components/pull/588)\n\n-   Добавлен \\_\\_esModule в cjs экспорт\n\n## 4.1.4\n\n### Patch Changes\n\n### [#526](https://github.com/core-ds/core-components/pull/526)\n\n-   В зависимости добавлена библиотека tslib\n\n## 4.1.3\n\n### Patch Changes\n\n### [#418](https://github.com/core-ds/core-components/pull/418)\n\n-   Исправлена проблема с default-импортом в cjs форматах\n\n## 4.1.2\n\n### Patch Changes\n\n### [#333](https://github.com/core-ds/core-components/pull/333)\n\n-   Явные значения в css классах(padding, border-radius и т.п) заменены на переменные\n\n## 4.1.1\n\n### Patch Changes\n\n-   [#289](https://github.com/core-ds/core-components/pull/289): Увеличена кликабельная область слайдера. Thanks [@reme3d2y](https://github.com/reme3d2y)\n\nAll notable changes to this project will be documented in this file.\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@4.0.1...@alfalab/core-components-slider@4.1.0) (2022-09-06)\n\n### Features\n\n-   **slider-input:** revert steps ([#234](https://github.com/core-ds/core-components/issues/234)) ([d5e312b](https://github.com/core-ds/core-components/commit/d5e312bb7a54e53414e205a57081159033d53efe))\n\n## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@4.0.0...@alfalab/core-components-slider@4.0.1) (2022-08-19)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.1.2...@alfalab/core-components-slider@4.0.0) (2022-08-17)\n\n### Features\n\n-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))\n\n### BREAKING CHANGES\n\n-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена\n    директория dist)\n\nCo-authored-by: Vladimir Gevak <VGevak@alfabank.ru>\n\n## [3.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.1.1...@alfalab/core-components-slider@3.1.2) (2022-08-17)\n\n### Bug Fixes\n\n-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))\n\n## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.1.0...@alfalab/core-components-slider@3.1.1) (2022-08-11)\n\n### Bug Fixes\n\n-   **slider:** handle slide ([#187](https://github.com/core-ds/core-components/issues/187)) ([709f8df](https://github.com/core-ds/core-components/commit/709f8df47c82c905225dfd4645e345cf14e9f844))\n\n# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.4...@alfalab/core-components-slider@3.1.0) (2022-08-04)\n\n### Bug Fixes\n\n-   **slider:** заменил interface на type ([#176](https://github.com/core-ds/core-components/issues/176)) ([d19e3cb](https://github.com/core-ds/core-components/commit/d19e3cb3a728feb6a0dc46a6a0691f72fc90e10f))\n\n### Features\n\n-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))\n\n## [3.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.3...@alfalab/core-components-slider@3.0.4) (2022-07-18)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.2...@alfalab/core-components-slider@3.0.3) (2022-07-15)\n\n### Bug Fixes\n\n-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))\n\n## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.1...@alfalab/core-components-slider@3.0.2) (2022-07-14)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.0...@alfalab/core-components-slider@3.0.1) (2022-07-11)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.3.3...@alfalab/core-components-slider@2.4.0) (2022-06-28)\n\n### Features\n\n-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))\n\n## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.3.0...@alfalab/core-components-slider@2.3.1) (2021-12-08)\n\n### Bug Fixes\n\n-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))\n\n# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.2.0...@alfalab/core-components-slider@2.3.0) (2021-09-14)\n\n### Features\n\n-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))\n\n# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.1.0...@alfalab/core-components-slider@2.2.0) (2021-08-04)\n\n### Features\n\n-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))\n\n# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.0.1...@alfalab/core-components-slider@2.1.0) (2021-07-23)\n\n### Features\n\n-   slider input mobile theme (PDS-242) ([#738](https://github.com/core-ds/core-components/issues/738)) ([6e924aa](https://github.com/core-ds/core-components/commit/6e924aa90b63b914b6f5690766e41cddabe18e19))\n\n## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.0.0...@alfalab/core-components-slider@2.0.1) (2021-07-09)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.3.1...@alfalab/core-components-slider@2.0.0) (2021-07-08)\n\n### Features\n\n-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))\n\n## [1.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.3.0...@alfalab/core-components-slider@1.3.1) (2021-04-26)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.5...@alfalab/core-components-slider@1.3.0) (2021-04-09)\n\n### Features\n\n-   **slider:** click theme ([15c308a](https://github.com/core-ds/core-components/commit/15c308a50e9fbcd8e40a8681f32aefea5b3d5cf9))\n\n## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.4...@alfalab/core-components-slider@1.2.5) (2021-04-01)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n## [1.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.2...@alfalab/core-components-slider@1.2.4) (2021-03-18)\n\n### Bug Fixes\n\n-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))\n\n## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.0...@alfalab/core-components-slider@1.2.2) (2021-03-16)\n\n### Bug Fixes\n\n-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))\n\n# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.4...@alfalab/core-components-slider@1.2.0) (2021-03-15)\n\n### Features\n\n-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))\n\n## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.3...@alfalab/core-components-slider@1.1.4) (2021-03-14)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.2...@alfalab/core-components-slider@1.1.3) (2021-03-04)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n\n## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.1...@alfalab/core-components-slider@1.1.2) (2021-03-03)\n\n**Note:** Version bump only for package @alfalab/core-components-slider\n'})})]})}function Component_stories_MDXContent(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(Component_stories_createMdxContent,{...props})}):Component_stories_createMdxContent(props)}let slider=()=>react.createElement(()=>{let[value,setValue]=react.useState(50);return(0,jsx_runtime.jsx)(modern.Slider,{value:value,valueTo:(0,addon_knobs_dist.number)("valueTo",0),onChange:({value})=>setValue(value),min:(0,addon_knobs_dist.number)("min",0),max:(0,addon_knobs_dist.number)("max",100),step:(0,addon_knobs_dist.number)("step",1),size:(0,addon_knobs_dist.select)("size",[2,4],2),behaviour:(0,addon_knobs_dist.select)("behaviour",["unconstrained-tap","tap"],"tap"),dots:(0,addon_knobs_dist.boolean)("dots",!0),showNumbers:(0,addon_knobs_dist.boolean)("showNumbers",!0),dotsSlider:(0,addon_knobs_dist.select)("dotsSlider",["step","custom"],"step"),customDots:(0,addon_knobs_dist.object)("customDots",[25,50,75]),hideCustomDotsNumbers:(0,addon_knobs_dist.boolean)("hideCustomDotsNumbers",!1)})});slider.storyName="Slider",slider.parameters={storySource:{source:'React.createElement(() => {\n  const [value, setValue] = React.useState(50);\n  const handleChange = ({\n    value\n  }) => setValue(value);\n  return <Slider value={value} valueTo={number("valueTo", 0)} onChange={handleChange} min={number("min", 0)} max={number("max", 100)} step={number("step", 1)} size={select("size", [2, 4], 2)} behaviour={select("behaviour", ["unconstrained-tap", "tap"], "tap")} dots={boolean("dots", true)} showNumbers={boolean("showNumbers", true)} dotsSlider={select("dotsSlider", ["step", "custom"], "step")} customDots={object("customDots", [25, 50, 75])} hideCustomDotsNumbers={boolean("hideCustomDotsNumbers", false)} />;\n})'}};let componentMeta={title:"Components/Slider",id:"Slider",component:modern.Slider,tags:["stories-mdx"],includeStories:["slider"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:Component_stories_MDXContent};var Component_stories=componentMeta;let __namedExportsOrder=["slider"]},"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _toConsumableArray}});var arrayLikeToArray=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _arrayWithoutHoles(r){if(Array.isArray(r))return(0,arrayLikeToArray.Z)(r)}function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}var unsupportedIterableToArray=__webpack_require__("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");function _nonIterableSpread(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||(0,unsupportedIterableToArray.Z)(r)||_nonIterableSpread()}}}]);
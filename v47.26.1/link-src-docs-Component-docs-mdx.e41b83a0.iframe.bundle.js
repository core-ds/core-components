"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[4405,1530,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./packages/link/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},link:function(){return link}});var _link$parameters,_link$parameters2,_link$parameters2$doc,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");__webpack_require__("./node_modules/react/index.js");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_icons_glyph_StarMIcon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@alfalab/icons-glyph/StarMIcon.js"),_alfalab_core_components_typography__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/typography/modern/index.js"),_alfalab_core_components_link__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./dist/link/modern/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/Link",component:_alfalab_core_components_link__WEBPACK_IMPORTED_MODULE_4__.Link,id:"Link"},VIEWS=["primary","secondary","default"],link={name:"Link",render:function render(){var colors=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("colors",["default","inverted"],"default");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{backgroundColor:"inverted"===colors?"var(--color-light-base-bg-primary-inverted)":"transparent",padding:"8px",position:"absolute",top:0,left:0,right:0,bottom:0},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_core_components_typography__WEBPACK_IMPORTED_MODULE_3__.Typography.Text,{view:"primary-medium",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_core_components_link__WEBPACK_IMPORTED_MODULE_4__.Link,{view:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("view",VIEWS,"primary"),pseudo:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("pseudo",!1),underline:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("underline",!0),href:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("href",""),leftAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("leftAddons",!1)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_icons_glyph_StarMIcon__WEBPACK_IMPORTED_MODULE_2__.StarMIcon,{}),rightAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("rightAddons",!1)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_alfalab_icons_glyph_StarMIcon__WEBPACK_IMPORTED_MODULE_2__.StarMIcon,{}),colors:colors,children:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("text","Вернуться в интернет-банк")})})})}};__webpack_exports__.default=meta,link.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},link.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},null===(_link$parameters=link.parameters)||void 0===_link$parameters?void 0:_link$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({originalSource:"{\n  name: 'Link',\n  render: () => {\n    const colors = select('colors', ['default', 'inverted'], 'default');\n    return <div style={{\n      backgroundColor: colors === 'inverted' ? 'var(--color-light-base-bg-primary-inverted)' : 'transparent',\n      padding: '8px',\n      position: 'absolute',\n      top: 0,\n      left: 0,\n      right: 0,\n      bottom: 0\n    }}>\n                <Typography.Text view='primary-medium'>\n                    <Link view={select('view', VIEWS, 'primary')} pseudo={boolean('pseudo', false)} underline={boolean('underline', true)} href={text('href', '')} leftAddons={boolean('leftAddons', false) && <StarMIcon />} rightAddons={boolean('rightAddons', false) && <StarMIcon />} colors={colors}>\n                        {text('text', 'Вернуться в интернет-банк')}\n                    </Link>\n                </Typography.Text>\n            </div>;\n  }\n}"},null===(_link$parameters2=link.parameters)||void 0===_link$parameters2?void 0:null===(_link$parameters2$doc=_link$parameters2.docs)||void 0===_link$parameters2$doc?void 0:_link$parameters2$doc.source)})});let __namedExportsOrder=["link"]},"./packages/link/src/docs/Component.docs.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Component_docs}}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),blocks=__webpack_require__("./.storybook/blocks/index.ts"),Component_stories=__webpack_require__("./packages/link/src/docs/Component.stories.tsx");function _createMdxContent(props){let _components=Object.assign({h2:"h2",p:"p",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"обычная-ссылка",children:"Обычная ссылка"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Нестареющая классика. Ссылка может вести как на страницу внутри системы, так и на внешний ресурс."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<Space>\n    <Typography.Text view='primary-medium'>\n        <Link\n            view='default'\n            rel='noopener'\n            target='_blank'\n            href='https://alfabank.ru/get-money/credit-cards/100-days/'\n        >\n            Default\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link\n            view='primary'\n            rel='noopener'\n            target='_blank'\n            href='https://alfabank.ru/get-money/credit-cards/100-days/'\n        >\n            Primary\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link\n            view='secondary'\n            rel='noopener'\n            target='_blank'\n            href='https://alfabank.ru/get-money/credit-cards/100-days/'\n        >\n            Secondary\n        </Link>\n    </Typography.Text>\n</Space>\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"псевдоссылка",children:"Псевдоссылка"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Вызывает информационный слой (collapse, dropdown, popup) без перехода на другую страницу."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<Space>\n    <Typography.Text view='primary-medium'>\n        <Link pseudo={true} view='default'>\n            Default\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link pseudo={true} view='primary'>\n            Primary\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link pseudo={true} view='secondary'>\n            Secondary\n        </Link>\n    </Typography.Text>\n</Space>\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"подчёркивание-ссылок",children:"Подчёркивание ссылок"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Подчёркивание ссылок не является обязательным, но помогает пользователю определить их тип."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<Space>\n    <Typography.Text view='primary-medium'>\n        <Link view='default'>Default link</Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link pseudo={true} view='default'>\n            Pseudo link\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link underline={false} view='default'>\n            Link without underline\n        </Link>\n    </Typography.Text>\n</Space>\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"анатомия",children:"Анатомия"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["С помощью слотов ",(0,jsx_runtime.jsx)(_components.code,{children:"leftAddons"})," и ",(0,jsx_runtime.jsx)(_components.code,{children:"rightAddons"})," можно кастомизировать ссылку. Например, добавить иконку.\nПереданный контент будет отрисован слева или справа от текста ссылки."]}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<Space>\n    <Typography.Text view='primary-medium'>\n        <Link view='default' leftAddons={<StarMIcon />}>\n            Default link\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link view='default' rightAddons={<StarMIcon />}>\n            Default link\n        </Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link view='default' leftAddons={<StarMIcon />} rightAddons={<StarMIcon />}>\n            Default link\n        </Link>\n    </Typography.Text>\n</Space>\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"размеры",children:"Размеры"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Cсылка наследует текстовый стиль от родителя."}),"\n",(0,jsx_runtime.jsx)(_components.pre,{live:!0,children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"<Space>\n    <Typography.Text view='primary-large'>\n        <Link view='default'>Paragraph primary large</Link>\n    </Typography.Text>\n    <Typography.Text view='primary-medium'>\n        <Link view='default'>Paragraph primary medium</Link>\n    </Typography.Text>\n    <Typography.Text view='primary-small'>\n        <Link view='default'>Paragraph primary small</Link>\n    </Typography.Text>\n</Space>\n"})})]})}var description=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)},src=__webpack_require__("./packages/link/src/index.ts");function development_createMdxContent(props){let _components=Object.assign({h2:"h2",pre:"pre",code:"code"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(_components.h2,{id:"подключение",children:"Подключение"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-jsx",children:"import { Link } from '@alfalab/core-components/link';\n"})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"свойства",children:"Свойства"}),"\n",(0,jsx_runtime.jsx)(dist.Ed,{of:src.Link}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"переменные",children:"Переменные"}),"\n",(0,jsx_runtime.jsx)(blocks.ZV,{css:`
        @import '../../vars/src/index.css';

.component {
    box-sizing: border-box;
    text-decoration: none;
    font-family: var(--font-family);
    cursor: pointer;
    outline: none;

    @media (hover: hover) {
        &:hover .text {
            border-bottom-color: rgba(0, 0, 0, 0);
        }
    }

    &:active .text {
        border-bottom-color: rgba(0, 0, 0, 0);
    }
}

.withAddons {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.text {
    border-bottom: 1px solid;
    transition: border 0.2s ease, color 0.2s ease;
}

.focused {
    @mixin focus-outline;
}

.pseudo {
    margin: var(--gap-0);
    padding: var(--gap-0);
    background-color: transparent;
    border: none;
    box-shadow: none;
    font: inherit;
}

.pseudo .text {
    border-bottom-style: dashed;
}

.withoutUnderline .text {
    border-bottom: none;
}

.addons {
    display: flex;
    align-items: center;
    transition: color 0.2s ease;
}

.addons:first-child {
    margin-right: var(--gap-4);
}

.addons:last-child {
    margin-left: var(--gap-4);
}

.addons:only-child {
    margin-right: var(--gap-0);
    margin-left: var(--gap-0);
}
@import '../../vars/src/index.css';

:root {
    /* primary */
    --link-primary-color: var(--color-light-text-primary);
    --link-primary-hover-color: var(--color-light-text-primary-hover);
    --link-primary-active-color: var(--color-light-text-primary-press);

    /* secondary */
    --link-secondary-color: var(--color-light-text-secondary);
    --link-secondary-hover-color: var(--color-light-text-secondary-hover);
    --link-secondary-active-color: var(--color-light-text-secondary-press);

    /* default */
    --link-default-color: var(--color-light-text-info);
    --link-default-hover-color: var(--color-light-text-info-hover);
    --link-default-active-color: var(--color-light-text-info-press);
}

.primary {
    color: var(--link-primary-color);
    border-bottom-color: var(--link-primary-color);

    @media (hover: hover) {
        &:hover {
            color: var(--link-primary-hover-color);
        }
    }

    &:active {
        color: var(--link-primary-active-color);
    }
}

.secondary {
    color: var(--link-secondary-color);
    border-bottom-color: var(--link-secondary-color);

    @media (hover: hover) {
        &:hover {
            color: var(--link-secondary-hover-color);
        }
    }

    &:active {
        color: var(--link-secondary-active-color);
    }
}

.defaultView {
    color: var(--link-default-color);
    border-bottom-color: var(--link-default-color);

    @media (hover: hover) {
        &:hover {
            color: var(--link-default-hover-color);
        }
    }

    &:active {
        color: var(--link-default-active-color);
    }
}
@import '../../vars/src/index.css';

:root {
    /* primary */
    --link-inverted-primary-color: var(--color-light-text-primary-inverted);
    --link-inverted-primary-hover-color: var(--color-light-text-primary-inverted-hover);
    --link-inverted-primary-active-color: var(--color-light-text-primary-inverted-press);

    /* secondary */
    --link-inverted-secondary-color: var(--color-light-text-secondary-inverted);
    --link-inverted-secondary-hover-color: var(--color-light-text-secondary-inverted-hover);
    --link-inverted-secondary-active-color: var(--color-light-text-secondary-inverted-press);

    /* default */
    --link-inverted-default-color: var(--color-light-text-info-inverted);
    --link-inverted-default-hover-color: var(--color-light-text-info-inverted-hover);
    --link-inverted-default-active-color: var(--color-light-text-info-inverted-press);
}

.primary {
    color: var(--link-inverted-primary-color);
    border-bottom-color: var(--link-inverted-primary-color);

    @media (hover: hover) {
        &:hover {
            color: var(--link-inverted-primary-hover-color);
        }
    }

    &:active {
        color: var(--link-inverted-primary-active-color);
    }
}

.secondary {
    color: var(--link-inverted-secondary-color);
    border-bottom-color: var(--link-inverted-secondary-color);

    @media (hover: hover) {
        &:hover {
            color: var(--link-inverted-secondary-hover-color);
        }
    }

    &:active {
        color: var(--link-inverted-secondary-active-color);
    }
}

.defaultView {
    color: var(--link-inverted-default-color);
    border-bottom-color: var(--link-inverted-default-color);

    @media (hover: hover) {
        &:hover {
            color: var(--link-inverted-default-hover-color);
        }
    }

    &:active {
        color: var(--link-inverted-default-active-color);
    }
}

    `})]})}var development=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(development_createMdxContent,props)})):development_createMdxContent(props)};function Component_docs_createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:Component_stories}),"\n",(0,jsx_runtime.jsx)(blocks.yt,{name:"Link",children:"Ссылка — элемент навигации, который обозначает возможность перехода на другую страницу или вызова нового информационного слоя."}),"\n",(0,jsx_runtime.jsx)(blocks.mQ,{description:(0,jsx_runtime.jsx)(description,{}),changelog:(0,jsx_runtime.jsx)(dist.UG,{children:"# Change Log\n\n## 5.3.1\n\n### Patch Changes\n\n<sup><time>13.09.2024</time></sup>\n\n### [#1370](https://github.com/core-ds/core-components/pull/1370)\n\n-   Заменили числовые значения на переменные отступов\n\n## 5.3.0\n\n### Minor Changes\n\n<sup><time>10.09.2024</time></sup>\n\n### [#1347](https://github.com/core-ds/core-components/pull/1347)\n\n-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)\n\n## 5.2.3\n\n### Patch Changes\n\n<sup><time>04.09.2024</time></sup>\n\n### [#1354](https://github.com/core-ds/core-components/pull/1354)\n\n-   Обновлены наименования переменных отступов\n\n## 5.2.2\n\n### Patch Changes\n\n<sup><time>14.06.2024</time></sup>\n\n### [#1235](https://github.com/core-ds/core-components/pull/1235)\n\n-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools\n\n## 5.2.1\n\n### Patch Changes\n\n<sup><time>22.03.2024</time></sup>\n\n### [#1134](https://github.com/core-ds/core-components/pull/1134)\n\n-   Убрали hover для мобильных устройств\n\n## 5.2.0\n\n### Minor Changes\n\n### [#966](https://github.com/core-ds/core-components/pull/966)\n\n-   В компонентах CustomButton, Link и PickerButton цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)\n\n## 5.1.1\n\n### Patch Changes\n\n### [#920](https://github.com/core-ds/core-components/pull/920)\n\n-   Исправлен отступ у слота слева\n\n## 5.1.0\n\n### Minor Changes\n\n### [#713](https://github.com/core-ds/core-components/pull/713)\n\n-   Теперь каждый пакет публикуется с исходниками\n\n## 5.0.6\n\n### Patch Changes\n\n### [#766](https://github.com/core-ds/core-components/pull/766)\n\n-   Удален скрипт отправки статистики (send-stats)\n\n## 5.0.5\n\n### Patch Changes\n\n### [#676](https://github.com/core-ds/core-components/pull/676)\n\n-   Обновлена зависимость @alfalab/hooks\n\n## 5.0.4\n\n### Patch Changes\n\n### [#588](https://github.com/core-ds/core-components/pull/588)\n\n-   Добавлен \\_\\_esModule в cjs экспорт\n\n## 5.0.3\n\n### Patch Changes\n\n### [#526](https://github.com/core-ds/core-components/pull/526)\n\n-   В зависимости добавлена библиотека tslib\n\n## 5.0.2\n\n### Patch Changes\n\n### [#418](https://github.com/core-ds/core-components/pull/418)\n\n-   Исправлена проблема с default-импортом в cjs форматах\n\n## 5.0.1\n\n### Patch Changes\n\n-   [#283](https://github.com/core-ds/core-components/pull/283): Добавлен атрибут type=button для Link при pseudo=true. Thanks [@dmitrbrvsk](https://github.com/dmitrbrvsk)\n\nAll notable changes to this project will be documented in this file.\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@4.1.0...@alfalab/core-components-link@5.0.0) (2022-09-06)\n\n### Bug Fixes\n\n-   **link:** replace component with a button in pseudo mode ([#156](https://github.com/core-ds/core-components/issues/156)) ([6f24cbb](https://github.com/core-ds/core-components/commit/6f24cbb433c4ced85986d5f0e0b3bc1289e0fb8d))\n\n### Features\n\n-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))\n\n### BREAKING CHANGES\n\n-   **link:** В компоненте Link с пропсом pseudo заменяется дефолтный html-элемент \"a\" на\n    \"button\"\n\nCo-authored-by: crybabydanchan <crysiscaramel@gmal.com>\n\n# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@4.0.1...@alfalab/core-components-link@4.1.0) (2022-08-25)\n\n### Bug Fixes\n\n-   **link:** fix addons size for underline mode in description ([15c796b](https://github.com/core-ds/core-components/commit/15c796b1f5a99122ba7e3ba638490517eb985c6e))\n\n### Features\n\n-   **link:** implemented new view & updated styles ([3873619](https://github.com/core-ds/core-components/commit/38736190773e2aa199ca544ee976efb1ba5a88d3))\n-   **link:** updated styles ([b5296f2](https://github.com/core-ds/core-components/commit/b5296f26a8271c2b3c2f34195dd3997308877bbe))\n\n## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@4.0.0...@alfalab/core-components-link@4.0.1) (2022-08-19)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.4.1...@alfalab/core-components-link@4.0.0) (2022-08-17)\n\n### Features\n\n-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))\n\n### BREAKING CHANGES\n\n-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена\n    директория dist)\n\nCo-authored-by: Vladimir Gevak <VGevak@alfabank.ru>\n\n## [3.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.4.0...@alfalab/core-components-link@3.4.1) (2022-08-17)\n\n### Bug Fixes\n\n-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))\n\n# [3.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.3...@alfalab/core-components-link@3.4.0) (2022-08-04)\n\n### Features\n\n-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))\n\n## [3.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.2...@alfalab/core-components-link@3.3.3) (2022-07-18)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n## [3.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.1...@alfalab/core-components-link@3.3.2) (2022-07-15)\n\n### Bug Fixes\n\n-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))\n\n## [3.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.0...@alfalab/core-components-link@3.3.1) (2022-07-14)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n# [3.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.2.4...@alfalab/core-components-link@3.3.0) (2022-06-28)\n\n### Features\n\n-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))\n\n## [3.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.2.0...@alfalab/core-components-link@3.2.1) (2021-12-08)\n\n### Bug Fixes\n\n-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))\n\n# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.1.0...@alfalab/core-components-link@3.2.0) (2021-08-27)\n\n### Features\n\n-   custom components for button and link ([#814](https://github.com/core-ds/core-components/issues/814)) ([a623dd0](https://github.com/core-ds/core-components/commit/a623dd021ef611f9994a6587ba6a0d0ee9d8929c))\n\n# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.0.1...@alfalab/core-components-link@3.1.0) (2021-08-04)\n\n### Features\n\n-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))\n\n## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.0.0...@alfalab/core-components-link@3.0.1) (2021-07-09)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@2.0.0...@alfalab/core-components-link@3.0.0) (2021-07-08)\n\n### Features\n\n-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))\n\n# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.7.1...@alfalab/core-components-link@2.0.0) (2021-05-25)\n\n### Features\n\n-   **button:** add inverted ([#649](https://github.com/core-ds/core-components/issues/649)) ([be321b0](https://github.com/core-ds/core-components/commit/be321b07e99d20824138ad65141f3fbed1b6e315)), closes [#658](https://github.com/core-ds/core-components/issues/658) [#657](https://github.com/core-ds/core-components/issues/657)\n\n### BREAKING CHANGES\n\n-   **button:** remove inverted themes\n\n## [1.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.7.0...@alfalab/core-components-link@1.7.1) (2021-04-26)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n# [1.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.7...@alfalab/core-components-link@1.7.0) (2021-04-06)\n\n### Features\n\n-   **vars:** fresh colors ([10907ec](https://github.com/core-ds/core-components/commit/10907eca0f5556795529a90b41d2bc663ea01dfe))\n\n## [1.6.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.6...@alfalab/core-components-link@1.6.7) (2021-04-01)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n## [1.6.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.4...@alfalab/core-components-link@1.6.6) (2021-03-18)\n\n### Bug Fixes\n\n-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))\n\n## [1.6.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.3...@alfalab/core-components-link@1.6.4) (2021-03-14)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n## [1.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.2...@alfalab/core-components-link@1.6.3) (2021-03-04)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n## [1.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.1...@alfalab/core-components-link@1.6.2) (2021-03-03)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n## [1.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.0...@alfalab/core-components-link@1.6.1) (2021-02-20)\n\n**Note:** Version bump only for package @alfalab/core-components-link\n\n# [1.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.5.0...@alfalab/core-components-link@1.6.0) (2021-02-19)\n\n### Features\n\n-   **link:** set rel='noopener noreferrer' if target='\\_blank' ([#520](https://github.com/core-ds/core-components/issues/520)) ([08c556e](https://github.com/core-ds/core-components/commit/08c556ecc0944d121b23566ae54319a1a33899ba)), closes [#519](https://github.com/core-ds/core-components/issues/519)\n"}),development:(0,jsx_runtime.jsx)(development,{})})]})}var Component_docs=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(Component_docs_createMdxContent,props)})):Component_docs_createMdxContent(props)}},"./packages/link/src/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Link:function(){return Link}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),react_merge_refs_esm=__webpack_require__("./node_modules/react-merge-refs/dist/react-merge-refs.esm.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),esm=__webpack_require__("./node_modules/@alfalab/hooks/dist/esm/index.js"),index_module={component:"component_lMFXL",text:"text_aPya0",withAddons:"withAddons_N7SYb",focused:"focused_hQu__",pseudo:"pseudo_kpIHn",withoutUnderline:"withoutUnderline_IhODm",addons:"addons_Q30kx"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["view","pseudo","underline","leftAddons","rightAddons","className","dataTestId","children","colors","href","Component"],colorStyles={default:{primary:"primary_ToVKN",secondary:"secondary_UPo_S",defaultView:"defaultView_Vv_pD"},inverted:{primary:"primary_XvGVZ",secondary:"secondary_jZLuE",defaultView:"defaultView_em4fi"}},Link=(0,react.forwardRef)(function(_ref,ref){var _ref$view=_ref.view,view=void 0===_ref$view?"primary":_ref$view,_ref$pseudo=_ref.pseudo,pseudo=void 0!==_ref$pseudo&&_ref$pseudo,_ref$underline=_ref.underline,leftAddons=_ref.leftAddons,rightAddons=_ref.rightAddons,className=_ref.className,dataTestId=_ref.dataTestId,children=_ref.children,_ref$colors=_ref.colors,href=_ref.href,_ref$Component=_ref.Component,Component=void 0===_ref$Component?pseudo?"button":"a":_ref$Component,restProps=(0,objectWithoutProperties.Z)(_ref,_excluded),linkRef=(0,react.useRef)(null),_useFocus=(0,esm.KK)(linkRef,"keyboard"),focused=(0,slicedToArray.Z)(_useFocus,1)[0],componentProps=(0,objectSpread2.Z)((0,defineProperty.Z)({className:classnames_default()(index_module.component,colorStyles[void 0===_ref$colors?"default":_ref$colors]["default"===view?"defaultView":view],(0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)({},index_module.withoutUnderline,!(void 0===_ref$underline||_ref$underline)&&!pseudo),index_module.pseudo,pseudo),index_module.focused,focused),index_module.withAddons,leftAddons||rightAddons),className),"data-test-id":dataTestId,rel:"_blank"===restProps.target?"noreferrer noopener":void 0},"string"==typeof Component?"href":"to",href),pseudo&&{type:"button"});return(0,jsx_runtime.jsx)(Component,(0,objectSpread2.Z)((0,objectSpread2.Z)((0,objectSpread2.Z)({},componentProps),restProps),{},{ref:(0,react_merge_refs_esm.Z)([linkRef,ref]),children:leftAddons||rightAddons?(0,jsx_runtime.jsxs)(react.Fragment,{children:[leftAddons&&(0,jsx_runtime.jsx)("span",{className:index_module.addons,children:leftAddons}),children&&(0,jsx_runtime.jsx)("span",{children:(0,jsx_runtime.jsx)("span",{className:index_module.text,children:children})}),rightAddons&&(0,jsx_runtime.jsx)("span",{className:index_module.addons,children:rightAddons})]}):(0,jsx_runtime.jsx)("span",{className:index_module.text,children:children})}))});Link.defaultProps={view:"primary",pseudo:!1},Link.displayName="Link";try{Link.displayName="Link",Link.__docgenInfo={description:"",displayName:"Link",props:{view:{defaultValue:{value:"primary"},description:"Тип ссылки",name:"view",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"primary"'},{value:'"secondary"'}]}},pseudo:{defaultValue:{value:"false"},description:"Пунктирное подчеркивание",name:"pseudo",required:!1,type:{name:"boolean"}},underline:{defaultValue:{value:"true"},description:"Включает / отключает подчеркивание",name:"underline",required:!1,type:{name:"boolean"}},leftAddons:{defaultValue:null,description:"Слот слева",name:"leftAddons",required:!1,type:{name:"ReactNode"}},rightAddons:{defaultValue:null,description:"Слот справа",name:"rightAddons",required:!1,type:{name:"ReactNode"}},Component:{defaultValue:{value:"pseudo ? 'button' : 'a'"},description:"Позволяет использовать кастомный компонент для кнопки (например Link из роутера)",name:"Component",required:!1,type:{name:"ElementType<any>"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования",name:"dataTestId",required:!1,type:{name:"string"}},colors:{defaultValue:{value:"default"},description:"Набор цветов для компонента",name:"colors",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"inverted"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/link/src/Component.tsx#Link"]={docgenInfo:Link.__docgenInfo,name:"Link",path:"packages/link/src/Component.tsx#Link"})}catch(__react_docgen_typescript_loader_error){}}}]);
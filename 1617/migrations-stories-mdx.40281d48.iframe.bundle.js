"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[2690,1341],{"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./docs/migrations.stories.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},__page:function(){return __page},default:function(){return migrations_stories}}),__webpack_require__("./node_modules/react/index.js");var mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function _createMdxContent(props){let _components=Object.assign({h2:"h2",p:"p"},(0,mdx_react_shim.useMDXComponents)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"For users/Миграция со старых компонентов",parameters:{previewTabs:{canvas:{hidden:!0}}},id:"Instructions/migration"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"миграция-со-старых-компонентов",children:"Миграция со старых компонентов"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Таблица соответствий:"}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:`
| Старый                   | Замена                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| Dropdown                 | Tooltip                                                                                      |
| FormField                | Space                                                                                        |
| GeneralConfirmationModal | [ConfirmationModal](https://digital.alfabank.ru/demo/arui-private/#!/Core/ConfirmationModal) |
| Heading                  | Typography.Title<br/>Typography.TitleResponsive                                              |
| Icon                     | Один из вариантов                                                                            |
| IconButton               | IconButton<br/>Button view='ghost' rightAddons={&lt;Icon/&gt;}                               |
| InputGroup               | Space                                                                                        |
| Label                    | Typography.Text                                                                              |
| MobileSheet              | BottomSheet                                                                                  |
| MoneyInput               | AmountInput                                                                                  |
| Paragraph                | Typography.Text                                                                              |
| Popup                    | Popover                                                                                      |
| RangeSlider              | SliderInput                                                                                  |
| SliderField              | SliderInput                                                                                  |
| Spin                     | Spinner                                                                                      |
| TagButton                | Tag                                                                                          |
| Toggle                   | Switch                                                                                       |
`}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:"## Тулзы для модификации кода\n\n### Использование\n\n1. Установить к себе на проект:\n\n```bash\n$ yarn add --dev @alfalab/core-components-codemod\n```\n\n2. Запустить нужные трансформеры:\n\nКакой-то один трансформер:\n\n```bash\n$ npx @alfalab/core-components-codemod --transformers=button-xs --glob='src/**/*.tsx'\n```\n\nМожно сразу несколько трансформеров:\n\n```bash\n$ npx @alfalab/core-components-codemod --transformers=button-xs,button-views --glob='src/**/*.tsx'\n```\n\nСейчас замена компонентов доступна только для кода, написанного на `typescript`. Если кому-то нужно мигрировать с `js` - дайте знать, докрутим.\n\n## Список доступных трансформеров\n\n| Название              | Описание                                                                                                                                                                                                                            |\n|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| paragraph             | Меняет компонент `Paragraph` из `arui-feather` на актульный компонент из `core-components`                                                                                                                                          |\n| label                 | Меняет компонент `Label` из `arui-feather` на актульный компонент из `core-components`                                                                                                                                              |\n| heading               | Меняет компонент `Heading` из `arui-feather` на актульный компонент из `core-components`                                                                                                                                            |\n| button-xs             | Изменяет размер кнопки с `xs` на `xxs`                                                                                                                                                                                              |\n| button-views          | Меняет вид кнопки с view `filled` на `secondary`, `outlined` на `tertiary`, `transparent` на `secondary`, `primary` на `accent`                                                                                                     |\n| replace-color-vars    | Заменяет цветовые токены при переходе на core-components v27 и выше:                                                                                                                                                                |\n|                       | `--color-light-border-secondary-inverted`: `--color-light-border-underline`                                                                                                                                                         |\n|                       | `--color-light-border-tertiary-inverted`: `--color-light-border-underline-inverted`                                                                                                                                                 |\n|                       | `--color-light-graphic-neutral`: `--color-light-graphic-quaternary`                                                                                                                                                                 |\n|                       | `--color-light-bg-neutral`: `--color-light-bg-quaternary`                                                                                                                                                                           |\n|                       | `--color-dark-graphic-neutral`: `--color-dark-graphic-quaternary`                                                                                                                                                                   |\n|                       | `--color-dark-bg-neutral`: `--color-dark-bg-quaternary`                                                                                                                                                                             |\n|                       | `--color-static-bg-neutral-light`: `--color-static-bg-quaternary-light`                                                                                                                                                             |\n|                       | `--color-static-bg-neutral-dark`: `--color-static-bg-quaternary-dark`                                                                                                                                                               |\n| delete-dist           | Удаляет '/dist' в импортах отдельных пакетов. Может принимать дополнительный аргумент командной строки --packages, в котором указывается список компонентов, импорты которых нужно обработать, например (--packages=\"modal,button\") |\n| button-breakpoint-768 | Добавляет свойство breakpoint со значением 768 к респонсивной кнопке |\n| button-views-45 | Меняет вид кнопки с view `tertiary` на `outlined`, `link` на `transparent`, `ghost` на `text` |\n| skeleton-blur | Добавляет свойство `allowBackdropBlur` со значение true к компоненту Skeleton |\n| status-soft | Изменяет view компонента Status с `soft` на `muted-alt`|\n| input-type-card | Заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input |\n| spinner | Меняет `size` на `preset` |\n\n### 42 мажорный релиз\n\n<table>\n    <thead>\n        <tr>\n            <th>Название</th>\n            <th>Описание</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>42-autocomplete</td>\n            <td>\n                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, InputAutocomplete заменит на InputAutocompleteDesktop.<br />\n                - Заменяет responsive точку входа на индекс. InputAutocompleteResponsive заменит на InputAutocomplete<br />\n            </td>\n        </tr>\n        <tr>\n            <td>42-calendar</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. CalendarResponsive заменит на Calendar<br />\n                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Calendar заменит на CalendarDesktop<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/calendar/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-calendar-input</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. CalendarInputResponsive заменит на CalendarInput<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/calendar-input/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-confirmation</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. ConfirmationResponsive заменит на Confirmation<br />\n                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Confirmation заменит на ConfirmationDesktop<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/confirmation/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-date-range-input</td>\n            <td>\n                 Заменяет responsive точку входа на индекс. DateRangeInputResponsive заменит на DateRangeInput<br />\n            </td>\n        </tr>\n        <tr>\n            <td>42-date-time-input</td>\n            <td>\n                Заменяет responsive точку входа на индекс. DateTimeInputResponsive заменит на DateTimeInput<br />\n            </td>\n        </tr>\n        <tr>\n            <td>42-modal</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. ModalResponsive заменит на Modal<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/modal/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-picker-button</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. PickerButtonResponsive заменит на PickerButton<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/picker-button/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-select</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. SelectResponsive заменит на Select<br />\n                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Select заменит на SelectDesktop<br />\n                - Для SelectMobile создаст импорт из @alfalab/core-components/mobile\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/select/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-side-panel</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. SidePanelResponsive заменит на SidePanel<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/side-panel/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-system-message</td>\n            <td>\n                Заменяет responsive точку входа на индекс. SystemMessageResponsive заменит на SystemMessage<br />\n            </td>\n        </tr>\n        <tr>\n            <td>42-tabs</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. TabsResponsive заменит на Tabs<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/tabs/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-tooltip</td>\n            <td>\n                - Заменяет responsive точку входа на индекс. TooltipResponsive заменит на Tooltip<br />\n                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Tooltip заменит на TooltipDesktop<br />\n                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/tooltip/shared.\n            </td>\n        </tr>\n        <tr>\n            <td>42-tag-click</td>\n            <td>\n                - <b>В теме click</b> принудительно устанавливает `view=\"filled\"`\n            </td>\n        </tr>\n        <tr>\n            <td>42-tag-intranet</td>\n            <td>\n                - <b>В теме intranet</b> Принудительно устанавливает `view=\"filled\"` и `shape=\"rectangular\"`\n            </td>\n        </tr>\n        <tr>\n            <td>42-tag-mobile</td>\n            <td>\n                - <b>В теме mobile</b> Принудительно устанавливает `view=\"filled\"` и `shape=\"rectangular\"`\n            </td>\n        </tr>\n        <tr>\n            <td>42-button</td>\n            <td rowspan=\"11\">\n                Кодмоды, связанные с появлением responsive, desktop и mobile версий компонентов.\n                Заменяют импорт с index на desktop (Например, <code>import { Button } from '@alfalab/core-components/button'</code> заменит на\n                <code>import { ButtonDesktop } from '@alfalab/core-components/button/desktop'</code>).\n            </td>\n        </tr>\n        <tr><td>42-checkbox-group</td></tr>\n        <tr><td>42-code-input</td></tr>\n        <tr><td>42-filter-tag</td></tr>\n        <tr><td>42-form-control</td></tr>\n        <tr><td>42-input</td></tr>\n        <tr><td>42-plate</td></tr>\n        <tr><td>42-radio-group</td></tr>\n        <tr><td>42-tag</td></tr>\n        <tr><td>42-toast</td></tr>\n        <tr><td>42-toast-plate</td></tr>\n    </tbody>\n</table>\n\nДля запуска всех трансформеров можно воспользоваться командой\n\n```\nnpx @alfalab/core-components-codemod --transformers=42-autocomplete,42-button,42-calendar,42-calendar-input,42-checkbox-group,42-code-input,42-confirmation,42-date-range-input,42-date-time-input,42-filter-tag,42-form-control,42-input,42-modal,42-picker-button,42-plate,42-radio-group,42-select,42-side-panel,42-system-message,42-tabs,42-tag,42-toast,42-toast-plate,42-tooltip --glob='src/**/*.tsx'\n```\n\n## Разработка\n\nПод капотом - [jscodeshift](https://github.com/facebook/jscodeshift).\n\n### Запуск тестов\n\n```bash\n$ yarn test:codemod\n```\n\nor\n\n```\n$ npx jest packages/codemod/src --config=jest.codemod.config.js\n```\n"})]})}function MDXContent(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}let __page=()=>{throw Error("Docs-only story")};__page.parameters={docsOnly:!0};let componentMeta={title:"For users/Миграция со старых компонентов",id:"Instructions/migration",parameters:{previewTabs:{canvas:{hidden:!0}}},tags:["stories-mdx"],includeStories:["__page"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:MDXContent};var migrations_stories=componentMeta;let __namedExportsOrder=["__page"]}}]);
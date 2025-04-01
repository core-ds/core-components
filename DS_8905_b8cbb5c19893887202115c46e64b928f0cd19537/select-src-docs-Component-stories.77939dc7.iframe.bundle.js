"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[566],{"./packages/select/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return Component_stories},select:function(){return Component_stories_select},select_mobile:function(){return select_mobile},select_modal_mobile:function(){return select_modal_mobile},select_responsive:function(){return select_responsive}});var _select$parameters,_select$parameters2,_select$parameters2$d,_select_mobile$parame,_select_mobile$parame2,_select_mobile$parame3,_select_responsive$pa,_select_responsive$pa2,_select_responsive$pa3,_select_modal_mobile$,_select_modal_mobile$2,_select_modal_mobile$3,objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),desktop=__webpack_require__("./dist/select/modern/desktop/index.js"),modern=__webpack_require__("./dist/select/modern/index.js"),mobile=__webpack_require__("./dist/select/modern/mobile/index.js"),Component=__webpack_require__("./dist/select/modern/components/arrow/Component.js");__webpack_require__("./dist/select/modern/components/base-select/Component.js"),__webpack_require__("./dist/select/modern/components/field/Component.js"),__webpack_require__("./dist/select/modern/components/optgroup/Component.js"),__webpack_require__("./dist/select/modern/components/option/desktop/Component.js"),__webpack_require__("./dist/select/modern/components/option/mobile/Component.js"),__webpack_require__("./dist/select/modern/components/option/Component.responsive.js"),__webpack_require__("./dist/select/modern/components/options-list/Component.js"),__webpack_require__("./dist/select/modern/components/virtual-options-list/Component.js"),__webpack_require__("./dist/select/modern/components/base-option/Component.js"),__webpack_require__("./dist/select/modern/components/search/Component.js");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);__webpack_require__("./node_modules/@alfalab/icons-glyph/ChevronDownMIcon.js"),__webpack_require__("./node_modules/@alfalab/icons-glyph/ChevronDownSIcon.js"),__webpack_require__("./node_modules/@juggle/resize-observer/lib/exports/resize-observer.js"),__webpack_require__("./dist/shared/modern/index.js"),__webpack_require__("./dist/select/modern/utils.js"),__webpack_require__("./dist/select/modern/components/native-select/Component.js"),__webpack_require__("./dist/select/modern/list-popover-desktop-c6ce8e9a.js"),__webpack_require__("./dist/select/modern/components/base-select/components/list-mobile/list-mobile.js"),__webpack_require__("./dist/select/modern/components/base-select/components/list-mobile/list-bottom-sheet-mobile.js"),__webpack_require__("./dist/select/modern/mobile.module-71ea9806.js"),__webpack_require__("./dist/select/modern/components/base-select/components/list-mobile/list-modal-mobile.js"),__webpack_require__("./dist/select/modern/components/clear-button/Component.js"),__webpack_require__("./dist/button/modern/index.js"),__webpack_require__("./node_modules/@alfalab/icons-glyph/CrossCircleMIcon.js"),__webpack_require__("./node_modules/@alfalab/icons-glyph/CrossCircleSIcon.js"),__webpack_require__("./dist/select/modern/consts.js"),__webpack_require__("./dist/select/modern/components/checkmark/Component.js"),__webpack_require__("./dist/badge/modern/index.js");var checkbox_modern=__webpack_require__("./dist/checkbox/modern/index.js");__webpack_require__("./node_modules/@alfalab/icons-glyph/CheckmarkCircleMIcon.js");var CheckmarkMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/CheckmarkMIcon.js");__webpack_require__("./dist/select/modern/components/option/Component.js"),__webpack_require__("./dist/select/modern/components/checkmark-mobile/Component.js"),__webpack_require__("./dist/mq/modern/index.js"),__webpack_require__("./dist/scrollbar/modern/index.js"),__webpack_require__("./dist/select/modern/components/base-checkmark/Component.js"),__webpack_require__("./dist/input/modern/index.js"),__webpack_require__("./node_modules/@alfalab/icons-glyph/MagnifierMIcon.js");var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),index_module={checkmark:"checkmark_k7JPV",start:"start_qzYp1",center:"center_WuPHu",single:"single_RGgG2",selected:"selected_oDSqq"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),BaseCheckmark=function(_ref){var selected=_ref.selected,_ref$disabled=_ref.disabled,className=_ref.className,multiple=_ref.multiple,_ref$align=_ref.align,checkmarkClassNames=classnames_default()("checkmark_k7JPV",index_module[void 0===_ref$align?"center":_ref$align],className,(0,defineProperty.Z)((0,defineProperty.Z)({},"single_RGgG2",!multiple),"selected_oDSqq",selected));return multiple?(0,jsx_runtime.jsx)(checkbox_modern.Checkbox,{checked:selected,disabled:void 0!==_ref$disabled&&_ref$disabled,className:checkmarkClassNames,size:"m",hiddenInput:!0}):(0,jsx_runtime.jsx)(CheckmarkMIcon.CheckmarkMIcon,{className:checkmarkClassNames})};try{BaseCheckmark.displayName="BaseCheckmark",BaseCheckmark.__docgenInfo={description:"",displayName:"BaseCheckmark",props:{selected:{defaultValue:null,description:"Флаг, данный пункт выбран",name:"selected",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"Флаг, данный пункт задизейблен",name:"disabled",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"Дополнительный класс",name:"className",required:!1,type:{name:"string"}},multiple:{defaultValue:null,description:"Флаг множественного выбора",name:"multiple",required:!1,type:{name:"boolean"}},position:{defaultValue:null,description:"Расположение отметки",name:"position",required:!1,type:{name:"enum",value:[{value:'"after"'},{value:'"before"'}]}},icon:{defaultValue:null,description:"Иконка выбранного пункта",name:"icon",required:!1,type:{name:"FC<SVGProps<SVGSVGElement>>"}},align:{defaultValue:{value:"center"},description:'Выравнивание чекбокса или иконки "галочки"',name:"align",required:!1,type:{name:"enum",value:[{value:'"start"'},{value:'"center"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/select/src/components/base-checkmark/Component.tsx#BaseCheckmark"]={docgenInfo:BaseCheckmark.__docgenInfo,name:"BaseCheckmark",path:"packages/select/src/components/base-checkmark/Component.tsx#BaseCheckmark"})}catch(__react_docgen_typescript_loader_error){}var base_option_index_module={option:"option_lBHIe",disabled:"disabled_ZtCGg",checkmarkBefore:"checkmarkBefore_foivD",mobile:"mobile_USY9r",checkmarkAfter:"checkmarkAfter_I95_j",textContent:"textContent_pnRzJ",selected:"selected_mQZoC",highlighted:"highlighted_lDy30",checkmarkBeforeContent:"checkmarkBeforeContent_GtD8n",checkmarkAfterContent:"checkmarkAfterContent_mkGrZ",content:"content_STONQ"},BaseOption=function(_ref){var className=_ref.className,option=_ref.option,children=_ref.children,selected=_ref.selected,highlighted=_ref.highlighted,disabled=_ref.disabled,multiple=_ref.multiple,_ref$Checkmark=_ref.Checkmark,Checkmark=void 0===_ref$Checkmark?BaseCheckmark:_ref$Checkmark,_ref$checkmarkPositio=_ref.checkmarkPosition,checkmarkPosition=void 0===_ref$checkmarkPositio?multiple?"before":"after":_ref$checkmarkPositio,_ref$align=_ref.align,align=void 0===_ref$align?"center":_ref$align,innerProps=_ref.innerProps,dataTestId=_ref.dataTestId,_ref$mobile=_ref.mobile,mobile=void 0!==_ref$mobile&&_ref$mobile,content=children||option.content||option.key,_option$showCheckMark=option.showCheckMark,showCheckMark=void 0===_option$showCheckMark||_option$showCheckMark,isTextContent=!(0,react.isValidElement)(content),renderCheckmark=function(){return Checkmark&&showCheckMark?(0,jsx_runtime.jsx)(Checkmark,{className:classnames_default()((0,defineProperty.Z)((0,defineProperty.Z)({},base_option_index_module.checkmarkBeforeContent,"before"===checkmarkPosition),base_option_index_module.checkmarkAfterContent,"after"===checkmarkPosition)),disabled:disabled,selected:selected,multiple:multiple,align:align}):null};return(0,jsx_runtime.jsxs)("div",(0,objectSpread2.Z)((0,objectSpread2.Z)({},innerProps),{},{className:classnames_default()(base_option_index_module.option,className,(0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)({},base_option_index_module.highlighted,!mobile&&highlighted),base_option_index_module.selected,selected),base_option_index_module.disabled,disabled),base_option_index_module.textContent,isTextContent),base_option_index_module.mobile,mobile),base_option_index_module.checkmarkAfter,!isTextContent&&"after"===checkmarkPosition),base_option_index_module.checkmarkBefore,!isTextContent&&"before"===checkmarkPosition)),"data-test-id":dataTestId,children:["before"===checkmarkPosition&&renderCheckmark(),(0,jsx_runtime.jsx)("div",{className:classnames_default()(base_option_index_module.content),children:content}),"after"===checkmarkPosition&&renderCheckmark()]}))};try{BaseOption.displayName="BaseOption",BaseOption.__docgenInfo={description:"",displayName:"BaseOption",props:{className:{defaultValue:null,description:"Дополнительный класс",name:"className",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"Размер компонента\n@description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно",name:"size",required:!1,type:{name:"enum",value:[{value:'"s"'},{value:'"m"'},{value:'"l"'},{value:'"xl"'},{value:"40"},{value:"48"},{value:"56"},{value:"64"},{value:"72"}]}},children:{defaultValue:null,description:"Контент пункта меню",name:"children",required:!1,type:{name:"ReactNode"}},option:{defaultValue:null,description:"Данные пункта меню",name:"option",required:!0,type:{name:"OptionShape"}},index:{defaultValue:null,description:"Индекс пункта",name:"index",required:!0,type:{name:"number"}},selected:{defaultValue:null,description:"Флаг, выбран ли данный пункт",name:"selected",required:!1,type:{name:"boolean"}},highlighted:{defaultValue:null,description:"Флаг, подсвечен ли данный пункт",name:"highlighted",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"Флаг, заблокирован ли данный пункт",name:"disabled",required:!1,type:{name:"boolean"}},multiple:{defaultValue:null,description:"Флаг множественного выбора",name:"multiple",required:!1,type:{name:"boolean"}},Checkmark:{defaultValue:{value:"({\n    selected,\n    disabled = false,\n    className,\n    multiple,\n    align = 'center',\n}: CheckmarkProps) => {\n    const checkmarkClassNames = cn(styles.checkmark, styles[align], className, {\n        [styles.single]: !multiple,\n        [styles.selected]: selected,\n    });\n\n    return multiple ? (\n        <Checkbox\n            checked={selected}\n            disabled={disabled}\n            className={checkmarkClassNames}\n            size='m'\n            hiddenInput={true}\n        />\n    ) : (\n        <CheckmarkMIcon className={checkmarkClassNames} />\n    );\n}"},description:"Компонент пункта меню",name:"Checkmark",required:!1,type:{name:"FC<CheckmarkProps> | null"}},innerProps:{defaultValue:null,description:"Внутренние свойства, которые должны быть установлены компоненту.",name:"innerProps",required:!0,type:{name:"{ id: string; onClick?: ((event: MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined; onMouseDown?: ((event: MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined; onMouseMove?: ((event: MouseEvent<...>) => void) | undefined; role?: string | undefined; } & RefAttributes<...> & AriaAttributes"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования",name:"dataTestId",required:!1,type:{name:"string"}},checkmarkPosition:{defaultValue:{value:"multiple ? 'before' : 'after'"},description:'Позиция иконки "галочки"',name:"checkmarkPosition",required:!1,type:{name:"enum",value:[{value:'"after"'},{value:'"before"'}]}},align:{defaultValue:{value:"center"},description:'Выравнивание чекбокса или иконки "галочки"',name:"align",required:!1,type:{name:"enum",value:[{value:'"start"'},{value:'"center"'}]}},mobile:{defaultValue:{value:"false"},description:"Мобильная версия option.",name:"mobile",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/select/src/components/base-option/Component.tsx#BaseOption"]={docgenInfo:BaseOption.__docgenInfo,name:"BaseOption",path:"packages/select/src/components/base-option/Component.tsx#BaseOption"})}catch(__react_docgen_typescript_loader_error){}var options=[{key:"1",content:"Neptunium"},{key:"2",content:"Plutonium"},{key:"3",content:"Americium"},{key:"4",content:"Curium"},{key:"5",content:"Berkelium"},{key:"6",content:"Californium"},{key:"7",content:"Einsteinium"},{key:"8",content:"Fermium"},{key:"9",content:"Vanadium"},{key:"10",content:"Manganese"},{key:"11",content:"Silicon"},{key:"12",content:"Titanium"},{key:"13",content:"Neptunium"},{key:"14",content:"Plutonium"},{key:"15",content:"Americium"},{key:"16",content:"Curium"},{key:"17",content:"Berkelium"}],POSITION_OPTIONS=["top","top-start","top-end","bottom","bottom-start","bottom-end","right","right-start","right-end","left","left-start","left-end"],meta={title:"Components/Select",component:desktop.SelectDesktop,id:"Select"},Component_stories_select={name:"Select",render:function render(){var _React$useState=react.useState([]),_React$useState2=(0,slicedToArray.Z)(_React$useState,2),selected=_React$useState2[0],setSelected=_React$useState2[1],block=(0,dist.boolean)("block",!1),size=(0,dist.select)("size",[40,48,56,64,72],48),disabled=(0,dist.boolean)("disabled",!1),error=(0,dist.text)("error",""),hint=(0,dist.text)("hint",""),multiple=(0,dist.boolean)("multiple",!1),allowUnselect=(0,dist.boolean)("allowUnselect",!0),closeOnSelect=(0,dist.boolean)("closeOnSelect",!0),Arrow=(0,dist.boolean)("Arrow",!0)?Component.E:function(){return null},Option=(0,dist.boolean)("Default Option",!0)?void 0:BaseOption,circularNavigation=(0,dist.boolean)("circularNavigation",!1),nativeSelect=(0,dist.boolean)("nativeSelect",!1),placeholder=(0,dist.text)("placeholder","Выберите элемент"),label=(0,dist.text)("label","Элемент"),labelView=(0,dist.select)("labelView",["inner","outer"],"inner"),visibleOptions=(0,dist.number)("visibleOptions",5),defaultOpen=(0,dist.boolean)("defaultOpen",!1),popoverPosition=(0,dist.select)("popoverPosition",POSITION_OPTIONS,"bottom-start"),optionsListWidth=(0,dist.select)("optionsListWidth",["field","content"],"field"),clear=(0,dist.boolean)("clear",!0);return(0,jsx_runtime.jsx)("div",{style:{backgroundColor:"transparent"},children:(0,jsx_runtime.jsx)(desktop.SelectDesktop,{block:block,size:size,disabled:disabled,error:error,hint:hint,options:options,multiple:multiple,onChange:function(_ref){setSelected(_ref.selectedMultiple.map(function(option){return option.key}))},selected:selected,allowUnselect:allowUnselect,closeOnSelect:closeOnSelect,Arrow:Arrow,Option:Option,circularNavigation:circularNavigation,nativeSelect:nativeSelect,placeholder:placeholder,label:label,labelView:labelView,visibleOptions:visibleOptions,defaultOpen:defaultOpen,popoverPosition:popoverPosition,optionsListWidth:optionsListWidth,clear:clear})})}},select_mobile={name:"SelectMobile",render:function render(){var _React$useState3=react.useState([]),_React$useState4=(0,slicedToArray.Z)(_React$useState3,2),selected=_React$useState4[0],setSelected=_React$useState4[1],block=(0,dist.boolean)("block",!1),size=(0,dist.select)("size",[40,48,56,64,72],48),disabled=(0,dist.boolean)("disabled",!1),error=(0,dist.text)("error",""),hint=(0,dist.text)("hint",""),multiple=(0,dist.boolean)("multiple",!1),allowUnselect=(0,dist.boolean)("allowUnselect",!0),closeOnSelect=(0,dist.boolean)("closeOnSelect",!0),Arrow=(0,dist.boolean)("Arrow",!0)?Component.E:function(){return null},circularNavigation=(0,dist.boolean)("circularNavigation",!1),placeholder=(0,dist.text)("placeholder","Выберите элемент"),label=(0,dist.text)("label","Элемент"),labelView=(0,dist.select)("labelView",["inner","outer"],"inner"),defaultOpen=(0,dist.boolean)("defaultOpen",!1),swipeable=(0,dist.boolean)("swipeable",!0),clear=(0,dist.boolean)("clear",!0);return(0,jsx_runtime.jsx)("div",{style:{backgroundColor:"transparent"},children:(0,jsx_runtime.jsx)(mobile.SelectMobile,{block:block,size:size,disabled:disabled,error:error,hint:hint,options:options,multiple:multiple,onChange:function(_ref2){setSelected(_ref2.selectedMultiple.map(function(option){return option.key}))},selected:selected,allowUnselect:allowUnselect,closeOnSelect:closeOnSelect,Arrow:Arrow,circularNavigation:circularNavigation,placeholder:placeholder,label:label,labelView:labelView,defaultOpen:defaultOpen,swipeable:swipeable,clear:clear})})}},select_responsive={name:"SelectResponsive",render:function render(){var _React$useState5=react.useState([]),_React$useState6=(0,slicedToArray.Z)(_React$useState5,2),selected=_React$useState6[0],setSelected=_React$useState6[1],block=(0,dist.boolean)("block",!1),size=(0,dist.select)("size",[40,48,56,64,72],48),disabled=(0,dist.boolean)("disabled",!1),error=(0,dist.text)("error",""),hint=(0,dist.text)("hint",""),multiple=(0,dist.boolean)("multiple",!1),allowUnselect=(0,dist.boolean)("allowUnselect",!0),closeOnSelect=(0,dist.boolean)("closeOnSelect",!0),Arrow=(0,dist.boolean)("Arrow",!0)?Component.E:function(){return null},Option=(0,dist.boolean)("Default Option",!0)?void 0:BaseOption,circularNavigation=(0,dist.boolean)("circularNavigation",!1),nativeSelect=(0,dist.boolean)("nativeSelect",!1),placeholder=(0,dist.text)("placeholder","Выберите элемент"),label=(0,dist.text)("label","Элемент"),labelView=(0,dist.select)("labelView",["inner","outer"],"inner"),visibleOptions=(0,dist.number)("visibleOptions",5),defaultOpen=(0,dist.boolean)("defaultOpen",!1),popoverPosition=(0,dist.select)("popoverPosition",POSITION_OPTIONS,"bottom-start"),optionsListWidth=(0,dist.select)("optionsListWidth",["field","content"],"field"),clear=(0,dist.boolean)("clear",!0);return(0,jsx_runtime.jsx)("div",{style:{backgroundColor:"transparent"},children:(0,jsx_runtime.jsx)(modern.Select,{block:block,size:size,disabled:disabled,error:error,hint:hint,options:options,multiple:multiple,onChange:function(_ref3){setSelected(_ref3.selectedMultiple.map(function(option){return option.key}))},selected:selected,allowUnselect:allowUnselect,closeOnSelect:closeOnSelect,Arrow:Arrow,Option:Option,circularNavigation:circularNavigation,nativeSelect:nativeSelect,placeholder:placeholder,label:label,labelView:labelView,visibleOptions:visibleOptions,defaultOpen:defaultOpen,popoverPosition:popoverPosition,optionsListWidth:optionsListWidth,clear:clear})})}},select_modal_mobile={name:"SelectModalMobile",render:function render(){var _React$useState7=react.useState([]),_React$useState8=(0,slicedToArray.Z)(_React$useState7,2),selected=_React$useState8[0],setSelected=_React$useState8[1],block=(0,dist.boolean)("block",!1),size=(0,dist.select)("size",[40,48,56,64,72],48),disabled=(0,dist.boolean)("disabled",!1),error=(0,dist.text)("error",""),hint=(0,dist.text)("hint",""),multiple=(0,dist.boolean)("multiple",!1),allowUnselect=(0,dist.boolean)("allowUnselect",!0),closeOnSelect=(0,dist.boolean)("closeOnSelect",!0),Arrow=(0,dist.boolean)("Arrow",!0)?Component.E:function(){return null},circularNavigation=(0,dist.boolean)("circularNavigation",!1),placeholder=(0,dist.text)("placeholder","Выберите элемент"),label=(0,dist.text)("label","Элемент"),labelView=(0,dist.select)("labelView",["inner","outer"],"inner"),defaultOpen=(0,dist.boolean)("defaultOpen",!1),clear=(0,dist.boolean)("clear",!0);return(0,jsx_runtime.jsx)("div",{style:{backgroundColor:"transparent"},children:(0,jsx_runtime.jsx)(mobile.SelectModalMobile,{block:block,size:size,disabled:disabled,error:error,hint:hint,options:options,multiple:multiple,onChange:function(_ref4){setSelected(_ref4.selectedMultiple.map(function(option){return option.key}))},selected:selected,allowUnselect:allowUnselect,closeOnSelect:closeOnSelect,Arrow:Arrow,circularNavigation:circularNavigation,placeholder:placeholder,label:label,labelView:labelView,defaultOpen:defaultOpen,clear:clear})})}},Component_stories=meta;Component_stories_select.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},Component_stories_select.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_select$parameters=Component_stories_select.parameters)||void 0===_select$parameters?void 0:_select$parameters.docs),{},{source:(0,objectSpread2.Z)({originalSource:"{\n  name: 'Select',\n  render: () => {\n    const [selected, setSelected] = React.useState([]);\n    const handleChange = ({\n      selectedMultiple\n    }) => {\n      setSelected(selectedMultiple.map(option => option.key));\n    };\n    const block = boolean('block', false);\n    const size = selectKnob('size', [40, 48, 56, 64, 72], 48);\n    const disabled = boolean('disabled', false);\n    const error = text('error', '');\n    const hint = text('hint', '');\n    const multiple = boolean('multiple', false);\n    const allowUnselect = boolean('allowUnselect', true);\n    const closeOnSelect = boolean('closeOnSelect', true);\n    const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;\n    const Option = boolean('Default Option', true) ? undefined : BaseOption;\n    const circularNavigation = boolean('circularNavigation', false);\n    const nativeSelect = boolean('nativeSelect', false);\n    const placeholder = text('placeholder', 'Выберите элемент');\n    const label = text('label', 'Элемент');\n    const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');\n    const visibleOptions = number('visibleOptions', 5);\n    const defaultOpen = boolean('defaultOpen', false);\n    const popoverPosition = selectKnob('popoverPosition', POSITION_OPTIONS, 'bottom-start');\n    const optionsListWidth = selectKnob('optionsListWidth', ['field', 'content'], 'field');\n    const clear = boolean('clear', true);\n    return <div style={{\n      backgroundColor: 'transparent'\n    }}>\n                <SelectDesktop block={block} size={size} disabled={disabled} error={error} hint={hint} options={options} multiple={multiple} onChange={handleChange} selected={selected} allowUnselect={allowUnselect} closeOnSelect={closeOnSelect} Arrow={Arrow} Option={Option} circularNavigation={circularNavigation} nativeSelect={nativeSelect} placeholder={placeholder} label={label} labelView={labelView} visibleOptions={visibleOptions} defaultOpen={defaultOpen} popoverPosition={popoverPosition} optionsListWidth={optionsListWidth} clear={clear} />\n            </div>;\n  }\n}"},null===(_select$parameters2=Component_stories_select.parameters)||void 0===_select$parameters2?void 0:null===(_select$parameters2$d=_select$parameters2.docs)||void 0===_select$parameters2$d?void 0:_select$parameters2$d.source)})}),select_mobile.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},select_mobile.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_select_mobile$parame=select_mobile.parameters)||void 0===_select_mobile$parame?void 0:_select_mobile$parame.docs),{},{source:(0,objectSpread2.Z)({originalSource:"{\n  name: 'SelectMobile',\n  render: () => {\n    const [selected, setSelected] = React.useState([]);\n    const handleChange = ({\n      selectedMultiple\n    }) => {\n      setSelected(selectedMultiple.map(option => option.key));\n    };\n    const block = boolean('block', false);\n    const size = selectKnob('size', [40, 48, 56, 64, 72], 48);\n    const disabled = boolean('disabled', false);\n    const error = text('error', '');\n    const hint = text('hint', '');\n    const multiple = boolean('multiple', false);\n    const allowUnselect = boolean('allowUnselect', true);\n    const closeOnSelect = boolean('closeOnSelect', true);\n    const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;\n    const circularNavigation = boolean('circularNavigation', false);\n    const placeholder = text('placeholder', 'Выберите элемент');\n    const label = text('label', 'Элемент');\n    const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');\n    const defaultOpen = boolean('defaultOpen', false);\n    const swipeable = boolean('swipeable', true);\n    const clear = boolean('clear', true);\n    return <div style={{\n      backgroundColor: 'transparent'\n    }}>\n                <SelectMobile block={block} size={size} disabled={disabled} error={error} hint={hint} options={options} multiple={multiple} onChange={handleChange} selected={selected} allowUnselect={allowUnselect} closeOnSelect={closeOnSelect} Arrow={Arrow} circularNavigation={circularNavigation} placeholder={placeholder} label={label} labelView={labelView} defaultOpen={defaultOpen} swipeable={swipeable} clear={clear} />\n            </div>;\n  }\n}"},null===(_select_mobile$parame2=select_mobile.parameters)||void 0===_select_mobile$parame2?void 0:null===(_select_mobile$parame3=_select_mobile$parame2.docs)||void 0===_select_mobile$parame3?void 0:_select_mobile$parame3.source)})}),select_responsive.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},select_responsive.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_select_responsive$pa=select_responsive.parameters)||void 0===_select_responsive$pa?void 0:_select_responsive$pa.docs),{},{source:(0,objectSpread2.Z)({originalSource:"{\n  name: 'SelectResponsive',\n  render: () => {\n    const [selected, setSelected] = React.useState([]);\n    const handleChange = ({\n      selectedMultiple\n    }) => {\n      setSelected(selectedMultiple.map(option => option.key));\n    };\n    const block = boolean('block', false);\n    const size = selectKnob('size', [40, 48, 56, 64, 72], 48);\n    const disabled = boolean('disabled', false);\n    const error = text('error', '');\n    const hint = text('hint', '');\n    const multiple = boolean('multiple', false);\n    const allowUnselect = boolean('allowUnselect', true);\n    const closeOnSelect = boolean('closeOnSelect', true);\n    const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;\n    const Option = boolean('Default Option', true) ? undefined : BaseOption;\n    const circularNavigation = boolean('circularNavigation', false);\n    const nativeSelect = boolean('nativeSelect', false);\n    const placeholder = text('placeholder', 'Выберите элемент');\n    const label = text('label', 'Элемент');\n    const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');\n    const visibleOptions = number('visibleOptions', 5);\n    const defaultOpen = boolean('defaultOpen', false);\n    const popoverPosition = selectKnob('popoverPosition', POSITION_OPTIONS, 'bottom-start');\n    const optionsListWidth = selectKnob('optionsListWidth', ['field', 'content'], 'field');\n    const clear = boolean('clear', true);\n    return <div style={{\n      backgroundColor: 'transparent'\n    }}>\n                <SelectResponsive block={block} size={size} disabled={disabled} error={error} hint={hint} options={options} multiple={multiple} onChange={handleChange} selected={selected} allowUnselect={allowUnselect} closeOnSelect={closeOnSelect} Arrow={Arrow} Option={Option} circularNavigation={circularNavigation} nativeSelect={nativeSelect} placeholder={placeholder} label={label} labelView={labelView} visibleOptions={visibleOptions} defaultOpen={defaultOpen} popoverPosition={popoverPosition} optionsListWidth={optionsListWidth} clear={clear} />\n            </div>;\n  }\n}"},null===(_select_responsive$pa2=select_responsive.parameters)||void 0===_select_responsive$pa2?void 0:null===(_select_responsive$pa3=_select_responsive$pa2.docs)||void 0===_select_responsive$pa3?void 0:_select_responsive$pa3.source)})}),select_modal_mobile.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},select_modal_mobile.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_select_modal_mobile$=select_modal_mobile.parameters)||void 0===_select_modal_mobile$?void 0:_select_modal_mobile$.docs),{},{source:(0,objectSpread2.Z)({originalSource:"{\n  name: 'SelectModalMobile',\n  render: () => {\n    const [selected, setSelected] = React.useState([]);\n    const handleChange = ({\n      selectedMultiple\n    }) => {\n      setSelected(selectedMultiple.map(option => option.key));\n    };\n    const block = boolean('block', false);\n    const size = selectKnob('size', [40, 48, 56, 64, 72], 48);\n    const disabled = boolean('disabled', false);\n    const error = text('error', '');\n    const hint = text('hint', '');\n    const multiple = boolean('multiple', false);\n    const allowUnselect = boolean('allowUnselect', true);\n    const closeOnSelect = boolean('closeOnSelect', true);\n    const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;\n    const circularNavigation = boolean('circularNavigation', false);\n    const placeholder = text('placeholder', 'Выберите элемент');\n    const label = text('label', 'Элемент');\n    const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');\n    const defaultOpen = boolean('defaultOpen', false);\n    const clear = boolean('clear', true);\n    return <div style={{\n      backgroundColor: 'transparent'\n    }}>\n                <SelectModalMobile block={block} size={size} disabled={disabled} error={error} hint={hint} options={options} multiple={multiple} onChange={handleChange} selected={selected} allowUnselect={allowUnselect} closeOnSelect={closeOnSelect} Arrow={Arrow} circularNavigation={circularNavigation} placeholder={placeholder} label={label} labelView={labelView} defaultOpen={defaultOpen} clear={clear} />\n            </div>;\n  }\n}"},null===(_select_modal_mobile$2=select_modal_mobile.parameters)||void 0===_select_modal_mobile$2?void 0:null===(_select_modal_mobile$3=_select_modal_mobile$2.docs)||void 0===_select_modal_mobile$3?void 0:_select_modal_mobile$3.source)})});let __namedExportsOrder=["select","select_mobile","select_responsive","select_modal_mobile"]}}]);
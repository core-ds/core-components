"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[5947],{"./packages/number-input/src/Component.responsive.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:function(){return NumberInputResponsive}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./dist/input/modern/index.js"),_alfalab_core_components_mq__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./dist/mq/modern/index.js"),_components_number_input__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/number-input/src/components/number-input/Component.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["breakpoint","client","defaultMatchMediaValue"],NumberInputResponsive=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function(_ref,ref){var breakpoint=_ref.breakpoint,client=_ref.client,_ref$defaultMatchMedi=_ref.defaultMatchMediaValue,defaultMatchMediaValue=void 0===_ref$defaultMatchMedi?void 0===client?void 0:"desktop"===client:_ref$defaultMatchMedi,restProps=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_4__.Z)(_ref,_excluded),isDesktop=(0,_alfalab_core_components_mq__WEBPACK_IMPORTED_MODULE_2__.useIsDesktop)(breakpoint,defaultMatchMediaValue);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_number_input__WEBPACK_IMPORTED_MODULE_5__.Y,(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.Z)({},restProps),{},{Input:_alfalab_core_components_input__WEBPACK_IMPORTED_MODULE_1__.Input,ref:ref,view:isDesktop?"desktop":"mobile",breakpoint:breakpoint,defaultMatchMediaValue:defaultMatchMediaValue}))});NumberInputResponsive.displayName="NumberInputResponsive";try{NumberInputResponsive.displayName="NumberInputResponsive",NumberInputResponsive.__docgenInfo={description:"",displayName:"NumberInputResponsive",props:{size:{defaultValue:null,description:"Размер компонента\n@description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно",name:"size",required:!1,type:{name:"enum",value:[{value:'"s"'},{value:'"m"'},{value:'"l"'},{value:'"xl"'},{value:"40"},{value:"48"},{value:"56"},{value:"64"},{value:"72"}]}},value:{defaultValue:null,description:"Значение поля ввода",name:"value",required:!1,type:{name:"string | number | null"}},defaultValue:{defaultValue:null,description:"Значение по-умолчанию",name:"defaultValue",required:!1,type:{name:"string | number | null"}},onChange:{defaultValue:null,description:"Обработчик события изменения значения",name:"onChange",required:!1,type:{name:"((e: ChangeEvent<HTMLInputElement> | null, payload: { value: number | null; }) => void)"}},onClick:{defaultValue:null,description:"Обработчик клика по полю",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)"}},onMouseDown:{defaultValue:null,description:"Обработчик MouseDown по полю",name:"onMouseDown",required:!1,type:{name:"((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)"}},max:{defaultValue:{value:"Number.MAX_SAFE_INTEGER"},description:"Максимальное значение",name:"max",required:!1,type:{name:"number"}},min:{defaultValue:{value:"Number.MIN_SAFE_INTEGER"},description:"Минимальное значение",name:"min",required:!1,type:{name:"number"}},step:{defaultValue:null,description:"Шаг инкремента/декремента. Используйте только целочисленные значения",name:"step",required:!1,type:{name:"number"}},block:{defaultValue:null,description:"Растягивает компонент на ширину контейнера",name:"block",required:!1,type:{name:"boolean"}},clear:{defaultValue:null,description:"Крестик для очистки поля",name:"clear",required:!1,type:{name:"boolean"}},colors:{defaultValue:null,description:"Набор цветов для компонента",name:"colors",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"inverted"'}]}},error:{defaultValue:null,description:"Отображение статуса ошибки\n@description По дефолту выводится ошибка и добавляется обводка, иконка ошибки контролируется отдельно с помощью пропса showErrorIcon",name:"error",required:!1,type:{name:"ReactNode"}},showErrorIcon:{defaultValue:{value:"false"},description:"Позволяет управлять отображением иконки ошибки для статуса error\n@description Отобразится при условии, что передан пропс error",name:"showErrorIcon",required:!1,type:{name:"boolean"}},success:{defaultValue:null,description:"Отображение иконки успеха",name:"success",required:!1,type:{name:"boolean"}},hint:{defaultValue:null,description:"Текст подсказки",name:"hint",required:!1,type:{name:"ReactNode"}},label:{defaultValue:null,description:"Лейбл компонента",name:"label",required:!1,type:{name:"ReactNode"}},labelView:{defaultValue:null,description:"Вид лейбла внутри / снаружи",name:"labelView",required:!1,type:{name:"enum",value:[{value:'"inner"'},{value:'"outer"'}]}},wrapperRef:{defaultValue:null,description:"Ref для обертки input",name:"wrapperRef",required:!1,type:{name:"Ref<HTMLDivElement>"}},leftAddons:{defaultValue:null,description:"Слот слева",name:"leftAddons",required:!1,type:{name:"ReactNode"}},rightAddons:{defaultValue:null,description:"Слот справа",name:"rightAddons",required:!1,type:{name:"ReactNode"}},leftAddonsProps:{defaultValue:null,description:"Свойства для обертки левых аддонов",name:"leftAddonsProps",required:!1,type:{name:"HTMLAttributes<HTMLDivElement>"}},rightAddonsProps:{defaultValue:null,description:"Свойства для обертки правых аддонов",name:"rightAddonsProps",required:!1,type:{name:"HTMLAttributes<HTMLDivElement>"}},bottomAddons:{defaultValue:null,description:"Слот под инпутом",name:"bottomAddons",required:!1,type:{name:"ReactNode"}},fieldClassName:{defaultValue:null,description:"Дополнительный класс для поля",name:"fieldClassName",required:!1,type:{name:"string"}},inputClassName:{defaultValue:null,description:"Дополнительный класс инпута",name:"inputClassName",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"Дополнительный класс для лейбла",name:"labelClassName",required:!1,type:{name:"string"}},addonsClassName:{defaultValue:null,description:"Дополнительный класс для аддонов",name:"addonsClassName",required:!1,type:{name:"string"}},focusedClassName:{defaultValue:null,description:"Класс, который будет установлен при фокусе",name:"focusedClassName",required:!1,type:{name:"string"}},filledClassName:{defaultValue:null,description:"Класс, который будет установлен, если в поле есть значение",name:"filledClassName",required:!1,type:{name:"string"}},onClear:{defaultValue:null,description:"Обработчик нажатия на кнопку очистки",name:"onClear",required:!1,type:{name:"((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования.\nДля кнопки инкремента используется модификатор -increment-button, декремента -decrement-button",name:"dataTestId",required:!1,type:{name:"string"}},disableUserInput:{defaultValue:null,description:"Запрещает ввод с клавиатуры",name:"disableUserInput",required:!1,type:{name:"boolean"}},breakpoint:{defaultValue:{value:"1024"},description:"Контрольная точка, с нее начинается desktop версия",name:"breakpoint",required:!1,type:{name:"number"}},client:{defaultValue:null,description:"Версия, которая будет использоваться при серверном рендеринге",name:"client",required:!1,type:{name:"enum",value:[{value:'"desktop"'},{value:'"mobile"'}]}},defaultMatchMediaValue:{defaultValue:{value:"client === undefined ? undefined : client === 'desktop'"},description:"Значение по-умолчанию для хука useMatchMedia\n@deprecated Используйте client",name:"defaultMatchMediaValue",required:!1,type:{name:"boolean | (() => boolean)"}},separator:{defaultValue:null,description:"Разделитель ',' или '.'",name:"separator",required:!1,type:{name:"enum",value:[{value:'"."'},{value:'","'}]}},fractionLength:{defaultValue:null,description:"Количество символов после разделителя\nЕсли указан проп step, то всегда 0",name:"fractionLength",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/number-input/src/Component.responsive.tsx#NumberInputResponsive"]={docgenInfo:NumberInputResponsive.__docgenInfo,name:"NumberInputResponsive",path:"packages/number-input/src/Component.responsive.tsx#NumberInputResponsive"})}catch(__react_docgen_typescript_loader_error){}},"./packages/number-input/src/components/number-input/Component.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Y:function(){return NumberInput}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),react_merge_refs_esm=__webpack_require__("./node_modules/react-merge-refs/dist/react-merge-refs.esm.js"),index_esm=__webpack_require__("./node_modules/@maskito/core/index.esm.js"),react_index_esm=__webpack_require__("./node_modules/@maskito/react/index.esm.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),modern=__webpack_require__("./dist/shared/modern/index.js"),SEPARATORS=[",","."];function parseNumber(){var value=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if("number"==typeof value)return value;var pseudoSeparatorsRegExp=RegExp("[".concat(SEPARATORS.join(""),"]"),"gi");return value?parseFloat(value.replace(RegExp("[^".concat("-").concat(SEPARATORS.join(""),"0-9]"),"gi"),"").replace(pseudoSeparatorsRegExp,".")):NaN}function stringifyNumberWithoutExp(value){var valueString=String(value),_valueString$split=valueString.split("e-"),_valueString$split2=(0,slicedToArray.Z)(_valueString$split,2),numberPart=_valueString$split2[0],expPart=_valueString$split2[1],valueWithoutExp=valueString;if(expPart){var _numberPart$split=numberPart.split("."),fractionalPart=(0,slicedToArray.Z)(_numberPart$split,2)[1],decimalDigits=Number(expPart)+((null==fractionalPart?void 0:fractionalPart.length)||0);valueWithoutExp=value.toFixed(decimalDigits)}return valueWithoutExp}var getNumberRegExp=function(min,fractionLength){var reStr="[0-9]*";return min<0&&(reStr="(\\".concat("-",")?").concat(reStr)),0!==fractionLength&&(reStr="".concat(reStr,"[").concat(SEPARATORS.map(function(s){return"\\".concat(s)}).join(""),"]?[0-9]{0,").concat(fractionLength||15,"}")),new RegExp("^".concat(reStr,"$"))};function createMaskOptions(_ref){var separator=_ref.separator,fractionLength=_ref.fractionLength,min=_ref.min,max=_ref.max;return{mask:getNumberRegExp(min,fractionLength),preprocessors:[createPseudoSeparatorPreprocessor(separator),createNotEmptyIntegerPartPreprocessor({separator:separator,fractionLength:fractionLength}),createZeroFractionLengthPreprocessor(fractionLength,separator),createRepeatedSeparatorPreprocessor(separator)],postprocessors:[createLeadingZeroesValidationPostprocessor(separator),createMinMaxPostprocessor({min:min,max:max,separator:separator})],plugins:[createNotEmptyPartsPlugin(separator),createMinMaxPlugin({min:min,max:max})]}}function createNotEmptyIntegerPartPreprocessor(_ref2){var separator=_ref2.separator,fractionLength=_ref2.fractionLength,startWithDecimalSepRegExp=new RegExp("^\\D*\\".concat(separator));return function(_ref3){var elementState=_ref3.elementState,data=_ref3.data,value=elementState.value,selection=elementState.selection,from=(0,slicedToArray.Z)(selection,1)[0];return fractionLength<=0||value.includes(separator)||!data.match(startWithDecimalSepRegExp)?{elementState:elementState,data:data}:{elementState:elementState,data:value.slice(0,from).match(/\d+/)?data:"0".concat(data)}}}function createPseudoSeparatorPreprocessor(separator){var pseudoSeparatorsRegExp=RegExp("[".concat(SEPARATORS.join(""),"]"),"gi");return function(_ref4){var elementState=_ref4.elementState,data=_ref4.data,value=elementState.value;return{elementState:{selection:elementState.selection,value:value.replace(pseudoSeparatorsRegExp,separator)},data:data.replace(pseudoSeparatorsRegExp,separator)}}}function createZeroFractionLengthPreprocessor(fractionLength,separator){if(fractionLength>0)return function(state){return state};var decimalPartRegExp=RegExp("\\".concat(separator,".*$"),"g");return function(_ref5){var elementState=_ref5.elementState,data=_ref5.data,value=elementState.value,selection=elementState.selection,_selection2=(0,slicedToArray.Z)(selection,2),from=_selection2[0],to=_selection2[1],newValue=value.replace(decimalPartRegExp,"");return{elementState:{selection:[Math.min(from,newValue.length),Math.min(to,newValue.length)],value:newValue},data:data.replace(decimalPartRegExp,"")}}}function createRepeatedSeparatorPreprocessor(separator){return function(_ref6){var elementState=_ref6.elementState,data=_ref6.data,value=elementState.value,selection=elementState.selection,_selection3=(0,slicedToArray.Z)(selection,2),from=_selection3[0],to=_selection3[1];return{elementState:elementState,data:!value.includes(separator)||value.slice(from,to+1).includes(separator)?data:data.replace(new RegExp("\\".concat(separator)),"")}}}function createLeadingZeroesValidationPostprocessor(separator){var trimLeadingZeroes=function(value){return value.replace(RegExp("^(\\D+)?0+(?=0)"),"$1").replace(RegExp("^(\\D+)?0+(?=[1-9])"),"$1")},countTrimmedZeroesBefore=function(value,index){var valueBefore=value.slice(0,index),followedByZero=value.slice(index).startsWith("0");return valueBefore.length-trimLeadingZeroes(valueBefore).length+(followedByZero?1:0)};return function(_ref7){var value=_ref7.value,selection=_ref7.selection,_selection4=(0,slicedToArray.Z)(selection,2),from=_selection4[0],to=_selection4[1],hasSeparator=value.includes(separator),_value$split=value.split(separator),_value$split2=(0,slicedToArray.Z)(_value$split,2),integerPart=_value$split2[0],_value$split2$=_value$split2[1],zeroTrimmedIntegerPart=trimLeadingZeroes(integerPart);return integerPart===zeroTrimmedIntegerPart?{value:value,selection:selection}:{value:zeroTrimmedIntegerPart+(hasSeparator?separator:"")+(void 0===_value$split2$?"":_value$split2$),selection:[Math.max(from-countTrimmedZeroesBefore(value,from),0),Math.max(to-countTrimmedZeroesBefore(value,to),0)]}}}function createMinMaxPostprocessor(_ref8){var min=_ref8.min,max=_ref8.max,separator=_ref8.separator;return function(_ref9){var value=_ref9.value,selection=_ref9.selection,parsedNumber=parseNumber(value),limitedValue=parsedNumber>0?Math.min(parsedNumber,max):Math.max(parsedNumber,min);if(!Number.isNaN(parsedNumber)&&limitedValue!==parsedNumber){var newValue="".concat(limitedValue).replace(".",separator);return{value:newValue,selection:[newValue.length,newValue.length]}}return{value:value,selection:selection}}}function createMinMaxPlugin(_ref10){var min=_ref10.min,max=_ref10.max;return function(element,options){var listener=function(){var parsedNumber=parseNumber(element.value),clampedNumber=modern.fnUtils.clamp(parsedNumber,min,max);Number.isNaN(parsedNumber)||parsedNumber===clampedNumber||(element.value=(0,index_esm.CV)(stringifyNumberWithoutExp(clampedNumber),options),element.dispatchEvent(new Event("input",{bubbles:!0})))},evListenerOptions={capture:!0};return element.addEventListener("blur",listener,evListenerOptions),function(){return element.removeEventListener("blur",listener,evListenerOptions)}}}function createNotEmptyPartsPlugin(separator){return function(element){var listener=function(){var newValue=element.value.replace(new RegExp("(\\".concat(separator,"\\d*?)(0+$)")),"$1").replace(new RegExp("^(\\D+)?\\".concat(separator)),"$10".concat(separator)).replace(new RegExp("\\".concat(separator,"$")),"").replace(new RegExp("^".concat("-","0$")),"0").replace(new RegExp("^".concat("-","$")),"");newValue!==element.value&&(element.value=newValue,element.dispatchEvent(new Event("input",{bubbles:!0})))},evListenerOptions={capture:!0};return element.addEventListener("blur",listener,evListenerOptions),function(){return element.removeEventListener("blur",listener,evListenerOptions)}}}var icon_button_modern=__webpack_require__("./dist/icon-button/modern/index.js"),MinusMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/MinusMIcon.js"),MinusSIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/MinusSIcon.js"),PlusMediumMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/PlusMediumMIcon.js"),PlusSIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/PlusSIcon.js"),index_module={component:"component_GqlVp",separator:"separator_rrdXc",button:"button_sIDtB"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),colorStyles={default:{separator:"separator_WwcWK"},inverted:{separator:"separator_wFo3T"}};function preventDefault(e){e.preventDefault()}var Steppers=function(_ref){var className=_ref.className,onIncrement=_ref.onIncrement,onDecrement=_ref.onDecrement,value=_ref.value,min=_ref.min,max=_ref.max,disabled=_ref.disabled,dataTestId=_ref.dataTestId,colors=_ref.colors,size=_ref.size,decButtonDisabled=disabled||value<=min,incButtonDisabled=disabled||value>=max,MinusIconComponent=40===size?MinusSIcon.MinusSIcon:MinusMIcon.MinusMIcon,PlusIconComponent=40===size?PlusSIcon.PlusSIcon:PlusMediumMIcon.PlusMediumMIcon;return(0,jsx_runtime.jsxs)("div",{className:classnames_default()(index_module.component,className),children:[(0,jsx_runtime.jsx)(icon_button_modern.IconButton,{colors:colors,disabled:decButtonDisabled,className:index_module.button,icon:(0,jsx_runtime.jsx)(MinusIconComponent,{}),"aria-label":"уменьшить",onMouseDown:preventDefault,onClick:onDecrement,dataTestId:(0,modern.getDataTestId)(dataTestId,"decrement-button"),view:"secondary"}),(0,jsx_runtime.jsx)("div",{className:classnames_default()(index_module.separator,colorStyles[colors].separator)}),(0,jsx_runtime.jsx)(icon_button_modern.IconButton,{colors:colors,disabled:incButtonDisabled,className:index_module.button,icon:(0,jsx_runtime.jsx)(PlusIconComponent,{}),"aria-label":"увеличить",onMouseDown:preventDefault,onClick:onIncrement,dataTestId:(0,modern.getDataTestId)(dataTestId,"increment-button"),view:"secondary"})]})};try{Steppers.displayName="Steppers",Steppers.__docgenInfo={description:"",displayName:"Steppers",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},min:{defaultValue:null,description:"",name:"min",required:!0,type:{name:"number"}},max:{defaultValue:null,description:"",name:"max",required:!0,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},onIncrement:{defaultValue:null,description:"",name:"onIncrement",required:!0,type:{name:"() => void"}},onDecrement:{defaultValue:null,description:"",name:"onDecrement",required:!0,type:{name:"() => void"}},dataTestId:{defaultValue:null,description:"",name:"dataTestId",required:!1,type:{name:"string"}},colors:{defaultValue:null,description:"",name:"colors",required:!0,type:{name:"enum",value:[{value:'"default"'},{value:'"inverted"'}]}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:"undefined"},{value:'"s"'},{value:'"m"'},{value:'"l"'},{value:'"xl"'},{value:"40"},{value:"48"},{value:"56"},{value:"64"},{value:"72"}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/number-input/src/components/steppers/Component.tsx#Steppers"]={docgenInfo:Steppers.__docgenInfo,name:"Steppers",path:"packages/number-input/src/components/steppers/Component.tsx#Steppers"})}catch(__react_docgen_typescript_loader_error){}var number_input_index_module={"size-40":"size-40_PKsRs","size-48":"size-48_Vycsc","size-56":"size-56_nxsQY"},_excluded=["value","onChange","separator","fractionLength","defaultValue","Input","min","max","rightAddons","dataTestId","disabled","onBlur","onFocus","view","step","size","disableUserInput","clear","colors"],Component_colorStyles={default:{steppers:"steppers_UfdJC",steppersFocused:"steppersFocused_Om1nX",steppersDisabled:"steppersDisabled_HWAp9"},inverted:{steppers:"steppers_Ezf48",steppersFocused:"steppersFocused_ihekn",steppersDisabled:"steppersDisabled_O0vBX"}},SIZE_TO_CLASSNAME_MAP={s:"size-48",m:"size-56",l:"size-64",xl:"size-72",40:"size-40",48:"size-48",56:"size-56",64:"size-64",72:"size-72"},NumberInput=(0,react.forwardRef)(function(_ref,ref){var propValue=_ref.value,onChange=_ref.onChange,_ref$separator=_ref.separator,separator=void 0===_ref$separator?",":_ref$separator,_ref$fractionLength=_ref.fractionLength,fractionLength=void 0===_ref$fractionLength?15:_ref$fractionLength,defaultValue=_ref.defaultValue,Input=_ref.Input,minProp=_ref.min,maxProp=_ref.max,rightAddons=_ref.rightAddons,dataTestId=_ref.dataTestId,disabled=_ref.disabled,onBlur=_ref.onBlur,onFocus=_ref.onFocus,stepProp=(_ref.view,_ref.step),_ref$size=_ref.size,size=void 0===_ref$size?48:_ref$size,disableUserInput=_ref.disableUserInput,clearProp=_ref.clear,_ref$colors=_ref.colors,colors=void 0===_ref$colors?"default":_ref$colors,restProps=(0,objectWithoutProperties.Z)(_ref,_excluded),min=Math.max(-9007199254740991,null!=minProp?minProp:-9007199254740991),max=Math.min(9007199254740991,null!=maxProp?maxProp:9007199254740991),withStepper=void 0!==stepProp,maskOptions=(0,react.useMemo)(function(){return createMaskOptions({separator:separator,fractionLength:withStepper?0:fractionLength,min:min,max:max})},[separator,fractionLength,min,max,withStepper]),_useState=(0,react.useState)(!1),_useState2=(0,slicedToArray.Z)(_useState,2),focused=_useState2[0],setFocused=_useState2[1],_useState3=(0,react.useState)(function(){return null==defaultValue?withStepper?modern.fnUtils.clamp(0,min,max).toString():"":modern.fnUtils.clamp(parseNumber((0,index_esm.CV)(defaultValue.toString(),maskOptions)),min,max).toString()}),_useState4=(0,slicedToArray.Z)(_useState3,2),value=_useState4[0],setValue=_useState4[1],maskRef=(0,react_index_esm.I)({options:maskOptions});(0,react.useEffect)(function(){void 0!==propValue&&setValue(function(prev){var parsedNumber=parseNumber(propValue);return parsedNumber!==parseNumber(prev)?(0,index_esm.CV)(stringifyNumberWithoutExp(parsedNumber),maskOptions):prev})},[maskOptions,propValue,separator]);var getStep=function(){return Math.round(null!=stepProp?stepProp:1)},changeValue=function(event,newValue){var _ref2,_event$target$value,isNaNValue=Number.isNaN(newValue),valueString=null!==(_ref2=null!==(_event$target$value=null==event?void 0:event.target.value)&&void 0!==_event$target$value?_event$target$value:null==newValue?void 0:newValue.toString())&&void 0!==_ref2?_ref2:"";setValue(valueString),""!==valueString&&isNaNValue||null==onChange||onChange(event,{value:isNaNValue?null:newValue})};return(0,jsx_runtime.jsx)(Input,(0,objectSpread2.Z)((0,objectSpread2.Z)({maxLength:15+((null==value?void 0:value.includes(separator))?1:0)+((null==value?void 0:value.startsWith("-"))?1:0)},restProps),{},{inputMode:min<0&&modern.os.isIOS()?"text":"decimal",ref:(0,react_merge_refs_esm.Z)([ref,maskRef]),value:value,onInput:function(event){var valueString=event.target.value;changeValue(event,parseNumber(valueString))},dataTestId:dataTestId,colors:colors,disabled:disabled,onFocus:function(e){null==onFocus||onFocus(e),disableUserInput||setFocused(!0)},onBlur:function(e){null==onBlur||onBlur(e),setFocused(!1)},size:size,disableUserInput:disableUserInput,clear:clearProp&&/\d/.test(value),rightAddons:withStepper?(0,jsx_runtime.jsxs)(react.Fragment,{children:[rightAddons,(0,jsx_runtime.jsx)(Steppers,{colors:colors,dataTestId:dataTestId,disabled:disabled,value:parseNumber(value),min:min,max:max,className:classnames_default()(Component_colorStyles[colors].steppers,number_input_index_module[SIZE_TO_CLASSNAME_MAP[size]],(0,defineProperty.Z)((0,defineProperty.Z)({},Component_colorStyles[colors].steppersFocused,focused),Component_colorStyles[colors].steppersDisabled,disabled)),onIncrement:function(){var parsed=parseNumber(value);changeValue(null,parseNumber((0,index_esm.CV)((Number.isNaN(parsed)?min:parsed+getStep()).toString(),maskOptions)))},onDecrement:function(){var parsed=parseNumber(value);changeValue(null,parseNumber((0,index_esm.CV)((Number.isNaN(parsed)?max:parsed-getStep()).toString(),maskOptions)))},size:size})]}):rightAddons}))});try{NumberInput.displayName="NumberInput",NumberInput.__docgenInfo={description:"",displayName:"NumberInput",props:{value:{defaultValue:null,description:"Значение поля ввода",name:"value",required:!1,type:{name:"string | number | null"}},defaultValue:{defaultValue:null,description:"Значение по-умолчанию",name:"defaultValue",required:!1,type:{name:"string | number | null"}},separator:{defaultValue:{value:","},description:"Разделитель ',' или '.'",name:"separator",required:!1,type:{name:"enum",value:[{value:'"."'},{value:'","'}]}},fractionLength:{defaultValue:{value:"15"},description:"Количество символов после разделителя\nЕсли указан проп step, то всегда 0",name:"fractionLength",required:!1,type:{name:"number"}},step:{defaultValue:null,description:"Шаг инкремента/декремента. Используйте только целочисленные значения",name:"step",required:!1,type:{name:"number"}},min:{defaultValue:{value:"Number.MIN_SAFE_INTEGER"},description:"Минимальное значение",name:"min",required:!1,type:{name:"number"}},max:{defaultValue:{value:"Number.MAX_SAFE_INTEGER"},description:"Максимальное значение",name:"max",required:!1,type:{name:"number"}},view:{defaultValue:null,description:"Отображение компонента в мобильном или десктопном виде",name:"view",required:!1,type:{name:"enum",value:[{value:'"desktop"'},{value:'"mobile"'}]}},Input:{defaultValue:null,description:"Компонент инпута",name:"Input",required:!0,type:{name:'FC<Omit<BaseInputProps, "FormControlComponent"> & { breakpoint?: number | undefined; client?: "desktop" | "mobile" | undefined; defaultMatchMediaValue?: boolean | ... 1 more ... | undefined; } & { ...; }>'}},onChange:{defaultValue:null,description:"Обработчик события изменения значения",name:"onChange",required:!1,type:{name:"((e: ChangeEvent<HTMLInputElement> | null, payload: { value: number | null; }) => void)"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования.\nДля кнопки инкремента используется модификатор -increment-button, декремента -decrement-button",name:"dataTestId",required:!1,type:{name:"string"}},size:{defaultValue:{value:"48"},description:"Размер компонента\n@description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно",name:"size",required:!1,type:{name:"enum",value:[{value:'"s"'},{value:'"m"'},{value:'"l"'},{value:'"xl"'},{value:"40"},{value:"48"},{value:"56"},{value:"64"},{value:"72"}]}},onClick:{defaultValue:null,description:"Обработчик клика по полю",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)"}},onMouseDown:{defaultValue:null,description:"Обработчик MouseDown по полю",name:"onMouseDown",required:!1,type:{name:"((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)"}},block:{defaultValue:null,description:"Растягивает компонент на ширину контейнера",name:"block",required:!1,type:{name:"boolean"}},clear:{defaultValue:null,description:"Крестик для очистки поля",name:"clear",required:!1,type:{name:"boolean"}},colors:{defaultValue:{value:"default"},description:"Набор цветов для компонента",name:"colors",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"inverted"'}]}},error:{defaultValue:null,description:"Отображение статуса ошибки\n@description По дефолту выводится ошибка и добавляется обводка, иконка ошибки контролируется отдельно с помощью пропса showErrorIcon",name:"error",required:!1,type:{name:"ReactNode"}},showErrorIcon:{defaultValue:{value:"false"},description:"Позволяет управлять отображением иконки ошибки для статуса error\n@description Отобразится при условии, что передан пропс error",name:"showErrorIcon",required:!1,type:{name:"boolean"}},success:{defaultValue:null,description:"Отображение иконки успеха",name:"success",required:!1,type:{name:"boolean"}},hint:{defaultValue:null,description:"Текст подсказки",name:"hint",required:!1,type:{name:"ReactNode"}},label:{defaultValue:null,description:"Лейбл компонента",name:"label",required:!1,type:{name:"ReactNode"}},labelView:{defaultValue:null,description:"Вид лейбла внутри / снаружи",name:"labelView",required:!1,type:{name:"enum",value:[{value:'"inner"'},{value:'"outer"'}]}},wrapperRef:{defaultValue:null,description:"Ref для обертки input",name:"wrapperRef",required:!1,type:{name:"Ref<HTMLDivElement>"}},leftAddons:{defaultValue:null,description:"Слот слева",name:"leftAddons",required:!1,type:{name:"ReactNode"}},rightAddons:{defaultValue:null,description:"Слот справа",name:"rightAddons",required:!1,type:{name:"ReactNode"}},leftAddonsProps:{defaultValue:null,description:"Свойства для обертки левых аддонов",name:"leftAddonsProps",required:!1,type:{name:"HTMLAttributes<HTMLDivElement>"}},rightAddonsProps:{defaultValue:null,description:"Свойства для обертки правых аддонов",name:"rightAddonsProps",required:!1,type:{name:"HTMLAttributes<HTMLDivElement>"}},bottomAddons:{defaultValue:null,description:"Слот под инпутом",name:"bottomAddons",required:!1,type:{name:"ReactNode"}},fieldClassName:{defaultValue:null,description:"Дополнительный класс для поля",name:"fieldClassName",required:!1,type:{name:"string"}},inputClassName:{defaultValue:null,description:"Дополнительный класс инпута",name:"inputClassName",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"Дополнительный класс для лейбла",name:"labelClassName",required:!1,type:{name:"string"}},addonsClassName:{defaultValue:null,description:"Дополнительный класс для аддонов",name:"addonsClassName",required:!1,type:{name:"string"}},focusedClassName:{defaultValue:null,description:"Класс, который будет установлен при фокусе",name:"focusedClassName",required:!1,type:{name:"string"}},filledClassName:{defaultValue:null,description:"Класс, который будет установлен, если в поле есть значение",name:"filledClassName",required:!1,type:{name:"string"}},onClear:{defaultValue:null,description:"Обработчик нажатия на кнопку очистки",name:"onClear",required:!1,type:{name:"((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)"}},disableUserInput:{defaultValue:null,description:"Запрещает ввод с клавиатуры",name:"disableUserInput",required:!1,type:{name:"boolean"}},breakpoint:{defaultValue:{value:"1024"},description:"Контрольная точка, с нее начинается desktop версия",name:"breakpoint",required:!1,type:{name:"number"}},client:{defaultValue:null,description:"Версия, которая будет использоваться при серверном рендеринге",name:"client",required:!1,type:{name:"enum",value:[{value:'"desktop"'},{value:'"mobile"'}]}},defaultMatchMediaValue:{defaultValue:null,description:"Значение по-умолчанию для хука useMatchMedia\n@deprecated Используйте client",name:"defaultMatchMediaValue",required:!1,type:{name:"boolean | (() => boolean)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/number-input/src/components/number-input/Component.tsx#NumberInput"]={docgenInfo:NumberInput.__docgenInfo,name:"NumberInput",path:"packages/number-input/src/components/number-input/Component.tsx#NumberInput"})}catch(__react_docgen_typescript_loader_error){}}}]);
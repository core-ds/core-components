(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[1099,1341],{"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return _toConsumableArray}});var arrayLikeToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");function _arrayWithoutHoles(arr){if(Array.isArray(arr))return(0,arrayLikeToArray.Z)(arr)}function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}var unsupportedIterableToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");function _nonIterableSpread(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||(0,unsupportedIterableToArray.Z)(arr)||_nonIterableSpread()}},"./node_modules/@mdx-js/react/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MDXContext:function(){return MDXContext},MDXProvider:function(){return MDXProvider},useMDXComponents:function(){return useMDXComponents},withMDXComponents:function(){return withMDXComponents}});var react=__webpack_require__("./node_modules/react/index.js");let MDXContext=react.createContext({});function withMDXComponents(Component){return boundMDXComponent;function boundMDXComponent(props){let allComponents=useMDXComponents(props.components);return react.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){let contextComponents=react.useContext(MDXContext);return react.useMemo(()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components},[contextComponents,components])}let emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{r:function(){return DocsRenderer}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.bD,a:_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ct,..._storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.lO},ErrorBoundary=class extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.WI;return new Promise((resolve,reject)=>{__webpack_require__.e(1341).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then(({MDXProvider})=>(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.l)(react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXProvider,{components},react__WEBPACK_IMPORTED_MODULE_0__.createElement(TDocs,{context,docsParameter}))),element)).then(()=>resolve())})},this.unmount=element=>{(0,_storybook_react_dom_shim__WEBPACK_IMPORTED_MODULE_2__.K)(element)}}}},"./node_modules/@storybook/addon-docs/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{$4:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4},Ed:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Ed},UG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG},h_:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_},oG:function(){return _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG}}),__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";var mod,secondTarget,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},mdx_react_shim_exports={};module.exports=__copyProps(__defProp({},"__esModule",{value:!0}),mdx_react_shim_exports),mod=__webpack_require__("./node_modules/@mdx-js/react/index.js"),secondTarget=module.exports,__copyProps(mdx_react_shim_exports,mod,"default"),secondTarget&&__copyProps(secondTarget,mod,"default")},"./docs/components.overview.stories.mdx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},__page:function(){return __page},default:function(){return components_overview_stories}});var ImageState,react=__webpack_require__("./node_modules/react/index.js"),mdx_react_shim=__webpack_require__("./node_modules/@storybook/addon-docs/dist/shims/mdx-react-shim.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),throttle=__webpack_require__("./node_modules/lodash/throttle.js"),throttle_default=__webpack_require__.n(throttle),modern=__webpack_require__("./dist/gap/modern/index.js"),input_modern=__webpack_require__("./dist/input/modern/index.js"),typography_modern=__webpack_require__("./dist/typography/modern/index.js"),mq_modern=__webpack_require__("./dist/mq/modern/index.js"),MagnifierMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/MagnifierMIcon.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),kebabCase=__webpack_require__("./node_modules/lodash/kebabCase.js"),kebabCase_default=__webpack_require__.n(kebabCase),createComponentUrl=__webpack_require__("./.storybook/utils/createComponentUrl.js"),index_module={card:"card_uR3ip",caption:"caption_QXMPq",imageWrapper:"imageWrapper_eeXaf",image:"image_XwbYb",withSafeZone:"withSafeZone_ToFqc",fallbackText:"fallbackText_rk6W_",imageHidden:"imageHidden_r7UjQ"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ImageState1=((ImageState=ImageState1||{})[ImageState.INITIAL=0]="INITIAL",ImageState[ImageState.LOADED=1]="LOADED",ImageState[ImageState.ERROR=2]="ERROR",ImageState),COMPONENTS_WITH_SAFE_ZONE=["SidePanel"],Card=function(_ref){var componentName=_ref.componentName,mode=_ref.mode,_React$useState=react.useState(ImageState1.INITIAL),_React$useState2=(0,slicedToArray.Z)(_React$useState,2),imageState=_React$useState2[0],setImageState=_React$useState2[1],imageRef=react.useRef(null);return react.useEffect(function(){imageRef.current&&imageRef.current.complete&&setImageState(ImageState1.LOADED)},[]),(0,jsx_runtime.jsx)("a",{href:(0,createComponentUrl.J)(componentName),className:index_module.card,children:(0,jsx_runtime.jsxs)("figure",{children:[(0,jsx_runtime.jsxs)("div",{className:index_module.imageWrapper,children:[imageState===ImageState1.ERROR&&(0,jsx_runtime.jsx)(typography_modern.Typography.Text,{view:"primary-small",color:"tertiary",className:index_module.fallbackText,children:"Компонент\n на фотосессии"}),imageState!==ImageState1.ERROR&&(0,jsx_runtime.jsx)("img",{ref:imageRef,src:createImageUrl(componentName,mode),alt:componentName,className:classnames_default()(index_module.image,(0,defineProperty.Z)((0,defineProperty.Z)({},index_module.imageHidden,imageState===ImageState1.INITIAL),index_module.withSafeZone,COMPONENTS_WITH_SAFE_ZONE.includes(componentName))),loading:"lazy",decoding:"async",onError:function(){return setImageState(ImageState1.ERROR)},onLoad:function(){return setImageState(ImageState1.LOADED)}})]}),(0,jsx_runtime.jsx)("figcaption",{className:index_module.caption,children:(0,jsx_runtime.jsx)(typography_modern.Typography.Text,{view:"primary-small",children:componentName})})]})})};function createImageUrl(componentName,mode){return"./images/".concat(kebabCase_default()(componentName),"-").concat("dark"===mode?"dark-":"","preview-snap.png")}try{Card.displayName="Card",Card.__docgenInfo={description:"",displayName:"Card",props:{componentName:{defaultValue:null,description:"",name:"componentName",required:!0,type:{name:"string"}},mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/pages/components-overview/components/card/index.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:".storybook/pages/components-overview/components/card/index.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}var CONFIG={Кнопки:["Button","CustomButton","PickerButton","CustomPickerButton","IconButton","ActionButton","Link"],"Ввод данных":["Input","AmountInput","NumberInput","PhoneInput","InternationalPhoneInput","MaskedInput","Select","InputAutocomplete","SelectWithTags","SliderInput","PasswordInput","Textarea","CodeInput","BankCard","Switch","Checkbox","CheckboxGroup","Radio","RadioGroup","Tag","FilterTag","Slider"],"Ввод даты и времени":["UniversalDateInput","Calendar","CalendarRange"],"Загрузка файлов":["Dropzone","FileUploadItem","Attach"],"Модальные сущности":["Modal","SidePanel","BottomSheet","PopupSheet","Popover","Tooltip"],"Индикаторы прогресса":["ProgressBar","SteppedProgressBar","HatchingProgressBar","CircularProgressBar","Spinner","Skeleton"],Уведомления:["Notification","Toast","Plate","SystemMessage"],Аутентификация:["PassCode","PatternLock","Confirmation"],Ячейки:["GenericWrapper","PureCell","Underlay","SortableList"],Навигация:["Tabs","Pagination","TabBar","NavigationBar","Steps"],Индикаторы:["StatusBadge","Indicator","Status"],Текст:["Typography","List","Markdown"],"Отображение данных":["Amount","IconView","ProductCover","Table","SystemMessage","Comment","Chart","Gallery","Collapse","Accordion"],Лейаут:["Gap","Space","Grid"]},utils=__webpack_require__("./.storybook/addons/utils.js"),icon_button_modern=__webpack_require__("./dist/icon-button/modern/index.js"),ArrowUpMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/ArrowUpMIcon.js"),back_to_top_button_index_module={component:"component_oMEfE",appear:"appear_QRmnP"},BackToTopButton=function(_ref){var onClick=_ref.onClick,visible=_ref.visible,_useState=(0,react.useState)(visible),_useState2=(0,slicedToArray.Z)(_useState,2),show=_useState2[0],setShow=_useState2[1],_useState3=(0,react.useState)(""),_useState4=(0,slicedToArray.Z)(_useState3,2),transitionClass=_useState4[0],setTransitionClass=_useState4[1],timeoutRef=(0,react.useRef)();return(0,react.useEffect)(function(){return visible?(setShow(!0),timeoutRef.current=window.setTimeout(function(){return setTransitionClass(back_to_top_button_index_module.appear)},50)):(timeoutRef.current=window.setTimeout(function(){return setShow(!1)},300),setTransitionClass("")),function(){return window.clearTimeout(timeoutRef.current)}},[visible]),show?(0,jsx_runtime.jsx)(icon_button_modern.IconButton,{icon:ArrowUpMIcon.ArrowUpMIcon,className:classnames_default()(back_to_top_button_index_module.component,transitionClass),colors:"inverted",onClick:onClick}):null};try{BackToTopButton.displayName="BackToTopButton",BackToTopButton.__docgenInfo={description:"",displayName:"BackToTopButton",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}},visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/components/back-to-top-button/index.tsx#BackToTopButton"]={docgenInfo:BackToTopButton.__docgenInfo,name:"BackToTopButton",path:".storybook/components/back-to-top-button/index.tsx#BackToTopButton"})}catch(__react_docgen_typescript_loader_error){}var components_overview_index_module={input:"input_H1odr",cardContainer:"cardContainer_jNlsK",group:"group_MmjNF",groupTitle:"groupTitle_RWUjH",emptySearchResult:"emptySearchResult_Gw2tj"},EMPTY_GROUP="EMPTY",ComponentsOverview=function(){var _useState=(0,react.useState)(function(){var _document$getElementB;return null!==(_document$getElementB=document.getElementById(utils.wy))&&void 0!==_document$getElementB&&_document$getElementB.textContent?"dark":"light"}),_useState2=(0,slicedToArray.Z)(_useState,2),mode=_useState2[0],setMode=_useState2[1],_useState3=(0,react.useState)(""),_useState4=(0,slicedToArray.Z)(_useState3,2),query=_useState4[0],setQuery=_useState4[1],_useState5=(0,react.useState)(!1),_useState6=(0,slicedToArray.Z)(_useState5,2),showToTop=_useState6[0],setShowToTop=_useState6[1],_useMatchMedia=(0,mq_modern.useMatchMedia)("--mobile"),isMobile=(0,slicedToArray.Z)(_useMatchMedia,1)[0];(0,react.useEffect)(function(){var handleChangeMode=function(e){setMode(e.detail.mode)},handleScroll=throttle_default()(function(e){setShowToTop((window.pageYOffset||document.documentElement.scrollTop||0)>800)},200);return document.addEventListener("mode-change",handleChangeMode),document.addEventListener("scroll",handleScroll),function(){document.removeEventListener("mode-change",handleChangeMode),document.removeEventListener("scroll",handleScroll)}},[]);var data=query?Object.keys(CONFIG).reduce(function(res,groupName){var _res$EMPTY_GROUP,group=CONFIG[groupName].filter(function(componentName){return componentName.toLowerCase().includes(query.toLowerCase())});return group.length>0&&(res[EMPTY_GROUP]||(res[EMPTY_GROUP]=[]),(_res$EMPTY_GROUP=res[EMPTY_GROUP]).push.apply(_res$EMPTY_GROUP,(0,toConsumableArray.Z)(group))),res},{}):CONFIG,groups=Object.keys(data),hasData=groups.length>0,Title=isMobile?typography_modern.Typography.TitleMobile:typography_modern.Typography.Title;return(0,jsx_runtime.jsxs)("div",{id:"components-overview",className:"sb-unstyled",children:[(0,jsx_runtime.jsx)(Title,{tag:"h1",view:"xlarge",font:"styrene",children:"Витрина компонентов"}),(0,jsx_runtime.jsx)(modern.Gap,{size:"m"}),(0,jsx_runtime.jsx)(input_modern.Input,{block:!0,clear:!0,className:components_overview_index_module.input,onClear:function(e){return setQuery("")},value:query,placeholder:"Поиск по компонентам",leftAddons:(0,jsx_runtime.jsx)(MagnifierMIcon.MagnifierMIcon,{color:"var(--color-light-neutral-700)"}),onChange:function(_,_ref){return setQuery(_ref.value)}}),hasData?groups.map(function(groupTitle){var componentsList=data[groupTitle];return(0,jsx_runtime.jsxs)("div",{className:components_overview_index_module.group,children:[groupTitle!==EMPTY_GROUP&&(0,jsx_runtime.jsx)(Title,{tag:"h3",view:"small",className:components_overview_index_module.groupTitle,children:groupTitle}),(0,jsx_runtime.jsx)("div",{className:components_overview_index_module.cardContainer,children:componentsList.map(function(componentName){return(0,jsx_runtime.jsx)(Card,{componentName:componentName,mode:mode},componentName)})})]},groupTitle)}):(0,jsx_runtime.jsx)(typography_modern.Typography.Text,{view:"primary-small",color:"secondary",className:components_overview_index_module.emptySearchResult,children:"Ничего не нашлось, попробуйте изменить запрос"}),(0,jsx_runtime.jsx)(BackToTopButton,{visible:showToTop,onClick:function onClick(){return window.scrollTo({behavior:"smooth",top:0})}})]})};function _createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Components overview",parameters:{previewTabs:{canvas:{hidden:!0}}},id:"components-overview"}),"\n",(0,jsx_runtime.jsx)(ComponentsOverview,{})]})}function MDXContent(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,mdx_react_shim.useMDXComponents)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}let __page=()=>{throw Error("Docs-only story")};__page.parameters={docsOnly:!0};let componentMeta={title:"Components overview",id:"components-overview",parameters:{previewTabs:{canvas:{hidden:!0}}},tags:["stories-mdx"],includeStories:["__page"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:MDXContent};var components_overview_stories=componentMeta;let __namedExportsOrder=["__page"]},"./.storybook/utils/createComponentUrl.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function createComponentUrl(componentName){var baseUrl="".concat(window.location.href.split("iframe")[0]);return"".concat(baseUrl,"?path=/docs/").concat(componentName.toLowerCase(),"--docs")}__webpack_require__.d(__webpack_exports__,{J:function(){return createComponentUrl}})},"./node_modules/lodash/_arrayReduce.js":function(module){function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=null==array?0:array.length;for(initAccum&&length&&(accumulator=array[++index]);++index<length;)accumulator=iteratee(accumulator,array[index],index,array);return accumulator}module.exports=arrayReduce},"./node_modules/lodash/_asciiWords.js":function(module){var reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function asciiWords(string){return string.match(reAsciiWord)||[]}module.exports=asciiWords},"./node_modules/lodash/_basePropertyOf.js":function(module){function basePropertyOf(object){return function(key){return null==object?void 0:object[key]}}module.exports=basePropertyOf},"./node_modules/lodash/_createCompounder.js":function(module,__unused_webpack_exports,__webpack_require__){var arrayReduce=__webpack_require__("./node_modules/lodash/_arrayReduce.js"),deburr=__webpack_require__("./node_modules/lodash/deburr.js"),words=__webpack_require__("./node_modules/lodash/words.js"),reApos=RegExp("['’]","g");function createCompounder(callback){return function(string){return arrayReduce(words(deburr(string).replace(reApos,"")),callback,"")}}module.exports=createCompounder},"./node_modules/lodash/_deburrLetter.js":function(module,__unused_webpack_exports,__webpack_require__){var deburrLetter=__webpack_require__("./node_modules/lodash/_basePropertyOf.js")({À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"});module.exports=deburrLetter},"./node_modules/lodash/_hasUnicodeWord.js":function(module){var reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function hasUnicodeWord(string){return reHasUnicodeWord.test(string)}module.exports=hasUnicodeWord},"./node_modules/lodash/_unicodeWords.js":function(module){var rsAstralRange="\ud800-\udfff",rsDingbatRange="\\u2700-\\u27bf",rsLowerRange="a-z\\xdf-\\xf6\\xf8-\\xff",rsUpperRange="A-Z\\xc0-\\xd6\\xd8-\\xde",rsBreakRange="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",rsApos="['’]",rsBreak="["+rsBreakRange+"]",rsLower="["+rsLowerRange+"]",rsMisc="[^"+rsAstralRange+rsBreakRange+"\\d+"+rsDingbatRange+rsLowerRange+rsUpperRange+"]",rsRegional="(?:\ud83c[\udde6-\uddff]){2}",rsSurrPair="[\ud800-\udbff][\udc00-\udfff]",rsUpper="["+rsUpperRange+"]",rsMiscLower="(?:"+rsLower+"|"+rsMisc+")",rsOptContrLower="(?:"+rsApos+"(?:d|ll|m|re|s|t|ve))?",rsOptContrUpper="(?:"+rsApos+"(?:D|LL|M|RE|S|T|VE))?",reOptMod="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\ud83c[\udffb-\udfff])?",rsOptVar="[\\ufe0e\\ufe0f]?",rsOptJoin="(?:\\u200d(?:"+["[^"+rsAstralRange+"]",rsRegional,rsSurrPair].join("|")+")"+rsOptVar+reOptMod+")*",rsEmoji="(?:"+["["+rsDingbatRange+"]",rsRegional,rsSurrPair].join("|")+")"+(rsOptVar+reOptMod+rsOptJoin),reUnicodeWord=RegExp([rsUpper+"?"+rsLower+"+"+rsOptContrLower+"(?="+[rsBreak,rsUpper,"$"].join("|")+")","(?:"+rsUpper+"|"+rsMisc+")+"+rsOptContrUpper+"(?="+[rsBreak,rsUpper+rsMiscLower,"$"].join("|")+")",rsUpper+"?"+rsMiscLower+"+"+rsOptContrLower,rsUpper+"+"+rsOptContrUpper,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])","\\d+",rsEmoji].join("|"),"g");function unicodeWords(string){return string.match(reUnicodeWord)||[]}module.exports=unicodeWords},"./node_modules/lodash/deburr.js":function(module,__unused_webpack_exports,__webpack_require__){var deburrLetter=__webpack_require__("./node_modules/lodash/_deburrLetter.js"),toString=__webpack_require__("./node_modules/lodash/toString.js"),reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,reComboMark=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");function deburr(string){return(string=toString(string))&&string.replace(reLatin,deburrLetter).replace(reComboMark,"")}module.exports=deburr},"./node_modules/lodash/kebabCase.js":function(module,__unused_webpack_exports,__webpack_require__){var kebabCase=__webpack_require__("./node_modules/lodash/_createCompounder.js")(function(result,word,index){return result+(index?"-":"")+word.toLowerCase()});module.exports=kebabCase},"./node_modules/lodash/words.js":function(module,__unused_webpack_exports,__webpack_require__){var asciiWords=__webpack_require__("./node_modules/lodash/_asciiWords.js"),hasUnicodeWord=__webpack_require__("./node_modules/lodash/_hasUnicodeWord.js"),toString=__webpack_require__("./node_modules/lodash/toString.js"),unicodeWords=__webpack_require__("./node_modules/lodash/_unicodeWords.js");function words(string,pattern,guard){return(string=toString(string),void 0===(pattern=guard?void 0:pattern))?hasUnicodeWord(string)?unicodeWords(string):asciiWords(string):string.match(pattern)||[]}module.exports=words}}]);
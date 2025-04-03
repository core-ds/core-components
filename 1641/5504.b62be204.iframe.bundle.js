"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[5504],{"./packages/file-upload-item/src/Component.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{v:function(){return FileUploadItem},I:function(){return FileUploadItemComponent}});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),FileUploadItemContext=(0,react.createContext)({showRestore:!1,uploadStatus:"INITIAL",error:void 0,title:"",subtitle:"",uploadDate:"",size:0,id:"0",onDownload:void 0,onDelete:void 0,onRestore:void 0,downloadLink:"",download:"",disableButtons:!1,target:void 0,showDelete:!1,iconStyle:"gray",customIcon:void 0,progressBar:0,customContent:void 0,truncate:!1,imageUrl:void 0}),modern=__webpack_require__("./dist/icon-button/modern/index.js"),CrossMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/CrossMIcon.js"),actions_control_module={container:"container_i5Oh1",icon:"icon_hubWt",deleteIconColor:"deleteIconColor_qRApv",downloadIconColor:"downloadIconColor_Po_kS",restoreIconColor:"restoreIconColor_uSfQb"},jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),DeleteButton=function(){var _useContext=(0,react.useContext)(FileUploadItemContext),_useContext$id=_useContext.id,id=void 0===_useContext$id?"0":_useContext$id,disableButtons=_useContext.disableButtons,onDelete=_useContext.onDelete;return(0,jsx_runtime.jsx)(modern.IconButton,{className:actions_control_module.icon,size:"xxs","aria-label":"удалить",icon:(0,jsx_runtime.jsx)(CrossMIcon.default,{className:actions_control_module.deleteIconColor}),disabled:disableButtons,onClick:function(e){onDelete&&onDelete(id,e)}})},ArrowDownLineDownCompactMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/ArrowDownLineDownCompactMIcon.js"),DownloadButton=function(){var _useContext=(0,react.useContext)(FileUploadItemContext),_useContext$id=_useContext.id,id=void 0===_useContext$id?"0":_useContext$id,downloadLink=_useContext.downloadLink,download=_useContext.download,disableButtons=_useContext.disableButtons,target=_useContext.target,onDownload=_useContext.onDownload;return(0,jsx_runtime.jsx)(modern.IconButton,{className:actions_control_module.icon,size:"xxs","aria-label":"скачать",icon:(0,jsx_runtime.jsx)(ArrowDownLineDownCompactMIcon.default,{className:actions_control_module.downloadIconColor}),disabled:disableButtons,href:downloadLink,download:download,target:target,onClick:function(e){onDownload&&(e.preventDefault(),onDownload(id))}})},ArrowsCwCompactMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/ArrowsCwCompactMIcon.js"),RestoreButton=function(){var _useContext=(0,react.useContext)(FileUploadItemContext),_useContext$id=_useContext.id,id=void 0===_useContext$id?"0":_useContext$id,disableButtons=_useContext.disableButtons,onRestore=_useContext.onRestore;return(0,jsx_runtime.jsx)(modern.IconButton,{className:actions_control_module.icon,size:"xxs","aria-label":"восстановить",icon:(0,jsx_runtime.jsx)(ArrowsCwCompactMIcon.default,{className:actions_control_module.restoreIconColor}),disabled:disableButtons,onClick:function(){onRestore&&onRestore(id)}})},defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),typography_modern=__webpack_require__("./dist/typography/modern/index.js");function humanFileSize(size){for(var units=["Б","КБ","МБ","ГБ"],humanSize=Number(size),factor=0;humanSize>=1024&&factor<units.length-1;)humanSize/=1024,factor+=1;return humanSize=humanSize.toFixed(2),"".concat(Number(humanSize)," ").concat(units[factor])}var isSuccessStatus=function(status){return"SUCCESS"===status},isErrorStatus=function(status){return"ERROR"===status},isUploadingStatus=function(status){return"UPLOADING"===status},content_error_module={errorItem:"errorItem_LxHOY"},ContentError=function(){var error=(0,react.useContext)(FileUploadItemContext).error;return"string"==typeof error&&error.length>0?(0,jsx_runtime.jsx)(typography_modern.Text,{className:content_error_module.errorItem,view:"primary-small",color:"negative",children:error}):Array.isArray(error)&&error.length>0?(0,jsx_runtime.jsx)("div",{children:error.map(function(item){return(0,jsx_runtime.jsx)(typography_modern.Text,{className:content_error_module.errorItem,view:"primary-small",color:"negative",children:item},item)})}):(0,jsx_runtime.jsx)(typography_modern.Text,{className:content_error_module.errorItem,view:"primary-small",color:"negative",children:"Не удалось загрузить файл"})},content_subtitle_module={subtitle:"subtitle_lRTe0",truncate:"truncate_U1I0i",size:"size_Z7Zkf"},ContentSubtitle=function(){var _useContext=(0,react.useContext)(FileUploadItemContext),uploadStatus=_useContext.uploadStatus,subtitle=_useContext.subtitle,uploadDate=_useContext.uploadDate,size=_useContext.size,truncate=_useContext.truncate,showRestore=_useContext.showRestore,error=_useContext.error,progressBar=_useContext.progressBar,shouldShownError=isErrorStatus(uploadStatus)||!!("string"==typeof error&&error.length>0||Array.isArray(error)&&error.length>0),showMeta=!showRestore&&(isSuccessStatus(uploadStatus)||"UPLOADED"===uploadStatus);return isUploadingStatus(uploadStatus)?(0,jsx_runtime.jsxs)(typography_modern.Text,{view:"primary-small",color:"secondary",children:["Загружено","\xa0",Math.floor(void 0===progressBar?0:Math.min(Math.max(progressBar,0),100)),"%"]}):shouldShownError?(0,jsx_runtime.jsx)(ContentError,{}):showMeta?(0,jsx_runtime.jsxs)("div",{children:[size&&(0,jsx_runtime.jsx)(typography_modern.Text,{className:content_subtitle_module.size,view:"primary-small",color:"secondary",children:humanFileSize(size)}),uploadDate&&(0,jsx_runtime.jsx)(typography_modern.Text,{view:"primary-small",color:"secondary",children:uploadDate})]}):showRestore?(0,jsx_runtime.jsx)(typography_modern.Text,{view:"primary-small",color:"tertiary",children:"Файл удален"}):(0,jsx_runtime.jsx)(typography_modern.Text,{className:classnames_default()(content_subtitle_module.subtitle,(0,defineProperty.Z)({},content_subtitle_module.truncate,truncate)),view:"primary-small",color:"secondary",children:subtitle})},content_module={container:"container_QL3OB",single:"single_BMxNO",title:"title_abAGG",truncate:"truncate_b6dBL",restore:"restore_Lxooa"},objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),super_ellipse=__webpack_require__("./node_modules/@alfalab/core-components/icon-view/esm/super-ellipse/index.js"),Document1CMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/Document1CMIcon.js"),DocumentDocMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentDocMIcon.js"),DocumentExcelMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentExcelMIcon.js"),DocumentImageMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentImageMIcon.js"),DocumentMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentMIcon.js"),DocumentOffMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentOffMIcon.js"),DocumentPdfMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/DocumentPdfMIcon.js"),PaperclipMIcon=__webpack_require__("./node_modules/@alfalab/icons-glyph/PaperclipMIcon.js"),status_control_icon_module={iconPDFColored:"iconPDFColored_W34uM",iconDOCColored:"iconDOCColored_vmf0m",iconExcelColored:"iconExcelColored_Zm_c9",icon1CColored:"icon1CColored_kQzoN",iconDocumentColored:"iconDocumentColored_ndh6h"},StatusControlIcon=function(){var _useContext=(0,react.useContext)(FileUploadItemContext),_useContext$title=_useContext.title,uploadStatus=_useContext.uploadStatus,iconStyle=_useContext.iconStyle,CustomIcon=_useContext.customIcon,imageUrl=_useContext.imageUrl,showRestore=_useContext.showRestore;if(imageUrl)return null;if(CustomIcon)return(0,jsx_runtime.jsx)(CustomIcon,{});if("INITIAL"===uploadStatus)return(0,jsx_runtime.jsx)(PaperclipMIcon.PaperclipMIcon,{});if(showRestore)return(0,jsx_runtime.jsx)(DocumentOffMIcon.default,{});var isColoredIcon="colored"===iconStyle;switch((void 0===_useContext$title?"":_useContext$title).toLowerCase().split(".").pop()){case"pdf":case"ppt":case"pptx":return(0,jsx_runtime.jsx)(DocumentPdfMIcon.DocumentPdfMIcon,{className:classnames_default()((0,defineProperty.Z)({},status_control_icon_module.iconPDFColored,isColoredIcon))});case"doc":case"docx":return(0,jsx_runtime.jsx)(DocumentDocMIcon.DocumentDocMIcon,{className:classnames_default()((0,defineProperty.Z)({},status_control_icon_module.iconDOCColored,isColoredIcon))});case"xls":case"xlsx":return(0,jsx_runtime.jsx)(DocumentExcelMIcon.DocumentExcelMIcon,{className:classnames_default()((0,defineProperty.Z)({},status_control_icon_module.iconExcelColored,isColoredIcon))});case"1c":return(0,jsx_runtime.jsx)(Document1CMIcon.Document1CMIcon,{className:classnames_default()((0,defineProperty.Z)({},status_control_icon_module.icon1CColored,isColoredIcon))});case"png":case"jpg":case"jpeg":case"svg":case"tif":case"tiff":return(0,jsx_runtime.jsx)(DocumentImageMIcon.DocumentImageMIcon,{});default:return(0,jsx_runtime.jsx)(DocumentMIcon.DocumentMIcon,{className:classnames_default()((0,defineProperty.Z)({},status_control_icon_module.iconDocumentColored,isColoredIcon))})}},StatusControlProgressBar=function(_ref){var className=_ref.className;return(0,jsx_runtime.jsxs)("svg",{width:"56",height:"56",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:className,children:[(0,jsx_runtime.jsxs)("mask",{id:"b",style:{maskType:"alpha"},maskUnits:"userSpaceOnUse",x:"0",y:"0",width:"56",height:"56",children:[(0,jsx_runtime.jsx)("mask",{id:"a",fill:"#fff",children:(0,jsx_runtime.jsx)("path",{d:"M15.855.814C19.13.345 23.178 0 28 0c4.822 0 8.87.345 12.145.814 7.916 1.133 13.908 7.125 15.041 15.041C55.655 19.13 56 23.178 56 28c0 4.822-.345 8.87-.814 12.145-1.133 7.916-7.125 13.908-15.041 15.041C36.87 55.655 32.822 56 28 56c-4.822 0-8.87-.345-12.145-.814C7.94 54.053 1.947 48.061.814 40.145.345 36.87 0 32.822 0 28c0-4.822.345-8.87.814-12.145C1.947 7.94 7.939 1.947 15.855.814Z"})}),(0,jsx_runtime.jsx)("path",{d:"m15.855.814.284 1.98-.284-1.98Zm24.29 0-.284 1.98.284-1.98Zm15.041 15.041-1.98.284 1.98-.284Zm0 24.29-1.98-.284 1.98.284ZM40.145 55.186l-.284-1.98.284 1.98Zm-24.29 0 .284-1.98-.284 1.98ZM.814 40.145l1.98-.284-1.98.284Zm0-24.29-1.98-.283 1.98.283ZM28-2c-4.918 0-9.061.352-12.428.834l.567 3.96C19.319 2.338 23.274 2 28 2v-4Zm12.428.834C37.061-1.648 32.918-2 28-2v4c4.726 0 8.68.338 11.861.794l.567-3.96Zm16.738 16.738C55.907 6.776 49.224.092 40.428-1.166l-.567 3.96C46.9 3.8 52.2 9.102 53.206 16.139l3.96-.567ZM58 28c0-4.918-.352-9.061-.834-12.428l-3.96.567C53.662 19.319 54 23.274 54 28h4Zm-.834 12.428C57.648 37.061 58 32.918 58 28h-4c0 4.726-.338 8.68-.794 11.861l3.96.567ZM40.428 57.166c8.796-1.259 15.48-7.942 16.738-16.738l-3.96-.567C52.2 46.9 46.898 52.2 39.861 53.206l.567 3.96ZM28 58c4.918 0 9.061-.352 12.428-.834l-.567-3.96C36.681 53.662 32.726 54 28 54v4Zm-12.428-.834c3.367.482 7.51.834 12.428.834v-4c-4.726 0-8.68-.338-11.861-.794l-.567 3.96ZM-1.166 40.428c1.259 8.796 7.942 15.48 16.738 16.738l.567-3.96C9.102 52.2 3.8 46.898 2.794 39.861l-3.96.567ZM-2 28c0 4.918.352 9.061.834 12.428l3.96-.567C2.338 36.681 2 32.726 2 28h-4Zm.834-12.428C-1.648 18.939-2 23.082-2 28h4c0-4.726.338-8.68.794-11.861l-3.96-.567ZM15.572-1.166C6.776.093.092 6.776-1.166 15.572l3.96.567C3.8 9.102 9.102 3.8 16.139 2.794l-.567-3.96Z",fill:"#000",mask:"url(#a)"})]}),(0,jsx_runtime.jsx)("g",{mask:"url(#b)",children:(0,jsx_runtime.jsx)("circle",{cx:"28",cy:"28",r:"32"})})]})};try{StatusControlProgressBar.displayName="StatusControlProgressBar",StatusControlProgressBar.__docgenInfo={description:"",displayName:"StatusControlProgressBar",props:{className:{defaultValue:null,description:"",name:"className",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/file-upload-item/src/components/status-control/components/status-control-progress-bar/status-control-progress-bar.tsx#StatusControlProgressBar"]={docgenInfo:StatusControlProgressBar.__docgenInfo,name:"StatusControlProgressBar",path:"packages/file-upload-item/src/components/status-control/components/status-control-progress-bar/status-control-progress-bar.tsx#StatusControlProgressBar"})}catch(__react_docgen_typescript_loader_error){}var index_module={component:"component_x47Zs",restore:"restore_MW4yX"},FileUploadItemComponent=function(_ref){var className=_ref.className,children=_ref.children,_ref$id=_ref.id,_ref$title=_ref.title,subtitle=_ref.subtitle,size=_ref.size,uploadDate=_ref.uploadDate,downloadLink=_ref.downloadLink,download=_ref.download,uploadStatus=_ref.uploadStatus,error=_ref.error,showDelete=_ref.showDelete,showRestore=_ref.showRestore,onDelete=_ref.onDelete,onDownload=_ref.onDownload,onRestore=_ref.onRestore,disableButtons=_ref.disableButtons,target=_ref.target,dataTestId=_ref.dataTestId,customIcon=_ref.customIcon,_ref$iconStyle=_ref.iconStyle,_ref$progressBar=_ref.progressBar,customContent=_ref.customContent,truncate=_ref.truncate,imageUrl=_ref.imageUrl;return(0,jsx_runtime.jsx)("div",{className:classnames_default()(className,index_module.component,uploadStatus&&index_module[uploadStatus.toLocaleLowerCase()]),"data-test-id":dataTestId,children:(0,jsx_runtime.jsx)(FileUploadItemContext.Provider,{value:{showRestore:showRestore,uploadStatus:uploadStatus,error:error,title:void 0===_ref$title?"":_ref$title,subtitle:subtitle,uploadDate:uploadDate,size:size,id:void 0===_ref$id?"0":_ref$id,onDownload:onDownload,onDelete:onDelete,onRestore:onRestore,downloadLink:downloadLink,download:download,disableButtons:disableButtons,target:target,showDelete:showDelete,customIcon:customIcon,iconStyle:void 0===_ref$iconStyle?"gray":_ref$iconStyle,progressBar:void 0===_ref$progressBar?0:_ref$progressBar,customContent:customContent,truncate:truncate,imageUrl:imageUrl},children:children})})},FileUploadItem=Object.assign(FileUploadItemComponent,{StatusControl:function(){var _useContext=(0,react.useContext)(FileUploadItemContext),_useContext$uploadSta=_useContext.uploadStatus,uploadStatus=void 0===_useContext$uploadSta?"INITIAL":_useContext$uploadSta,progressBar=_useContext.progressBar,imageUrl=_useContext.imageUrl,progressRef=(0,react.useRef)(null);return progressRef.current&&progressBar&&(progressRef.current.style.maskImage="conic-gradient(red ".concat(3.6*progressBar,"deg, transparent 0)")),(0,jsx_runtime.jsxs)("div",{className:"container_s2TIC",children:[(0,jsx_runtime.jsx)(super_ellipse.n,(0,objectSpread2.Z)((0,objectSpread2.Z)({size:48},imageUrl&&{imageUrl:imageUrl}),{},{children:(0,jsx_runtime.jsx)(StatusControlIcon,{})})),(0,jsx_runtime.jsx)("div",{ref:progressRef,className:classnames_default()("progress_Nn7S2",(0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)({},"uploading_LN6KD",isUploadingStatus(uploadStatus)),"success_xGgCh",isSuccessStatus(uploadStatus)),"error_cIBT6",isErrorStatus(uploadStatus))),children:(0,jsx_runtime.jsx)(StatusControlProgressBar,{className:classnames_default()((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)((0,defineProperty.Z)({},"progressBarTransparent_MxWlN","INITIAL"===uploadStatus||"UPLOADED"===uploadStatus||"DELETED"===uploadStatus),"progressBarUploading_EBM0q","UPLOADING"===uploadStatus),"progressBarSuccess_YwNdS","SUCCESS"===uploadStatus),"progressBarError_Lyomm","ERROR"===uploadStatus))})})]})},Content:function(){var _useContext=(0,react.useContext)(FileUploadItemContext),title=_useContext.title,CustomContent=_useContext.customContent,truncate=_useContext.truncate,subtitle=_useContext.subtitle,showRestore=_useContext.showRestore;return CustomContent?(0,jsx_runtime.jsx)(CustomContent,{}):(0,jsx_runtime.jsxs)("div",{className:classnames_default()(content_module.container,(0,defineProperty.Z)({},content_module.single,!subtitle)),children:[title&&(0,jsx_runtime.jsx)(typography_modern.Text,{className:classnames_default()(content_module.title,(0,defineProperty.Z)((0,defineProperty.Z)({},content_module.truncate,truncate),content_module.restore,showRestore)),view:"component",color:"primary",children:title}),(0,jsx_runtime.jsx)(ContentSubtitle,{})]})},Actions:function(){var _useContext=(0,react.useContext)(FileUploadItemContext),showRestore=_useContext.showRestore,downloadLink=_useContext.downloadLink,showDelete=_useContext.showDelete;return(0,jsx_runtime.jsxs)("div",{className:actions_control_module.container,children:[showRestore&&(0,jsx_runtime.jsx)(RestoreButton,{}),!!downloadLink&&!showRestore&&(0,jsx_runtime.jsx)(DownloadButton,{}),showDelete&&!showRestore&&(0,jsx_runtime.jsx)(DeleteButton,{})]})}});try{FileUploadItemComponent.displayName="FileUploadItemComponent",FileUploadItemComponent.__docgenInfo={description:"",displayName:"FileUploadItemComponent",props:{className:{defaultValue:null,description:"Дополнительный класс",name:"className",required:!1,type:{name:"string"}},id:{defaultValue:{value:"0"},description:"Идентификатор элемента",name:"id",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"Имя файла / заголовок",name:"title",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"Подзаголовок файла",name:"subtitle",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"Размер файла",name:"size",required:!1,type:{name:"string | number"}},uploadDate:{defaultValue:null,description:"Дата загрузки файла",name:"uploadDate",required:!1,type:{name:"string"}},downloadLink:{defaultValue:null,description:"Ссылка на файл. Если прокидывается этот параметр, то появляется кнопка скачивания",name:"downloadLink",required:!1,type:{name:"string"}},download:{defaultValue:null,description:"Рекомендует браузеру скачивать контент по ссылке.\nВ проп может быть передано рекомендуемое название скачиваемого файла.",name:"download",required:!1,type:{name:"string | true"}},showDelete:{defaultValue:null,description:"Отображение кнопки удаления",name:"showDelete",required:!1,type:{name:"boolean"}},showRestore:{defaultValue:null,description:"Отображение кнопки восстановления",name:"showRestore",required:!1,type:{name:"boolean"}},uploadStatus:{defaultValue:null,description:"Статус загрузки файла",name:"uploadStatus",required:!1,type:{name:"enum",value:[{value:'"INITIAL"'},{value:'"SUCCESS"'},{value:'"ERROR"'},{value:'"UPLOADING"'},{value:'"UPLOADED"'},{value:'"DELETED"'}]}},error:{defaultValue:null,description:"Сообщение об ошибке",name:"error",required:!1,type:{name:"string | string[]"}},children:{defaultValue:null,description:"Дочерние элементы",name:"children",required:!1,type:{name:"ReactNode"}},onDownload:{defaultValue:null,description:"Обработчик загрузки файла",name:"onDownload",required:!1,type:{name:"((id: string) => void)"}},onDelete:{defaultValue:null,description:"Обработчик удаления файла",name:"onDelete",required:!1,type:{name:"((id: string, event?: MouseEvent<HTMLElement, MouseEvent>) => void)"}},onRestore:{defaultValue:null,description:"Обработчик восстановления файла",name:"onRestore",required:!1,type:{name:"((id: string) => void)"}},disableButtons:{defaultValue:null,description:"Управление активностью кнопок",name:"disableButtons",required:!1,type:{name:"boolean"}},target:{defaultValue:null,description:"Указывает, где открыть скачиваемый документ",name:"target",required:!1,type:{name:"HTMLAttributeAnchorTarget"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования",name:"dataTestId",required:!1,type:{name:"string"}},iconStyle:{defaultValue:{value:"gray"},description:"Цвет заполнения иконки",name:"iconStyle",required:!1,type:{name:"enum",value:[{value:'"gray"'},{value:'"colored"'}]}},customIcon:{defaultValue:null,description:"Кастомная иконка",name:"customIcon",required:!1,type:{name:"ElementType<{ className?: string; }>"}},progressBar:{defaultValue:{value:"0"},description:"Шкала прогресса\nот 0 до 100",name:"progressBar",required:!1,type:{name:"number"}},customContent:{defaultValue:null,description:"Кастомный контент",name:"customContent",required:!1,type:{name:"ElementType<any>"}},truncate:{defaultValue:{value:"false"},description:"Отсечение контента",name:"truncate",required:!1,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"Фоновое изображение. Имеет приоритет над иконкой и заливкой",name:"imageUrl",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/file-upload-item/src/Component.tsx#FileUploadItemComponent"]={docgenInfo:FileUploadItemComponent.__docgenInfo,name:"FileUploadItemComponent",path:"packages/file-upload-item/src/Component.tsx#FileUploadItemComponent"})}catch(__react_docgen_typescript_loader_error){}try{FileUploadItem.displayName="FileUploadItem",FileUploadItem.__docgenInfo={description:"",displayName:"FileUploadItem",props:{className:{defaultValue:null,description:"Дополнительный класс",name:"className",required:!1,type:{name:"string"}},id:{defaultValue:{value:"0"},description:"Идентификатор элемента",name:"id",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"Имя файла / заголовок",name:"title",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"Подзаголовок файла",name:"subtitle",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"Размер файла",name:"size",required:!1,type:{name:"string | number"}},uploadDate:{defaultValue:null,description:"Дата загрузки файла",name:"uploadDate",required:!1,type:{name:"string"}},downloadLink:{defaultValue:null,description:"Ссылка на файл. Если прокидывается этот параметр, то появляется кнопка скачивания",name:"downloadLink",required:!1,type:{name:"string"}},download:{defaultValue:null,description:"Рекомендует браузеру скачивать контент по ссылке.\nВ проп может быть передано рекомендуемое название скачиваемого файла.",name:"download",required:!1,type:{name:"string | true"}},showDelete:{defaultValue:null,description:"Отображение кнопки удаления",name:"showDelete",required:!1,type:{name:"boolean"}},showRestore:{defaultValue:null,description:"Отображение кнопки восстановления",name:"showRestore",required:!1,type:{name:"boolean"}},uploadStatus:{defaultValue:null,description:"Статус загрузки файла",name:"uploadStatus",required:!1,type:{name:"enum",value:[{value:'"INITIAL"'},{value:'"SUCCESS"'},{value:'"ERROR"'},{value:'"UPLOADING"'},{value:'"UPLOADED"'},{value:'"DELETED"'}]}},error:{defaultValue:null,description:"Сообщение об ошибке",name:"error",required:!1,type:{name:"string | string[]"}},children:{defaultValue:null,description:"Дочерние элементы",name:"children",required:!1,type:{name:"ReactNode"}},onDownload:{defaultValue:null,description:"Обработчик загрузки файла",name:"onDownload",required:!1,type:{name:"((id: string) => void)"}},onDelete:{defaultValue:null,description:"Обработчик удаления файла",name:"onDelete",required:!1,type:{name:"((id: string, event?: MouseEvent<HTMLElement, MouseEvent>) => void)"}},onRestore:{defaultValue:null,description:"Обработчик восстановления файла",name:"onRestore",required:!1,type:{name:"((id: string) => void)"}},disableButtons:{defaultValue:null,description:"Управление активностью кнопок",name:"disableButtons",required:!1,type:{name:"boolean"}},target:{defaultValue:null,description:"Указывает, где открыть скачиваемый документ",name:"target",required:!1,type:{name:"HTMLAttributeAnchorTarget"}},dataTestId:{defaultValue:null,description:"Идентификатор для систем автоматизированного тестирования",name:"dataTestId",required:!1,type:{name:"string"}},iconStyle:{defaultValue:{value:"gray"},description:"Цвет заполнения иконки",name:"iconStyle",required:!1,type:{name:"enum",value:[{value:'"gray"'},{value:'"colored"'}]}},customIcon:{defaultValue:null,description:"Кастомная иконка",name:"customIcon",required:!1,type:{name:"ElementType<{ className?: string; }>"}},progressBar:{defaultValue:{value:"0"},description:"Шкала прогресса\nот 0 до 100",name:"progressBar",required:!1,type:{name:"number"}},customContent:{defaultValue:null,description:"Кастомный контент",name:"customContent",required:!1,type:{name:"ElementType<any>"}},truncate:{defaultValue:{value:"false"},description:"Отсечение контента",name:"truncate",required:!1,type:{name:"boolean"}},imageUrl:{defaultValue:null,description:"Фоновое изображение. Имеет приоритет над иконкой и заливкой",name:"imageUrl",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/file-upload-item/src/Component.tsx#FileUploadItem"]={docgenInfo:FileUploadItem.__docgenInfo,name:"FileUploadItem",path:"packages/file-upload-item/src/Component.tsx#FileUploadItem"})}catch(__react_docgen_typescript_loader_error){}}}]);
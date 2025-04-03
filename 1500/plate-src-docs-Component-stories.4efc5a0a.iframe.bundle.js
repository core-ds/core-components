"use strict";(self.webpackChunk_alfalab_core_components=self.webpackChunk_alfalab_core_components||[]).push([[8018],{"./packages/plate/src/docs/Component.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},plate:function(){return plate},plate_desktop:function(){return plate_desktop},plate_mobile:function(){return plate_mobile}});var _plate$parameters,_plate$parameters2,_plate$parameters2$do,_plate_mobile$paramet,_plate_mobile$paramet2,_plate_mobile$paramet3,_plate_desktop$parame,_plate_desktop$parame2,_plate_desktop$parame3,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");__webpack_require__("./node_modules/react/index.js");var _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-knobs/dist/index.js"),_alfalab_icons_glyph_DiamondsMIcon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@alfalab/icons-glyph/DiamondsMIcon.js"),_alfalab_core_components_plate__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./dist/plate/modern/index.js"),_alfalab_core_components_plate_mobile__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./dist/plate/modern/mobile/index.js"),_alfalab_core_components_plate_desktop__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./dist/plate/modern/desktop/index.js"),_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./dist/button/modern/index.js"),_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./dist/status-badge/modern/index.js"),_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./packages/screenshot-utils/screenshots-story/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Components/Plate",component:_alfalab_core_components_plate__WEBPACK_IMPORTED_MODULE_3__.Plate,id:"Plate"},plate={name:"Plate",render:function render(){var VIEWS_MAP={common:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"neutral-information"})},negative:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"negative-alert"})},positive:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"positive-checkmark"})},attention:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"attention-alert"})},custom:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_icons_glyph_DiamondsMIcon__WEBPACK_IMPORTED_MODULE_2__.DiamondsMIcon,{fill:"#CF70FF"})}},view=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("view",Object.keys(VIEWS_MAP),"positive"),previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__.Ph)("wrapperStyles"));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{style:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({background:"transparent"},previewStyles),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_plate__WEBPACK_IMPORTED_MODULE_3__.Plate,{className:"custom"===view?"custom":void 0,view:view,title:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("title","Поздравляем, полный успех"),background:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("background",void 0),borderColor:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("borderColor",void 0),foldable:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("foldable",!1),hasCloser:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("hasCloser",!1),rounded:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("rounded",!0),border:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("border","custom"!==view),shadow:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("shadow",!1),limitContentWidth:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("limitContentWidth",!0),titleView:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("titleView",["bold","light"],"bold"),leftAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("leftAddons",!0)?VIEWS_MAP[view].addon:null,buttons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("buttons",!1)?[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"primary",children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{children:"Кнопка"})]:null,subAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("subAddons",!1)?[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"transparent",size:"xxs",children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"secondary",size:"xxs",children:"Кнопка"})]:null,row:!0,rowLimit:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("rowLimit",[void 0,1,2,3],3),children:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("children","Вам одобрено. Согласитесь на предложение")})})}},plate_mobile={name:"PlateMobile",render:function render(){var VIEWS_MAP={common:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"neutral-information"})},negative:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"negative-alert"})},positive:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"positive-checkmark"})},attention:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"attention-alert"})},custom:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_icons_glyph_DiamondsMIcon__WEBPACK_IMPORTED_MODULE_2__.DiamondsMIcon,{fill:"#CF70FF"})}},view=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("view",Object.keys(VIEWS_MAP),"positive"),previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__.Ph)("wrapperStyles"));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{style:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({background:"transparent"},previewStyles),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_plate_mobile__WEBPACK_IMPORTED_MODULE_4__.PlateMobile,{className:"custom"===view?"custom":void 0,view:view,title:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("title","Поздравляем, полный успех"),background:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("background",void 0),borderColor:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("borderColor",void 0),foldable:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("foldable",!1),hasCloser:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("hasCloser",!1),rounded:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("rounded",!0),border:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("border","custom"!==view),shadow:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("shadow",!1),titleView:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("titleView",["bold","light"],"bold"),leftAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("leftAddons",!0)?VIEWS_MAP[view].addon:null,buttons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("buttons",!1)?[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"primary",children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{children:"Кнопка"})]:null,subAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("subAddons",!1)?[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"transparent",size:"xxs",children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"secondary",size:"xxs",children:"Кнопка"})]:null,row:!0,rowLimit:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("rowLimit",[void 0,1,2,3],3),children:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("children","Вам одобрено. Согласитесь на предложение")})})}},plate_desktop={name:"PlateDesktop",render:function render(){var VIEWS_MAP={common:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"neutral-information"})},negative:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"negative-alert"})},positive:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"positive-checkmark"})},attention:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_status_badge__WEBPACK_IMPORTED_MODULE_7__.StatusBadge,{view:"attention-alert"})},custom:{addon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_icons_glyph_DiamondsMIcon__WEBPACK_IMPORTED_MODULE_2__.DiamondsMIcon,{fill:"#CF70FF"})}},view=(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("view",Object.keys(VIEWS_MAP),"positive"),previewStyles=(0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__.FX)((0,_screenshot_utils_screenshots_story_utils__WEBPACK_IMPORTED_MODULE_8__.Ph)("wrapperStyles"));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div",{style:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({background:"transparent"},previewStyles),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_plate_desktop__WEBPACK_IMPORTED_MODULE_5__.PlateDesktop,{className:"custom"===view?"custom":void 0,view:view,title:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("title","Поздравляем, полный успех"),background:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("background",void 0),borderColor:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("borderColor",void 0),foldable:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("foldable",!1),hasCloser:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("hasCloser",!1),rounded:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("rounded",!0),border:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("border","custom"!==view),shadow:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("shadow",!1),limitContentWidth:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("limitContentWidth",!0),titleView:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("titleView",["bold","light"],"bold"),leftAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("leftAddons",!0)?VIEWS_MAP[view].addon:null,buttons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("buttons",!1)?[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"primary",children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{children:"Кнопка"})]:null,subAddons:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.boolean)("subAddons",!1)?[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"transparent",size:"xxs",children:"Кнопка"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_alfalab_core_components_button__WEBPACK_IMPORTED_MODULE_6__.Button,{view:"secondary",size:"xxs",children:"Кнопка"})]:null,row:!0,rowLimit:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.select)("rowLimit",[void 0,1,2,3],3),children:(0,_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_1__.text)("children","Вам одобрено. Согласитесь на предложение")})})}};__webpack_exports__.default=meta,plate.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},plate.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},null===(_plate$parameters=plate.parameters)||void 0===_plate$parameters?void 0:_plate$parameters.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({originalSource:"{\n  name: 'Plate',\n  render: () => {\n    const VIEWS_MAP = {\n      common: {\n        addon: <StatusBadge view='neutral-information' />\n      },\n      negative: {\n        addon: <StatusBadge view='negative-alert' />\n      },\n      positive: {\n        addon: <StatusBadge view='positive-checkmark' />\n      },\n      attention: {\n        addon: <StatusBadge view='attention-alert' />\n      },\n      custom: {\n        addon: <DiamondsMIcon fill='#CF70FF' />\n      }\n    };\n    const view = select('view', Object.keys(VIEWS_MAP), 'positive');\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    return <div style={{\n      background: 'transparent',\n      ...previewStyles\n    }}>\n                <Plate className={view === 'custom' ? 'custom' : undefined} view={view} title={text('title', 'Поздравляем, полный успех')} background={text('background', undefined)} borderColor={text('borderColor', undefined)} foldable={boolean('foldable', false)} hasCloser={boolean('hasCloser', false)} rounded={boolean('rounded', true)} border={boolean('border', view !== 'custom')} shadow={boolean('shadow', false)} limitContentWidth={boolean('limitContentWidth', true)} titleView={select('titleView', ['bold', 'light'], 'bold')} leftAddons={boolean('leftAddons', true) ? VIEWS_MAP[view].addon : null} buttons={boolean('buttons', false) ? [<Button view='primary'>Кнопка</Button>, <Button>Кнопка</Button>] : null} subAddons={boolean('subAddons', false) ? [<Button view='transparent' size='xxs'>\n                                      Кнопка\n                                  </Button>, <Button view='secondary' size='xxs'>\n                                      Кнопка\n                                  </Button>] : null} row rowLimit={select('rowLimit', [undefined, 1, 2, 3], 3)}>\n                    {text('children', 'Вам одобрено. Согласитесь на предложение')}\n                </Plate>\n            </div>;\n  }\n}"},null===(_plate$parameters2=plate.parameters)||void 0===_plate$parameters2?void 0:null===(_plate$parameters2$do=_plate$parameters2.docs)||void 0===_plate$parameters2$do?void 0:_plate$parameters2$do.source)})}),plate_mobile.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},plate_mobile.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},null===(_plate_mobile$paramet=plate_mobile.parameters)||void 0===_plate_mobile$paramet?void 0:_plate_mobile$paramet.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({originalSource:"{\n  name: 'PlateMobile',\n  render: () => {\n    const VIEWS_MAP = {\n      common: {\n        addon: <StatusBadge view='neutral-information' />\n      },\n      negative: {\n        addon: <StatusBadge view='negative-alert' />\n      },\n      positive: {\n        addon: <StatusBadge view='positive-checkmark' />\n      },\n      attention: {\n        addon: <StatusBadge view='attention-alert' />\n      },\n      custom: {\n        addon: <DiamondsMIcon fill='#CF70FF' />\n      }\n    };\n    const view = select('view', Object.keys(VIEWS_MAP), 'positive');\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    return <div style={{\n      background: 'transparent',\n      ...previewStyles\n    }}>\n                <PlateMobile className={view === 'custom' ? 'custom' : undefined} view={view} title={text('title', 'Поздравляем, полный успех')} background={text('background', undefined)} borderColor={text('borderColor', undefined)} foldable={boolean('foldable', false)} hasCloser={boolean('hasCloser', false)} rounded={boolean('rounded', true)} border={boolean('border', view !== 'custom')} shadow={boolean('shadow', false)} titleView={select('titleView', ['bold', 'light'], 'bold')} leftAddons={boolean('leftAddons', true) ? VIEWS_MAP[view].addon : null} buttons={boolean('buttons', false) ? [<Button view='primary'>Кнопка</Button>, <Button>Кнопка</Button>] : null} subAddons={boolean('subAddons', false) ? [<Button view='transparent' size='xxs'>\n                                      Кнопка\n                                  </Button>, <Button view='secondary' size='xxs'>\n                                      Кнопка\n                                  </Button>] : null} row rowLimit={select('rowLimit', [undefined, 1, 2, 3], 3)}>\n                    {text('children', 'Вам одобрено. Согласитесь на предложение')}\n                </PlateMobile>\n            </div>;\n  }\n}"},null===(_plate_mobile$paramet2=plate_mobile.parameters)||void 0===_plate_mobile$paramet2?void 0:null===(_plate_mobile$paramet3=_plate_mobile$paramet2.docs)||void 0===_plate_mobile$paramet3?void 0:_plate_mobile$paramet3.source)})}),plate_desktop.parameters=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},plate_desktop.parameters),{},{docs:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)((0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({},null===(_plate_desktop$parame=plate_desktop.parameters)||void 0===_plate_desktop$parame?void 0:_plate_desktop$parame.docs),{},{source:(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.Z)({originalSource:"{\n  name: 'PlateDesktop',\n  render: () => {\n    const VIEWS_MAP = {\n      common: {\n        addon: <StatusBadge view='neutral-information' />\n      },\n      negative: {\n        addon: <StatusBadge view='negative-alert' />\n      },\n      positive: {\n        addon: <StatusBadge view='positive-checkmark' />\n      },\n      attention: {\n        addon: <StatusBadge view='attention-alert' />\n      },\n      custom: {\n        addon: <DiamondsMIcon fill='#CF70FF' />\n      }\n    };\n    const view = select('view', Object.keys(VIEWS_MAP), 'positive');\n    const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));\n    return <div style={{\n      background: 'transparent',\n      ...previewStyles\n    }}>\n                <PlateDesktop className={view === 'custom' ? 'custom' : undefined} view={view} title={text('title', 'Поздравляем, полный успех')} background={text('background', undefined)} borderColor={text('borderColor', undefined)} foldable={boolean('foldable', false)} hasCloser={boolean('hasCloser', false)} rounded={boolean('rounded', true)} border={boolean('border', view !== 'custom')} shadow={boolean('shadow', false)} limitContentWidth={boolean('limitContentWidth', true)} titleView={select('titleView', ['bold', 'light'], 'bold')} leftAddons={boolean('leftAddons', true) ? VIEWS_MAP[view].addon : null} buttons={boolean('buttons', false) ? [<Button view='primary'>Кнопка</Button>, <Button>Кнопка</Button>] : null} subAddons={boolean('subAddons', false) ? [<Button view='transparent' size='xxs'>\n                                      Кнопка\n                                  </Button>, <Button view='secondary' size='xxs'>\n                                      Кнопка\n                                  </Button>] : null} row rowLimit={select('rowLimit', [undefined, 1, 2, 3], 3)}>\n                    {text('children', 'Вам одобрено. Согласитесь на предложение')}\n                </PlateDesktop>\n            </div>;\n  }\n}"},null===(_plate_desktop$parame2=plate_desktop.parameters)||void 0===_plate_desktop$parame2?void 0:null===(_plate_desktop$parame3=_plate_desktop$parame2.docs)||void 0===_plate_desktop$parame3?void 0:_plate_desktop$parame3.source)})});let __namedExportsOrder=["plate","plate_mobile","plate_desktop"]},"./packages/screenshot-utils/screenshots-story/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{DO:function(){return isJsonObj},FX:function(){return stylesStringToObj},Ph:function(){return getQueryParam},Qh:function(){return parseKnobs}});var _home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),queryParams=__webpack_require__("./node_modules/querystring/index.js").parse(document.location.search),getQueryParam=function(param){var parse=arguments.length>1&&void 0!==arguments[1]&&arguments[1],value=queryParams[param];return parse?parseValue(value):value},parseKnobs=function(){return Object.entries(queryParams).reduce(function(acc,_ref){var _ref2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,2),k=_ref2[0],v=_ref2[1];return k.startsWith("knob-")&&(acc[k.replace("knob-","")]=parseValue(v)),acc},{})};function parseValue(value){if(value){if(["true","false"].includes(value))return"true"===value;if(!Number.isNaN(+value)&&!Number.isNaN(parseFloat(value)))return parseFloat(value);try{return JSON.parse(value)}catch(e){return value}}}function stylesStringToObj(){var str=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!str)return{};var properties=str.split(";").map(function(v){return v.trim()}),obj={};return properties.forEach(function(property){var _property$split$map=property.split(":").map(function(v){return v.trim()}),_property$split$map2=(0,_home_runner_work_core_components_core_components_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_property$split$map,2),name=_property$split$map2[0],val=_property$split$map2[1];obj[name]=val}),obj}function isJsonObj(str){try{var ret=JSON.parse(str);return"object"==typeof ret}catch(e){return!1}}},"./node_modules/querystring/decode.js":function(module){function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?Array.isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj}},"./node_modules/querystring/encode.js":function(module){var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return(sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj)?Object.keys(obj).map(function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return Array.isArray(obj[k])?obj[k].map(function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""}},"./node_modules/querystring/index.js":function(__unused_webpack_module,exports,__webpack_require__){exports.decode=exports.parse=__webpack_require__("./node_modules/querystring/decode.js"),exports.encode=exports.stringify=__webpack_require__("./node_modules/querystring/encode.js")}}]);
import {
    getMobileFrames,
    getOrCreateStyleTag,
    rmCommentsFromCss,
    MODE_COLORS_TAG_ID,
} from '../utils';

import darkStyles from '!css-loader!!postcss-loader!./dark.css';
import codeEditorDarkTheme from '!css-loader!!postcss-loader!../../blocks/code-editor/github-dark-theme.css';

export function setModeVarsInIframeHtmlPage() {
    const matches = /&mode=([^&]*)/.exec(document.location.search);

    if (matches) {
        setModeVars(matches[1], document);
    }
}

export function setModeVarsInMobileFrame(mode) {
    getMobileFrames().forEach((iframe) => {
        setModeVars(mode, iframe.contentDocument);
    });
}

export function setModeVars(mode, doc) {
    const vars =
        mode === 'dark'
            ? rmCommentsFromCss(`${darkStyles.toString()}\n${codeEditorDarkTheme.toString()}`)
            : '';

    getOrCreateStyleTag(MODE_COLORS_TAG_ID, null, doc).innerHTML = vars;
}

export function modeChangeListen() {
    document.addEventListener('mode-change', (ev) => {
        const mode = ev.detail.mode;

        setModeVars(mode, document);
        setModeVarsInMobileFrame(mode);
    });
}

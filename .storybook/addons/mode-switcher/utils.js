import { getMobileFrames, getOrCreateStyleTag } from '../utils';

import darkStyles from '!!postcss-loader!./dark.css';
import codeEditorDarkTheme from '!!postcss-loader!../../blocks/code-editor/github-dark-theme.css';

export const MODES = ['light', 'dark'];
export const MODE_COLORS_TAG_ID = 'mode-colors';

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
    const vars = mode === 'dark' ? `${darkStyles}\n${codeEditorDarkTheme}` : '';

    getOrCreateStyleTag(MODE_COLORS_TAG_ID, null, doc).innerHTML = vars;
}

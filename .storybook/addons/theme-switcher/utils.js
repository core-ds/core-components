import { getMobileFrames, getOrCreateStyleTag } from '../utils';
import { MODE_COLORS_TAG_ID } from '../mode-switcher/utils';

import bluetintColors from '!!postcss-loader!../../../packages/vars/src/colors-bluetint.css';
import bluetintShadows from '!!postcss-loader!../../../packages/vars/src/shadows-bluetint.css';

import click from '!!postcss-loader!./themes/click.css';
import mobile from '!!postcss-loader!./themes/mobile.css';
import corp from '!!postcss-loader!./themes/corp.css';
import site from '!!postcss-loader!./themes/site.css';
import intranet from '!!postcss-loader!./themes/intranet.css';

export const themes = {
    default: '',
    click,
    mobile,
    corp,
    site,
    intranet,
};

export const THEME_TAG_ID = 'theme';

export function setThemeStylesInIframeHtmlPage() {
    const matches = /&theme=([^&]*)/.exec(document.location.search);

    if (matches) {
        setThemeStyles(matches[1], document);
    }
}

export function setThemeStylesInMobileFrame(theme) {
    getMobileFrames().forEach((iframe) => {
        setThemeStyles(theme, iframe.contentDocument);
    });
}

export function getThemeStyles(selectedTheme) {
    const bluetintThemes = ['mobile', 'intranet', 'click'];
    const bluetintVars = [bluetintColors, bluetintShadows].join('\n');

    return [
        themes[selectedTheme],
        bluetintThemes.some((theme) => theme.includes(selectedTheme)) ? bluetintVars : '',
    ].join('\n');
}

export function setThemeStyles(theme, doc) {
    getOrCreateStyleTag(THEME_TAG_ID, MODE_COLORS_TAG_ID, doc).innerHTML = getThemeStyles(theme);
}

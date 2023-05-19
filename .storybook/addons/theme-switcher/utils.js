import {
    getMobileFrames,
    getOrCreateStyleTag,
    MODE_COLORS_TAG_ID,
    rmCommentsFromCss,
} from '../utils';

import indigoColors from '!css-loader!!postcss-loader!../../../packages/vars/src/colors-indigo.css';
import indigoShadows from '!css-loader!!postcss-loader!../../../packages/vars/src/shadows-indigo.css';

import click from '!css-loader!!postcss-loader!./themes/click.css';
import mobile from '!css-loader!!postcss-loader!./themes/mobile.css';
import corp from '!css-loader!!postcss-loader!./themes/corp.css';
import site from '!css-loader!!postcss-loader!./themes/site.css';
import intranet from '!css-loader!!postcss-loader!./themes/intranet.css';

export const themes = {
    default: '',
    click: click.toString(),
    mobile: mobile.toString(),
    corp: corp.toString(),
    site: site.toString(),
    intranet: intranet.toString(),
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
    const indigoThemes = ['corp', 'site'];
    const indigoVars = [indigoColors, indigoShadows].join('\n');

    const css = [
        themes[selectedTheme],
        indigoThemes.some((theme) => theme === selectedTheme) ? indigoVars : '',
    ].join('\n');

    return rmCommentsFromCss(css);
}

export function setThemeStyles(theme, doc) {
    getOrCreateStyleTag(THEME_TAG_ID, MODE_COLORS_TAG_ID, doc).innerHTML = getThemeStyles(theme);
}

export function themeChangeListen() {
    document.addEventListener('theme-change', (ev) => {
        const theme = ev.detail.theme;

        setThemeStyles(theme, document);
        setThemeStylesInMobileFrame(theme);
    });
}

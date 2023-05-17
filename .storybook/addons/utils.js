import {
    setMetricConfig,
    setPreviewObserveConnection,
    setManagerObserveConnection,
} from '../metrics';

export const MODE_COLORS_TAG_ID = 'mode-colors';

export const getStoryDoc = () => document.querySelector('iframe').contentDocument;

export const getMobileFrames = () =>
    Array.from(document.querySelectorAll('iframe[src*=mobileframe]'));

export function getOrCreateStyleTag(id, beforeId, doc = getStoryDoc()) {
    const existingTag = doc.getElementById(id);
    if (existingTag) {
        return existingTag;
    }

    const styleTag = doc.createElement('style');
    styleTag.id = id;

    const before = beforeId ? doc.getElementById(beforeId) : null;

    if (before) {
        doc.head.insertBefore(styleTag, before);
    } else {
        doc.head.appendChild(styleTag);
    }

    return styleTag;
}

export function setGuidelinesStyles(styles) {
    getOrCreateStyleTag('guidelines', null, document).innerHTML = styles;
}

export const extractMixinContent = (css) => css.trim().split('\n').slice(1, -1).join('\n');

export const setManagerMetricsConnection = () => {
    setMetricConfig();
    setManagerObserveConnection();
};

export const setPreviewMetricsConnection = () => {
    setMetricConfig();
    setPreviewObserveConnection();
};

export function rmCommentsFromCss(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

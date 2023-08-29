import { setMetricConfig, setManagerObserveConnection } from '../metrics';

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

export function rmCommentsFromCss(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

export const getAsyncStoryDoc = async () => {
    const iframe = document.querySelector('iframe');

    if (!iframe) {
        throw new Error('iframe not found');
    }

    await new Promise((resolve) => {
        iframe.addEventListener('load', resolve);
    });

    return iframe.contentDocument;
};

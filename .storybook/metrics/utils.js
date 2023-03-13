import { LINK } from './constant';

const { DEFAULT, DIRECT } = LINK;

export const handleLinks = (url) => {
    if (url.includes('page')) {
        return `${DEFAULT}`;
    }
    return `${DIRECT}`;
};

export const getCurrentUrlParams = () => {
    return window.location.search;
};

export const getPageNode = (param) => {
    return document.querySelector(param);
};

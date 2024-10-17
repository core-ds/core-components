import { browser } from '../browser';

export const isChrome79 = () => browser.getChromeVersion() === 79;

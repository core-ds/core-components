import { isClient } from './isClient';

export const isPWA = (): boolean =>
    isClient() && !!window.matchMedia?.('(display-mode: standalone)')?.matches;

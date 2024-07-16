import type { ReactPatternLockProps } from '@alfalab/react-canvas-pattern-lock';

import type { ObservableTokens } from './typings';

export const OBSERVE_OPTIONS: MutationObserverInit = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true,
};

export const DEFAULT_EXTRA_BOUNDS: ReactPatternLockProps['extraBounds'] = [75, 50, 75, 50];

export const OBSERVABLE_TOKENS: ObservableTokens = {
    ACCENT_INITIAL: '--color-light-neutral-0-inverted',
    ACCENT_SUCCESS: '--color-light-status-positive',
    ACCENT_FAILURE: '--color-light-status-negative',
    PRIMARY: '--color-light-neutral-500',
    BG: '--color-light-transparent-default',
    RING_BG_INITIAL: '--color-light-neutral-translucent-200',
    SELECTED_RING_BG_INITIAL: '--color-light-neutral-translucent-200-hover',
    SELECTED_RING_BG_SUCCESS: '--color-light-status-muted-positive',
    SELECTED_RING_BG_FAILURE: '--color-light-status-muted-negative',
    HOVER_INNER: '--color-light-neutral-500-hover',
    HOVER_OUTER: '--color-light-neutral-translucent-200-hover',
};

export const THEME_STATE = {
    INITIAL: 'initial',
    SUCCESS: 'success',
    FAILURE: 'failure',
};

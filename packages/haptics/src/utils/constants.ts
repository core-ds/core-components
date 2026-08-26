export const TICK_ID = 'haptics-ios-tick';

export const VISUALLY_HIDDEN: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    top: '0',
    left: '0',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    zIndex: '-1',
};

/** Длительность одного цикла интенсивности, мс. */
export const CYCLE = 20;

/** Предел одной фазы вибрации. */
export const MAX_PHASE_MS = 1000;

/** Сила вибрации по умолчанию. */
export const DEFAULT_INTENSITY = 0.5;

export const DEFAULT_REPEAT = 1;

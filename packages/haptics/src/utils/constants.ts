export const TICK_ID = 'haptics-ios-tick';

export const VISUALLY_HIDDEN: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '1px',
    height: '1px',
    margin: '0',
    padding: '0',
    opacity: '0.01',
    overflow: 'hidden',
    zIndex: '-1',
};

/** Длительность одного цикла интенсивности, мс. */
export const CYCLE = 20;

/** Предел одной фазы вибрации, мс. */
export const MAX_PHASE_MS = 1000;

/** Сила вибрации по умолчанию. */
export const DEFAULT_INTENSITY = 0.5;

export const DEFAULT_REPEAT = 1;

/** Предел количества повторов кастомного пресета. */
export const MAX_REPEAT = 10;

/** Пауза между повторами кастомного пресета, мс. */
export const REPEAT_GAP_MS = 40;

/** Минимальный интервал между debug-щелчками при `intensity = 1`, мс. */
export const AUDIO_TOGGLE_MIN_MS = 16;

/** Прирост интервала между debug-щелчками при `intensity = 0`, мс. */
export const AUDIO_TOGGLE_MAX_MS = 184;

/** Длительность одного debug-щелчка, с. */
export const AUDIO_CLICK_DURATION_S = 0.004;

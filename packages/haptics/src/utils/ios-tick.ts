const TICK_ID = 'alfalab-haptics-ios-tick';

const VISUALLY_HIDDEN: Partial<CSSStyleDeclaration> = {
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

let tickLabel: HTMLLabelElement | null = null;
let tickInput: HTMLInputElement | null = null;

const applyHiddenStyles = (element: HTMLElement) => {
    Object.assign(element.style, VISUALLY_HIDDEN);
};

export type IosTickDom = {
    label: HTMLLabelElement;
    input: HTMLInputElement;
};

/**
 * Один на документ скрытый `input[switch]` — на нём WebKit проигрывает системный тик.
 */
export const ensureIosTickDom = (): IosTickDom | null => {
    if (typeof document === 'undefined') return null;

    if (tickLabel && tickInput && document.body.contains(tickLabel)) {
        return { label: tickLabel, input: tickInput };
    }

    const input = document.createElement('input');

    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.id = TICK_ID;
    input.tabIndex = -1;
    input.setAttribute('aria-hidden', 'true');
    applyHiddenStyles(input);

    const label = document.createElement('label');

    label.htmlFor = TICK_ID;
    label.setAttribute('aria-hidden', 'true');
    applyHiddenStyles(label);
    label.appendChild(input);

    document.body.appendChild(label);

    tickInput = input;
    tickLabel = label;

    return { label, input };
};

/**
 * Программный одиночный тик.
 */
export const triggerIosSystemTick = (): boolean => {
    const tick = ensureIosTickDom();

    if (!tick) return false;

    const checkedBefore = tick.input.checked;

    tick.label.click();

    return checkedBefore !== tick.input.checked;
};

/**
 * Нужен iOS switch-overlay вместо programmatic click — нет Vibration API.
 */
export const needsIosHapticSwitch = (): boolean =>
    typeof navigator !== 'undefined' &&
    typeof navigator.vibrate !== 'function' &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent);

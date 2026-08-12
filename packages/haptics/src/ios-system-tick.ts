let iosTickLabel: HTMLLabelElement | null = null;
let iosTickInput: HTMLInputElement | null = null;

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

const applyHiddenStyles = (el: HTMLElement) => {
    Object.assign(el.style, VISUALLY_HIDDEN);
};

const ensureIosTickDom = () => {
    if (typeof document === 'undefined') return null;

    if (iosTickLabel && iosTickInput && document.body.contains(iosTickLabel)) {
        return iosTickLabel;
    }

    const id = 'alfalab-haptics-ios-tick';

    const input = document.createElement('input');

    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.id = id;
    input.tabIndex = -1;
    input.setAttribute('aria-hidden', 'true');
    applyHiddenStyles(input);

    const label = document.createElement('label');

    label.htmlFor = id;
    label.setAttribute('aria-hidden', 'true');
    applyHiddenStyles(label);
    label.appendChild(input);

    document.body.appendChild(label);

    iosTickInput = input;
    iosTickLabel = label;

    return label;
};

export const triggerIosSystemTick = (): boolean => {
    const label = ensureIosTickDom();

    if (!label || !iosTickInput) return false;

    const beforeChecked = iosTickInput.checked;

    label.click();

    return beforeChecked !== iosTickInput.checked;
};

// todo: ios shared
/** Нужен iOS switch-layer вместо programmatic click (нет Vibration API). */
export const needsIosHapticSwitch = (): boolean =>
    typeof navigator !== 'undefined' &&
    typeof navigator.vibrate !== 'function' &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent);

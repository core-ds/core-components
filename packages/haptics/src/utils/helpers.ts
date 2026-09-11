import { TICK_ID, VISUALLY_HIDDEN } from './constants';

type IosTickDOM = {
    label: HTMLLabelElement;
    input: HTMLInputElement;
};

let cache: IosTickDOM | null = null;

const applyHidden = (element: HTMLElement): void => {
    element.setAttribute('aria-hidden', 'true');
    Object.assign(element.style, VISUALLY_HIDDEN);
};

/**
 * Возвращает общий скрытый `input[type=checkbox][switch]` с `label`, создавая их при необходимости.
 * На нём WebKit воспроизводит системный tick при клике по `label`.
 */
export const ensureDOM = (): IosTickDOM | null => {
    if (typeof document === 'undefined' || !document.body) return null;

    if (cache && document.body.contains(cache.label)) return cache;

    const input = document.createElement('input');

    input.type = 'checkbox';
    input.id = TICK_ID;
    input.tabIndex = -1;
    input.setAttribute('switch', '');
    applyHidden(input);

    const label = document.createElement('label');

    label.htmlFor = TICK_ID;
    applyHidden(label);
    label.appendChild(input);

    document.body.appendChild(label);

    cache = { label, input };

    return cache;
};

/**
 * Программный одиночный tick через клик по `label` общего switch.
 * Возвращает `null`, если DOM недоступен.
 */
export const triggerIosSwitchTick = (): { toggled: boolean } | null => {
    const tick = ensureDOM();

    if (!tick) return null;

    const checkedBefore = tick.input.checked;

    tick.label.click();

    return { toggled: checkedBefore !== tick.input.checked };
};

import { AriaAttributes } from 'react';

const isAriaDataKey = (key: string): key is keyof AriaAttributes =>
    key.startsWith('aria-') || key.startsWith('data-');

/**
 * Извлекает aria- и data- атрибуты из объекта пропсов
 * @param props - объект с пропсами
 * @returns объект содержащий только aria- и data- атрибуты
 */
export const pickAccessibilityProps = (
    props: Record<string, unknown> = {},
): Record<string, unknown> => {
    const out: Record<string, unknown> = {};

    Object.keys(props).forEach((key) => {
        if (isAriaDataKey(key)) {
            out[key] = props[key];
        }
    });

    return out;
};

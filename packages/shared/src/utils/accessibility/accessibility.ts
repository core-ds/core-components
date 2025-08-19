import { AriaAttributes } from 'react';

const isAriaDataKey = (key: string): key is keyof AriaAttributes =>
    key.startsWith('aria-') || key.startsWith('data-');

/**
 * Извлекает aria- и data- атрибуты из объекта пропсов
 * @param props - объект с пропсами
 * @returns объект содержащий только aria- и data- атрибуты
 */
export const pickAccessibilityProps = <T extends object>(
    props: T = {} as T,
): Record<string, unknown> => {
    const out: Record<string, unknown> = {};

    Object.keys(props as object).forEach((key) => {
        if (isAriaDataKey(key)) {
            out[key] = (props as Record<string, unknown>)[key];
        }
    });

    return out;
};

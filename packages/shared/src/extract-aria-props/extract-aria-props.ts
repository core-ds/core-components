import { type AriaAttributes } from 'react';

/**
 * Позволяет извлечь aria-* атрибуты (например достать все переданные aria-* атрибуты из ...restProps)
 */
export function extractAriaProps<T extends object>(props: T): Partial<AriaAttributes> {
    return Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith('aria-')));
}

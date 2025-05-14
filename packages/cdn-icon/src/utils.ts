export type TFallbackObject = Partial<{
    onError: () => void;
}>;

export function isFallbackObject(el: unknown): el is TFallbackObject {
    return typeof el === 'object' && el !== null && 'onError' in el;
}

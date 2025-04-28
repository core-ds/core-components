import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { isClient, isNullable, noop } from '@alfalab/core-components-shared';

type VisualViewportSize = Pick<
    VisualViewport,
    'height' | 'offsetLeft' | 'offsetTop' | 'pageLeft' | 'pageTop' | 'scale' | 'width'
>;

let visualViewportSize = isClient() ? getVisualViewportSize() : null;

let listeners: Array<() => void> = [];

function getVisualViewportSize(): VisualViewportSize | null {
    const { visualViewport } = window;

    if (isNullable(visualViewport)) {
        return null;
    }

    const { height, offsetLeft, offsetTop, pageLeft, pageTop, scale, width } = visualViewport;

    return { height, offsetLeft, offsetTop, pageLeft, pageTop, scale, width };
}

function callback() {
    visualViewportSize = getVisualViewportSize();

    listeners.forEach((listener) => {
        listener();
    });
}

function subscribe(listener: () => void) {
    const { visualViewport } = window;

    if (isNullable(visualViewport)) {
        return noop;
    }

    if (listeners.length === 0) {
        visualViewport.addEventListener('resize', callback);
        visualViewport.addEventListener('scroll', callback);
    }

    listeners = [...listeners, listener];

    return () => {
        listeners = listeners.filter((l) => l !== listener);

        if (listeners.length === 0) {
            visualViewport.removeEventListener('resize', callback);
            visualViewport.removeEventListener('scroll', callback);
        }
    };
}

function getSnapshot() {
    return visualViewportSize;
}

function getServerSnapshot() {
    return null;
}

export function useVisualViewportSize() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * @deprecated use {@link useVisualViewportSize}
 */
export function useVisibleViewportSize(enabled = false) {
    const size = useVisualViewportSize();

    return enabled ? size : null;
}

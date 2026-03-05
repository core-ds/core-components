import { useLayoutEffect, useState } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { isClient, isNullable, noop } from '@alfalab/core-components-shared';

type VisualViewportSize = Pick<
    VisualViewport,
    'height' | 'offsetLeft' | 'offsetTop' | 'pageLeft' | 'pageTop' | 'scale' | 'width'
>;

let visualViewportSize = isClient() ? clientGetVisualViewportSize() : serverGetVisualViewportSize();

let listeners: Array<() => void> = [];

function serverGetVisualViewportSize(): VisualViewportSize {
    return {
        height: 0,
        offsetLeft: 0,
        offsetTop: 0,
        pageLeft: 0,
        pageTop: 0,
        scale: 0,
        width: 0,
    };
}

function clientGetVisualViewportSize(): VisualViewportSize {
    const { visualViewport } = window;

    if (isNullable(visualViewport)) {
        return serverGetVisualViewportSize();
    }

    const { height, offsetLeft, offsetTop, pageLeft, pageTop, scale, width } = visualViewport;

    return { height, offsetLeft, offsetTop, pageLeft, pageTop, scale, width };
}

function callback() {
    visualViewportSize = clientGetVisualViewportSize();

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
    return null; // serverGetVisualViewportSize ?
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

type UseVisualViewport = {
    visualViewport?: VisualViewportSize;
};

export function useVisualViewport({
    visualViewport: defaultVisualViewport = visualViewportSize,
}: UseVisualViewport): [number, VisualViewportSize] {
    const [height, setHeight] = useState(() => (isClient() ? window.innerHeight : 0));
    const [viewport, setViewport] = useState<VisualViewportSize>(() => defaultVisualViewport);

    useLayoutEffect(() => {
        const listener = () => {
            setHeight(() => window.innerHeight);
            setViewport(clientGetVisualViewportSize());
        };

        listener();

        const { visualViewport } = window;

        visualViewport?.addEventListener('resize', listener);
        visualViewport?.addEventListener('scroll', listener);

        return () => {
            visualViewport?.removeEventListener('resize', listener);
            visualViewport?.removeEventListener('scroll', listener);
        };
    }, []);

    return [height, viewport];
}

type SafeAreaInsets = {
    /** Верхний отступ в px (вырез, Dynamic Island или статус-бар) */
    top: number;
    /** Нижний отступ в px (индикатор «домой» на устройствах с Face ID) */
    bottom: number;
    /** Левый отступ в px (скругления в альбомной ориентации) */
    left: number;
    /** Правый отступ в px (скругления в альбомной ориентации) */
    right: number;
};

const SAFE_AREA: Record<string, string> = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '0',
    height: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    paddingTop: 'env(safe-area-inset-top, 0px)',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingRight: 'env(safe-area-inset-right, 0px)',
};

function getInsets(el: HTMLElement): SafeAreaInsets {
    const style = window.getComputedStyle(el);

    const top = parseFloat(style.getPropertyValue('padding-top')) || 0;
    const bottom = parseFloat(style.getPropertyValue('padding-bottom')) || 0;
    const left = parseFloat(style.getPropertyValue('padding-left')) || 0;
    const right = parseFloat(style.getPropertyValue('padding-right')) || 0;

    return { top, bottom, left, right };
}

/**
 * Возвращает актуальные значения env(safe-area-inset-*) в px.
 * Измерение выполняется через скрытый элемент и обновляется по ResizeObserver.
 *
 * @param enabled Когда `false`, измерение не запускается и хук возвращает нулевые insets.
 * @see https://github.com/toss/react-simplikit/blob/main/packages/mobile/src/utils/getSafeAreaInset/getSafeAreaInset.md
 */
export function useSafeAreaInsets(enabled = true): [SafeAreaInsets] {
    const [insets, setInsets] = useState<SafeAreaInsets>({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    });

    useLayoutEffect(() => {
        if (!enabled || !isClient()) {
            return undefined;
        }

        const el = document.createElement('div');

        el.setAttribute('aria-hidden', 'true');
        Object.assign(el.style, SAFE_AREA);
        document.body.appendChild(el);

        const listener = () => setInsets(getInsets(el));

        listener();

        let observer: ResizeObserver | null = null;

        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(listener);

            // наблюдаем border-box, чтобы колбек срабатывал при изменении padding
            observer.observe(el, { box: 'border-box' });
        }

        window.visualViewport?.addEventListener('resize', listener);
        window.addEventListener('orientationchange', listener);

        return () => {
            observer?.disconnect();
            el.remove();

            window.visualViewport?.removeEventListener('resize', listener);
            window.removeEventListener('orientationchange', listener);
        };
    }, [enabled]);

    return [insets];
}

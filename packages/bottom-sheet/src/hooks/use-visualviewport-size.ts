import { useEffect, useState } from 'react';

import { fnUtils, isClient } from '@alfalab/core-components-shared';

type VisualViewportSize = Pick<VisualViewport, 'height' | 'offsetTop'>;

const measureVisualViewport = (
    visualViewport: VisualViewport | null,
): VisualViewportSize | null => {
    if (!visualViewport) return null;
    const { height, offsetTop } = visualViewport;

    return { height, offsetTop };
};

export function useVisibleViewportSize(enabled = false): VisualViewportSize | null {
    const [size, setSize] = useState<Pick<VisualViewport, 'height' | 'offsetTop'> | null>(() =>
        isClient() ? measureVisualViewport(window.visualViewport) : null,
    );

    useEffect(() => {
        const { visualViewport } = window;

        if (!isClient() || !enabled || !visualViewport) return fnUtils.noop;

        const listener = (event: Event) =>
            setSize(measureVisualViewport(event.target as VisualViewport));

        visualViewport.addEventListener('resize', listener);
        visualViewport.addEventListener('scroll', listener);

        return () => {
            visualViewport.removeEventListener('resize', listener);
            visualViewport.removeEventListener('scroll', listener);
        };
    }, [enabled]);

    return size;
}

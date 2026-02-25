import { type CSSProperties } from 'react';

import { hasOwnProperty, isClient } from '@alfalab/core-components-shared';

import { type UniversalModalDesktopProps } from '../types/props';

import { getMaxHeightStyle } from './get-max-height-style';

/**
 * Передает высоту компонента для нескольких кейсов
 * 1. Высота строится по контенту;
 * 2. Высота строится по размеру viewport;
 * 3. Высота строится по переданному параметру.
 */
export const getHeightStyle = (
    height: Exclude<UniversalModalDesktopProps['height'], undefined>,
    margin: UniversalModalDesktopProps['margin'],
): Pick<CSSProperties, 'height' | 'maxHeight'> => {
    if (height === 'hugContent') {
        return { maxHeight: getMaxHeightStyle(margin) };
    }

    let viewportHeight = 0;

    if (isClient()) {
        viewportHeight = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0,
        );
    }

    if (height > viewportHeight || height === 'fullHeight') {
        const marginTop = (margin && hasOwnProperty(margin, 'top') && margin.top) || 0;
        const marginBottom = (margin && hasOwnProperty(margin, 'bottom') && margin.bottom) || 0;

        return { height: `calc(100% - ${marginTop}px - ${marginBottom}px)` };
    }

    return { height };
};

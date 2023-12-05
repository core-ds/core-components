import React, { forwardRef, ReactNode } from 'react';

import { BaseShape, BaseShapeProps } from '../base-shape';

import { pathsMap } from './paths';

export type RectangleProps = Omit<
    BaseShapeProps,
    'pathsMap' | 'size' | 'topAddons' | 'bottomAddons' | 'indicator'
> & {
    /**
     * Размер компонента
     * @default 64
     */
    size?: 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 128;

    /**
     * Дочерний компонент
     */
    children?: ReactNode;
};

const heights: Record<Required<RectangleProps>['size'], number> = {
    20: 14,
    24: 16,
    32: 22,
    40: 28,
    48: 34,
    56: 40,
    64: 46,
    80: 58,
    128: 94,
};

export const Rectangle = forwardRef<HTMLDivElement, RectangleProps>(
    ({ size = 64, ...props }, ref) => (
        <BaseShape
            {...props}
            size={{ width: size, height: heights[size] }}
            pathsMap={pathsMap}
            ref={ref}
        />
    ),
);

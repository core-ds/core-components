import React, { forwardRef, ReactNode } from 'react';

import { BaseShape, BaseShapeProps } from '../base-shape';

import { pathsMap } from './paths';

export type CircleProps = Omit<BaseShapeProps, 'pathsMap' | 'size'> & {
    /**
     * Размер компонента
     * @default 64
     */
    size?: 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 128;

    /**
     * Дочерний компонент
     */
    children?: ReactNode;
};

export const Circle = forwardRef<HTMLDivElement, CircleProps>((props, ref) => (
    <BaseShape {...props} pathsMap={pathsMap} ref={ref} />
));

Circle.displayName = 'Circle';

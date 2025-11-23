import React, { forwardRef, type ReactNode } from 'react';

import { BaseShape, type BaseShapeProps, type TMainSize } from '../base-shape';

import { pathsMap } from './paths';

export type CircleProps = Omit<BaseShapeProps, 'pathsMap' | 'size'> & {
    /**
     * Размер компонента
     * @default 64
     */
    size?: TMainSize;

    /**
     * Дочерний компонент
     */
    children?: ReactNode;
};

export const Circle = forwardRef<HTMLDivElement, CircleProps>((props, ref) => (
    <BaseShape {...props} pathsMap={pathsMap} ref={ref} />
));

Circle.displayName = 'Circle';

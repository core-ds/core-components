import React, { forwardRef, ReactNode } from 'react';

import { BaseShape, BaseShapeProps, TMainSize } from '../base-shape';

import { pathsMap } from './paths';

export type NoShapeProps = Omit<
    BaseShapeProps,
    'pathsMap' | 'size' | 'topAddons' | 'bottomAddons' | 'indicator' | 'border'
> & {
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

export const NoShape = forwardRef<HTMLDivElement, NoShapeProps>((props, ref) => (
    <BaseShape {...props} pathsMap={pathsMap} ref={ref} />
));

NoShape.displayName = 'NoShape';

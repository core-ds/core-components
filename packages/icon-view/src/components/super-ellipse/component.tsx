import React, { forwardRef, ReactNode } from 'react';

import {BaseShape, BaseShapeProps, TMainSize} from '../base-shape';

import { pathsMap } from './paths';

export type SuperEllipseProps = Omit<BaseShapeProps, 'pathsMap' | 'size'> & {
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

export const SuperEllipse = forwardRef<HTMLDivElement, SuperEllipseProps>((props, ref) => (
    <BaseShape {...props} pathsMap={pathsMap} ref={ref} />
));

SuperEllipse.displayName = 'SuperEllipse';

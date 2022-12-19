import React, { ReactNode } from 'react';
import cn from 'classnames';

import { GapProps } from '@alfalab/core-components-gap';

import { Addon } from './components/addon';
import { DataContent } from './components/data-content';

import styles from './index.module.css';

type ReducedGapType = Omit<GapProps['size'], '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'>;

export type PaddingPropType = {
    top?: ReducedGapType;
    right?: ReducedGapType;
    bottom?: ReducedGapType;
    left?: ReducedGapType;
};

export type GenericWrapperProps = {
    children: ReactNode;
    direction?: 'horizontal' | 'vertical';
    padding?: PaddingPropType;
    full?: boolean;
    alignItems?: 'stretch' | 'end' | 'start' | 'center';
};

const GenericWrapperComponent = ({
    children,
    padding,
    direction = 'horizontal',
    alignItems,
}: GenericWrapperProps) => {
    const paddingStyles = padding && {
        [styles[`padding-top-${padding.top}`]]: padding.top,
        [styles[`padding-right-${padding.right}`]]: padding.right,
        [styles[`padding-bottom-${padding.bottom}`]]: padding.bottom,
        [styles[`padding-left-${padding.left}`]]: padding.left,
    };
    const alignmentStyles = alignItems && styles[`align-${alignItems}`];

    return <div className={cn(styles[direction], alignmentStyles, paddingStyles)}>{children}</div>;
};

export const GenericWrapper = Object.assign(GenericWrapperComponent, { Addon, DataContent });

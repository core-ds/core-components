import React, { ReactNode } from 'react';
import cn from 'classnames';

import { GapProps } from '@alfalab/core-components-gap';

import { Addon } from './components/addon';
import { DataContent } from './components/data-content';

import styles from './index.module.css';

export type PaddingPropType = {
    top?: GapProps['size'];
    right?: GapProps['size'];
    bottom?: GapProps['size'];
    left?: GapProps['size'];
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

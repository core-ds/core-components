import React, { forwardRef, useContext } from 'react';
import cn from 'classnames';

import { TabBarIslandContext } from '@alfalab/core-components-tab-bar-island/context';
import { DEFAULT_COLORS } from '@alfalab/core-components-tab-bar-island/default-props';

import defaultStyles from './default.module.css';
import styles from './index.module.css';
import invertedStyles from './inverted.module.css';

const colorsStyles = {
    default: defaultStyles,
    inverted: invertedStyles,
} as const;

export interface UnderlayProps {
    className?: string;
}

export const Underlay = forwardRef<HTMLDivElement, UnderlayProps>(({ className }, ref) => {
    const { colors = DEFAULT_COLORS } = useContext(TabBarIslandContext);
    const colorStyles = colorsStyles[colors];

    return (
        <div ref={ref} className={cn(styles.component, colorStyles.component, className)}>
            <div className={cn(styles.border, colorStyles.border)} data-position='start' />
            <div className={cn(styles.border, colorStyles.border)} data-position='end' />
        </div>
    );
});

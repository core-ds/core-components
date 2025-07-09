import React, { FC, RefObject, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';

import { ColorType } from '../../types';
import { getColorStyles } from '../../utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

export type HeaderProps = Omit<NavigationBarPrivateProps, 'view' | 'size'> & {
    headerRef: RefObject<HTMLDivElement>;
    headerOffset: number;
    colors?: ColorType;
    isSwipeMarkerAvailable?: boolean;
};

export const Header: FC<HeaderProps> = ({
    className,
    colors = 'default',
    sticky,
    headerRef,
    headerOffset,
    isSwipeMarkerAvailable,
    title,
    children,
    ...restProps
}) => {
    const { setHeaderOffset, setHasHeader, headerHighlighted, onClose } =
        useContext(BaseModalContext);

    useEffect(() => {
        setHeaderOffset(headerOffset);
    }, [headerOffset, setHeaderOffset]);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    const colorStyle = getColorStyles(colors, defaultColors, invertedColors);
    const hasContent = Boolean(title || children);

    return (
        <NavigationBarPrivate
            {...restProps}
            ref={headerRef}
            title={title}
            onClose={onClose}
            sticky={sticky}
            view='mobile'
            className={cn(className, {
                [styles.headerWrapper]: isSwipeMarkerAvailable,
                [styles.headerWrapperWithoutSwipeMarker]: !isSwipeMarkerAvailable,
                [colorStyle.highlighted]: hasContent && headerHighlighted && sticky,
                [colorStyle.hasContent]: hasContent,
                [styles.sticky]: sticky,
            })}
            contentClassName={cn(styles.title)}
            titleClassName={cn(colorStyle.title)}
            subtitleClassName={cn(styles.subtitle, colorStyle.subtitle)}
            colors={colors}
        >
            {children}
        </NavigationBarPrivate>
    );
};

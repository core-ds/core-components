import React, { type FC, type RefObject, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import {
    NavigationBarPrivate,
    type NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';

import { type ColorType } from '../../types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

export type HeaderProps = Omit<NavigationBarPrivateProps, 'view' | 'size'> & {
    headerRef: RefObject<HTMLDivElement>;
    headerOffset: number;
    colors?: ColorType;
    showSwipeMarker?: boolean;
};

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export const Header: FC<HeaderProps> = ({
    className,
    colors = 'default',
    sticky,
    headerRef,
    headerOffset,
    showSwipeMarker,
    title,
    children,
    contentClassName,
    bottomAddons,
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

    const colorStyle = colorStyles[colors];
    const hasContent = Boolean(title || children || bottomAddons);

    return (
        <NavigationBarPrivate
            {...restProps}
            ref={headerRef}
            title={title}
            bottomAddons={bottomAddons}
            onClose={onClose}
            sticky={sticky}
            view='mobile'
            className={cn(className, {
                [styles.headerWrapper]: showSwipeMarker,
                [styles.headerWrapperWithoutSwipeMarker]: !showSwipeMarker,
                [colorStyle.highlighted]: hasContent && headerHighlighted && sticky,
                [colorStyle.hasContent]: hasContent,
                [styles.sticky]: sticky,
            })}
            contentClassName={cn(styles.title, contentClassName)}
            titleClassName={cn(colorStyle.title)}
            subtitleClassName={cn(styles.subtitle, colorStyle.subtitle)}
            colors={colors}
        >
            {children}
        </NavigationBarPrivate>
    );
};

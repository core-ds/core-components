import React, { type FC, type RefObject, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import {
    NavigationBarPrivate,
    type NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';

import styles from './index.module.css';

export type HeaderProps = Omit<NavigationBarPrivateProps, 'view' | 'size'> & {
    headerRef: RefObject<HTMLDivElement>;
    headerOffset: number;
    showSwipeMarker?: boolean;
};

export const Header: FC<HeaderProps> = ({
    className,
    sticky,
    headerRef,
    headerOffset,
    showSwipeMarker,
    title,
    children,
    contentClassName,
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
                [styles.headerWrapper]: showSwipeMarker,
                [styles.headerWrapperWithoutSwipeMarker]: !showSwipeMarker,
                [styles.highlighted]: hasContent && headerHighlighted && sticky,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
            })}
            contentClassName={cn(styles.title, contentClassName)}
        >
            {children}
        </NavigationBarPrivate>
    );
};

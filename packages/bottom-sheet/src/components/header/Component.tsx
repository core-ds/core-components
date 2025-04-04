import React, { FC, RefObject, useContext, useEffect } from 'react';
import { BaseModalContext } from '@balafla/core-components-base-modal';
import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@balafla/core-components-navigation-bar-private';
import cn from 'classnames';

import styles from './index.module.css';

export type HeaderProps = Omit<NavigationBarPrivateProps, 'view' | 'size'> & {
    headerRef: RefObject<HTMLDivElement>;
    headerOffset: number;
};

export const Header: FC<HeaderProps> = ({
    className,
    sticky,
    headerRef,
    headerOffset,
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

    const hasContent = Boolean(title || children);

    return (
        <NavigationBarPrivate
            {...restProps}
            ref={headerRef}
            title={title}
            onClose={onClose}
            sticky={sticky}
            view='mobile'
            className={cn(styles.headerWrapper, className, {
                [styles.highlighted]: hasContent && headerHighlighted && sticky,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
            })}
            contentClassName={cn(styles.title)}
        >
            {children}
        </NavigationBarPrivate>
    );
};

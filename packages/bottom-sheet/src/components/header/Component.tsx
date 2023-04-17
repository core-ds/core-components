import React, { FC, RefObject, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import { NavigationBar, NavigationBarProps } from '@alfalab/core-components-navigation-bar';

import { HEADER_OFFSET } from '../../utils';

import styles from './index.module.css';

export type HeaderProps = Omit<NavigationBarProps, 'view' | 'size'> & {
    headerRef: RefObject<HTMLDivElement>;
};

export const Header: FC<HeaderProps> = ({
    className,
    sticky,
    headerRef,
    title,
    children,
    ...restProps
}) => {
    const { setHeaderOffset, setHasHeader, headerHighlighted, onClose } =
        useContext(BaseModalContext);

    useEffect(() => {
        setHeaderOffset(HEADER_OFFSET);
    }, [setHeaderOffset]);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    const hasContent = Boolean(title || children);

    return (
        <NavigationBar
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
        </NavigationBar>
    );
};

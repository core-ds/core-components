import React, { FC, useContext, useEffect } from 'react';
import cn from 'classnames';

import { NavigationBar, NavigationBarProps } from '@alfalab/core-components-navigation-bar';
import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export type HeaderProps = Omit<NavigationBarProps, 'size' | 'view' | 'parentRef'>;

export const Header: FC<HeaderProps> = ({
    className,
    sticky,
    title,
    children,
    contentClassName,
    hasCloser = true,
    ...restProps
}) => {
    const { setHasHeader, headerHighlighted, parentRef, onClose } = useContext(ModalContext);
    const { view, size, dataTestId } = useContext(ResponsiveContext);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    const hasContent = Boolean(title || children);

    return (
        <NavigationBar
            dataTestId={getDataTestId(dataTestId, 'header')}
            {...restProps}
            scrollableParentRef={parentRef}
            hasCloser={hasCloser}
            sticky={sticky}
            view={view}
            title={title}
            onClose={onClose}
            className={cn(className, {
                [styles.highlighted]: hasContent && sticky && headerHighlighted,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.header]: view === 'desktop',
                [desktopStyles.sticky]: view === 'desktop' && sticky,
                [desktopStyles[size]]: view === 'desktop',
                [mobileStyles.header]: view === 'mobile',
                [mobileStyles.sticky]: view === 'mobile' && sticky,
            })}
            contentClassName={cn(contentClassName, {
                [desktopStyles.content]: view === 'desktop',
                [mobileStyles.content]: view === 'mobile',
            })}
        >
            {children}
        </NavigationBar>
    );
};

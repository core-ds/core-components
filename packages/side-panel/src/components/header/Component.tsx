import React, { FC, useContext, useEffect } from 'react';
import cn from 'classnames';

import { NavigationBar, NavigationBarProps } from '@alfalab/core-components-navigation-bar';
import { getDataTestId } from '@alfalab/core-components-shared';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export type HeaderProps = Omit<NavigationBarProps, 'size' | 'view' | 'parentRef'>;

export const Header: FC<HeaderProps> = ({
    className,
    children,
    contentClassName,
    title,
    sticky,
    hasCloser = true,
    ...restProps
}) => {
    const { setHasHeader, headerHighlighted, onClose, componentRef } = useContext(ModalContext);
    const { size = 500, view = 'desktop', dataTestId } = useContext(ResponsiveContext) || {};

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    const hasContent = Boolean(title || children);

    return (
        <NavigationBar
            dataTestId={getDataTestId(dataTestId, 'header')}
            {...restProps}
            scrollableParentRef={componentRef}
            view={view}
            sticky={sticky}
            title={title}
            hasCloser={hasCloser}
            onClose={onClose}
            className={cn(styles.header, className, {
                [styles.highlighted]: hasContent && sticky && headerHighlighted,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.sticky]: view === 'desktop' && sticky,
                [desktopStyles[SIZE_TO_CLASSNAME_MAP[size]]]: view === 'desktop',
                [mobileStyles.sticky]: view === 'mobile' && sticky,
                [mobileStyles.header]: view === 'mobile',
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

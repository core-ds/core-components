import React, { FC, useCallback, useContext, useEffect } from 'react';
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
    sticky,
    title,
    children,
    contentClassName,
    hasCloser = true,
    onClose: onHeaderClose,
    ...restProps
}) => {
    const { setHasHeader, headerHighlighted, parentRef, onClose } = useContext(ModalContext);
    const { view, size, dataTestId } = useContext(ResponsiveContext);

    const handleClose = useCallback<NonNullable<NavigationBarProps['onClose']>>(
        (...params) => {
            if (onHeaderClose) {
                onHeaderClose(...params);
            }
            if (onClose) {
                onClose(...params);
            }
        },
        [onHeaderClose, onClose],
    );

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
            onClose={handleClose}
            className={cn(className, {
                [styles.highlighted]: hasContent && sticky && headerHighlighted,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.header]: view === 'desktop',
                [desktopStyles.sticky]: view === 'desktop' && sticky,
                [desktopStyles[SIZE_TO_CLASSNAME_MAP[size]]]: view === 'desktop',
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

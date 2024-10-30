import React, { FC, useContext, useEffect } from 'react';
import cn from 'classnames';

import { NavigationBar, NavigationBarProps } from '@alfalab/core-components-navigation-bar';
import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { HEADER_MEDIUM_BREAKPOINT } from '../../desktop/constants/headerPresetTypes';
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
    ...restProps
}) => {
    const { setHasHeader, headerHighlighted } = useContext(ModalContext);
    const {
        view = 'desktop',
        dataTestId,
        modalWidth,
        modalHeaderHighlighted,
        setModalHeaderHighlighted,
    } = useContext(ResponsiveContext) || {};

    const hasContent = Boolean(title || children || restProps.bottomAddons);
    // custom scroll ломает highlight логику в base-modal, поэтому для десктопа обрабатываем самостоятельно
    const isHighlighted = view === 'desktop' ? modalHeaderHighlighted : headerHighlighted;

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    useEffect(() => {
        if (view === 'mobile' && setModalHeaderHighlighted) {
            setModalHeaderHighlighted(Boolean(headerHighlighted));
        }
    }, [headerHighlighted, setModalHeaderHighlighted, view]);

    return (
        <NavigationBar
            dataTestId={getDataTestId(dataTestId, 'header')}
            dataName='modalHeaderDesktop'
            {...restProps}
            sticky={sticky}
            title={title}
            className={cn(styles.header, className, {
                [styles.highlighted]: hasContent && sticky && isHighlighted,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.sticky]: view === 'desktop' && sticky,
                [mobileStyles.sticky]: view === 'mobile' && sticky,
                [mobileStyles.header]: view === 'mobile',
            })}
            contentClassName={cn(contentClassName, {
                [desktopStyles.content]: view === 'desktop',
                [mobileStyles.content]: view === 'mobile',
            })}
            bottomAddonsClassName={cn({
                [desktopStyles.bottomAddons]: view === 'desktop',
                [desktopStyles.medium]:
                    view === 'desktop' && Number(modalWidth) >= HEADER_MEDIUM_BREAKPOINT,
                [mobileStyles.bottomAddons]: view === 'mobile',
            })}
        >
            {children}
        </NavigationBar>
    );
};

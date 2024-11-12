import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export type HeaderProps = Omit<NavigationBarPrivateProps, 'size' | 'view' | 'parentRef'> & {
    /**
     * Заголовок в шапке крупного размера
     * @default false
     */
    bigTitle?: boolean;
};

const BASE_TITLE_HEIGHT = 48;
const BASE_MEDIUM_TITLE_HEIGHT = 52;

export const Header: FC<HeaderProps> = ({
    className,
    children,
    contentClassName,
    title,
    sticky,
    bigTitle = false,
    titleClassName,
    ...restProps
}) => {
    const { setHasHeader, headerHighlighted, componentRef } = useContext(ModalContext);
    const {
        view = 'desktop',
        dataTestId,
        modalHeaderHighlighted,
        setModalHeaderHighlighted,
    } = useContext(ResponsiveContext) || {};

    const titleRef = useRef<HTMLDivElement>(null);
    const [titleHeight, setTitleHeight] = useState<number>(0);

    const hasContent = Boolean(title || children || restProps.bottomAddons);
    // custom scroll ломает highlight логику в base-modal, поэтому для десктопа обрабатываем самостоятельно
    const isHighlighted = view === 'desktop' ? modalHeaderHighlighted : headerHighlighted;

    let titleHeightRef = 0;

    if (titleRef.current) {
        titleHeightRef = titleRef.current.clientHeight;
    }

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    useEffect(() => {
        if (view === 'mobile' && setModalHeaderHighlighted) {
            setModalHeaderHighlighted(Boolean(headerHighlighted));
        }
    }, [headerHighlighted, setModalHeaderHighlighted, view]);

    useEffect(() => {
        if (titleRef.current) {
            setTitleHeight(titleRef.current.clientHeight);
        }
    }, [titleHeightRef]);

    const isLongTitle = () => {
        if (view === 'desktop') {
            return bigTitle
                ? titleHeight > BASE_MEDIUM_TITLE_HEIGHT
                : titleHeight > BASE_TITLE_HEIGHT;
        }

        return false;
    };

    return (
        <NavigationBarPrivate
            view={view}
            dataTestId={getDataTestId(dataTestId, 'header')}
            dataName='modalHeaderDesktop'
            {...restProps}
            sticky={sticky}
            title={title}
            className={cn(styles.header, className, {
                [styles.highlighted]: sticky && isHighlighted && hasContent,
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
                [desktopStyles.medium]: view === 'desktop' && bigTitle,
                [mobileStyles.bottomAddons]: view === 'mobile',
            })}
            scrollableParentRef={componentRef}
            titleClassName={cn({
                [desktopStyles.headerTitle]: view === 'desktop',
                [desktopStyles.medium]: bigTitle,
                [desktopStyles.longTitle]: isLongTitle(),
            })}
            titleRef={titleRef}
            addonClassName={cn({
                [mobileStyles.addon]: view === 'mobile',
            })}
        >
            {children}
        </NavigationBarPrivate>
    );
};

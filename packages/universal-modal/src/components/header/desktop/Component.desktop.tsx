import React, { FC, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';

import { ModalContext } from '../../../Context';
import { ResponsiveContext } from '../../../ResponsiveContext';

import styles from '../base-header/index.module.css';
import desktopStyles from './desktop.module.css';

export type HeaderDesktopProps = Omit<
    NavigationBarPrivateProps,
    'size' | 'view' | 'parentRef' | 'titleSize' | 'subtitle'
> & {
    /**
     * Заголовок в шапке крупного размера
     * @default false
     */
    bigTitle?: boolean;
};

export const HeaderDesktop: FC<HeaderDesktopProps> = ({
    className,
    children,
    contentClassName,
    title,
    sticky,
    bigTitle = false,
    titleClassName,
    dataTestId,
    ...restProps
}) => {
    const { setHasHeader, componentRef } = useContext(ModalContext);
    const { modalHeaderHighlighted } = useContext(ResponsiveContext) || {};

    const titleRef = useRef<HTMLDivElement>(null);

    const hasContent = Boolean(title || children || restProps.bottomAddons);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    return (
        <NavigationBarPrivate
            {...restProps}
            view='desktop'
            dataTestId={dataTestId}
            dataName='modalHeaderDesktop'
            sticky={sticky}
            title={title}
            className={cn(styles.header, className, {
                [styles.highlighted]: sticky && modalHeaderHighlighted && hasContent,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.sticky]: sticky,
            })}
            contentClassName={cn(desktopStyles.content, contentClassName)}
            bottomAddonsClassName={cn(desktopStyles.bottomAddons, {
                [desktopStyles.medium]: bigTitle,
            })}
            scrollableParentRef={componentRef}
            titleClassName={cn(desktopStyles.headerTitle, {
                [desktopStyles.medium]: bigTitle,
            })}
            titleRef={titleRef}
        >
            {children}
        </NavigationBarPrivate>
    );
};

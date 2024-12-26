import React, { FC, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';

import { ModalContext } from '../../../Context';

import styles from '../base-header/index.module.css';
import mobileStyles from './mobile.module.css';

export type HeaderMobileProps = Omit<NavigationBarPrivateProps, 'size' | 'view' | 'parentRef'>;

export const HeaderMobile: FC<HeaderMobileProps> = ({
    className,
    children,
    contentClassName,
    title,
    sticky,
    titleClassName,
    dataTestId,
    ...restProps
}) => {
    const { setHasHeader, headerHighlighted, componentRef } = useContext(ModalContext);

    const titleRef = useRef<HTMLDivElement>(null);

    const hasContent = Boolean(title || children || restProps.bottomAddons);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    return (
        <NavigationBarPrivate
            {...restProps}
            view='mobile'
            dataTestId={dataTestId}
            sticky={sticky}
            title={title}
            className={cn(styles.header, mobileStyles.header, className, {
                [styles.highlighted]: sticky && headerHighlighted && hasContent,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [mobileStyles.sticky]: sticky,
            })}
            contentClassName={cn(mobileStyles.content, contentClassName)}
            bottomAddonsClassName={mobileStyles.bottomAddons}
            scrollableParentRef={componentRef}
            titleRef={titleRef}
            addonClassName={mobileStyles.addon}
        >
            {children}
        </NavigationBarPrivate>
    );
};

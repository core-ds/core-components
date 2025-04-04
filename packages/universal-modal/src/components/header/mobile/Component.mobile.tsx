import React, { FC, useContext, useEffect, useRef } from 'react';
import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@balafla/core-components-navigation-bar-private';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

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
    dataTestId,
    bottomAddonsClassName,
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
            dataTestId={getDataTestId(dataTestId, 'header')}
            sticky={sticky}
            title={title}
            className={cn(styles.header, mobileStyles.header, className, {
                [styles.highlighted]: sticky && headerHighlighted && hasContent,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [mobileStyles.sticky]: sticky,
            })}
            contentClassName={cn(mobileStyles.content, contentClassName)}
            bottomAddonsClassName={cn(mobileStyles.bottomAddons, bottomAddonsClassName)}
            scrollableParentRef={componentRef}
            titleRef={titleRef}
            addonClassName={mobileStyles.addon}
        >
            {children}
        </NavigationBarPrivate>
    );
};

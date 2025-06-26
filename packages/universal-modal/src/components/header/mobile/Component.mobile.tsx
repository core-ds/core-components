import React, { FC, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';

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
    onClose,
    ...restProps
}) => {
    const {
        setHasHeader,
        headerHighlighted,
        componentRef,
        onClose: handleCloseByContext,
    } = useContext(ModalContext);

    const titleRef = useRef<HTMLDivElement>(null);

    const hasContent = Boolean(title || children || restProps.bottomAddons);

    const handleClose: NavigationBarPrivateProps['onClose'] = (...args) => {
        if (onClose) {
            return onClose(...args);
        }

        return handleCloseByContext(...args);
    };

    useEffect(() => {
        setHasHeader(true);

        return () => {
            setHasHeader(false);
        };
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
            onClose={handleClose}
        >
            {children}
        </NavigationBarPrivate>
    );
};

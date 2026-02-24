import React, { forwardRef } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    type NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';

import { useBaseHeader } from '../base-header/useBaseHeader';

import styles from '../base-header/index.module.css';
import desktopStyles from './desktop.module.css';

export interface HeaderDesktopProps
    extends Omit<
        NavigationBarPrivateProps,
        'size' | 'view' | 'parentRef' | 'titleSize' | 'subtitle'
    > {
    /**
     * Заголовок в шапке крупного размера
     * @default false
     */
    bigTitle?: boolean;
}

export const HeaderDesktop = forwardRef<HTMLDivElement, HeaderDesktopProps>((props, ref) => {
    const {
        className,
        children,
        title,
        sticky,
        bigTitle = false,
        titleClassName,
        dataTestId,
        bottomAddonsClassName,
        onClose,
        ...restProps
    } = props;

    const { bottomAddons } = restProps;

    const { headerHighlighted, hasContent, componentRef, titleRef, handleClose } = useBaseHeader({
        title,
        children,
        bottomAddons,
        onClose,
    });

    return (
        <NavigationBarPrivate
            {...restProps}
            ref={ref}
            view='desktop'
            dataTestId={getDataTestId(dataTestId, 'header')}
            dataName='modalHeaderDesktop'
            sticky={sticky}
            title={title}
            className={cn(styles.header, desktopStyles.header, className, {
                [styles.highlighted]: sticky && headerHighlighted && hasContent,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.medium]: bigTitle,
            })}
            bottomAddonsClassName={cn(desktopStyles.bottomAddons, bottomAddonsClassName)}
            scrollableParentRef={componentRef}
            titleClassName={cn(desktopStyles.headerTitle, titleClassName)}
            titleRef={titleRef}
            onClose={handleClose}
        >
            {children}
        </NavigationBarPrivate>
    );
});

HeaderDesktop.displayName = 'HeaderDesktop';

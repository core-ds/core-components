import React, { FC, useContext, useRef } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../../Context';
import { ResponsiveContext } from '../../../context/responsive-context';

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
    bottomAddonsClassName,
    onClose,
    ...restProps
}) => {
    const { componentRef, onClose: handleCloseByContext } = useContext(ModalContext);
    const { modalHeaderHighlighted } = useContext(ResponsiveContext);

    const titleRef = useRef<HTMLDivElement>(null);

    const hasContent = Boolean(title || children || restProps.bottomAddons);

    const handleClose: NavigationBarPrivateProps['onClose'] = (...args) => {
        if (onClose) {
            return onClose(...args);
        }

        return handleCloseByContext(...args);
    };

    return (
        <NavigationBarPrivate
            {...restProps}
            view='desktop'
            dataTestId={getDataTestId(dataTestId, 'header')}
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
            bottomAddonsClassName={cn(desktopStyles.bottomAddons, bottomAddonsClassName, {
                [desktopStyles.medium]: bigTitle,
            })}
            scrollableParentRef={componentRef}
            titleClassName={cn(desktopStyles.headerTitle, titleClassName, {
                [desktopStyles.medium]: bigTitle,
            })}
            titleRef={titleRef}
            onClose={handleClose}
        >
            {children}
        </NavigationBarPrivate>
    );
};

HeaderDesktop.displayName = 'HeaderDesktop';

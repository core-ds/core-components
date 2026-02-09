import React, { forwardRef, useContext, useRef } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    type NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../../Context';
import { UniversalModalContext } from '../../../context/universal-modal-context';

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

    const { componentRef, onClose: handleCloseByContext } = useContext(ModalContext);
    const { modalHeaderHighlighted } = useContext(UniversalModalContext);

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
            ref={ref}
            view='desktop'
            dataTestId={getDataTestId(dataTestId, 'header')}
            dataName='modalHeaderDesktop'
            sticky={sticky}
            title={title}
            className={cn(styles.header, desktopStyles.header, className, {
                [styles.highlighted]: sticky && modalHeaderHighlighted && hasContent,
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

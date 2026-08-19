import React, { type FC } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    type NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';
import { ChevronLeftLine24Icon } from '@alfalab/icons-glyph-26/ChevronLeftLine24Icon';
import { CrossLine24Icon } from '@alfalab/icons-glyph-26/CrossLine24Icon';

import { getUniversalModalTitleMargin } from '../../../components/base-header/get-title-margin';
import { useBaseHeader } from '../../../components/base-header/useBaseHeader';

import styles from '../../../components/base-header/index.module.css';
import mobileStyles from './index.module.css';

export type HeaderMobileProps = Omit<
    NavigationBarPrivateProps,
    'size' | 'view' | 'parentRef' | 'closerProps' | 'backButtonProps' | 'computeTitleMargin'
> & {
    closerProps?: Omit<
        NonNullable<NavigationBarPrivateProps['closerProps']>,
        'size' | 'buttonClassName'
    >;
    backButtonProps?: Omit<
        NonNullable<NavigationBarPrivateProps['backButtonProps']>,
        'icon' | 'size' | 'iconWrapperClassName'
    >;
};

export const HeaderMobile: FC<HeaderMobileProps> = (props) => {
    const {
        className,
        children,
        contentClassName,
        title,
        sticky,
        dataTestId,
        bottomAddonsClassName,
        onClose,
        ...restProps
    } = props;

    const { bottomAddons, closerIcon, closerProps, backButtonProps } = restProps;

    const { headerHighlighted, hasContent, componentRef, titleRef, handleClose } = useBaseHeader({
        title,
        children,
        bottomAddons,
        onClose,
    });

    return (
        <NavigationBarPrivate
            {...restProps}
            view='mobile'
            computeTitleMargin={getUniversalModalTitleMargin}
            dataTestId={getDataTestId(dataTestId, 'header')}
            sticky={sticky}
            title={title}
            className={cn(styles.header, mobileStyles.header, className, {
                [styles.highlighted]: sticky && headerHighlighted && hasContent,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
            })}
            contentClassName={cn(mobileStyles.content, contentClassName)}
            bottomAddonsClassName={cn(mobileStyles.bottomAddons, bottomAddonsClassName)}
            scrollableParentRef={componentRef}
            titleRef={titleRef}
            onClose={handleClose}
            closerIcon={closerIcon ?? CrossLine24Icon}
            closerProps={{
                ...closerProps,
                size: 40,
                className: cn(closerProps?.className, styles.closeButtonWrapperClassName),
                buttonClassName: styles.closeButtonClassName,
            }}
            backButtonProps={{
                ...backButtonProps,
                icon: ChevronLeftLine24Icon,
                size: 40,
                text: null,
                className: cn(backButtonProps?.className, styles.backButtonClassName),
                iconWrapperClassName: styles.backButtonIconClassName,
            }}
        >
            {children}
        </NavigationBarPrivate>
    );
};

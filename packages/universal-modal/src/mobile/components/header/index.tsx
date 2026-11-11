import React, { type FC } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivate,
    type NavigationBarPrivateProps,
} from '@alfalab/core-components-navigation-bar-private';
import { getDataTestId } from '@alfalab/core-components-shared';
import ChevronLeftMIcon from '@alfalab/icons-glyph/ChevronLeftMIcon';

import { useBaseHeader } from '../../../components/base-header/useBaseHeader';

import styles from '../../../components/base-header/index.module.css';
import mobileStyles from './index.module.css';

export type HeaderMobileProps = Omit<NavigationBarPrivateProps, 'size' | 'view' | 'parentRef'>;

export const HeaderMobile: FC<HeaderMobileProps> = (props) => {
    const {
        className,
        children,
        contentClassName,
        title,
        sticky,
        dataTestId,
        bottomAddonsClassName,
        backButtonProps,
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
            view='mobile'
            dataTestId={getDataTestId(dataTestId, 'header')}
            sticky={sticky}
            title={title}
            className={cn(styles.header, mobileStyles.header, className, {
                [styles.highlighted]: sticky && headerHighlighted && hasContent,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
            })}
            backButtonProps={{
                ...backButtonProps,
                text: null,
            }}
            backButtonIcon={ChevronLeftMIcon}
            addonsSize={40}
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

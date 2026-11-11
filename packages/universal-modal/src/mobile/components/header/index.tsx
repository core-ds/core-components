import React, { type FC } from 'react';
import cn from 'classnames';

import {
    NavigationBarPrivateNext,
    type NavigationBarPrivateNextProps,
} from '@alfalab/core-components-navigation-bar-private/next';
import { getDataTestId } from '@alfalab/core-components-shared';
import { CrossLine24Icon } from '@alfalab/icons-glyph-26/CrossLine24Icon';

import { type BaseHeaderNextProps } from '../../../components/base-header/types';
import { useBaseHeader } from '../../../components/base-header/useBaseHeader';

import styles from '../../../components/base-header/index.module.css';

export type HeaderMobileProps = Omit<
    NavigationBarPrivateNextProps,
    'size' | 'view' | 'parentRef' | 'closerProps' | 'backButtonProps' | 'sticky'
> &
    BaseHeaderNextProps;

// TODO новый компонет шапки
export const HeaderMobile: FC<HeaderMobileProps> = (props) => {
    const {
        className,
        children,
        contentClassName,
        title,
        dataTestId,
        bottomAddonsClassName,
        onClose,
        ...restProps
    } = props;

    const { bottomAddons, closerIcon } = restProps;

    const { hasContent, componentRef, titleRef, handleClose } = useBaseHeader({
        title,
        children,
        bottomAddons,
        onClose,
    });

    return (
        <NavigationBarPrivateNext
            {...restProps}
            view='mobile'
            dataTestId={getDataTestId(dataTestId, 'header')}
            title={title}
            className={cn(styles.header, styles.sticky, className, {
                [styles.hasContent]: hasContent,
            })}
            contentClassName={cn(contentClassName)}
            bottomAddonsClassName={cn(bottomAddonsClassName)}
            scrollableParentRef={componentRef}
            titleRef={titleRef}
            onClose={handleClose}
            closerIcon={closerIcon ?? CrossLine24Icon}
        >
            {children}
        </NavigationBarPrivateNext>
    );
};

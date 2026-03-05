import React, { forwardRef } from 'react';
import cn from 'classnames';

import { ButtonLayout } from '@alfalab/core-components-button/components/button-layout';
import {
    BUTTON_DEFAULT_SHAPE,
    BUTTON_DEFAULT_SIZE,
} from '@alfalab/core-components-button/constants/const';
import { useLoading } from '@alfalab/core-components-button/shared';

import { DEFAULT_BUTTON_COLOR, DEFAULT_CONTENT_COLOR } from '../../constants/default-colors';
import { type CommonCustomButtonProps } from '../../types/props';

import styles from './index.module.css';

export const BaseCustomButton = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonCustomButtonProps & { styles?: Record<string, string> }
>(
    (
        {
            children,
            className: classNameFromProps,
            loading: loadingFromProps,
            backgroundColor = DEFAULT_BUTTON_COLOR,
            contentColor = DEFAULT_CONTENT_COLOR,
            stateType = 'darkening',
            disableType = 'default',
            style,
            shape = BUTTON_DEFAULT_SHAPE,
            styles: stylesFromProps = {},
            ...restProps
        },
        ref,
    ) => {
        const loading = useLoading(loadingFromProps);
        const { disabled, size = BUTTON_DEFAULT_SIZE } = restProps;
        const className = cn(
            styles.component,
            styles.border,
            styles[contentColor],
            styles[stateType],
            styles[`disableType-${disableType}`],
            { [stylesFromProps[`size${size}`]]: shape === 'rectangular' },
            classNameFromProps,
        );

        return (
            <ButtonLayout
                {...restProps}
                ref={ref}
                layout='button'
                style={{ ...style, background: disabled ? undefined : backgroundColor }}
                className={className}
                loading={loading}
                styles={[styles, stylesFromProps]}
            >
                {children}
            </ButtonLayout>
        );
    },
);

BaseCustomButton.displayName = 'BaseCustomButton';

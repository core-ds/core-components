import React, { type ComponentProps, forwardRef } from 'react';
import cn from 'classnames';

import { BaseButton, defaultProps, useButtonLoading } from '@alfalab/core-components-button/shared';
import { useDisabled } from '@alfalab/core-components-config';

import { DEFAULT_BUTTON_COLOR, DEFAULT_CONTENT_COLOR } from '../../constants/default-colors';
import { type CommonCustomButtonProps } from '../../types/props';

import styles from './index.module.css';

export const BaseCustomButton = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonCustomButtonProps & { styles?: Record<string, string> }
>(
    (
        {
            backgroundColor = DEFAULT_BUTTON_COLOR,
            contentColor = DEFAULT_CONTENT_COLOR,
            stateType = 'darkening',
            disableType = 'default',
            children,
            className: classNameFromProps,
            style,
            styles: stylesFromProps = {},
            loading: loadingFromProps,
            disabled: disabledFromProps,
            ...restProps
        },
        ref,
    ) => {
        const { size = defaultProps.size, shape = defaultProps.shape } = restProps;
        const loading = useButtonLoading(loadingFromProps);
        const disabled = useDisabled(disabledFromProps) || loading;

        return (
            <BaseButton
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                {...(restProps as ComponentProps<typeof BaseButton>)}
                loading={loading}
                disabled={disabled}
                ref={ref}
                style={{
                    ...style,
                    background: disabled && !loading ? undefined : backgroundColor,
                }}
                styles={styles}
                className={cn(
                    styles[contentColor],
                    styles[stateType],
                    styles[`disableType-${disableType}`],
                    { [stylesFromProps[`size-${size}`]]: shape === 'rectangular' },
                    classNameFromProps,
                )}
            >
                {children}
            </BaseButton>
        );
    },
);

BaseCustomButton.displayName = 'BaseCustomButton';

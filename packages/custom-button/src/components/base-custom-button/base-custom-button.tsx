import React, { forwardRef } from 'react';
import cn from 'classnames';

import { type Button } from '@alfalab/core-components-button';
import { type ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { type ButtonMobile } from '@alfalab/core-components-button/mobile';

import { DEFAULT_BUTTON_COLOR, DEFAULT_CONTENT_COLOR } from '../../constants/default-colors';
import { type CustomButtonProps } from '../../types/props';

import styles from './index.module.css';

export const BaseCustomButton = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CustomButtonProps & {
        componentButton: typeof Button | typeof ButtonDesktop | typeof ButtonMobile;
    }
>(
    (
        {
            children,
            className,
            loading,
            backgroundColor = DEFAULT_BUTTON_COLOR,
            contentColor = DEFAULT_CONTENT_COLOR,
            stateType = 'darkening',
            disableType = 'default',
            componentButton: ComponentButton,
            ...restProps
        },
        ref,
    ) => (
        <ComponentButton
            style={{ ...(!restProps.disabled && { background: backgroundColor }) }}
            {...restProps}
            view='primary'
            ref={ref}
            className={cn(
                styles.customButton,
                styles.border,
                className,
                styles[contentColor],
                styles[stateType],
                styles[`disableType-${disableType}`],
                {
                    [styles.customLoading]: loading,
                },
            )}
            loading={loading}
        >
            {children}
        </ComponentButton>
    ),
);

BaseCustomButton.displayName = 'BaseCustomButton';

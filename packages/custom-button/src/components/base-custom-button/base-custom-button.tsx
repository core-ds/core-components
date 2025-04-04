import React, { forwardRef } from 'react';
import { Button } from '@balafla/core-components-button';
import { ButtonDesktop } from '@balafla/core-components-button/desktop';
import { ButtonMobile } from '@balafla/core-components-button/mobile';
import cn from 'classnames';

import { DEFAULT_BUTTON_COLOR, DEFAULT_CONTENT_COLOR } from '../../constants/default-colors';
import { CustomButtonProps } from '../../types/props';

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

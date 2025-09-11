import React, { forwardRef, useCallback, useState } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Input, type InputProps } from '@alfalab/core-components-input';
import { EyeMIcon } from '@alfalab/icons-glyph/EyeMIcon';
import { EyeOffMIcon } from '@alfalab/icons-glyph/EyeOffMIcon';

import styles from './index.module.css';

export type PasswordInputProps = Omit<InputProps, 'size'> & {
    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: Exclude<InputProps['size'], 40>;

    /**
     * Управление видимостью пароля (controlled)
     */
    passwordVisible?: boolean;

    /**
     * Управление текстом подсказки
     */
    passwordHint?: {
        visible: string;
        hidden: string;
    };

    /**
     * Коллбэк при изменении видимости пароля
     */
    onPasswordVisibleChange?: (visible: boolean) => void;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    (
        {
            onPasswordVisibleChange,
            passwordVisible,
            disabled,
            colors,
            rightAddons,
            size = 48,
            passwordHint = {
                visible: 'Скрыть',
                hidden: 'Показать',
            },
            className,
            ...restProps
        },
        ref,
    ) => {
        const { visible, hidden } = passwordHint;
        const uncontrolled = passwordVisible === undefined;
        const [statePasswordVisible, setStatePasswordVisible] = useState(
            uncontrolled ? false : passwordVisible,
        );

        const handleButtonClick = useCallback(() => {
            if (onPasswordVisibleChange) {
                onPasswordVisibleChange(!passwordVisible);
            }

            if (uncontrolled) {
                setStatePasswordVisible((prevVisible) => !prevVisible);
            }
        }, [passwordVisible, uncontrolled, onPasswordVisibleChange]);

        const isPasswordVisible = uncontrolled ? statePasswordVisible : passwordVisible;

        return (
            <Input
                {...restProps}
                disabled={disabled}
                type={isPasswordVisible ? 'text' : 'password'}
                size={size}
                ref={ref}
                colors={colors}
                className={cn(className)}
                rightAddons={
                    /* eslint-disable jsx-a11y/control-has-associated-label */
                    <React.Fragment>
                        {rightAddons}
                        <IconButton
                            className={styles.eye}
                            colors={colors}
                            view='secondary'
                            size={24}
                            icon={isPasswordVisible ? EyeMIcon : EyeOffMIcon}
                            onClick={handleButtonClick}
                            disabled={disabled}
                            title={isPasswordVisible ? visible : hidden}
                        />
                    </React.Fragment>
                    /* eslint-enable jsx-a11y/control-has-associated-label */
                }
                inputClassName={styles.input}
            />
        );
    },
);

PasswordInput.displayName = 'PasswordInput';

import React, { forwardRef, useCallback, useState } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Input, InputProps } from '@alfalab/core-components-input';
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
        unVisible: string;
    };

    /**
     * Коллбэк при изменении видимости пароля
     */
    onPasswordVisibleChange?: (visible: boolean) => void;
};

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
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
                visible: 'Скрыть введённые цифры',
                unVisible: 'Показать введённые цифры',
            },
            className,
            ...restProps
        },
        ref,
    ) => {
        const { visible, unVisible } = passwordHint;
        const uncontrolled = passwordVisible === undefined;
        const [statePasswordVisible, setStatePasswordVisible] = useState(
            uncontrolled ? false : passwordVisible,
        );

        const handleButtonClick = useCallback(() => {
            if (onPasswordVisibleChange) {
                onPasswordVisibleChange(!passwordVisible);
            }

            if (uncontrolled) {
                setStatePasswordVisible((visible) => !visible);
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
                className={cn(className, styles[SIZE_TO_CLASSNAME_MAP[size]])}
                rightAddons={
                    <React.Fragment>
                        {rightAddons}
                        <IconButton
                            className={styles.eye}
                            colors={colors}
                            view='secondary'
                            size='s'
                            icon={isPasswordVisible ? EyeMIcon : EyeOffMIcon}
                            onClick={handleButtonClick}
                            disabled={disabled}
                            title={isPasswordVisible ? visible : unVisible}
                        />
                    </React.Fragment>
                }
                addonsClassName={styles.addons}
                inputClassName={styles.input}
            />
        );
    },
);

PasswordInput.displayName = 'PasswordInput';

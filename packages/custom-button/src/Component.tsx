import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from '@alfalab/core-components-button';

import styles from './index.module.css';

const DEFAULT_BUTTON_COLOR = '#FF45C3';
const DEFAULT_CONTENT_COLOR = 'white';

export type ComponentProps = Omit<ButtonProps, 'view' | 'colors'> & {
    /**
     * Цвет кнопки
     */
    backgroundColor?: string;

    /**
     * Цвет контента
     */
    contentColor?: 'black' | 'white' | 'static-black' | 'static-white';

    /**
     * Затемнение или осветление кнопки при hover и active
     */
    stateType?: 'darkening' | 'lightening' | 'static-darkening' | 'static-lightening';

    /**
     * Блокировка кнопки
     */
    disabled?: boolean;

    /**
     * Тип цвета для заблокированного состояния
     * @default default
     */
    disableType?: 'default' | 'static' | 'inverted' | 'static-inverted';
};

type AnchorButtonProps = ComponentProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = ComponentProps & ButtonHTMLAttributes<HTMLButtonElement>;

export type CustomButtonProps = Partial<AnchorButtonProps | NativeButtonProps>;

export const CustomButton = React.forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CustomButtonProps
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
            ...restProps
        },
        ref,
    ) => {
        const buttonProps = {
            style: {
                ...(!restProps.disabled && { background: backgroundColor }),
            },
            ...restProps,
        };

        const buttonClassName = cn(
            styles.customButton,
            styles.border,
            className,
            styles[contentColor],
            styles[stateType],
            styles[`disableType-${disableType}`],
        );

        return (
            <Button
                {...buttonProps}
                view='primary'
                ref={ref}
                className={buttonClassName}
                loading={loading}
            >
                {children}
            </Button>
        );
    },
);

CustomButton.displayName = 'CustomButton';

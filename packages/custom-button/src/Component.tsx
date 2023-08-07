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
            ...restProps
        },
        ref,
    ) => {
        const buttonProps = {
            style: { background: backgroundColor },
            ...restProps,
        };

        const buttonClassName = cn(
            styles.customButton,
            styles.border,
            className,
            styles[contentColor],
            styles[stateType],
            {
                [styles.customLoading]: loading,
            },
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

/**
 * Для отображения в сторибуке
 */
CustomButton.defaultProps = {
    size: 'm',
    block: false,
    loading: false,
    nowrap: false,
};

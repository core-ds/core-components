import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

import { type ButtonProps } from '@alfalab/core-components-button';

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
     * Затемнение или осветление кнопки при hover и active.
     * Значение none отключает встроенные состояния, их нужно определить самостоятельно через className
     * @default darkening
     */
    stateType?: 'darkening' | 'lightening' | 'static-darkening' | 'static-lightening' | 'none';

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

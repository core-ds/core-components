import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import { ButtonProps } from '@alfalab/core-components-button';

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

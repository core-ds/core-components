import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

import { type ButtonLayoutOwnProps } from '@alfalab/core-components-button/typings';

export interface ComponentProps extends Omit<ButtonLayoutOwnProps, 'layout'> {
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
}

interface ResponsiveProps {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
}

export type CommonCustomButtonProps = ComponentProps &
    (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>);

export type CustomButtonProps = CommonCustomButtonProps & ResponsiveProps;

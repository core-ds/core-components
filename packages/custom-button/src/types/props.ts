import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ComponentProps as ReactComponentProps,
    type ElementType,
} from 'react';

import { type BaseButtonCustomProps } from '@alfalab/core-components-button/shared';
import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic';

export interface ComponentProps
    extends Omit<BaseButtonCustomProps, 'layout' | 'loadingClassName' | 'styles'> {
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
    PolymorphicComponentProps<
        | ElementType<ComposedPolymorphicProps<ReactComponentProps<'a'>>, 'a'>
        | ElementType<ComposedPolymorphicProps<ReactComponentProps<'button'>>, 'button'>
    > &
    (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>);

export type CustomButtonProps = CommonCustomButtonProps & ResponsiveProps;

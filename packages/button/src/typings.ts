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

export type StyleColors = {
    default: {
        [key: string]: string;
    };
    inverted: {
        [key: string]: string;
    };
};

export interface ComponentProps
    extends Omit<BaseButtonCustomProps, 'layout' | 'loadingClassName' | 'styles'> {
    /**
     * Тип кнопки
     * @default secondary
     */
    view?: 'accent' | 'primary' | 'secondary' | 'outlined' | 'transparent' | 'text';

    /**
     * Выводит ссылку в виде кнопки
     */
    href?: string;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Включает размытие фона для некоторых вариантов кнопки
     * @description Может привести к просадке fps и другим багам. Старайтесь не размещать слишком много заблюреных элементов на одной странице.
     */
    allowBackdropBlur?: boolean;

    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;
}

export type PrivateButtonProps = {
    /**
     * Основные стили компонента.
     */
    styles: { [key: string]: string };

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStylesMap: StyleColors;
};

export type CommonButtonProps = ComponentProps &
    PolymorphicComponentProps<
        | ElementType<ComposedPolymorphicProps<ReactComponentProps<'a'>>, 'a'>
        | ElementType<ComposedPolymorphicProps<ReactComponentProps<'button'>>, 'button'>
    > &
    Partial<AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>>;

export type ButtonProps = CommonButtonProps & {
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
};

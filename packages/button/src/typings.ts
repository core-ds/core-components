import { type ReactNode } from 'react';

import {
    type BaseButtonOwnProps,
    type ButtonPropsFactory,
} from './components/base-button-candidate';

interface StylesMap {
    [key: string]: string;
}

export interface StyleColors {
    default: StylesMap;
    inverted: StylesMap;
}

type OmitStrict<T, K extends keyof T> = Omit<T, K>;

export interface ComponentProps
    extends OmitStrict<BaseButtonOwnProps, 'disabledClassName' | 'Content'> {
    /**
     * Тип кнопки
     * @default secondary
     */
    view?: 'accent' | 'primary' | 'secondary' | 'outlined' | 'transparent' | 'text';

    /**
     * Форма кнопки
     * @default rectangular
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Ширина текстового контента
     * @default hug
     */
    textResizing?: 'fill' | 'hug';

    /**
     *  Подпись под лейблом. Видна только при размерах `>=56`
     */
    hint?: ReactNode;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Размер компонента
     * @default 56
     */
    size?: 32 | 40 | 48 | 56 | 64 | 72;

    /**
     * Дополнительный класс для спиннера
     * @deprecated Используйте `loaderClassName`
     */
    spinnerClassName?: string;

    /**
     * Не переносить текст кнопки на новую строку
     * @default false
     */
    nowrap?: boolean;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Включает размытие фона для некоторых вариантов кнопки
     * @description Может привести к просадке fps и другим багам. Старайтесь не размещать слишком много заблюреных элементов на одной странице.
     */
    allowBackdropBlur?: boolean;
}

export interface PrivateButtonProps {
    /**
     * Основные стили компонента.
     */
    styles: StylesMap;

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStylesMap: StyleColors;
}

export type ButtonRef = HTMLElement;

export type CommonButtonProps = ButtonPropsFactory<ComponentProps>;

export interface ResponsiveProps {
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

export type ButtonProps = CommonButtonProps & ResponsiveProps;

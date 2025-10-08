import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ComponentType,
    type ForwardRefExoticComponent,
    type ReactNode,
    type RefAttributes,
} from 'react';

interface StylesMap {
    [key: string]: string;
}

export interface StyleColors {
    default: StylesMap;
    inverted: StylesMap;
}

interface ComponentProps {
    /**
     * Тип кнопки
     * @default secondary
     */
    view?: 'accent' | 'primary' | 'secondary' | 'outlined' | 'transparent' | 'text' | 'tertiary';

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
     *  Подпись под лейблом (видна только в размерах >= m)
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
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для спиннера
     */
    spinnerClassName?: string;

    /**
     * Выводит ссылку в виде кнопки
     */
    href?: string;

    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?:
        | ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>
        | ComponentType<ButtonHTMLAttributes<HTMLButtonElement>>
        | ComponentType<ButtonComponentProps>
        | ForwardRefExoticComponent<
              AnchorHTMLAttributes<HTMLAnchorElement> & RefAttributes<HTMLAnchorElement>
          >
        | ForwardRefExoticComponent<
              ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>
          >
        | ForwardRefExoticComponent<ButtonComponentProps & RefAttributes<HTMLElement>>;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для спиннера используется модификатор -loader
     */
    dataTestId?: string;

    /**
     * Показать лоадер
     * @default false
     */
    loading?: boolean;

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

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
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

export interface ButtonComponentProps
    extends ButtonHTMLAttributes<HTMLElement>,
        Omit<AnchorHTMLAttributes<HTMLElement>, keyof ButtonHTMLAttributes<HTMLElement>> {}

export interface CommonButtonProps
    extends ComponentProps,
        Omit<ButtonHTMLAttributes<HTMLElement>, keyof ComponentProps>,
        Omit<
            AnchorHTMLAttributes<HTMLElement>,
            keyof ButtonHTMLAttributes<HTMLElement> | keyof ComponentProps
        > {}

export interface ButtonProps extends CommonButtonProps {
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

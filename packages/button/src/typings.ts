import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

export type StyleColors = {
    default: {
        [key: string]: string;
    };
    inverted: {
        [key: string]: string;
    };
};

interface HrefConfig {
    href: string;
    hrefType: 'href' | 'to';
};

export interface ComponentProps {
    /**
     * Имя пропа для передачи href в кастомный компонент
     * Позволяет явно указывать какой проп использовать для передачи href в кастомный компонент (href/to).
     */
    href?: string | HrefConfig;

    /**
     * Тип кнопки
     * @default secondary
     */
    view?:
    | 'accent'
    | 'primary'
    | 'secondary'
    | 'outlined'
    | 'transparent'
    | 'text'
    | 'tertiary'
    | 'filled' // deprecated
    | 'link' // deprecated
    | 'ghost'; // deprecated;

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
     * @description xxs, xs, s, m, l, xl deprecated, используйте вместо них 32, 40, 48, 56, 64, 72 соответственно
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 32 | 40 | 48 | 56 | 64 | 72;

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
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?: ElementType;

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
};

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

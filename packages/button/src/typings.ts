import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ElementType,
    type ReactNode,
} from 'react';

export type SpringOptions = {
    stiffness?: number;
    damping?: number;
    mass?: number;
};

export type StyleColors = {
    default: {
        [key: string]: string;
    };
    inverted: {
        [key: string]: string;
    };
};

type ComponentProps = {
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

    /**
     * Включить shake-анимацию по клику
     * @default false
     */
    shake?: boolean;

    /**
     * Spring-параметры для shake-анимации
     */
    shakeSpring?: SpringOptions;

    /**
     * Включить pulse-анимацию по клику (масштабирование)
     * @default false
     */
    pulse?: boolean;

    /**
     * Spring-параметры для pulse-анимации
     */
    pulseSpring?: SpringOptions;

    /**
     * Включить bounce-анимацию по клику (прыжок по Y)
     * @default false
     */
    bounce?: boolean;

    /**
     * Spring-параметры для bounce-анимации
     */
    bounceSpring?: SpringOptions;

    /**
     * Включить wobble-анимацию по клику (вращение)
     * @default false
     */
    wobble?: boolean;

    /**
     * Spring-параметры для wobble-анимации
     */
    wobbleSpring?: SpringOptions;

    /**
     * Включить jelly-анимацию по клику (деформация scaleX/scaleY)
     * @default false
     */
    jelly?: boolean;

    /**
     * Spring-параметры для jelly-анимации
     */
    jellySpring?: SpringOptions;

    /**
     * Включить swing-анимацию по клику (маятниковое вращение)
     * @default false
     */
    swing?: boolean;

    /**
     * Spring-параметры для swing-анимации
     */
    swingSpring?: SpringOptions;

    /**
     * Включить pop-анимацию по клику (резкий отклик масштабом)
     * @default false
     */
    pop?: boolean;

    /**
     * Spring-параметры для pop-анимации
     */
    popSpring?: SpringOptions;

    /**
     * Включить nod-анимацию по клику (кивок вниз)
     * @default false
     */
    nod?: boolean;

    /**
     * Spring-параметры для nod-анимации
     */
    nodSpring?: SpringOptions;

    /**
     * Включить rubber-анимацию по клику (растяжение по X)
     * @default false
     */
    rubber?: boolean;

    /**
     * Spring-параметры для rubber-анимации
     */
    rubberSpring?: SpringOptions;

    /**
     * Вызывается при старте spring-анимации. Получает функцию отмены текущей анимации.
     */
    onSpringAnimationStart?: (cancel: () => void) => void;

    /**
     * Вызывается при завершении или отмене spring-анимации.
     */
    onSpringAnimationEnd?: () => void;
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

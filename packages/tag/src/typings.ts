import {
    type ButtonHTMLAttributes,
    type ComponentType,
    type ReactNode,
    type RefObject,
} from 'react';

export type StyleColors = {
    default: {
        [key: string]: string;
    };
    inverted: {
        [key: string]: string;
    };
};

export type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface IndicatorProps {
    /**
     * Точка (`dot`) или счётчик (`count`).
     * Если не передан: при числовом `value` эффективно `count`, иначе `dot`.
     */
    mode?: 'dot' | 'count';

    /**
     * Число для бейджа: в UI показывается только при эффективном режиме `count` (в `dot` в `Indicator` не прокидывается).
     */
    value?: number;
}

export interface BaseTagProps extends Omit<NativeProps, 'onClick'> {
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;

    /**
     * Размер компонента
     */
    size?: 32 | 40 | 48 | 56 | 64 | 72;

    /**
     * Компонент для рендера разметки тега (по умолчанию — внутренний Tag).
     */
    Component?: ComponentType;

    /**
     * Дочерние элементы.
     * @description Отображение зависит от переданного `Component` (например, вариант с `IndicatorTag` может не показывать текст, если так заложено в компоненте).
     */
    children?: ReactNode;

    /**
     * Дополнительный класс для обёртки children
     */
    childrenClassName?: string;

    /**
     * Слот слева
     * @description При кастомном `Component` (например, `IndicatorTag`) прокидывается в его разметку.
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     * @description Несовместим с `showClear`. При `showClear=true` игнорируется
     */
    rightAddons?: ReactNode;

    /**
     * Показывать крестик для сброса выбора
     * @default false
     */
    showClear?: boolean;

    /**
     * Обработчик нажатия на крестик
     */
    onClear?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Обработчик нажатия
     */
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        payload: {
            checked: boolean;
            name?: string;
        },
    ) => void;

    /**
     * ref на children
     */
    childrenRef?: RefObject<HTMLSpanElement>;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Используйте props shape и view
     * Вариант тега
     */
    variant?: 'default' | 'alt';

    /**
     * Форма тега
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Стиль тега
     * @default outlined
     */
    view?: 'outlined' | 'filled' | 'transparent' | 'muted';

    /**
     * Включает размытие фона для некоторых вариантов тега
     * @description Может привести к просадке fps и другим багам. Старайтесь не размещать слишком много заблюреных элементов на одной странице.
     */
    allowBackdropBlur?: boolean;

    /**
     * Свойства индикатора (бейдж с числом или точкой).
     * @description Режим с индикатором задаётся пропом `Component` (например, `IndicatorTag`).
     */
    indicatorProps?: IndicatorProps;

    /**
     * Основные стили компонента.
     */
    styles?: { [key: string]: string };

    /**
     * Стили компонента для default и inverted режима.
     */
    colorStylesMap?: StyleColors;
}

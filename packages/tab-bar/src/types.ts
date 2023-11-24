import type {
    AllHTMLAttributes,
    ElementType,
    ForwardRefExoticComponent,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    RefAttributes,
} from 'react';

import type { BadgeProps } from '@alfalab/core-components-badge';

type TabElementType = ReactElement<
    TabProps,
    ForwardRefExoticComponent<TabProps & RefAttributes<HTMLElement>>
>;

export interface TabBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для таба используется модификатор -tab
     */
    dataTestId?: string;

    /**
     * Дополнительные классы для таба.
     */
    tabClassNames?: {
        /**
         *  Дополнительный класс таба
         */
        className?: string;

        /**
         * Дополнительный класс таба в выбранном состоянии
         */
        selectedClassName?: string;

        /**
         * Дополнительный класс подписи
         */
        labelClassName?: string;

        /**
         * Дополнительный класс враппера иконки
         */
        iconClassName?: string;
    };

    /**
     * Список табов
     */
    children: TabElementType[];

    /**
     * Идентификатор выбранного таба
     */
    selectedId?: string;

    /**
     * Включает верхний бордер
     */
    border?: boolean;

    /**
     * Обработчик изменения выбранного таба
     */
    onChange?: (id: string) => void;
}

type AdditionalTabProps = Record<string, unknown>;

export interface TabProps
    extends Omit<AllHTMLAttributes<unknown>, 'onChange' | 'label'>,
        AdditionalTabProps {
    /**
     * Кастомный компонент таба.
     * @default button
     */
    Component?: ElementType;

    /**
     * Идентификатор таба
     */
    id: string;

    /**
     *  Лейбл
     */
    label: ReactNode;

    /**
     * Иконка
     */
    icon: ReactNode;

    /**
     * Показать индикатор
     */
    showIndicator?: boolean;

    /**
     * Свойства индикатора
     */
    indicatorProps?: Omit<
        BadgeProps,
        'view' | 'visibleColorOutline' | 'size' | 'iconColor' | 'iconUnderlayColor'
    >;

    /**
     *  Дополнительный класс таба
     */
    className?: string;

    /**
     * Дополнительный класс таба в выбранном состоянии
     */
    selectedClassName?: string;

    /**
     * Дополнительный класс подписи
     */
    labelClassName?: string;

    /**
     * Дополнительный класс враппера иконки
     */
    iconClassName?: string;
}

export interface PrivateTabProps
    extends Pick<TabBarProps, 'tabClassNames' | 'onChange' | 'dataTestId'> {
    selected: boolean;
}

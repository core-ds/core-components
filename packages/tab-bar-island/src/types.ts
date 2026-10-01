import { type ComponentProps, type ComponentType, type ElementType, type ReactNode } from 'react';

export type TabBarIslandTabKey = string | number;

export interface TabBarIslandEntryBaseProps {
    /**
     * Иконка
     */
    icon?: ReactNode;
    /**
     * Лэйбл
     */
    label: string;
    /**
     * Заблокировать
     */
    disabled?: boolean;
    /**
     * Индикатор
     */
    indicator?: boolean | number;
}

export interface TabBarIslandEntryCustomProps {
    /**
     * Кастомный компонент контента
     */
    Content?: ComponentType<TabBarIslandEntryContentProps>;
    /**
     * Кастомный компонент иконки
     */
    Icon?: ElementType<ComponentProps<'div'>>;
    /**
     * Дополнительный класс иконки
     */
    iconClassName?: string;
    /**
     * Кастомный компонент лэйбла
     */
    Label?: ElementType<ComponentProps<'div'>>;
}

export interface TabBarIslandEntryProps
    extends ComponentProps<'div'>,
        Omit<TabBarIslandEntryBaseProps, 'label'>,
        TabBarIslandEntryCustomProps {
    label?: ReactNode;
}

export interface TabBarIslandItem extends TabBarIslandEntryBaseProps {
    /**
     * Ключ таба
     */
    key: TabBarIslandTabKey;
}

export interface TabBarIslandTabProps
    extends Pick<ComponentProps<'div'>, 'style' | 'onClick' | 'onKeyDown'>,
        Pick<TabBarIslandEntryCustomProps, 'iconClassName'> {
    active?: boolean;
    tab: TabBarIslandItem;
    content?: 'fill' | 'fit';
}

export interface TabBarIslandTabListProps {
    defaultActiveKey?: TabBarIslandTabKey;
    activeKey?: TabBarIslandTabKey;
    gap: number;
    items?: TabBarIslandItem[];
    Tab: ComponentType<TabBarIslandTabProps>;
    onActiveKeyChange?: (nextActiveKey: TabBarIslandTabKey) => void;
    content?: 'fill' | 'fit';
    iconAnimation?: boolean;
}

export interface TabBarIslandProps {
    /**
     * Отступ
     * @default -10
     */
    gap?: number;
    /**
     * Ключ активного таба
     */
    activeKey?: TabBarIslandTabKey;
    /**
     * Дефолтный ключ активного таба
     */
    defaultActiveKey?: TabBarIslandTabKey;
    /**
     * Табы
     */
    items?: TabBarIslandItem[];
    /**
     * Обработчик смены активного таба
     */
    onActiveKeyChange?: (nextActiveKey: TabBarIslandTabKey) => void;
    /**
     * Контент после табов
     */
    trailingAddon?: ReactNode;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Включена ли анимация иконки при смене активного таба
     * @default true
     */
    iconAnimation?: boolean;

    /**
     * Показать скелетон
     */
    showSkeleton?: boolean;
}

export interface TabBarIslandTrailingIconButtonProps
    extends Pick<ComponentProps<'div'>, 'className' | 'onClick' | 'onKeyDown'>,
        Partial<TabBarIslandEntryBaseProps>,
        TabBarIslandEntryCustomProps {}

export type TabBarIslandTrailingButtonProps = ComponentProps<'div'>;

export interface TabBarIslandEntryContentProps
    extends Pick<TabBarIslandEntryCustomProps, 'Icon' | 'iconClassName' | 'Label'> {
    icon?: ReactNode;
    label?: ReactNode;
    indicator?: boolean | number;
    children?: ReactNode;
}

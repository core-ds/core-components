import { type ComponentProps, type ComponentType, type ElementType, type ReactNode } from 'react';

export type TabBarIslandTabKey = string | number;

export interface TabBarIslandEntryBaseProps {
    icon?: ReactNode;
    label?: ReactNode;
    disabled?: boolean;
    indicator?: boolean | number;
}

export interface TabBarIslandEntryCustomProps {
    Content?: ComponentType<TabBarIslandEntryContentProps>;
    Icon?: ElementType<ComponentProps<'div'>>;
    Label?: ElementType<ComponentProps<'div'>>;
}

export interface TabBarIslandEntryProps
    extends ComponentProps<'div'>,
        TabBarIslandEntryBaseProps,
        TabBarIslandEntryCustomProps {}

export interface TabBarIslandItem extends TabBarIslandEntryBaseProps {
    key: TabBarIslandTabKey;
}

export interface TabBarIslandTabProps
    extends Pick<ComponentProps<'div'>, 'style' | 'onClick' | 'onKeyDown'> {
    active?: boolean;
    tab: TabBarIslandItem;
}

export interface TabBarIslandTabListProps {
    activeKey?: TabBarIslandTabKey;
    gap: number;
    items?: TabBarIslandItem[];
    Tab: ComponentType<TabBarIslandTabProps>;
    onActiveKeyChange?: (nextActiveKey: TabBarIslandTabKey) => void;
}

export interface TabBarIslandProps {
    gap?: number;
    activeKey?: TabBarIslandTabKey;
    defaultActiveKey?: TabBarIslandTabKey;
    items?: TabBarIslandItem[];
    onActiveKeyChange?: (nextActiveKey: TabBarIslandTabKey) => void;
    trailingAddon?: ReactNode;
}

export interface TabBarIslandTrailingIconButtonProps
    extends Pick<ComponentProps<'div'>, 'className' | 'onClick' | 'onKeyDown'>,
        TabBarIslandEntryBaseProps,
        TabBarIslandEntryCustomProps {}

export type TabBarIslandTrailingButtonProps = ComponentProps<'div'>;

export interface TabBarIslandEntryContentProps
    extends Pick<TabBarIslandEntryCustomProps, 'Icon' | 'Label'> {
    icon?: ReactNode;
    label?: ReactNode;
    indicator?: boolean | number;
    children?: ReactNode;
}

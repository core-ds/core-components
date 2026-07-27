import { type ComponentProps, type ComponentType, type ReactNode } from 'react';

export type TabKey = string | number;

export interface TabBarPrivateItem {
    key: TabKey;
    icon?: ReactNode;
    label?: ReactNode;
    disabled?: boolean;
    indicator?: boolean | number;
}

export interface TabBarPrivateTabProps
    extends Pick<ComponentProps<'div'>, 'style' | 'onClick' | 'onKeyDown'> {
    active?: boolean;
    tab: TabBarPrivateItem;
}

export interface TabBarPrivateTabListProps {
    activeKey?: TabKey;
    gap: number;
    items?: TabBarPrivateItem[];
    Tab: ComponentType<TabBarPrivateTabProps>;
    onActiveKeyChange?: (nextActiveKey: TabKey) => void;
}

export interface TabBarPrivateProps {
    gap?: number;
    activeKey?: TabKey;
    defaultActiveKey?: TabKey;
    items?: TabBarPrivateItem[];
    onActiveKeyChange?: (nextActiveKey: TabKey) => void;
}

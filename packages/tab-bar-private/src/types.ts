import { type ComponentProps, type ComponentType, type ElementType, type ReactNode } from 'react';

export type TabKey = string | number;

export interface TabBarPrivateEntryBaseProps {
    icon?: ReactNode;
    label?: ReactNode;
    disabled?: boolean;
    indicator?: boolean | number;
}

export interface TabBarPrivateEntryCustomProps {
    Content?: ComponentType<TabBarPrivateEntryContentProps>;
    Icon?: ElementType<ComponentProps<'div'>>;
    Label?: ElementType<ComponentProps<'div'>>;
}

export interface TabBarPrivateEntryProps
    extends ComponentProps<'div'>,
        TabBarPrivateEntryBaseProps,
        TabBarPrivateEntryCustomProps {}

export interface TabBarPrivateItem extends TabBarPrivateEntryBaseProps {
    key: TabKey;
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
    trailingAddon?: ReactNode;
}

export interface TabBarPrivateTrailingIconButtonProps
    extends Pick<ComponentProps<'div'>, 'className' | 'onClick' | 'onKeyDown'>,
        TabBarPrivateEntryBaseProps,
        TabBarPrivateEntryCustomProps {}

export type TabBarPrivateTrailingButtonProps = ComponentProps<'div'>;

export interface TabBarPrivateEntryContentProps
    extends Pick<TabBarPrivateEntryCustomProps, 'Icon' | 'Label'> {
    icon?: ReactNode;
    label?: ReactNode;
    indicator?: boolean | number;
    children?: ReactNode;
}

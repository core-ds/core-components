import React from 'react';

import { TabsProps } from '../../typings';
import { CollapsiblePrimaryTabListDesktop } from '../primary-tablist/Component.collapsible.desktop';

import { Tabs } from './Component';

export type TabsCollapsibleDesktopProps = Omit<
    TabsProps,
    'TabList' | 'fullWidthScroll' | 'scrollable' | 'view'
>;

export const TabsCollapsibleDesktop = ({ ...restProps }: TabsCollapsibleDesktopProps) => (
    <Tabs TabList={CollapsiblePrimaryTabListDesktop} {...restProps} />
);

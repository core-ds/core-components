import React from 'react';

import { TabsProps } from '../../typings';
import { CollapsiblePrimaryTabListResponsive } from '../primary-tablist/Component.collapsible.responsive';

import { Tabs } from './Component';

export type TabsCollapsibleResponsiveProps = Omit<TabsProps, 'TabList' | 'scrollable' | 'view'>;

export const TabsCollapsibleResponsive = ({ ...restProps }: TabsCollapsibleResponsiveProps) => (
    <Tabs TabList={CollapsiblePrimaryTabListResponsive} {...restProps} />
);

import React from 'react';

import { type TabsProps } from '../../typings';
import { CollapsiblePrimaryTabList } from '../primary-tablist/Component.collapsible';

import { Tabs } from './Component';

export type TabsCollapsibleProps = Omit<
    TabsProps,
    'TabList' | 'fullWidthScroll' | 'scrollable' | 'view'
>;

export const TabsCollapsible = ({ ...restProps }: TabsCollapsibleProps) => (
    <Tabs TabList={CollapsiblePrimaryTabList} {...restProps} />
);

import React from 'react';

import { TabsProps } from '../../typings';
import { CollapsiblePrimaryTabListMobile } from '../primary-tablist/Component.collapsible.mobile';

import { Tabs } from './Component';

export type TabsCollapsibleMobileProps = Omit<
    TabsProps,
    'TabList' | 'scrollable' | 'view' | 'size'
>;

export const TabsCollapsibleMobile = ({ ...restProps }: TabsCollapsibleMobileProps) => (
    <Tabs TabList={CollapsiblePrimaryTabListMobile} {...restProps} />
);

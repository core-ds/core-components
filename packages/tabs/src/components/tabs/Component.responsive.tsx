import React from 'react';

import { type TabsProps } from '../../typings';
import { PrimaryTabListResponsive } from '../primary-tablist/Component.responsive';
import { SecondaryTabListResponsive } from '../secondary-tablist/Component.responsive';

import { Tabs } from './Component';

const views = {
    primary: PrimaryTabListResponsive,
    secondary: SecondaryTabListResponsive,
};

export type TabsResponsiveProps = Omit<TabsProps, 'TabList' | 'collapsedTabsIds'>;

export const TabsResponsive = ({
    view = 'primary',
    scrollable = false,
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    ...restProps
}: TabsResponsiveProps) => (
    <Tabs
        TabList={views[view]}
        scrollable={scrollable}
        defaultMatchMediaValue={defaultMatchMediaValue}
        breakpoint={breakpoint}
        client={client}
        {...restProps}
    />
);

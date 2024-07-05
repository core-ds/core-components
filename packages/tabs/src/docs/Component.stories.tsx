import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import { Tabs, TabsProps, Tab } from '@alfalab/core-components-tabs';
import { TabsDesktop } from '@alfalab/core-components-tabs/desktop';
import { TabsMobile } from '@alfalab/core-components-tabs/mobile';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    id: 'Tabs',
};

type Story = StoryObj<typeof Tabs>;

const TEXT_STYLES = [
    'paragraph-primary-large',
    'paragraph-primary-medium',
    'paragraph-primary-small',
    'action-primary-large',
    'action-primary-medium',
    'action-primary-small',
    'accent-primary-large',
    'accent-primary-medium',
    'accent-primary-small',
    'headline-system-xlarge',
    'headline-system-large',
    'headline-system-medium',
    'headline-system-small',
    'headline-system-xsmall',
    'headline-xlarge',
    'headline-large',
    'headline-medium',
    'headline-small',
    'headline-xsmall',
    undefined,
] as const;

const renderTabs = (TabsComponent: typeof Tabs) => {
    const [selectedId, setSelectedId] = React.useState<string | number>('tab-1');
    const handleChange: TabsProps['onChange'] = (event, { selectedId }) =>
        setSelectedId(selectedId);

    const props =
        TabsComponent !== TabsMobile
            ? {
                  size: select('size', ['xxs', 'xs', 's', 'm', 'l', 'xl'], 'm'),
              }
            : {};

    const responsiveAndMobileProps =
        TabsComponent !== TabsDesktop
            ? {
                  fullWidthScroll: boolean('fullWidthScroll', false),
              }
            : {};

    const view = select('view', ['primary', 'secondary'], 'primary');

    return (
        <TabsComponent
            {...props}
            {...responsiveAndMobileProps}
            {...(view === 'primary'
                ? { textStyle: select('textStyle', TEXT_STYLES, undefined) }
                : null)}
            view={view}
            selectedId={selectedId}
            keepMounted={boolean('keepMounted', false)}
            showSkeleton={boolean('showSkeleton', false)}
            onChange={handleChange}
            scrollable={boolean('scrollable', false)}
            skeletonProps={{
                animate: false,
            }}
        >
            <Tab title='Aurum' id='tab-1'>
                Aurum
            </Tab>
            <Tab title='Bercelium' id='tab-2' disabled>
                Bercelium
            </Tab>
            <Tab title='Таб 3 (hidden)' id='tab-3' hidden>
                Таб 3
            </Tab>
            <Tab title='Curium' id='tab-4'>
                Curium
            </Tab>
            <Tab title='Neptunium' id='tab-5'>
                Neptunium
            </Tab>
            <Tab title='Plutonuim' id='tab-6'>
                Plutonuim
            </Tab>
            <Tab title='Rubidium' id='tab-7'>
                Rubidium
            </Tab>
            <Tab title='Californium' id='tab-8'>
                Californium
            </Tab>
        </TabsComponent>
    );
};

export const tabs: Story = {
    name: 'Tabs',
    render: () => renderTabs(Tabs),
};

export const tabs_desktop: Story = {
    name: 'TabsDesktop',
    render: () => renderTabs(TabsDesktop),
};

export const tabs_mobile: Story = {
    name: 'TabsMobile',
    render: () => renderTabs(TabsMobile),
};

export default meta;

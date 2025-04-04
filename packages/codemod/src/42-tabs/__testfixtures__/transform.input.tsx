/* eslint-disable */
import React from 'react';

import { TabsResponsive, TabsResponsiveProps, Tab, ScrollableContainer, TabListProps } from '@balafla/core-components/tabs/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <TabsResponsive selectedId='tab-1' onChange={(() => {}) as TabsResponsiveProps['onChange']}>
                <Tab title='Aurum' id='tab-1' />
                <Tab title='Aurum' id='tab-2' />
            </TabsResponsive>
        </React.Fragment>
    );
};

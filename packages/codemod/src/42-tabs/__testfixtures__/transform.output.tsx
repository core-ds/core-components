/* eslint-disable */
import React from 'react';

import { Tabs, TabsProps, Tab } from '@balafla/core-components/tabs';

import { ScrollableContainer, TabListProps } from '@balafla/core-components/tabs/shared';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Tabs selectedId='tab-1' onChange={(() => {}) as TabsProps['onChange']}>
                <Tab title='Aurum' id='tab-1' />
                <Tab title='Aurum' id='tab-2' />
            </Tabs>
        </React.Fragment>
    );
};

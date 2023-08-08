/* eslint-disable */
import React from 'react';

import { Tabs, TabsProps, Tab } from '@alfalab/core-components/tabs';

import { ScrollableContainer, TabListProps } from '@alfalab/core-components/tabs/shared';

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

/* eslint-disable */
import React from 'react';

import { SidePanel, SidePanelProps } from '@balafla/core-components/side-panel';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <SidePanel open={false as SidePanelProps['open']}>
                <SidePanel.Content></SidePanel.Content>
            </SidePanel>
        </React.Fragment>
    );
};

/* eslint-disable */
import React from 'react';

import { SidePanelResponsive, SidePanelResponsiveProps } from '@balafla/core-components/side-panel/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <SidePanelResponsive open={false as SidePanelResponsiveProps['open']}>
                <SidePanelResponsive.Content></SidePanelResponsive.Content>
            </SidePanelResponsive>
        </React.Fragment>
    );
};

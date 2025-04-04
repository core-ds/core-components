/* eslint-disable */
import React from 'react';

import { CheckboxGroupDesktop, CheckboxGroupDesktopProps } from '@balafla/core-components/checkbox-group/desktop';
import { Checkbox } from '@balafla/core-components/checkbox';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <CheckboxGroupDesktop>
                <Checkbox />
                <Checkbox />
            </CheckboxGroupDesktop>
        </React.Fragment>
    );
};

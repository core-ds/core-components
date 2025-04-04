/* eslint-disable */
import React from 'react';

import { CheckboxGroup, CheckboxGroupProps } from '@balafla/core-components/checkbox-group';
import { Checkbox } from '@balafla/core-components/checkbox';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <CheckboxGroup>
                <Checkbox />
                <Checkbox />
            </CheckboxGroup>
        </React.Fragment>
    );
};

/* eslint-disable */
import React from 'react';

import { CheckboxGroup, CheckboxGroupProps } from '@alfalab/core-components/checkbox-group';
import { Checkbox } from '@alfalab/core-components/checkbox';

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

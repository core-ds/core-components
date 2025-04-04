/* eslint-disable */
import React from 'react';

import { RadioGroup, RadioGroupProps } from '@balafla/core-components/radio-group';
import { Radio } from '@balafla/core-components/radio';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <RadioGroup>
                <Radio />
                <Radio />
            </RadioGroup>
        </React.Fragment>
    );
};

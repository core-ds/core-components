/* eslint-disable */
import React from 'react';

import { RadioGroupDesktop, RadioGroupDesktopProps } from '@balafla/core-components/radio-group/desktop';
import { Radio } from '@balafla/core-components/radio';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <RadioGroupDesktop>
                <Radio />
                <Radio />
            </RadioGroupDesktop>
        </React.Fragment>
    );
};

/* eslint-disable */
import React from 'react';

import { RadioGroupDesktop, RadioGroupDesktopProps } from '@alfalab/core-components/radio-group/desktop';
import { Radio } from '@alfalab/core-components/radio';

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

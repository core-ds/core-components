/* eslint-disable */
import React from 'react';

import { Select, SelectProps, useLazyLoading, useSelectWithLoading, SelectMobile, SelectMobileProps } from '@balafla/core-components/select';
import { SelectResponsive } from '@balafla/core-components/select/responsive';
import '@balafla/core-components/select';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Select options={[]}/>
            <SelectResponsive options={[]}/>
            <SelectMobile options={[]}/>
        </React.Fragment>
    );
};

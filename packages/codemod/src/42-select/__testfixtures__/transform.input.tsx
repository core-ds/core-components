/* eslint-disable */
import React from 'react';

import { Select, SelectProps, useLazyLoading, useSelectWithLoading, SelectMobile, SelectMobileProps } from '@alfalab/core-components/select';
import { SelectResponsive } from '@alfalab/core-components/select/responsive';
import '@alfalab/core-components/select';

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

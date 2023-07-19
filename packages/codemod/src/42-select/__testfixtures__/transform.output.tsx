/* eslint-disable */
import React from 'react';

import { SelectDesktop, SelectDesktopProps } from '@alfalab/core-components/select/desktop';
import { useLazyLoading, useSelectWithLoading } from '@alfalab/core-components/select/shared';
import { SelectMobile, SelectMobileProps } from '@alfalab/core-components/select/mobile';
import { Select } from '@alfalab/core-components/select';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <SelectDesktop options={[]}/>
            <Select options={[]}/>
            <SelectMobile options={[]}/>
        </React.Fragment>
    );
};

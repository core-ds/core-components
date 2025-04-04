/* eslint-disable */
import React from 'react';

import { SelectDesktop, SelectDesktopProps } from '@balafla/core-components/select/desktop';
import { useLazyLoading, useSelectWithLoading } from '@balafla/core-components/select/shared';
import { SelectMobile, SelectMobileProps } from '@balafla/core-components/select/mobile';
import { Select } from '@balafla/core-components/select';

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

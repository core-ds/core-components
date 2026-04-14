import React, {Fragment} from 'react';

import { DateRangeInput } from '@alfalab/core-components-date-range-input';
import { DateRangeInputDesktop } from '@alfalab/core-components-date-range-input/desktop';
import { DateRangeInputMobile } from '@alfalab/core-components-date-range-input/mobile';

export const Component = () => (
    <Fragment>
        <DateRangeInput size="s" />
        <DateRangeInput size={"s"} />
        <DateRangeInputDesktop size="s" />
        <DateRangeInputDesktop size={"s"} />
        <DateRangeInputMobile size="s" />
        <DateRangeInputMobile size={"s"} />

        <DateRangeInput size="m" />
        <DateRangeInput size={"m"} />
        <DateRangeInputDesktop size="m" />
        <DateRangeInputDesktop size={"m"} />
        <DateRangeInputMobile size="m" />
        <DateRangeInputMobile size={"m"} />

        <DateRangeInput size="l" />
        <DateRangeInput size={"l"} />
        <DateRangeInputDesktop size="l" />
        <DateRangeInputDesktop size={"l"} />
        <DateRangeInputMobile size="l" />
        <DateRangeInputMobile size={"l"} />

        <DateRangeInput size="xl" />
        <DateRangeInput size={"xl"} />
        <DateRangeInputDesktop size="xl" />
        <DateRangeInputDesktop size={"xl"} />
        <DateRangeInputMobile size="xl" />
        <DateRangeInputMobile size={"xl"} />
    </Fragment>
);

import React, {Fragment} from 'react';

import { DateTimeInput } from '@alfalab/core-components-date-time-input';
import { DateTimeInputDesktop } from '@alfalab/core-components-date-time-input/desktop';
import { DateTimeInputMobile } from '@alfalab/core-components-date-time-input/mobile';

export const Component = () => (
    <Fragment>
        <DateTimeInput size="s" />
        <DateTimeInput size={"s"} />
        <DateTimeInputDesktop size="s" />
        <DateTimeInputDesktop size={"s"} />
        <DateTimeInputMobile size="s" />
        <DateTimeInputMobile size={"s"} />

        <DateTimeInput size="m" />
        <DateTimeInput size={"m"} />
        <DateTimeInputDesktop size="m" />
        <DateTimeInputDesktop size={"m"} />
        <DateTimeInputMobile size="m" />
        <DateTimeInputMobile size={"m"} />

        <DateTimeInput size="l" />
        <DateTimeInput size={"l"} />
        <DateTimeInputDesktop size="l" />
        <DateTimeInputDesktop size={"l"} />
        <DateTimeInputMobile size="l" />
        <DateTimeInputMobile size={"l"} />

        <DateTimeInput size="xl" />
        <DateTimeInput size={"xl"} />
        <DateTimeInputDesktop size="xl" />
        <DateTimeInputDesktop size={"xl"} />
        <DateTimeInputMobile size="xl" />
        <DateTimeInputMobile size={"xl"} />
    </Fragment>
);

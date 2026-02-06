import React, {Fragment} from 'react';

import { CalendarInput } from '@alfalab/core-components-calendar-input';
import { CalendarInputDesktop } from '@alfalab/core-components-calendar-input/desktop';
import { CalendarInputMobile } from '@alfalab/core-components-calendar-input/mobile';

export const Component = () => (
    <Fragment>
        <CalendarInput size="s" />
        <CalendarInput size={"s"} />
        <CalendarInputDesktop size="s" />
        <CalendarInputDesktop size={"s"} />
        <CalendarInputMobile size="s" />
        <CalendarInputMobile size={"s"} />

        <CalendarInput size="m" />
        <CalendarInput size={"m"} />
        <CalendarInputDesktop size="m" />
        <CalendarInputDesktop size={"m"} />
        <CalendarInputMobile size="m" />
        <CalendarInputMobile size={"m"} />

        <CalendarInput size="l" />
        <CalendarInput size={"l"} />
        <CalendarInputDesktop size="l" />
        <CalendarInputDesktop size={"l"} />
        <CalendarInputMobile size="l" />
        <CalendarInputMobile size={"l"} />

        <CalendarInput size="xl" />
        <CalendarInput size={"xl"} />
        <CalendarInputDesktop size="xl" />
        <CalendarInputDesktop size={"xl"} />
        <CalendarInputMobile size="xl" />
        <CalendarInputMobile size={"xl"} />
    </Fragment>
);

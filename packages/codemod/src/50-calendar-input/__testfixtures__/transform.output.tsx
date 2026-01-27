import React, {Fragment} from 'react';

import { CalendarInput } from '@alfalab/core-components-calendar-input';
import { CalendarInputDesktop } from '@alfalab/core-components-calendar-input/desktop';
import { CalendarInputMobile } from '@alfalab/core-components-calendar-input/mobile';

export const Component = () => (
    <Fragment>
        <CalendarInput size={48} />
        <CalendarInput size={48} />
        <CalendarInputDesktop size={48} />
        <CalendarInputDesktop size={48} />
        <CalendarInputMobile size={48} />
        <CalendarInputMobile size={48} />

        <CalendarInput size={56} />
        <CalendarInput size={56} />
        <CalendarInputDesktop size={56} />
        <CalendarInputDesktop size={56} />
        <CalendarInputMobile size={56} />
        <CalendarInputMobile size={56} />

        <CalendarInput size={64} />
        <CalendarInput size={64} />
        <CalendarInputDesktop size={64} />
        <CalendarInputDesktop size={64} />
        <CalendarInputMobile size={64} />
        <CalendarInputMobile size={64} />

        <CalendarInput size={72} />
        <CalendarInput size={72} />
        <CalendarInputDesktop size={72} />
        <CalendarInputDesktop size={72} />
        <CalendarInputMobile size={72} />
        <CalendarInputMobile size={72} />
    </Fragment>
);

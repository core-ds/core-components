import React, {Fragment} from 'react';

import { DateTimeInput } from '@alfalab/core-components-date-time-input';
import { DateTimeInputDesktop } from '@alfalab/core-components-date-time-input/desktop';
import { DateTimeInputMobile } from '@alfalab/core-components-date-time-input/mobile';

export const Component = () => (
    <Fragment>
        <DateTimeInput size={48} />
        <DateTimeInput size={48} />
        <DateTimeInputDesktop size={48} />
        <DateTimeInputDesktop size={48} />
        <DateTimeInputMobile size={48} />
        <DateTimeInputMobile size={48} />

        <DateTimeInput size={56} />
        <DateTimeInput size={56} />
        <DateTimeInputDesktop size={56} />
        <DateTimeInputDesktop size={56} />
        <DateTimeInputMobile size={56} />
        <DateTimeInputMobile size={56} />

        <DateTimeInput size={64} />
        <DateTimeInput size={64} />
        <DateTimeInputDesktop size={64} />
        <DateTimeInputDesktop size={64} />
        <DateTimeInputMobile size={64} />
        <DateTimeInputMobile size={64} />

        <DateTimeInput size={72} />
        <DateTimeInput size={72} />
        <DateTimeInputDesktop size={72} />
        <DateTimeInputDesktop size={72} />
        <DateTimeInputMobile size={72} />
        <DateTimeInputMobile size={72} />
    </Fragment>
);

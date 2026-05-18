import React, {Fragment} from 'react';

import { DateInput } from '@alfalab/core-components-date-input';

export const Component = () => (
    <Fragment>
        <DateInput size="s" />
        <DateInput size={"s"} />

        <DateInput size="m" />
        <DateInput size={"m"} />

        <DateInput size="l" />
        <DateInput size={"l"} />

        <DateInput size="xl" />
        <DateInput size={"xl"} />
    </Fragment>
);

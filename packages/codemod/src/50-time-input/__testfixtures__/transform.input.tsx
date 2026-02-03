import React, {Fragment} from 'react';

import { TimeInput } from '@alfalab/core-components-time-input';

export const Component = () => (
    <Fragment>
        <TimeInput size="s" />
        <TimeInput size={"s"} />

        <TimeInput size="m" />
        <TimeInput size={"m"} />

        <TimeInput size="l" />
        <TimeInput size={"l"} />

        <TimeInput size="xl" />
        <TimeInput size={"xl"} />
    </Fragment>
);
